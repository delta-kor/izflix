import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Panorama } from '../hooks/usePanorama';
import ErrorPage from './ErrorPage';
import Page from './Page';

type VideoPageKey = 'playlist' | 'music' | 'category' | 'calendar';

interface Props {
  panorama: Panorama;
}

interface VideoPageState {
  key: VideoPageKey;
  value: string;
}

const VideoPage: React.FC<Props> = ({ panorama }) => {
  const location = useLocation();
  const state = location.state as VideoPageState | undefined;

  const params = useParams();
  const id = params.id;

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || id.length !== 6) return setError('NOT_FOUND');

    panorama.view(id).then(res => !res.ok && setError(res.message || 'NOT_FOUND'));
  }, []);

  if(error) {
    return <ErrorPage data={error} />;
  }

  return (
    <Page>
      Video Page
      <br />
      ID : {id}
      <br />
      {state && state.key} / {state && state.value}
    </Page>
  );
};

export type { VideoPageState };
export default VideoPage;
