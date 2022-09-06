import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import VideoTemplate from '../components/templates/VideoTemplate';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import { Panorama } from '../hooks/usePanorama';
import Spaceship from '../services/spaceship';
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
  const [action, setAction] = useState<ApiResponse.Video.Action | undefined>(undefined);

  useEffect(() => {
    if (!id || id.length !== 6) return setError('error.not_found');

    panorama.view(id, state).then(res => !res.ok && setError(res.message || 'error.not_found'));
    loadData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadData = () => {
    new Evoke(loadAction(id!));
  };

  const loadAction = async (id: string) => {
    const response = await Spaceship.getVideoAction(id);
    if (!response.ok) throw new HttpException(response);

    setAction(response);
  };

  const onLike = async (id: string) => {
    if (!action) return false;

    setAction(action => ({
      ...action!,
      liked: !action!.liked,
      likes_total: action!.likes_total + (action!.liked ? -1 : 1),
    }));

    const response = await Spaceship.likeVideo(id);
    if (!response.ok) throw new HttpException(response);

    setAction(action => ({ ...action!, liked: response.liked, likes_total: response.total }));
  };

  if (error) return <ErrorPage data={error} />;
  return (
    <Page noStyle>
      <VideoTemplate panorama={panorama} action={action} onLike={() => new Evoke(onLike(id!))} />
    </Page>
  );
};

export type { VideoPageState };
export default VideoPage;
