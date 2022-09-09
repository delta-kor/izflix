import { useEffect, useState } from 'react';
import PlaylistTemplate from '../components/templates/PlaylistTemplate';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import Spaceship from '../services/spaceship';
import Page from './Page';

const PlaylistPage: React.FC = () => {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadPlaylists = async () => {
    const response = await Spaceship.readAllPlaylists('performance');
    if (!response.ok) throw new HttpException(response);

    const playlists = response.playlists;
    setPlaylists(playlists);
  };

  const loadData = () => {
    new Evoke(loadPlaylists());
  };

  return (
    <Page>
      <PlaylistTemplate playlists={playlists} />
    </Page>
  );
};

export default PlaylistPage;
