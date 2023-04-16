import styled from 'styled-components';
import { Color } from '../../styles';
import Spaceship from '../../services/spaceship';

const Layout = styled.div`
  position: relative;
  background: ${Color.DARK_GRAY};
  overflow: hidden;
`;

const Video = styled.video`
  position: absolute;
  width: 200%;
`;

interface Props {
  game: ICampdGame;
  className?: string;
}

const CamVideo: React.FC<Props> = ({ game, className }) => {
  return (
    <Layout className={className}>
      <Video src={Spaceship.getCamVideoUrl(game.id)} autoPlay muted />
    </Layout>
  );
};

export default CamVideo;
