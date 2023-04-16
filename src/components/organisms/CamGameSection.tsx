import styled from 'styled-components';
import { Color, MobileQuery, PcQuery } from '../../styles';
import Spaceship from '../../services/spaceship';
import CamVideo from '../atoms/CamVideo';

const Layout = styled.div`
  ${PcQuery} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin: 0 auto;
    height: 100vh;
    max-width: 1500px;
  }

  ${MobileQuery} {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    height: 100vh;
    max-width: calc((100vh - 100vw * (27 / 32) - 24px) * (16 / 9));
    min-width: 60vw;
    gap: 24px;
    margin: 0 auto;
  }
`;

const Selector = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 32 / 27;

  ${MobileQuery} {
    flex-shrink: 0;
  }
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${PcQuery} {
    padding: 0 10%;
  }
`;

const ResultVideo = styled(CamVideo)`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
`;

interface Props {
  game: ICampdGame;
}

const CamGameSection: React.FC<Props> = ({ game }) => {
  return (
    <Layout>
      <Selector>
        <Video
          src={Spaceship.getCamVideoUrl(game.id)}
          playsInline
          disableRemotePlayback
          disablePictureInPicture
        />
      </Selector>
      <Menu>
        <ResultVideo game={game} />
      </Menu>
    </Layout>
  );
};

export default CamGameSection;
