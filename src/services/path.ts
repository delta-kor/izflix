const PageTitles = new Map<string, string>();

PageTitles.set('/', 'IZFLIX');
PageTitles.set('/vod', 'VOD');
PageTitles.set('/profile', 'Profile');
PageTitles.set('/music', 'Music');
PageTitles.set('/music/:id', 'Music');
PageTitles.set('/category', 'Category');
PageTitles.set('/category/:id', 'Category');
PageTitles.set('/calendar', 'Calendar');
PageTitles.set('/playlist', 'Playlist');
PageTitles.set('/playlist/:id', 'Playlist');

interface PageInfo {
  title: string;
  params: string[];
}

class PageManager {
  public static getPageInfo(location: string): PageInfo | null {
    for (const path of PageTitles.keys()) {
      const regexp = pathToRegexp(path);
      const result = regexp.exec(location);
      if (result) {
        const title = PageTitles.get(path)!;
        const params = result.slice(1);
        return { title, params };
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
}

export default PageManager;
