import { Params, useParams, useSearchParams } from 'react-router-dom';

export interface WithParamsProps {
  params: Params<string>;
  query: URLSearchParams;
}

function withParams<T>(Component: any) {
  return (props: Omit<Omit<T, 'params'>, 'query'>) => (
    <Component {...props} params={useParams()} query={useSearchParams()[0]} />
  );
}

export default withParams;
