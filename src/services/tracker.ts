import ReactGA from 'react-ga4';
import isCrawler from './crawl';

class Tracker {
  private static isActivated(): boolean {
    return !isCrawler() && process.env.NODE_ENV !== 'development';
  }

  public static send(action: string, params: any = {}): void {
    if (!this.isActivated) return;
    ReactGA.ga('send', {
      hitType: 'event',
      eventCategory: 'event',
      eventAction: action,
      ...params,
    });
  }

  public static page(path: string): void {
    ReactGA.set({ page: path });
    ReactGA.send({ hitType: 'pageview', page: path });
  }
}

export default Tracker;
