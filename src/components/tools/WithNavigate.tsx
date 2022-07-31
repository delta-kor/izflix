import { NavigateFunction, useNavigate } from 'react-router-dom';

export interface WithNavigateParams {
  navigate: NavigateFunction;
}

function withNavigate<T>(Component: any) {
  return (props: Omit<T, 'navigate'>) => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigate;
