import styled from 'styled-components';
import CamVideo from '../atoms/CamVideo';

const Layout = styled.div``;

const Video = styled(CamVideo)`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

interface Props {
  game?: ICampdGame;
}

const CamGamePreviewSection: React.FC<Props> = ({ game }) => {
  return <Layout>{game && <Video game={game} />}</Layout>;
};

export default CamGamePreviewSection;
