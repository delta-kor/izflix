import { Location, useLocation } from 'react-router-dom';

export interface WithLocationParams {
  location: Location;
}

function withLocation<T>(Component: any) {
  return (props: Omit<T, 'location'>) => <Component {...props} location={useLocation()} />;
}

export default withLocation;
