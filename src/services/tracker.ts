import ReactGA from 'react-ga4';

class Tracker {
  public static send(action: string, params: any = {}): void {
    ReactGA.ga('send', {
      hitType: 'event',
      eventCategory: 'event',
      eventAction: action,
      ...params,
    });
  }
}

export default Tracker;
