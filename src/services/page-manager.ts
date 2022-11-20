import { pathToRegexp } from 'path-to-regexp';

const PageTitles = new Map<string, string>();

PageTitles.set('/', 'IZFLIX');
PageTitles.set('/vod', 'VOD');
PageTitles.set('/profile', 'Profile');
PageTitles.set('/profile/settings', 'Settings');
PageTitles.set('/profile/info', 'Info');
PageTitles.set('/music', 'Music');
PageTitles.set('/music/:id', 'Music');
PageTitles.set('/category', 'Category');
PageTitles.set('/category/:id', 'Category');
PageTitles.set('/calendar', 'Calendar');
PageTitles.set('/playlist', 'Playlist');
PageTitles.set('/playlist/:id', 'Playlist');
PageTitles.set('/search', '#');
PageTitles.set('/live', 'Live');

interface PageInfo {
  title: string;
  params: string[];
  type: 'main' | 'submain' | 'children';
}

class PageManager {
  public static getPageInfo(location: string): PageInfo | null {
    for (const path of PageTitles.keys()) {
      const regexp = pathToRegexp(path);
      const result = regexp.exec(location);
      if (result) {
        const title = PageTitles.get(path)!;
        const params = result.slice(1);
        const type =
          path === '/' ? 'main' : ['/vod', '/profile'].includes(path) ? 'submain' : 'children';
        return { title, params, type };
      }
    }

    return null;
  }

  public static getParams(path: string, location: string): string[] {
    const regexp = pathToRegexp(path);
    const result = regexp.exec(location);
    if (result) {
      return result.slice(1);
    } else return [];
  }

  public static getPageKey(path: string): string {
    if (path.startsWith('/category')) return '/category';
    return path;
  }

  public static isBackgroundState(location: string): boolean {
    const pageInfo = PageManager.getPageInfo(location);
    return !!pageInfo;
  }
}

export default PageManager;
