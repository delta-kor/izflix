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
    quality: number = 1080
  ): Promise<ApiResponse.Video.Stream> {
    return this.get(`/video/${id}?quality=${quality}`, {
      key: `stream_video_${id}`,
      expire: expireTime,
    });
  }

  public getAllPlaylists(): Promise<ApiResponse.Feed.Playlist.GetAllPlaylists> {
    return this.get('/feed/playlist', {
      key: 'get_all_playlists',
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
      key: `view_one_music#${id}`,
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
      key: `view_all_category#${path}`,
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
