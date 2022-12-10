import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MusicItemTemplate from '../components/templates/MusicItemTemplate';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import delay from '../services/delay';
import Spaceship from '../services/spaceship';
import ErrorPage from './ErrorPage';
import Page from './Page';

interface MusicItemPageState {
  selected: string;
}

const MusicItemPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as MusicItemPageState | undefined;

  const params = useParams();
  const id = params.id;

  const [musics, setMusics] = useState<IMusic[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  if (!id) return <ErrorPage data={'error.not_found'} />;

  const loadAlbum = async (id: string) => {
    const response = await Spaceship.getOneAlbum(id);
    if (!response.ok) throw new HttpException(response);

    const musics = response.musics;
    setMusics(musics);
  };

  const loadData = async () => {
    await delay(200);
    new Evoke(loadAlbum(id));
  };

  return (
    <Page>
      <MusicItemTemplate musics={musics} selected={state?.selected} />
    </Page>
  );
};

export default MusicItemPage;
