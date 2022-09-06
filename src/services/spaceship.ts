import NodeCache from 'node-cache';
import HttpException from '../exceptions/http-exception';
import delay from './delay';
import i18n from './i18n';
import Settings from './settings';
import Transmitter from './transmitter';

const expireTime = 60 * 5;
const promiseExpireTime = 10;

interface RequestOptions {
  key: string;
  expire: number;
  auth?: boolean;
}

class SpaceshipClass {
  private cache: NodeCache = new NodeCache();
  private token: string | null = null;
  private callbacks: any[] = [];

  constructor(private baseUrl: string) {}

  public async load(): Promise<void> {
    this.getUserToken();
  }

  private async request<T extends ApiResponse>(
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    path: string,
    payload: any,
    auth: boolean
  ): Promise<T> {
    if (process.env.NODE_ENV === 'development') await delay(0);

    const options: RequestInit = { method };

    if (method !== 'GET' && payload) {
      options.body = JSON.stringify(payload);
      options.headers = { 'Content-Type': 'application/json' };
    }

    options.headers = { ...options.headers, 'Accept-Language': i18n.resolvedLanguage };

    if (auth) {
      const token = await this.getUserToken();
      if (token) options.headers = { ...options.headers, Authorization: `izflix ${token}` };
    }

    let data: T;

    try {
      const response = await fetch(this.baseUrl + path, options);

      if (!response.ok && !response.headers.get('Content-Type')!.includes('application/json'))
        return {
          ok: false,
          message: '서버 사용량이 많아 접속이 지연되고 있습니다\n잠시후 다시 시도해주세요',
        } as T;

      data = await response.json();
      data.status = response.status;
    } catch (e: any) {
      return { ok: false, message: '네트워크 연결이 원할하지 않아요' } as T;
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

    const promise = this.request<T>('GET', path, requestOption, requestOption?.auth!!);
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
    if (requestOption) {
      const promiseCache = this.cache.get<Promise<T>>(requestOption.key + '::promise');
      if (promiseCache) {
        const resolved = await promiseCache;
        return resolved;
      }

      const cache = this.cache.get<T>(requestOption.key);
      if (cache) return cache;
    }

    const promise = this.request<T>('POST', path, data, requestOption?.auth!!);
    if (requestOption) this.cache.set(requestOption.key + '::promise', promise, promiseExpireTime);

    const response = await promise;
    if (requestOption) this.cache.del(requestOption.key + '::promise');

    if (response.ok && requestOption) {
      this.cache.set(requestOption.key, response, requestOption.expire);
    }

    return response;
  }

  private async loadUserToken(): Promise<void> {
    try {
      const localToken = Settings.getOne('$_AUTH_TOKEN');
      const url = this.baseUrl + '/user';

      const options: RequestInit = {
        method: 'GET',
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

  public async getUserRecommends(
    count: number = Settings.getOne('USER_RECOMMEND_COUNT')
  ): Promise<ApiResponse.Recommend.GetUserRecommends> {
    const payload = { data: [] };
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

  public async readPlaylist(id: string): Promise<ApiResponse.Playlist.Read> {
    return this.get(`/playlist/${id}`, {
      key: `read_playlist::${id}`,
      expire: expireTime,
    });
  }

  public async readAllPlaylists(
    type: 'performance' | 'vod'
  ): Promise<ApiResponse.Playlist.ReadAll> {
    const data = type === 'performance' ? 'default' : 'full';
    return this.get(`/playlist/${type}?data=${data}`, {
      key: `read_all_playlists::${type}`,
      expire: expireTime,
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

  public getThumbnail(id: string): string {
    return `${this.baseUrl}/thumbnail/${id}`;
  }
}

const baseUrl = process.env.REACT_APP_API_BASE!;

const Spaceship = new SpaceshipClass(baseUrl);
export default Spaceship;
