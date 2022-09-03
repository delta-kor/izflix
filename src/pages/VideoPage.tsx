import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import VideoTemplate from '../components/templates/VideoTemplate';
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
    if (!id || id.length !== 6) return setError('error.not_found');
    panorama.view(id, state).then(res => !res.ok && setError(res.message || 'error.not_found'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) return <ErrorPage data={error} />;

  return (
    <Page noStyle>
      <VideoTemplate panorama={panorama} />
    </Page>
  );
};

export type { VideoPageState };
export default VideoPage;
