import NodeCache from 'node-cache';
import delay from '../delay';
import Settings from './settings';

const expireTime = 60 * 5;
const promiseExpireTime = 10;

interface CacheOptions {
  key: string;
  expire: number;
}

class SpaceshipClass {
  private cache: NodeCache = new NodeCache();

  constructor(private baseUrl: string) {}

  private async request<T extends ApiResponse>(
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    path: string,
    payload: any = {}
  ): Promise<T> {
    if (process.env.NODE_ENV === 'development') await delay(1500);

    const options: RequestInit = { method };

    if (method !== 'GET' && payload) {
      options.body = JSON.stringify(payload);
      options.headers = { 'Content-Type': 'application/json' };
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

  private async get<T extends ApiResponse>(path: string, cacheOption?: CacheOptions): Promise<T> {
    if (cacheOption) {
      const promiseCache = this.cache.get<Promise<T>>(cacheOption.key + '::promise');
      if (promiseCache) {
        const resolved = await promiseCache;
        if (resolved.ok) return resolved;
      }

      const cache = this.cache.get<T>(cacheOption.key);
      if (cache) return cache;
    }

    const promise = this.request<T>('GET', path);
    if (cacheOption) this.cache.set(cacheOption.key + '::promise', promise, promiseExpireTime);

    const response = await promise;
    if (response.ok && cacheOption) {
      this.cache.set(cacheOption.key, response, cacheOption.expire);
    }

    return response;
  }

  private async post<T extends ApiResponse>(
    path: string,
    data: any,
    cacheOption?: CacheOptions
  ): Promise<T> {
    if (cacheOption) {
      const promiseCache = this.cache.get<Promise<T>>(cacheOption.key + '::promise');
      if (promiseCache) {
        const resolved = await promiseCache;
        if (resolved.ok) return resolved;
      }

      const cache = this.cache.get<T>(cacheOption.key);
      if (cache) return cache;
    }

    const promise = this.request<T>('POST', path, data);
    if (cacheOption) this.cache.set(cacheOption.key + '::promise', promise, promiseExpireTime);

    const response = await promise;
    if (response.ok && cacheOption) {
      this.cache.set(cacheOption.key, response, cacheOption.expire);
    }

    return response;
  }

  public async getUserRecommends(
    count: number = Settings.getOne('USER_RECOMMEND_COUNT')
  ): Promise<ApiResponse.Recommend.GetUserRecommends> {
    const payload = { data: [] };
    return this.post(`/recommend?count=${count}`, payload, {
      key: 'get_user_recommends',
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
