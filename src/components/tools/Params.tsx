import { useParams, useSearchParams } from 'react-router-dom';

function withParams(Component: any) {
  return (props: any) => (
    <Component {...props} params={useParams()} query={useSearchParams()} />
  );
}

export default withParams;
