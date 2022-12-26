import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Meta from '../components/Meta';
import MusicTemplate from '../components/templates/MusicTemplate';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import Spaceship from '../services/spaceship';
import Page from './Page';

const MusicPage: React.FC = () => {
  const { t } = useTranslation();

  const [albums, setAlbums] = useState<IAlbum[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadAlbums = async () => {
    const response = await Spaceship.getAllAlbums();
    if (!response.ok) throw new HttpException(response);

    const albums = response.albums;
    setAlbums(albums);
  };

  const loadData = async () => {
    new Evoke(loadAlbums());
  };

  return (
    <Page>
      <Meta data={{ title: `${t('music.music')} - IZFLIX`, url: 'https://izflix.net/music' }} />
      <MusicTemplate albums={albums} />
    </Page>
  );
};

export default MusicPage;
