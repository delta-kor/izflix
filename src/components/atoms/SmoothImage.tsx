import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import styled from 'styled-components';
import { Color, MobileQuery, PcQuery } from '../../styles';

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

const Text = styled.div`
  position: absolute;

  color: ${Color.WHITE};
  background: ${Color.DARK_GRAY}AA;
  border-radius: 4px;
  z-index: 2;

  ${MobileQuery} {
    bottom: 6px;
    right: 6px;
    padding: 4px 6px;
    font-size: 10px;
  }

  ${PcQuery} {
    bottom: 8px;
    right: 8px;
    padding: 6px 8px;
    font-size: 12px;
  }
`;

interface Props {
  className?: string;
  src?: string | null;
  text?: string;
}

const SmoothImage: React.FC<Props> = ({ className, src, text }) => {
  return (
    <Layout className={className}>
      {src && (
        <Content
          src={src}
          effect={'opacity'}
          width={'100%'}
          wrapperProps={{
            style: { zIndex: '1' },
          }}
        />
      )}
      {text && <Text>{text}</Text>}
      <Placeholder />
    </Layout>
  );
};

export default SmoothImage;
