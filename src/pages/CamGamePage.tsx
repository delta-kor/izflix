import { Navigate, useLocation } from 'react-router-dom';
import Page from './Page';
import CamGameTemplate from '../components/templates/CamGameTemplate';

const CamGamePage: React.FC = () => {
  const location = useLocation();
  const game: ICampdGame = location.state?.game;

  if (!game) return <Navigate to={'/campd'} />;

  return (
    <Page noStyle>
      <CamGameTemplate game={game} />
    </Page>
  );
};

export default CamGamePage;
