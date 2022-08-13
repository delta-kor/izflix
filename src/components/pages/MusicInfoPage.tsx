import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HttpException from '../../exceptions/http-exception';
import Evoke from '../../filters/evoke';
import Spaceship from '../../services/spaceship';
import MusicInfoTemplate from '../templates/MusicInfoTemplate';
import ErrorPage from './ErrorPage';
import Page from './Page';

const MusicInfoPage: React.FC = () => {
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

  const loadData = () => {
    new Evoke(loadAlbum());
  };

  return (
    <Page>
      <MusicInfoTemplate musics={musics} />
    </Page>
  );
};

export default MusicInfoPage;
