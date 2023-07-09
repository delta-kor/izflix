import { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import CamGameListTemplate from '../components/templates/CamGameListTemplate';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import Spaceship from '../services/spaceship';
import Page from './Page';

const CamMainPage: React.FC = () => {
  const [games, setGames] = useState<ICampdGame[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadGames = async () => {
    const response = await Spaceship.getCampdGames();
    if (!response.ok) throw new HttpException(response);

    const games = response.games;
    setGames(games);
  };

  const loadData = async () => {
    new Evoke(loadGames());
  };

  return (
    <Page>
      <Meta data={{ title: `CAM PD - IZFLIX`, url: 'https://izflix.net/campd' }} />
      <CamGameListTemplate games={games} />
    </Page>
  );
};

export default CamMainPage;
