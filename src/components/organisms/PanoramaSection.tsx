import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { t } from 'i18next';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useFullscreen } from 'rooks';
import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import { Panorama, PanoramaState } from '../../hooks/usePanorama';
import Icon from '../../icons/Icon';
import Settings from '../../services/settings';
import Spaceship from '../../services/spaceship';
import { getDuration } from '../../services/time';
import { Color, HideOverflow, MobileQuery, PcInnerPadding, PcQuery, Text } from '../../styles';
import Loader from '../atoms/Loader';
import SmoothBox from '../atoms/SmoothBox';
import SmoothImage from '../atoms/SmoothImage';

const RenderArea = styled(motion.div)<{ $state: PanoramaState }>`
  background: ${Color.DARK_GRAY}EA;
  z-index: 50;
  cursor: ${({ $state }) => ($state === PanoramaState.BACKGROUND ? 'pointer' : 'unset')};

  ${MobileQuery} {
    position: fixed;
    transform: translateZ(0);

    ${({ $state }) =>
      $state === PanoramaState.ACTIVE
        ? `
        top: 0;
        left: 0;
        width: 100%;
        aspect-ratio: 16 / 9;
        `
        : `
        display: flex;
        left: 16px;
        right: 16px;
        bottom: 85px;
        height: 72px;
        border-radius: 8px;
        overflow: hidden;
        `}
  }

  ${PcQuery} {
    ${({ $state }) =>
      $state === PanoramaState.ACTIVE
        ? `
        position: absolute;
        top: 48px;
        left: ${PcInnerPadding};
        width: calc((100vw - ${PcInnerPadding} * 2) - min(30vw, 300px) - 32px);
        aspect-ratio: 16 / 9;
        `
        : `
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 340px;
        min-height: 20px;
        border-radius: 8px;
        overflow: hidden;
        `}
  }
`;

const Video = styled(motion.video)<{ $active: boolean; $screenAdjust: string }>`
  display: block;
  position: absolute;
  object-fit: ${({ $screenAdjust }) => ($screenAdjust === 'top' ? 'cover' : 'contain')};
  z-index: 0;
  width: 100%;
  height: 100%;

  &::-internal-media-controls-overlay-cast-button {
    display: none;
  }

  &::cue {
    font-family: Arial, Helvetica, sans-serif;
    background: #000000aa;

    ${MobileQuery} {
      font-size: 16px;
    }

    ${PcQuery} {
      font-size: 32px;
    }
  }
`;

const VideoArea = styled(motion.div)<{ $state: PanoramaState }>`
  position: relative;
  flex-shrink: 0;
  touch-action: none;

  ${MobileQuery} {
    height: 100%;
    width: ${({ $state }) => ($state === PanoramaState.ACTIVE ? '100%' : '30vw')};
  }

  ${PcQuery} {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
`;

const ContentArea = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  align-items: center;
  min-width: 0;

  ${MobileQuery} {
    padding: 0 16px;
  }

  ${PcQuery} {
    padding: 16px 20px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 4px;
  min-width: 0;
  user-select: none;
`;

const Title = styled.div`
  width: 100%;
  color: ${Color.WHITE};
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_1};
  }

  ${PcQuery} {
    ${Text.EX_SUBTITLE_1};
  }
`;

const Description = styled.div`
  width: 100%;
  color: ${Color.WHITE};
  opacity: 0.7;
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_2};
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
  }
`;

const Icons = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 10px;
`;

const IconWrapper = styled(SmoothBox)`
  width: 26px;
  height: 26px;
  padding: 3px;
  cursor: pointer;
`;

const MenuIcon = styled(Icon)`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
`;

const VideoControls = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${Color.BACKGROUND}84;
  z-index: 1;
`;

const ProgressBar = styled.div<{ $active: boolean }>`
  position: absolute;
  bottom: -2px;
  width: 100%;
  height: ${({ $active }) => ($active ? '12px' : '2px')};
  background: ${Color.GRAY};
  transition: height 0.2s;
  z-index: 2;
  cursor: pointer;
`;

const ProgressAmount = styled.div`
  height: 100%;
  background: ${Color.PRIMARY};
`;

const PlayButton = styled(SmoothBox)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 1;

  & > .content {
    background: ${Color.WHITE};
    border-radius: 100%;
    cursor: pointer;

    ${MobileQuery} {
      width: 56px;
      height: 56px;
    }

    ${PcQuery} {
      width: 66px;
      height: 66px;
    }
  }
`;

const PlayIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${MobileQuery} {
    width: 20px;
    height: 20px;
  }

  ${PcQuery} {
    width: 26px;
    height: 26px;
  }
`;

const NextVideoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  ${MobileQuery} {
    margin: 0 auto;
    max-width: calc(min(100vw - 32px, 70vw));
  }

  ${PcQuery} {
    width: 30%;
  }
`;

const NextVideo = styled(SmoothBox)`
  width: 100%;

  & > .content {
    display: flex;
    align-items: center;

    cursor: pointer;
    user-select: none;
    z-index: 2;

    ${MobileQuery} {
      gap: 10px;
    }

    ${PcQuery} {
      flex-direction: column;
      gap: 12px;
    }
  }
`;

const NextVideoThumbnail = styled(SmoothImage)`
  flex-shrink: 0;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;

  ${MobileQuery} {
    width: 30vw;
    max-width: 220px;
  }
`;

const NextVideoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  min-width: 0;
`;

const NextVideoTitle = styled.div`
  width: 100%;
  color: ${Color.WHITE};
  ${Text.HEADLINE_3};
  ${HideOverflow};

  ${PcQuery} {
    text-align: center;
  }
`;

const NextVideoDescription = styled.div`
  width: 100%;
  color: ${Color.WHITE};
  opacity: 0.7;
  ${Text.SUBTITLE_1};
  ${HideOverflow};

  ${PcQuery} {
    text-align: center;
  }
`;

const NextVideoProgress = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  background: ${Color.DARK_GRAY};
  border-radius: 4px;
  overflow: hidden;
`;

const NextVideoProgressIndicator = styled.div<{ $length: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: ${Color.WHITE};
  border-radius: 4px;
  animation: countdown ${({ $length }) => $length}s forwards ease-in-out;

  @keyframes countdown {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

const NextVideoCancel = styled(SmoothBox)`
  & > .content {
    color: ${Color.WHITE};
    ${Text.SUBTITLE_2};

    cursor: pointer;
    user-select: none;
  }
`;

const Time = styled.div`
  display: flex;
  position: absolute;
  align-items: flex-end;
  transform: skew(0.1deg);
  user-select: none;

  ${MobileQuery} {
    gap: 4px;
    bottom: 24px;
    left: 16px;
  }

  ${PcQuery} {
    gap: 6px;
    bottom: 28px;
    left: 20px;
  }

  & > div {
    color: ${Color.WHITE};
  }

  & > div:nth-child(1) {
    font-weight: 700;

    ${MobileQuery} {
      font-size: 16px;
    }

    ${PcQuery} {
      font-size: 22px;
    }
  }

  & > div:nth-child(2),
  & > div:nth-child(3) {
    font-weight: 400;
    opacity: 0.7;

    ${MobileQuery} {
      font-size: 12px;
    }

    ${PcQuery} {
      font-size: 18px;
    }
  }
`;

const BottomRight = styled.div`
  display: flex;
  align-items: stretch;
  gap: 8px;
  position: absolute;

  ${MobileQuery} {
    bottom: 20px;
    right: 12px;
  }

  ${PcQuery} {
    bottom: 24px;
    right: 16px;
  }
`;

const BottomRightButton = styled(SmoothBox)`
  cursor: pointer;

  & > .content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
  }
`;

const ControlIcon = styled(Icon)`
  ${MobileQuery} {
    width: 20px;
    height: 20px;
  }

  ${PcQuery} {
    width: 24px;
    height: 24px;
  }
`;

const VideoLoader = styled(Loader)<{ $active: boolean }>`
  position: absolute;

  z-index: 1;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.5s ease;

  ${MobileQuery} {
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    width: 30px;
    height: 30px;
  }

  ${PcQuery} {
    top: calc(50% - 24px);
    left: calc(50% - 24px);
    width: 48px;
    height: 48px;
  }
`;

const BackButton = styled(SmoothBox)`
  position: absolute;
  cursor: pointer;

  ${MobileQuery} {
    top: 20px;
    left: 12px;
  }

  ${PcQuery} {
    top: 24px;
    left: 16px;
  }

  & > .content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
  }
`;

const QualityWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Quality = styled(SmoothBox)`
  ${PcQuery} {
    margin: 0 4px 0 0;
  }

  & > .content {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 100%;

    cursor: pointer;
    user-select: none;
  }
`;

const QualityDropdownIcon = styled(Icon)`
  ${MobileQuery} {
    width: 14px;
    height: 14px;
  }

  ${PcQuery} {
    width: 16px;
    height: 16px;
  }
`;

const QualityText = styled.div`
  font-weight: 700;
  color: ${Color.WHITE};
  transform: skew(0.1deg);

  ${MobileQuery} {
    font-size: 14px;
  }

  ${PcQuery} {
    font-size: 16px;
  }
`;

const QualityItems = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
  gap: 4px;
  bottom: 36px;
  right: 0;

  background: rgba(22, 26, 54, 0.5);
  backdrop-filter: blur(4px);
  border: 2px solid ${Color.GRAY};
  border-radius: 8px;

  ${MobileQuery} {
    padding: 10px 14px;
    max-height: calc(100vw * (9 / 16) - 32px - 28px - 20px);
    overflow-y: scroll;
  }

  ${PcQuery} {
    padding: 8px 14px;
  }
`;

const QualityItem = styled(SmoothBox)<{ $active: boolean }>`
  & > .content {
    text-align: center;
    font-weight: 700;
    color: ${Color.WHITE};
    opacity: ${({ $active }) => ($active ? 1 : 0.5)};

    transform: skew(0.1deg);
    cursor: pointer;
    user-select: none;

    ${MobileQuery} {
      padding: 4px 2px;
      font-size: 14px;
    }

    ${PcQuery} {
      padding: 4px 2px;
      font-size: 16px;
    }
  }
`;

interface Props {
  panorama: Panorama;
}

let controlsTimeout: any = null;
let nextVideoTimeout: any = null;

const PanoramaSection: React.FC<Props> = ({ panorama }) => {
  const navigate = useNavigate();
  const device = useDevice();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isControlsActive, setIsControlsActive] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [screenAdjust, setScreenAdjust] = useState<string>(Settings.getOne('VIDEO_SCREEN_ADJUST'));
  const [isQualityActive, setIsQualityActive] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoAreaRef = useRef<HTMLDivElement>(null);
  const { isFullscreenEnabled, enableFullscreen, disableFullscreen } = useFullscreen({
    target: videoAreaRef,
  });
  const isFullScreenRef = useRef<boolean>(false);
  const panoramaRef = useRef<Panorama>(panorama);
  const panoramaStateRef = useRef<PanoramaState>(PanoramaState.NONE);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('mousemove', handleMouseEvent);
    document.addEventListener('mousedown', handleMouseDownEvent);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('mousemove', handleMouseEvent);
      document.removeEventListener('mousedown', handleMouseDownEvent);
      clearTimeout(nextVideoTimeout);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsPlaying(!video.paused);
  }, [videoRef.current]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !panorama.nextVideo) return;

    setIsEnded(video.ended);
    clearTimeout(nextVideoTimeout);

    if (video.ended) {
      if (panorama.state === PanoramaState.ACTIVE) {
        nextVideoTimeout = setTimeout(
          handleNextVideo,
          isPip() ? 0 : Settings.getOne('VIDEO_NEXT_COUNTDOWN') * 1000
        );
      } else handleNextVideo();
    }
  }, [videoRef.current?.ended]);

  useEffect(() => {
    if (!isEnded) clearTimeout(nextVideoTimeout);
  }, [isEnded]);

  useEffect(() => {
    !isPip() && pause();
    setPlayed(0);
    setDuration(0);
    setVideoLoaded(false);
    setIsEnded(false);
    clearTimeout(nextVideoTimeout);
  }, [panorama.currentVideoId]);

  useEffect(() => {
    isFullScreenRef.current = isFullscreenEnabled;

    if (!isFullscreenEnabled && document.body.style.cursor === 'none') {
      document.body.style.cursor = 'unset';
    }

    try {
      if (isFullscreenEnabled) window.screen.orientation.lock('landscape');
      else window.screen.orientation.unlock();
    } catch (e) {}
  }, [isFullscreenEnabled]);

  useEffect(() => {
    panoramaRef.current = panorama;
  }, [panorama]);

  useEffect(() => {
    panoramaStateRef.current = panorama.state;
    if (panorama.state !== PanoramaState.ACTIVE) exitPip();
  }, [panorama.state]);

  useEffect(() => {
    Settings.setOne('VIDEO_SCREEN_ADJUST', screenAdjust);
  }, [screenAdjust]);

  useEffect(() => {
    updateMediaSession();
  }, [panorama.videoInfo, videoRef.current]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleMouseEvent = (e: MouseEvent) => {
    if (!videoRef.current || panoramaStateRef.current !== PanoramaState.ACTIVE) return false;

    if (isFullScreenRef.current) {
      handleTouchStart();
      return true;
    }

    const video = videoRef.current;

    if (video.seeking) return setIsControlsActive(true);

    const boundingRect = video.getBoundingClientRect();
    const isOnTarget =
      boundingRect.left <= e.clientX &&
      e.clientX <= boundingRect.right &&
      boundingRect.top <= e.clientY &&
      e.clientY <= boundingRect.bottom + 2;

    setIsControlsActive(isOnTarget);
  };

  const handleMouseDownEvent = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.quality-clickbox')) return;
    setIsQualityActive(false);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return false;
    const video = videoRef.current;

    setPlayed(video.currentTime || 0);
    setDuration(video.duration || 0);

    if ('mediaSession' in navigator) {
      navigator.mediaSession.setPositionState({
        duration: video.duration || 0,
        playbackRate: video.playbackRate,
        position: video.currentTime || 0,
      });
    }
  };

  const handleTouchStart = () => {
    if (panoramaStateRef.current !== PanoramaState.ACTIVE) return false;
    document.body.style.cursor = 'unset';

    clearTimeout(controlsTimeout);
    controlsTimeout = null;

    setIsControlsActive(true);
    controlsTimeout = setTimeout(
      () => {
        setIsControlsActive(false);
        if (isFullScreenRef.current) {
          document.body.style.cursor = 'none';
        }
        controlsTimeout = null;
      },
      device === 'pc' ? 1000 : 3000
    );
  };

  const handlePan = (e: MouseEvent, info: PanInfo) => {
    if (!videoRef.current || panoramaStateRef.current !== PanoramaState.ACTIVE) return false;

    e.preventDefault();
    window.getSelection()?.removeAllRanges();

    const video = videoRef.current;
    const boundingRect = video.getBoundingClientRect();

    const firstY = info.point.y - info.offset.y;
    if (Math.abs(firstY - boundingRect.bottom) > 50) return false;

    const percentage = Math.max(
      Math.min((info.point.x - boundingRect.left) / boundingRect.width, 1),
      0
    );

    video.currentTime = percentage * (video.duration || 0);
    setPlayed(video.currentTime || 0);
    setDuration(video.duration || 0);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!videoRef.current || panoramaStateRef.current !== PanoramaState.ACTIVE) return false;

    const video = videoRef.current;

    if (e.key === ' ') {
      e.preventDefault();
      if (video.paused) video.play();
      else video.pause();
    }
    if (e.key === 'ArrowLeft') {
      seekBackward();
    }
    if (e.key === 'ArrowRight' && !video.ended) {
      seekForward();
    }
  };

  const handleProgressBarClick: MouseEventHandler = e => {
    if (!videoRef.current || panoramaStateRef.current !== PanoramaState.ACTIVE) return false;

    const video = videoRef.current;
    const boundingRect = video.getBoundingClientRect();
    const percentage = Math.max(
      Math.min((e.clientX - boundingRect.left) / boundingRect.width, 1),
      0
    );

    video.currentTime = percentage * (video.duration || 0);
    setPlayed(video.currentTime || 0);
    setDuration(video.duration || 0);
  };

  const handleFullscreenClick = () => {
    if (
      !videoAreaRef.current ||
      !videoRef.current ||
      panoramaStateRef.current !== PanoramaState.ACTIVE
    )
      return false;

    if (isFullscreenEnabled) {
      disableFullscreen();
    } else {
      handleTouchStart();

      // @ts-ignore
      if (videoRef.current.webkitEnterFullscreen && !videoRef.current.requestFullscreen)
        // @ts-ignore
        videoRef.current.webkitEnterFullscreen();
      else {
        enableFullscreen();
        document.exitPictureInPicture();
      }
    }
  };

  const handleOnCanPlay = () => {
    if (!videoRef.current) return false;

    const video = videoRef.current;

    setVideoLoaded(true);
    setPlayed(video.currentTime || 0);
    setDuration(video.duration || 0);

    Settings.getOne('VIDEO_AUTOPLAY') && video.play();
  };

  const handleOnLoad = () => {
    if (!videoRef.current) return false;

    setVideoLoaded(false);
  };

  const handleBackClick = () => {
    if (isFullScreenRef.current) disableFullscreen();
    navigate(-1);
  };

  const handleScreenAdjust = () => {
    setScreenAdjust(screenAdjust => (screenAdjust === 'left' ? 'top' : 'left'));
  };

  const handlePipClick = () => {
    if (!videoRef.current) return false;

    const video = videoRef.current;

    if (isPip()) {
      exitPip();
    } else {
      video.requestPictureInPicture();
    }
  };

  const handleSubtitleClick = () => {
    if (!videoRef.current) return false;
    const video = videoRef.current;

    if (!video.textTracks[0]) return false;
    if (video.textTracks[0].mode === 'showing') {
      video.textTracks[0].mode = 'hidden';
    } else {
      video.textTracks[0].mode = 'showing';
    }
  };

  const handleQualityClick = () => {
    setIsQualityActive(isQualityActive => !isQualityActive);
  };

  const handleQualityItemClick = (quality: number) => {
    panorama.setQuality(quality);
    setIsQualityActive(false);
  };

  const handleNextVideo = () => {
    const panorama = panoramaRef.current;
    if (!panorama.nextVideo) return;

    if (panorama.state !== PanoramaState.ACTIVE)
      return panorama.view(panorama.nextVideo.id, panorama.currentVideoState);

    const nextVideoId = panorama.nextVideo.id;
    const state = panorama.currentVideoState;
    navigate(`/${nextVideoId}`, { state });
  };

  const play = () => {
    videoRef.current?.play();
  };

  const pause = () => {
    videoRef.current?.pause();
  };

  const seekForward = () => {
    if (!videoRef.current) return false;
    const video = videoRef.current;

    video.currentTime = Math.min(video.currentTime + 5, video.duration - 0.1);
    setPlayed(video.currentTime || 0);
  };

  const seekBackward = () => {
    if (!videoRef.current) return false;
    const video = videoRef.current;

    video.currentTime = Math.max(video.currentTime - 5, 0);
    setPlayed(video.currentTime || 0);
  };

  const isPip = () => {
    if (!videoRef.current) return false;
    return document.pictureInPictureElement === videoRef.current;
  };

  const exitPip = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    if (document.pictureInPictureElement === video) {
      document.exitPictureInPicture();
    }
  };

  const updateMediaSession = () => {
    if (!('mediaSession' in navigator)) return false;

    const video = videoRef.current;
    if (!video) return false;
    if (!panorama.videoInfo) return false;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: panorama.videoInfo.title,
      artist: panorama.videoInfo.description,
      album: 'IZFLIX',
      artwork: [
        { src: Spaceship.getThumbnail(panorama.videoInfo.id), sizes: '720x406', type: 'image/png' },
      ],
    });

    navigator.mediaSession.setActionHandler('play', play);
    navigator.mediaSession.setActionHandler('pause', pause);
    navigator.mediaSession.setActionHandler('nexttrack', handleNextVideo);
    navigator.mediaSession.setActionHandler('previoustrack', handleBackClick);
    navigator.mediaSession.setActionHandler('seekto', e => {
      if (typeof e.seekTime !== 'number') return false;

      const video = videoRef.current;
      if (!video) return false;

      video.currentTime = e.seekTime;
      setPlayed(video.currentTime || 0);
    });
  };

  if (panorama.state === PanoramaState.NONE) return null;

  const VideoItem = (
    <Video
      $active={panorama.state === PanoramaState.ACTIVE}
      $screenAdjust={screenAdjust}
      initial={'hide'}
      variants={{ hide: { opacity: 0 }, show: { opacity: 1 } }}
      animate={videoLoaded ? 'show' : 'hide'}
      transition={{ duration: 0.5 }}
      src={panorama.streamInfo?.url}
      ref={videoRef}
      onPlay={handlePlay}
      onPause={handlePause}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchStart}
      onTimeUpdate={handleTimeUpdate}
      onCanPlay={handleOnCanPlay}
      onLoadStart={handleOnLoad}
      disableRemotePlayback
      playsInline
    ></Video>
  );

  const synthedControlsActive =
    isQualityActive || ((isControlsActive || !isPlaying) && videoLoaded);

  const Component = (
    <RenderArea
      $state={panorama.state}
      onClick={() =>
        panorama.state === PanoramaState.BACKGROUND &&
        navigate(`/${panorama.currentVideoId}`, { state: panorama.currentVideoState })
      }
    >
      <VideoArea
        $state={panorama.state}
        onPan={handlePan}
        onPanEnd={() => controlsTimeout !== null && setIsControlsActive(false)}
        ref={videoAreaRef}
      >
        {VideoItem}
        <VideoLoader $active={!videoLoaded} color={Color.BACKGROUND} />
        <AnimatePresence>
          {panorama.state === PanoramaState.ACTIVE && synthedControlsActive && (
            <VideoControls
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              key={'controls'}
            >
              {!isEnded && (
                <PlayButton
                  hover={1.1}
                  tap={0.9}
                  onClick={() => {
                    handleTouchStart();
                    isPlaying ? pause() : play();
                  }}
                >
                  <PlayIcon type={isPlaying ? 'pause' : 'play'} color={Color.DARK_GRAY} />
                </PlayButton>
              )}
              {isEnded && panorama.nextVideo && !isPip() && (
                <NextVideoWrapper>
                  <NextVideo hover={1.05} tap={0.95} onClick={handleNextVideo}>
                    <NextVideoThumbnail src={Spaceship.getThumbnail(panorama.nextVideo.id)} />
                    <NextVideoContent>
                      <NextVideoTitle>{panorama.nextVideo.title}</NextVideoTitle>
                      <NextVideoDescription>{panorama.nextVideo.description}</NextVideoDescription>
                    </NextVideoContent>
                  </NextVideo>
                  <NextVideoProgress>
                    <NextVideoProgressIndicator $length={Settings.getOne('VIDEO_NEXT_COUNTDOWN')} />
                  </NextVideoProgress>
                  <NextVideoCancel hover={1.1} tap={0.9} onClick={() => setIsEnded(false)}>
                    {t('video.next_video_cancel')}
                  </NextVideoCancel>
                </NextVideoWrapper>
              )}

              <Time>
                <div>{getDuration(played)}</div>
                <div>/</div>
                <div>{getDuration(duration)}</div>
              </Time>

              <BottomRight>
                <QualityWrapper>
                  <AnimatePresence>
                    {isQualityActive && panorama.streamInfo && (
                      <QualityItems
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className={'quality-clickbox'}
                      >
                        {[...panorama.streamInfo.qualities].map(quality => (
                          <QualityItem
                            $active={panorama.streamInfo?.quality === quality}
                            hover={1.1}
                            tap={0.9}
                            onClick={() => handleQualityItemClick(quality)}
                            key={quality}
                          >
                            {quality}p
                          </QualityItem>
                        ))}
                      </QualityItems>
                    )}
                  </AnimatePresence>
                  {panorama.streamInfo && (
                    <Quality
                      hover={1.1}
                      tap={0.9}
                      onClick={handleQualityClick}
                      className={'quality-clickbox'}
                    >
                      <QualityDropdownIcon type={'down'} color={Color.WHITE} />
                      <QualityText>{panorama.streamInfo?.quality}p</QualityText>
                    </Quality>
                  )}
                </QualityWrapper>
                {(videoRef.current?.textTracks.length || 0) > 0 && (
                  <BottomRightButton hover={1.1} tap={0.9} onClick={handleSubtitleClick}>
                    <ControlIcon type={'subtitle'} color={Color.WHITE} />
                  </BottomRightButton>
                )}
                {document.pictureInPictureEnabled && (
                  <BottomRightButton hover={1.1} tap={0.9} onClick={handlePipClick}>
                    <ControlIcon type={'pip'} color={Color.WHITE} />
                  </BottomRightButton>
                )}
                {isFullscreenEnabled && (
                  <BottomRightButton hover={1.1} tap={0.9} onClick={handleScreenAdjust}>
                    <ControlIcon type={'adjust'} color={Color.WHITE} />
                  </BottomRightButton>
                )}
                <BottomRightButton hover={1.1} tap={0.9} onClick={handleFullscreenClick}>
                  <ControlIcon
                    type={isFullscreenEnabled ? 'downscreen' : 'fullscreen'}
                    color={Color.WHITE}
                  />
                </BottomRightButton>
              </BottomRight>

              <BackButton hover={1.1} tap={0.9} onClick={handleBackClick}>
                <ControlIcon type={'left'} color={Color.WHITE} />
              </BackButton>
            </VideoControls>
          )}
        </AnimatePresence>
        {panorama.state === PanoramaState.ACTIVE && (
          <ProgressBar
            $active={synthedControlsActive}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchStart}
            onMouseDown={handleProgressBarClick}
          >
            <ProgressAmount
              style={{ width: `${videoLoaded ? (played / (duration || 1)) * 100 : 0}%` }}
            />
          </ProgressBar>
        )}
      </VideoArea>
      {panorama.state === PanoramaState.BACKGROUND && (
        <ContentArea>
          <Content>
            <Title>{panorama.videoInfo?.title}</Title>
            <Description>{panorama.videoInfo?.description}</Description>
          </Content>
          <Icons>
            <IconWrapper
              hover={1.1}
              tap={0.9}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                isPlaying ? pause() : play();
              }}
            >
              <MenuIcon type={isPlaying ? 'pause' : 'play'} color={Color.WHITE} />
            </IconWrapper>
            <IconWrapper
              hover={1.1}
              tap={0.9}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                panorama.setState(PanoramaState.NONE);
              }}
            >
              <MenuIcon type={'close'} color={Color.WHITE} />
            </IconWrapper>
          </Icons>
        </ContentArea>
      )}
    </RenderArea>
  );

  return ReactDOM.createPortal(Component, document.getElementById('panorama')!);
};

export default PanoramaSection;
