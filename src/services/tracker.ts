import ReactGA from 'react-ga4';

class Tracker {
  public static send(category: string, action: string): void {
    ReactGA.event({ category, action });
  }
}

export default Tracker;
