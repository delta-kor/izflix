import { useLocation, useParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Page from './Page';

type VideoPageKey = 'playlist' | 'music' | 'category' | 'calendar';

interface VideoPageState {
  key: VideoPageKey;
  value: string;
}

const VideoPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as VideoPageState | undefined;

  const params = useParams();
  const id = params.id;

  if (!id || id.length !== 6) return <ErrorPage data={'NOT_FOUND'} />;

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
