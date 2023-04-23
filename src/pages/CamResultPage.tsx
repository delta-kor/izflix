import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Page from './Page';
import Spaceship from '../services/spaceship';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import CamResultTemplate from '../components/templates/CamResultTemplate';

const CamResultPage: React.FC = () => {
  const location = useLocation();
  const game: ICampdGame = location.state?.game;
  const input: ICampdInput = location.state?.input;
  const token: string = location.state?.token;

  const [result, setResult] = useState<ICampdResult | undefined>(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadResult = async () => {
    const response = await Spaceship.submitCampdGame(game.id, input, token);
    if (!response.ok) throw new HttpException(response);

    setResult(response.result);
  };

  const loadData = () => {
    new Evoke(loadResult());
  };

  if (!game || !input || !token) return <Navigate to={'/campd'} />;

  return (
    <Page noStyle>
      <CamResultTemplate game={game} input={input} result={result} />
    </Page>
  );
};

export default CamResultPage;
