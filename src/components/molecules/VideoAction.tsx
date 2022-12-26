import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import { Panorama } from '../../hooks/usePanorama';
import Tracker from '../../services/tracker';
import Transmitter from '../../services/transmitter';
import { Color, MobileQuery, PcQuery } from '../../styles';
import VerticalButton from '../atoms/VerticalButton';

const Layout = styled.div`
  display: flex;
  justify-content: space-evenly;

  ${MobileQuery} {
    margin: 16px 16px 0 16px;
    background: ${Color.DARK_GRAY};
    border-radius: 8px;
  }

  ${PcQuery} {
    margin: 24px 0;
    padding: 8px 0;
  }
`;

const WidthProtector = styled.div`
  display: flex;
  justify-content: center;

  min-width: 76px;
  margin: 0 -7px;
`;

interface Props {
  action?: ApiResponse.Video.Action;
  panorama: Panorama;
  onLike(): void;
}

const VideoAction: React.FC<Props> = ({ action, panorama, onLike }) => {
  const { t } = useTranslation();

  const modal = useModal();

  const liked = action?.liked;
  const likesTotal = action?.likes_total;

  const handleShareClick = () => {
    if (!panorama.videoInfo) return;
    panorama.currentVideoId && Tracker.send('video_share', { video_id: panorama.currentVideoId });

    const url = `https://izflix.net/${panorama.videoInfo.id}`;

    if (navigator.share) {
      navigator.share({
        title: `IZFLIX - ${panorama.videoInfo.title} (${panorama.videoInfo.description})`,
        url,
      });
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => Transmitter.emit('popup', { type: 'success', message: t('video.url_copied') }))
        .catch(() =>
          Transmitter.emit('popup', { type: 'error', message: t('video.url_copy_failed') })
        );
    }
  };

  const handleDownloadClick = () => {
    if (!panorama.streamInfo) return;
    panorama.currentVideoId &&
      Tracker.send('video_download', { video_id: panorama.currentVideoId });
    window.open(panorama.streamInfo.url, '_blank', 'noopener,noreferrer');
  };

  const handleAddClick = () => {
    if (!panorama.currentVideoId) return;
    panorama.currentVideoId && Tracker.send('video_add', { video_id: panorama.currentVideoId });
    modal({ type: 'playlist', videoId: panorama.currentVideoId });
  };

  return (
    <Layout>
      <WidthProtector>
        <VerticalButton
          icon={liked ? 'heart_filled' : 'heart_border'}
          color={Color.TRANSPARENT}
          onClick={onLike}
        >
          {likesTotal || t('video.like')}
        </VerticalButton>
      </WidthProtector>
      <VerticalButton icon={'share'} color={Color.TRANSPARENT} onClick={handleShareClick}>
        {t('video.share')}
      </VerticalButton>
      <VerticalButton icon={'download'} color={Color.TRANSPARENT} onClick={handleDownloadClick}>
        {t('video.save')}
      </VerticalButton>
      <VerticalButton icon={'add'} color={Color.TRANSPARENT} onClick={handleAddClick}>
        {t('video.add')}
      </VerticalButton>
    </Layout>
  );
};

export default VideoAction;
