import NodeCache from 'node-cache';
import delay from '../delay';

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

  public async readAllPlaylists(
    type: 'performance' | 'vod'
  ): Promise<ApiResponse.Playlist.ReadAll> {
    return this.get(`/playlist/${type}`, {
      key: `read_all_playlists::${type}`,
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
