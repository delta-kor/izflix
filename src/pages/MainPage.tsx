import { useEffect, useState } from 'react';
import delay from '../delay';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import Spaceship from '../services/spaceship';
import MainTemplate from '../components/templates/MainTemplate';
import Page from './Page';

const MainPage: React.FC = () => {
  const [featured, setFeatured] = useState<ApiResponse.Playlist.ReadFeatured | null>(null);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [recommends, setRecommends] = useState<IVideo[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadFeatured = async () => {
    const response = await Spaceship.readFeatured('performance');
    if (!response.ok) throw new HttpException(response);

    setFeatured(response);
  };

  const loadPlaylists = async () => {
    const response = await Spaceship.readAllPlaylists('performance');
    if (!response.ok) throw new HttpException(response);

    const playlists = response.playlists;
    setPlaylists(playlists);
  };

  const loadRecommends = async () => {
    const response = await Spaceship.getUserRecommends();
    if (!response.ok) throw new HttpException(response);

    const recommends = response.videos;
    setRecommends(recommends);
  };

  const loadData = async () => {
    await delay(200);
    new Evoke(loadFeatured());
    new Evoke(loadPlaylists());
    new Evoke(loadRecommends());
  };

  return (
    <Page>
      <MainTemplate playlists={playlists} featured={featured} recommends={recommends} />
    </Page>
  );
};

export default MainPage;
