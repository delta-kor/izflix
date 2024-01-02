import { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import MainTemplate from '../components/templates/MainTemplate';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import Spaceship from '../services/spaceship';
import Page from './Page';

const MainPage: React.FC = () => {
  const [featured, setFeatured] = useState<ApiResponse.Playlist.ReadFeatured | null>(null);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [recommends, setRecommends] = useState<IVideo[]>([]);
  const [vodPlaylists, setVodPlaylists] = useState<IPlaylist[]>([]);

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

  const loadVodPlaylists = async () => {
    const response = await Spaceship.readAllPlaylists('vod');
    if (!response.ok) throw new HttpException(response);

    const playlists = response.playlists;
    setVodPlaylists(playlists);
  };

  const loadData = async () => {
    new Evoke(loadFeatured());
    new Evoke(loadPlaylists());
    new Evoke(loadVodPlaylists());
    new Evoke(loadRecommends());
  };

  return (
    <Page>
      <Meta data={{ title: `IZFLIX`, url: 'https://izflix.net/' }} />
      <MainTemplate
        playlists={playlists}
        vodPlaylists={vodPlaylists}
        featured={featured}
        recommends={recommends}
      />
    </Page>
  );
};

export default MainPage;
