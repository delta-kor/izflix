// @ts-nocheck

import isCrawler from './crawl';

let gtag: any;

class Tracker {
  public static isActivated(): boolean {
    if (window.location.host !== 'izflix.net') return false;
    return !isCrawler() && process.env.NODE_ENV !== 'development';
  }

  public static initialize(): void {
    if (!this.isActivated()) return;

    window.dataLayer = window.dataLayer || [];

    gtag = function gtag() {
      dataLayer.push(arguments);
    };

    gtag('js', new Date());
    gtag('config', 'G-S789E94G7D');
    gtag('config', 'G-R36LWLJLH8');
  }

  public static send(action: string, params: any = {}): void {
    if (!this.isActivated()) return;
    gtag('event', action, {
      event_category: 'event',
      ...params,
    });
  }

  public static page(path: string): void {
    if (!this.isActivated()) return;
    // ReactGA.set({ page: path });
    // ReactGA.send({ hitType: 'pageview', page: path });
  }
}

export default Tracker;
