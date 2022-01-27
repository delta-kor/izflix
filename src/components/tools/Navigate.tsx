import { useNavigate } from 'react-router-dom';

function withNavigate(Component: any) {
  return (props: any) => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigate;
