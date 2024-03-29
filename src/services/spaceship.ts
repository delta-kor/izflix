import NodeCache from 'node-cache';
import HttpException from '../exceptions/http-exception';
import delay from './delay';
import i18n from './i18n';
import Playtime from './playtime';
import Settings from './settings';
import Transmitter from './transmitter';

const expireTime = 60 * 5;
const promiseExpireTime = 10;

interface RequestOptions {
  method?: string;
  key: string;
  expire: number;
  auth?: boolean;
  ignoreAuthError?: boolean;
}

class SpaceshipClass {
  private cache: NodeCache = new NodeCache();
  private token: string | null = null;
  private callbacks: any[] = [];
  private sessionStartTime: Date = new Date();

  constructor(private baseUrl: string) {}

  public async load(): Promise<void> {
    this.getUserToken();
    this.sessionStartTime = new Date();
  }

  public async flush(): Promise<void> {
    this.cache.flushAll();
  }

  private async request<T extends ApiResponse>(
    method: string,
    path: string,
    payload: any,
    requestOption?: RequestOptions
  ): Promise<T> {
    if (process.env.NODE_ENV === 'development') await delay(500);

    const options: RequestInit = { method };

    if (method !== 'GET' && payload) {
      options.body = JSON.stringify(payload);
      options.headers = { 'Content-Type': 'application/json' };
    }

    options.headers = { ...options.headers, 'Accept-Language': i18n.resolvedLanguage };

    if (requestOption?.auth) {
      const token = await this.getUserToken();
      if (token) options.headers = { ...options.headers, Authorization: `izflix ${token}` };
      else if (!requestOption.ignoreAuthError)
        return { ok: false, message: 'error.login_failed' } as T;
    } else {
      const token = await this.getUserToken();
      if (token) options.headers = { ...options.headers, Authorization: `izflix-ig ${token}` };
    }

    let data: T;

    try {
      const response = await fetch(this.baseUrl + path, options);

      if (!response.ok && !response.headers.get('Content-Type')!.includes('application/json'))
        return {
          ok: false,
          message: 'error.server_usage',
        } as T;

      const token = response.headers.get('iz-auth-token');
      if (token) {
        Settings.setOne('$_AUTH_TOKEN', token);
        this.token = token;
      }

      data = await response.json();
      data.status = response.status;
    } catch (e: any) {
      return { ok: false, message: 'error.network_unstable' } as T;
    }

    return data;
  }

  private async get<T extends ApiResponse>(
    path: string,
    requestOption?: RequestOptions
  ): Promise<T> {
    const useCache = requestOption && !requestOption.auth;

    if (useCache) {
      const promiseCache = this.cache.get<Promise<T>>(requestOption.key + '::promise');
      if (promiseCache) {
        const resolved = await promiseCache;
        return resolved;
      }

      const cache = this.cache.get<T>(requestOption.key);
      if (cache) return cache;
    }

    const promise = this.request<T>('GET', path, requestOption, requestOption);
    if (useCache) this.cache.set(requestOption.key + '::promise', promise, promiseExpireTime);

    const response = await promise;
    if (useCache) this.cache.del(requestOption.key + '::promise');

    if (response.ok && useCache) {
      this.cache.set(requestOption.key, response, requestOption.expire);
    }

    return response;
  }

  private async post<T extends ApiResponse>(
    path: string,
    data: any,
    requestOption?: RequestOptions
  ): Promise<T> {
    const method = requestOption?.method || 'POST';
    const useCache = requestOption && !requestOption.auth;

    if (useCache) {
      const promiseCache = this.cache.get<Promise<T>>(requestOption.key + '::promise');
      if (promiseCache) {
        const resolved = await promiseCache;
        return resolved;
      }

      const cache = this.cache.get<T>(requestOption.key);
      if (cache) return cache;
    }

    const promise = this.request<T>(method, path, data, requestOption);
    if (useCache) this.cache.set(requestOption.key + '::promise', promise, promiseExpireTime);

    const response = await promise;
    if (useCache) this.cache.del(requestOption.key + '::promise');

    if (response.ok && useCache) {
      this.cache.set(requestOption.key, response, requestOption.expire);
    }

    return response;
  }

  private async loadUserToken(): Promise<void> {
    try {
      const localToken = Settings.getOne('$_AUTH_TOKEN');
      const url = this.baseUrl + '/user';

      const options: RequestInit = {
        method: 'POST',
        headers: {
          'Accept-Language': i18n.resolvedLanguage,
          Authorization: `izflix ${localToken}`,
        },
      };

      const response = await fetch(url, options);
      const data: ApiResponse.User.Get = await response.json();
      if (!data.ok) throw new HttpException(data);

      const token = response.headers.get('iz-auth-token');
      if (!token) throw new Error('Token not found');

      Settings.setOne('$_AUTH_TOKEN', token);
      this.token = token;
      this.callbacks.forEach(callback => callback(token));
      this.callbacks = [];
    } catch (e) {
      console.error(e);

      if (e instanceof HttpException)
        Transmitter.emit('popup', { type: 'error', message: e.message });
      else Transmitter.emit('popup', { type: 'error', message: 'error.login_failed' });

      this.token = null;
      this.callbacks.forEach(callback => callback(null));
      this.callbacks = [];
    }
  }

  private async getUserToken(): Promise<string | null> {
    if (this.token) return this.token;
    return new Promise(resolve => {
      const initialLength = this.callbacks.length;
      this.callbacks.push(resolve);
      if (!initialLength) this.loadUserToken();
    });
  }

  public async getUser(): Promise<ApiResponse.User.Get> {
    await this.getUserToken();
    return this.post('/user', null, {
      key: 'get_user',
      expire: expireTime,
      auth: true,
    });
  }

  public async updateUser(data: Partial<IUser>): Promise<ApiResponse.User.Get> {
    return this.post('/user', data, {
      method: 'PUT',
      key: 'update_user',
      expire: expireTime,
      auth: true,
    });
  }

  public async search(query: string): Promise<ApiResponse.Search.Search> {
    return this.get(`/search?query=${query}`, {
      key: `search::${query}`,
      expire: expireTime,
    });
  }

  public async getUserRecommends(
    count: number = Settings.getOne('USER_RECOMMEND_COUNT')
  ): Promise<ApiResponse.Recommend.GetUserRecommends> {
    const playtime = Playtime.get().slice(-50);
    const payload = { data: playtime };
    return this.post(`/recommend?count=${count}`, payload, {
      key: `get_user_recommends::${count}`,
      expire: expireTime,
    });
  }

  public async getVideoRecommends(
    id: string,
    count: number = Settings.getOne('VIDEO_RECOMMEND_COUNT')
  ): Promise<ApiResponse.Recommend.GetVideoRecommends> {
    return this.get(`/recommend/${id}?count=${count}`, {
      key: `get_video_recommends::${id}::${count}`,
      expire: expireTime,
    });
  }

  public async streamVideo(id: string, quality: number): Promise<ApiResponse.Video.Stream> {
    return this.get(`/video/${id}?quality=${quality}`, {
      key: `stream_video::${id}::${quality}`,
      expire: expireTime,
    });
  }

  public async getVideoInfo(id: string): Promise<ApiResponse.Video.Info> {
    return this.get(`/video/${id}/info`, {
      key: `get_video_info::${id}`,
      expire: expireTime,
    });
  }

  public async getVideoList(ids: string[]): Promise<ApiResponse.Video.List> {
    const payload = ids.join(',');
    return this.get(`/video/list?ids=${payload}`, {
      key: `get_video_list::${payload}`,
      expire: expireTime,
    });
  }

  public async getVideoAction(id: string): Promise<ApiResponse.Video.Action> {
    return this.get(`/video/${id}/action`, {
      key: `get_video_action::${id}`,
      expire: expireTime,
      auth: true,
    });
  }

  public async likeVideo(id: string): Promise<ApiResponse.Video.Like> {
    return this.post(`/video/${id}/like`, null, {
      key: `like_video::${id}`,
      expire: expireTime,
      auth: true,
    });
  }

  public videoBeacon(
    id: string,
    time: number,
    total: number,
    quality: number,
    fullscreen: boolean,
    pip: boolean
  ): void {
    const language = i18n.language;
    const userAgent = window.navigator.userAgent;
    const sessionTime = Date.now() - this.sessionStartTime.getTime();
    const pwa = (() =>
      window.matchMedia('(display-mode: standalone)').matches ||
      // @ts-ignore
      window.navigator.standalone ||
      document.referrer.includes('android-app://'))();

    try {
      const payload = {
        time,
        total,
        language,
        agent: userAgent,
        session_time: sessionTime,
        quality,
        fullscreen,
        pip,
        pwa,
      };
      this.post(`/video/${id}/beacon`, payload, {
        key: `video_beacon::${id}`,
        expire: expireTime,
        auth: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async readPlaylist(id: string): Promise<ApiResponse.Playlist.Read> {
    return this.get(`/playlist/${id}`, {
      key: `read_playlist::${id}`,
      expire: expireTime,
      auth: true,
    });
  }

  public async readAllPlaylists(
    type: 'performance' | 'vod' | 'user'
  ): Promise<ApiResponse.Playlist.ReadAll> {
    const data = type === 'vod' ? 'full' : 'default';
    return this.get(`/playlist/${type}?data=${data}`, {
      key: `read_all_playlists::${type}`,
      expire: expireTime,
      auth: true,
    });
  }

  public async readFeatured(
    type: 'performance' | 'vod'
  ): Promise<ApiResponse.Playlist.ReadFeatured> {
    return this.get(`/playlist/${type}/featured`, {
      key: `read_featured::${type}`,
      expire: expireTime,
    });
  }

  public async createUserPlaylist(title: string): Promise<ApiResponse.Playlist.CreateUserPlaylist> {
    const payload = { title };
    return this.post('/playlist/user', payload, {
      key: `create_user_playlist::${title}`,
      expire: expireTime,
      auth: true,
    });
  }

  public async addVideotoUserPlaylist(
    playlistId: string,
    videoId: string
  ): Promise<ApiResponse.Playlist.UpdateUserPlaylist> {
    const payload = { action: 'add', video_id: videoId };
    return this.post(`/playlist/user/${playlistId}`, payload, {
      key: `add_video_to_user_playlist::${playlistId}::${videoId}`,
      expire: expireTime,
      auth: true,
    });
  }

  public async renameUserPlaylist(
    playlistId: string,
    title: string
  ): Promise<ApiResponse.Playlist.UpdateUserPlaylist> {
    const payload = { action: 'rename', title };
    return this.post(`/playlist/user/${playlistId}`, payload, {
      key: `rename_user_playlist::${playlistId}::${title}`,
      expire: expireTime,
      auth: true,
    });
  }

  public async removeVideoFromUserPlaylist(
    playlistId: string,
    videoId: string
  ): Promise<ApiResponse.Playlist.UpdateUserPlaylist> {
    const payload = { action: 'remove', video_id: videoId };
    return this.post(`/playlist/user/${playlistId}`, payload, {
      key: `remove_video_from_user_playlist::${playlistId}::${videoId}`,
      expire: expireTime,
      auth: true,
    });
  }

  public async reorderVideoFromUserPlaylist(
    playlistId: string,
    videoId: string,
    order: number
  ): Promise<ApiResponse.Playlist.UpdateUserPlaylist> {
    const payload = { action: 'reorder', video_id: videoId, order };
    return this.post(`/playlist/user/${playlistId}`, payload, {
      key: `reorder_video_from_user_playlist::${playlistId}::${videoId}::order`,
      expire: expireTime,
      auth: true,
    });
  }

  public async deleteUserPlaylist(
    playlistId: string
  ): Promise<ApiResponse.Playlist.DeleteUserPlaylist> {
    return this.post(`/playlist/user/${playlistId}`, null, {
      method: 'DELETE',
      key: `delete_user_playlist::${playlistId}`,
      expire: expireTime,
      auth: true,
    });
  }

  public async getAllAlbums(): Promise<ApiResponse.Music.GetAllAlbums> {
    return this.get('/music/album', {
      key: 'get_all_albums',
      expire: expireTime,
    });
  }

  public async getOneAlbum(id: string): Promise<ApiResponse.Music.GetOneAlbum> {
    return this.get(`/music/album/${id}`, {
      key: `get_one_album::${id}`,
      expire: expireTime,
    });
  }

  public async getOneMusic(id: string): Promise<ApiResponse.Music.GetOneMusic> {
    return this.get(`/music/${id}`, {
      key: `get_one_music::${id}`,
      expire: expireTime,
    });
  }

  public async viewCategory(id: string | null): Promise<ApiResponse.Category.View> {
    const target = id ? `${id}` : '';
    return this.get(`/category/${target}`, {
      key: `view_category::${target}`,
      expire: expireTime,
    });
  }

  public async getAllCalendars(): Promise<ApiResponse.Calendar.GetAll> {
    return this.get('/calendar', {
      key: 'get_all_calendars',
      expire: expireTime,
    });
  }

  public async getOneCalendar(key: string): Promise<ApiResponse.Calendar.GetOne> {
    return this.get(`/calendar/${key}`, {
      key: `get_one_calendar::${key}`,
      expire: expireTime,
    });
  }

  public async getVliveList(filter: IVliveFilter): Promise<ApiResponse.Vlive.List> {
    return this.get(
      // prettier-ignore
      `/vlive/list?anchor=${filter.anchor}&sort=${filter.sort}&from=${filter.from}&count=${filter.count}&members=${filter.members ? filter.members.join(',') : ''}`,
      {
        key: `get_vlive_list::${filter.anchor}::${filter.sort}::${filter.count}::${filter.from}::${filter.members}`,
        expire: expireTime,
      }
    );
  }

  public getThumbnail(id: string): string {
    return `${this.baseUrl}/thumbnail/${id}`;
  }

  public getSubtitle(id: string): string {
    return `${this.baseUrl}/video/${id}/subtitle`;
  }
}

const baseUrl = process.env.REACT_APP_API_BASE!;

const Spaceship = new SpaceshipClass(baseUrl);
export default Spaceship;
