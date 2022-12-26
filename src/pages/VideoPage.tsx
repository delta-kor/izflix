import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import Meta from '../components/Meta';
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
  const { t } = useTranslation();

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
      likes_total: action!.liked ? action!.likes_total - 1 : action!.likes_total + 1,
    }));

    const response = await Spaceship.likeVideo(id);
    if (!response.ok) throw new HttpException(response);
  };

  if (error) return <ErrorPage data={error} />;
  return (
    <Page noStyle>
      {panorama.videoInfo ? (
        <Meta
          data={{
            title: `${panorama.videoInfo.title} (${panorama.videoInfo?.description}) - IZFLIX`,
            description: t('video.meta_description'),
            url: `https://izflix.net/${id}`,
            image: Spaceship.getThumbnail(id!),
          }}
        />
      ) : (
        <Meta data={{ title: 'IZFLIX' }} />
      )}
      <VideoTemplate panorama={panorama} action={action} onLike={() => new Evoke(onLike(id!))} />
    </Page>
  );
};

export type { VideoPageState };
export default VideoPage;
