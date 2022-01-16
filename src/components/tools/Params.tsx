import { useParams } from 'react-router-dom';

function withParams(Component: any) {
  return (props: any) => <Component {...props} params={useParams()} />;
}

export default withParams;
