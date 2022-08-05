import { useEffect, useState } from 'react';
import delay from '../../delay';
import HttpException from '../../exceptions/http-exception';
import Evoke from '../../filters/evoke';
import Spaceship from '../../services/spaceship';
import MainTemplate from '../templates/MainTemplate';
import Page from './Page';

interface State {
  featured: ApiResponse.Playlist.ReadFeatured | null;
  playlists: IPlaylist[];
  recommends: IVideo[];
}

const MainPage: React.FC = () => {
  const [featured, setFeatured] = useState<ApiResponse.Playlist.ReadFeatured | null>(null);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [recommends, setRecommends] = useState<IVideo[]>([]);

  const loadPlaylists = async () => {
    const response = await Spaceship.readAllPlaylists('performance');
    if (!response.ok) throw new HttpException(response);

    const playlists = response.playlists;
    setPlaylists(playlists);
  };

  const loadFeatured = async () => {
    const response = await Spaceship.readFeatured('performance');
    if (!response.ok) throw new HttpException(response);

    setFeatured(response);
  };

  const loadRecommends = async () => {
    const response = await Spaceship.getUserRecommends();
    if (!response.ok) throw new HttpException(response);

    const recommends = response.videos;
    setRecommends(recommends);
  };

  const loadData = async () => {
    await delay(200);
    Evoke(loadPlaylists, loadFeatured, loadRecommends);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Page>
      <MainTemplate playlists={playlists} featured={featured} recommends={recommends} />
    </Page>
  );
};

export default MainPage;
