import styled from 'styled-components';
import CamVideo from '../atoms/CamVideo';
import Button from '../atoms/Button';
import { Color, Text } from '../../styles';
import useDevice from '../../hooks/useDevice';
import { useNavigate } from 'react-router-dom';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 0 32px 0;
`;

const Video = styled(CamVideo)`
  aspect-ratio: 16 / 9;
  width: 100%;
  border-radius: 8px;
`;

const VideoPlaceholder = styled.div`
  position: relative;

  aspect-ratio: 16 / 9;
  width: 100%;

  background: ${Color.DARK_GRAY};
`;

const VideoPlaceholderText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: ${Color.GRAY};
  text-align: center;
  user-select: none;

  ${Text.HEADLINE_3};
  height: unset;
`;

const Menu = styled.div`
  display: flex;
  gap: 10px;
  margin: -32px;
  padding: 32px;
`;

interface Props {
  game?: ICampdGame;
}

const CamGamePreviewSection: React.FC<Props> = ({ game }) => {
  const device = useDevice();
  const navigate = useNavigate();

  const handlePlay = () => {
    if (!game) return false;
    navigate('/campd/play', { state: { game } });
  };

  return (
    <Layout>
      {game ? (
        <Video type={'preview'} game={game} />
      ) : (
        <VideoPlaceholder>
          <VideoPlaceholderText>영상을 선택해주세요</VideoPlaceholderText>
        </VideoPlaceholder>
      )}
      <Menu>
        <Button color={Color.DARK_GRAY} icon={'playlist'} scale={0.95} fluid={device === 'mobile'}>
          랭킹
        </Button>
        <Button
          color={game ? Color.PRIMARY : Color.GRAY}
          icon={'play'}
          scale={0.95}
          fluid={device === 'mobile'}
          onClick={handlePlay}
        >
          플레이
        </Button>
      </Menu>
    </Layout>
  );
};

export default CamGamePreviewSection;
