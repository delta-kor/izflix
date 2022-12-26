import styled from 'styled-components';
import Icon from '../../icons/Icon';

const LoaderIcon = styled(Icon)`
  animation: spin 2s infinite linear;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface Props {
  color: string;
  className?: string;
}

const Loader: React.FC<Props> = ({ color, className }) => {
  return <LoaderIcon type={'loader'} color={color} className={className} />;
};

export default Loader;
