import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import delay from '../../delay';
import HttpException from '../../exceptions/http-exception';
import Evoke from '../../filters/evoke';
import Spaceship from '../../services/spaceship';
import MusicItemTemplate from '../templates/MusicItemTemplate';
import ErrorPage from './ErrorPage';
import Page from './Page';

const MusicItemPage: React.FC = () => {
  const params = useParams();
  const id = params.id;

  const [musics, setMusics] = useState<IMusic[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  if (!id) return <ErrorPage data={'NOT_FOUND'} />;

  const loadAlbum = async () => {
    const response = await Spaceship.getOneAlbum(id);
    if (!response.ok) throw new HttpException(response);

    const musics = response.musics;
    setMusics(musics);
  };

  const loadData = async () => {
    await delay(200);
    new Evoke(loadAlbum());
  };

  return (
    <Page>
      <MusicItemTemplate musics={musics} />
    </Page>
  );
};

export default MusicItemPage;
