import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Meta from '../components/Meta';
import PlaylistItemTemplate from '../components/templates/PlaylistItemTemplate';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import Spaceship from '../services/spaceship';
import ErrorPage from './ErrorPage';
import Page from './Page';

const PlaylistItemPage: React.FC = () => {
  const { t } = useTranslation();
  const params = useParams();
  const id = params.id;

  const [playlist, setPlaylist] = useState<IPlaylist | undefined>(undefined);
  const [access, setAccess] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  if (!id) return <ErrorPage data={'error.not_found'} />;

  const loadPlaylist = async (id: string) => {
    const response = await Spaceship.readPlaylist(id);
    if (!response.ok) throw new HttpException(response);

    setPlaylist(response.playlist);
    setAccess(response.access);
  };

  const loadData = () => {
    new Evoke(loadPlaylist(id));
  };

  return (
    <Page>
      {playlist ? (
        <Meta
          data={{
            title: `${playlist.title} (${playlist.description}) - IZFLIX`,
            url: `https://izflix.net/playlist/${id}`,
            image: Spaceship.getThumbnail(playlist.thumbnail),
          }}
        />
      ) : (
        <Meta
          data={{
            title: `${t('playlist.playlist')} - IZFLIX`,
            url: `https://izflix.net/playlist/${id}`,
          }}
        />
      )}
      <PlaylistItemTemplate playlist={playlist} access={access} />
    </Page>
  );
};

export default PlaylistItemPage;
