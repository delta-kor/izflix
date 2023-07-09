import styled from 'styled-components';
import CamGameSection from '../organisms/CamGameSection';

const Layout = styled.div``;

interface Props {
  game: ICampdGame;
}

const CamGameTemplate: React.FC<Props> = ({ game }) => {
  return (
    <Layout>
      <CamGameSection game={game} />
    </Layout>
  );
};

export default CamGameTemplate;
