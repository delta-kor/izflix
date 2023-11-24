import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import useModal from '../../hooks/useModal';
import { Panorama } from '../../hooks/usePanorama';
import { LightLikeRiv } from '../../services/rive';
import Tracker from '../../services/tracker';
import Transmitter from '../../services/transmitter';
import {
  Color,
  MobileQuery,
  MobileSideMargin,
  PcQuery,
  Text,
  VideoPageAdditionalMargin,
} from '../../styles';
import SmoothBox from '../atoms/SmoothBox';
import VerticalButton from '../atoms/VerticalButton';

const Layout = styled.div`
  display: flex;
  justify-content: space-evenly;

  ${MobileQuery} {
    margin: 16px ${MobileSideMargin + VideoPageAdditionalMargin}px 0
      ${MobileSideMargin + VideoPageAdditionalMargin}px;
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

const LikeButton = styled(SmoothBox)`
  & > .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
    gap: 10px;

    cursor: pointer;
    user-select: none;
  }
`;

const LikeIcon = styled.div`
  position: relative;

  ${MobileQuery} {
    width: 20px;
    height: 20px;
  }

  ${PcQuery} {
    width: 24px;
    height: 24px;
  }
`;

const LikeButtonContent = styled.div`
  ${MobileQuery} {
    ${Text.SUBTITLE_2};
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
  }
`;

interface Props {
  action?: ApiResponse.Video.Action;
  panorama: Panorama;
  onLike(): void;
}

const VideoAction: React.FC<Props> = ({ action, panorama, onLike }) => {
  const { t } = useTranslation();

  const device = useDevice();
  const modal = useModal();

  useEffect(() => {
    if (!action || !likeInput) return;
    likeInput.value = action.liked;
  }, [action?.liked]);

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

  const { RiveComponent, rive } = useRive({
    src: LightLikeRiv,
    autoplay: true,
    stateMachines: 'Like',
  });

  const likeInput = useStateMachineInput(rive, 'Like', 'Pressed', false);
  const likeIconSize = device === 'mobile' ? 60 : 70;

  return (
    <Layout>
      <WidthProtector>
        <LikeButton onClick={onLike} hover={1.05} tap={0.95}>
          <LikeIcon>
            <RiveComponent
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: likeIconSize,
                height: likeIconSize,
              }}
            />
          </LikeIcon>
          <LikeButtonContent>{likesTotal || t('video.like')}</LikeButtonContent>
        </LikeButton>
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
