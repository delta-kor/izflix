import { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import VodTemplate from '../components/templates/VodTemplate';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import useModal from '../hooks/useModal';
import Spaceship from '../services/spaceship';
import Page from './Page';

const VodPage: React.FC = () => {
  const modal = useModal();

  const [featured, setFeatured] = useState<ApiResponse.Playlist.ReadFeatured | null>(null);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  useEffect(() => {
    loadData();
  }, []);

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
    new Evoke(loadFeatured());
    new Evoke(loadPlaylists());
  };

  return (
    <Page>
      <Meta data={{ title: `VOD - IZFLIX`, url: 'https://izflix.net/vod' }} />
      <VodTemplate featured={featured} playlists={playlists} />
    </Page>
  );
};

export default VodPage;
