import GetConstant, { ConstantKey } from '../../constants';
import Page from './Page';

interface Props {
  data?: ConstantKey;
}

const ErrorPage: React.FC<Props> = ({ data, children }) => {
  const message = data ? GetConstant(data) : children;
  return <Page>{message}</Page>;
};

export default ErrorPage;
