import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HttpException from '../../exceptions/http-exception';
import Evoke from '../../filters/evoke';
import Spaceship from '../../services/spaceship';
import PlaylistInfoTemplate from '../templates/PlaylistInfoTemplate';
import ErrorPage from './ErrorPage';
import Page from './Page';

const PlaylistInfoPage: React.FC = () => {
  const params = useParams();
  const id = params.id;

  const [playlist, setPlaylist] = useState<IPlaylist | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  if (!id) return <ErrorPage data={'NOT_FOUND'} />;

  const loadPlaylist = async (id: string) => {
    const response = await Spaceship.readPlaylist(id);
    if (!response.ok) throw new HttpException(response);

    const playlist = response.playlist;
    setPlaylist(playlist);
  };

  const loadData = () => {
    new Evoke(loadPlaylist(id));
  };

  return (
    <Page>
      <PlaylistInfoTemplate playlist={playlist} />
    </Page>
  );
};

export default PlaylistInfoPage;
