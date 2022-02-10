import ReactGA from 'react-ga4';

class Tracker {
  public static send(action: string, params: any = {}): void {
    ReactGA.event({ category: 'event', action, ...params });
  }
}

export default Tracker;
