import { useEffect, useState } from 'react';
import delay from '../../delay';
import HttpException from '../../exceptions/http-exception';
import Evoke from '../../filters/evoke';
import Spaceship from '../../services/spaceship';
import VodTemplate from '../templates/VodTemplate';
import Page from './Page';

const VodPage: React.FC = () => {
  const [featured, setFeatured] = useState<ApiResponse.Playlist.ReadFeatured | null>(null);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  const loadFeatured = async () => {
    const response = await Spaceship.readFeatured('vod');
    if (!response.ok) throw new HttpException(response);

    setFeatured(response);
  };

  const loadPlaylists = async () => {
    const response = await Spaceship.readAllPlaylists('vod');
    if (!response.ok) throw new HttpException(response);

    const playlists = response.playlists;
    setPlaylists(playlists);
  };

  const loadData = async () => {
    await delay(200);
    new Evoke(loadFeatured);
    new Evoke(loadPlaylists);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Page>
      <VodTemplate featured={featured} playlists={playlists} />
    </Page>
  );
};

export default VodPage;
