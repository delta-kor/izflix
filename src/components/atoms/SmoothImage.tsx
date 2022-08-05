import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import styled from 'styled-components';
import { Color } from '../../styles';

const Layout = styled.div`
  position: relative;
  overflow: hidden;
  user-select: none;
`;

const Content = styled(LazyLoadImage)`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;
  z-index: 1;
  user-drag: none;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;

  background: ${Color.DARK_GRAY};
  z-index: 0;
`;

interface Props {
  className?: string;
  src?: string;
}

const SmoothImage: React.FC<Props> = ({ className, src }) => {
  return (
    <Layout className={className}>
      {src && (
        <Content
          src={src}
          effect="opacity"
          width="100%"
          wrapperProps={{
            style: { zIndex: '1' },
          }}
        />
      )}
      <Placeholder />
    </Layout>
  );
};

export default SmoothImage;
