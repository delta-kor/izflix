import NodeCache from 'node-cache';

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
      data = await response.json();
      data.status = response.status;
    } catch (e: any) {
      if (!e.json)
        return { ok: false, message: '네트워크 연결이 원할하지 않아요' } as T;

      data = await e.json();
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

  private post<T extends ApiResponse>(path: string, data: any): Promise<T> {
    return this.request<T>('POST', path, data);
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

  public getRecommends(
    id: string,
    count: number
  ): Promise<ApiResponse.Feed.GetRecommends> {
    return this.get(`/feed/recommends/${id}?count=${count}`, {
      key: `get_recommends_${id}#${count}`,
      expire: expireTime,
    });
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
