import { useEffect, useState } from 'react';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import Spaceship from '../services/spaceship';
import MusicTemplate from '../components/templates/MusicTemplate';
import Page from './Page';

const MusicPage: React.FC = () => {
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
      <MusicTemplate albums={albums} />
    </Page>
  );
};

export default MusicPage;
