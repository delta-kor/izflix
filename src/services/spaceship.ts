import NodeCache from 'node-cache';
import Playtime from './playtime';

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
    method: Method,
    path: string,
    payload: any = {}
  ): Promise<T> {
    const options: RequestInit = { method };

    if (method !== 'GET' && payload) {
      options.body = JSON.stringify(payload);
      options.headers = { 'Content-Type': 'application/json' };
    }

    let data: T;

    try {
      const response = await fetch(this.baseUrl + path, options);

      if (
        !response.ok &&
        !response.headers.get('Content-Type')!.includes('application/json')
      )
        return {
          ok: false,
          message:
            '서버 사용량이 많아 접속이 지연되고 있습니다\n잠시후 다시 시도해주세요',
        } as T;

      data = await response.json();
      data.status = response.status;
    } catch (e: any) {
      return { ok: false, message: '네트워크 연결에 문제가 발생했으며,\n현재 복구중에 있습니다\n잠시후 다시 시도해주세요' } as T;
    }

    return data;
  }

  private async get<T extends ApiResponse>(
    path: string,
    cacheOption?: CacheOptions
  ): Promise<T> {
    if (cacheOption) {
      const promiseCache = this.cache.get<Promise<T>>(
        cacheOption.key + '::promise'
      );
      if (promiseCache) {
        const resolved = await promiseCache;
        if (resolved.ok) return resolved;
      }

      const cache = this.cache.get<T>(cacheOption.key);
      if (cache) return cache;
    }

    const promise = this.request<T>('GET', path);
    if (cacheOption)
      this.cache.set(cacheOption.key + '::promise', promise, promiseExpireTime);

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
      const promiseCache = this.cache.get<Promise<T>>(
        cacheOption.key + '::promise'
      );
      if (promiseCache) {
        const resolved = await promiseCache;
        if (resolved.ok) return resolved;
      }

      const cache = this.cache.get<T>(cacheOption.key);
      if (cache) return cache;
    }

    const promise = this.request<T>('POST', path, data);
    if (cacheOption)
      this.cache.set(cacheOption.key + '::promise', promise, promiseExpireTime);

    const response = await promise;
    if (response.ok && cacheOption) {
      this.cache.set(cacheOption.key, response, cacheOption.expire);
    }

    return response;
  }

  public getAllAds(): Promise<ApiResponse.Ad.GetAll> {
    return this.get('/ad', { key: 'get_all_ads', expire: expireTime });
  }

  public streamVideo(
    id: string,
    quality: number
  ): Promise<ApiResponse.Video.Stream> {
    return this.get(`/video/${id}?quality=${quality}`, {
      key: `stream_video_${id}#${quality}`,
      expire: expireTime,
    });
  }

  public getVideoInfo(id: string): Promise<ApiResponse.Video.Info> {
    return this.get(`/video/${id}/info`, {
      key: `video_info_${id}`,
      expire: expireTime,
    });
  }

  public videoBeacon(id: string, time: number): void {
    try {
      fetch(this.baseUrl + `/video/${id}/beacon?time=${time}`);
    } catch (e) {
      console.error(e);
    }
  }

  public getAllPlaylists(): Promise<ApiResponse.Feed.Playlist.GetAllPlaylists> {
    return this.get('/feed/playlist', {
      key: 'get_all_playlists',
      expire: expireTime,
    });
  }

  public getOnePlaylist(
    id: string
  ): Promise<ApiResponse.Feed.Playlist.GetOnePlaylist> {
    return this.get(`/feed/playlist/${id}`, {
      key: `get_all_playlists_${id}`,
      expire: expireTime,
    });
  }

  public getVideoRecommends(
    id: string,
    count: number
  ): Promise<ApiResponse.Feed.GetVideoRecommends> {
    return this.get(`/feed/recommends/${id}?count=${count}`, {
      key: `get_recommends_${id}#${count}`,
      expire: expireTime,
    });
  }

  public getUserRecommends(
    count: number
  ): Promise<ApiResponse.Feed.GetUserRecommends> {
    const playtime = Playtime.get().slice(-50);
    const data = { data: playtime };
    if (playtime.length)
      return this.post(`/feed/recommends?count=${count}`, data, {
        key: `get_recommends_#${count}`,
        expire: expireTime,
      });
    else
      return new Promise((res) => {
        res({ ok: true, status: 200, videos: [], emotion: [0, 0, 0, 0] });
      });
  }

  public refreshUserRecommends(count: number): void {
    this.cache.del(`get_recommends_#${count}`);
    this.cache.del(`get_recommends_#${count}::promise`);
  }

  public viewAllMusics(): Promise<ApiResponse.Music.ViewAll> {
    return this.get('/music', {
      key: 'view_all_musics',
      expire: expireTime,
    });
  }

  public viewOneMusic(id: string): Promise<ApiResponse.Music.ViewOne> {
    return this.get(`/music/${id}`, {
      key: `view_one_music_${id}`,
      expire: expireTime,
    });
  }

  public viewAllCategory(): Promise<ApiResponse.Category.ViewAll> {
    return this.get('/category', {
      key: 'view_all_category',
      expire: expireTime,
    });
  }

  public viewOneCategory(path: string): Promise<ApiResponse.Category.ViewOne> {
    return this.get(`/category/${path}`, {
      key: `view_all_category_${path}`,
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
