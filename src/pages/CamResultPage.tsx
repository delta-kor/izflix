import { Navigate, useLocation } from 'react-router-dom';
import Page from './Page';

const CamResultPage: React.FC = () => {
  const location = useLocation();
  const game: ICampdGame = location.state?.game;
  const input: ICampdInput = location.state?.input;

  if (!game || !input) return <Navigate to={'/campd'} />;

  return <Page noStyle>result</Page>;
};

export default CamResultPage;
