import styled from 'styled-components';
import CamVideo from '../atoms/CamVideo';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Video = styled(CamVideo)`
  aspect-ratio: 16 / 9;
  width: 100%;
  border-radius: 8px;
`;

interface Props {
  game: ICampdGame;
  input: ICampdInput;
}

const CamVideoController: React.FC<Props> = ({ game, input }) => {
  return (
    <Layout>
      <Video type={'preview'} game={game} />
    </Layout>
  );
};

export default CamVideoController;
