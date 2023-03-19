import Rive from '@rive-app/react-canvas';
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
import Playtime from '../../services/playtime';
import { LoadingGrayRiv } from '../../services/rive';
import Settings from '../../services/settings';
import Spaceship from '../../services/spaceship';
import { getDuration } from '../../services/time';
import Tracker from '../../services/tracker';
import {
  Color,
  HideOverflow,
  MobileQuery,
  PcInnerPadding,
  PcQuery,
  TabletQuery,
  Text,
} from '../../styles';
import SmoothBox from '../atoms/SmoothBox';
import SmoothImage from '../atoms/SmoothImage';

const RenderArea = styled(motion.div)<{ $state: PanoramaState }>`
  background: ${Color.DARK_GRAY}EA;
  z-index: 50;
  cursor: ${({ $state }) => ($state === PanoramaState.BACKGROUND ? 'pointer' : 'unset')};

  ${MobileQuery} {
    position: fixed;

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
        bottom: 85px;
        left: 16px;
        right: 16px;
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

  ${TabletQuery} {
    ${({ $state }) =>
      $state === PanoramaState.ACTIVE &&
      `
        width: calc((100vw - ${PcInnerPadding} * 2) - min(30vw, 220px) - 32px);
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

    ${TabletQuery} {
      font-size: 24px;
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

const VideoLoader = styled(Rive)<{ $active: boolean }>`
  position: absolute;

  z-index: 1;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.5s ease;

  ${MobileQuery} {
    top: calc(50% - 24px);
    left: calc(50% - 24px);
    width: 48px;
    height: 48px;
  }

  ${PcQuery} {
    top: calc(50% - 36px);
    left: calc(50% - 36px);
    width: 72px;
    height: 72px;
  }

  ${TabletQuery} {
    top: calc(50% - 29px);
    left: calc(50% - 29px);
    width: 58px;
    height: 58px;
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

const Toast = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;

  background: rgba(22, 26, 54, 0.5);
  backdrop-filter: blur(2px);
  border: 2px solid ${Color.GRAY};

  color: ${Color.WHITE};
  border-radius: 4px;
  z-index: 2;
  user-select: none;

  ${MobileQuery} {
    bottom: 36px;
    ${Text.BODY_2};
    height: unset;
  }

  ${PcQuery} {
    bottom: 42px;
    ${Text.BODY_1};
    height: unset;
  }
`;

const Teleport = styled(SmoothBox)`
  position: absolute;
  z-index: 3;

  ${MobileQuery} {
    top: 16px;
    right: 16px;
  }

  ${PcQuery} {
    top: 28px;
    right: 28px;
  }

  & > .content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    background: rgba(22, 26, 54, 0.5);
    backdrop-filter: blur(2px);
    border: 2px solid ${Color.GRAY};

    color: ${Color.WHITE};
    border-radius: 4px;
    user-select: none;
    cursor: pointer;

    ${MobileQuery} {
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 400;
    }

    ${PcQuery} {
      padding: 12px 16px;
      font-size: 20px;
      font-weight: 400;
    }
  }
`;

const TeleportIcon = styled(Icon)`
  ${MobileQuery} {
    width: 16px;
    height: 16px;
  }

  ${PcQuery} {
    width: 20px;
    height: 20px;
  }
`;

interface Props {
  panorama: Panorama;
}

let controlsTimeout: any = null;
let nextVideoTimeout: any = null;
let toastTimeout: any = null;
let sessionPlaytime: [string | null, number] = [null, 0];

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
  const [toastContent, setToastContent] = useState<string>('');
  const [teleportClose, setTeleportClose] = useState<number | null>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoAreaRef = useRef<HTMLDivElement>(null);
  const { isFullscreenEnabled, enableFullscreen, disableFullscreen } = useFullscreen({
    target: videoAreaRef,
  });
  const isFullScreenRef = useRef<boolean>(false);
  const panoramaRef = useRef<Panorama>(panorama);
  const panoramaStateRef = useRef<PanoramaState>(PanoramaState.NONE);
  const lastBeacon = useRef<number>(Date.now());

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('mousemove', handleMouseMoveEvent);
    document.addEventListener('mousedown', handleMouseDownEvent);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('mousemove', handleMouseMoveEvent);
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
    if (!isEnded) clearTimeout(nextVideoTimeout);
  }, [isEnded]);

  useEffect(() => {
    !isPip() && pause();
    setPlayed(0);
    setDuration(0);
    setVideoLoaded(false);
    setIsEnded(false);
    clearTimeout(nextVideoTimeout);
    sessionPlaytime = [sessionPlaytime[0], 0];
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
    const video = videoRef.current;
    if (!video) return false;

    panorama.currentVideoId &&
      Tracker.send('video_play', {
        video_id: panorama.currentVideoId,
        video_time: video.currentTime,
      });
    setIsPlaying(true);
  };

  const handlePause = () => {
    const video = videoRef.current;
    if (!video) return false;

    panorama.currentVideoId &&
      Tracker.send('video_pause', {
        video_id: panorama.currentVideoId,
        video_time: video.currentTime,
      });
    setIsPlaying(false);
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return false;

    panorama.currentVideoId && Tracker.send('video_end', { video_id: panorama.currentVideoId });
    if (!video || !panorama.nextVideo) return;

    setIsEnded(video.ended);
    clearTimeout(nextVideoTimeout);

    if (video.ended) {
      if (panorama.state === PanoramaState.ACTIVE) {
        nextVideoTimeout = setTimeout(
          () => {
            panorama.currentVideoId &&
              panorama.nextVideo &&
              Tracker.send('video_next', {
                video_id: panorama.nextVideo.id,
                item_from: panorama.currentVideoId,
                next_type: 'auto',
              });

            handleNextVideo();
          },
          isPip() ? 0 : Settings.getOne('VIDEO_NEXT_COUNTDOWN') * 1000
        );
      } else {
        Tracker.send('video_next', {
          video_id: panorama.nextVideo.id,
          item_from: panorama.currentVideoId,
          next_type: 'background',
        });
        handleNextVideo();
      }
    }
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return false;

    panorama.currentVideoId &&
      Tracker.send('video_seek', {
        video_id: panorama.currentVideoId,
        video_time: video.currentTime,
      });
  };

  // document mouse move
  const handleMouseMoveEvent = (e: MouseEvent) => {
    if (!videoRef.current || panoramaStateRef.current !== PanoramaState.ACTIVE) return false;

    if (isFullScreenRef.current) {
      handleTouch();
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

  // document mouse down
  const handleMouseDownEvent = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.quality-clickbox')) return;
    setIsQualityActive(false);
  };

  // video time update
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

    const id = panorama.currentVideoId;
    if (id) {
      const now = Date.now();
      if (now - lastBeacon.current > 3 * 1000) {
        lastBeacon.current = now;
        Spaceship.videoBeacon(
          id,
          Math.round(video.currentTime),
          Math.round(Playtime.total()),
          panorama.streamInfo!.quality,
          isFullScreenRef.current,
          isPip()
        );
      }

      let total: number = 0;
      const length = video.played.length;
      for (let i = 0; i < length; i++) {
        const start = video.played.start(i);
        const end = video.played.end(i);
        const delta = end - start;
        total += delta;
      }

      if (sessionPlaytime[0] === id) {
        const delta = total - sessionPlaytime[1];
        if (delta > 0 && delta < 100) {
          Playtime.add(id, delta);
        }
      }

      sessionPlaytime[0] = id;
      sessionPlaytime[1] = total;
    }
  };

  // video & progress bar mouse down
  const handleTouch = () => {
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

  // video & progress bar mouse drag
  const handlePan = (e: MouseEvent, info: PanInfo) => {
    if (!videoRef.current || panoramaStateRef.current !== PanoramaState.ACTIVE) return false;

    e.preventDefault();
    window.getSelection()?.removeAllRanges();

    const video = videoRef.current;
    const boundingRect = video.getBoundingClientRect();

    const firstY = info.point.y - window.scrollY - info.offset.y;
    if (Math.abs(firstY - boundingRect.bottom) > 50) return false;

    const percentage = Math.max(
      Math.min((info.point.x - boundingRect.left) / boundingRect.width, 1),
      0
    );

    video.currentTime = percentage * (video.duration || 0);
    setPlayed(video.currentTime || 0);
    setDuration(video.duration || 0);
  };

  // video click & double click
  const handleClick: MouseEventHandler = e => {
    if (!videoRef.current || panoramaStateRef.current !== PanoramaState.ACTIVE) return false;

    const video = videoRef.current;
    const boundingRect = video.getBoundingClientRect();

    handleTouch();

    if (e.detail >= 2) {
      if (boundingRect.bottom - 70 < e.clientY) return false;
      if (Math.abs(boundingRect.left + boundingRect.width / 2 - e.clientX) < 35) return false;

      const nativeEvent = e.nativeEvent as PointerEvent;
      if (nativeEvent.pointerType === 'mouse') {
        return handleFullscreenClick();
      }

      if (boundingRect.left + boundingRect.width / 2 < e.clientX) {
        seekForward();
      }

      if (boundingRect.left + boundingRect.width / 2 > e.clientX) {
        seekBackward();
      }
    }
  };

  // keyboard click
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

  // progress bar click
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
      panorama.currentVideoId &&
        Tracker.send('fullscreen_clicked', {
          video_id: panorama.currentVideoId,
          item_type: 'down',
        });
      disableFullscreen();
    } else {
      panorama.currentVideoId &&
        Tracker.send('fullscreen_clicked', {
          video_id: panorama.currentVideoId,
          item_type: 'up',
        });
      handleTouch();

      // @ts-ignore
      if (videoRef.current.webkitEnterFullscreen && !videoRef.current.requestFullscreen)
        // @ts-ignore
        videoRef.current.webkitEnterFullscreen();
      else {
        enableFullscreen();
        document.pictureInPictureElement && document.exitPictureInPicture();
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
    panorama.currentVideoId && Tracker.send('video_back', { video_id: panorama.currentVideoId });
    navigate(-1);
  };

  const handleScreenAdjust = () => {
    const newAdjust = screenAdjust === 'left' ? 'top' : 'left';
    setScreenAdjust(newAdjust);
    sendToast(t(`video.screen_adjust_${newAdjust}`));
  };

  const handlePipClick = () => {
    if (!videoRef.current) return false;

    const video = videoRef.current;

    if (isPip()) {
      panorama.currentVideoId &&
        Tracker.send('video_pip', { video_id: panorama.currentVideoId, item_type: 'off' });
      exitPip();
    } else {
      video.requestPictureInPicture().then(() => {
        panorama.currentVideoId &&
          Tracker.send('video_pip', { video_id: panorama.currentVideoId, item_type: 'on' });
      });
    }
  };

  const handleSubtitleClick = () => {
    if (!videoRef.current) return false;
    const video = videoRef.current;

    if (!video.textTracks[0]) return false;
    if (video.textTracks[0].mode === 'showing') {
      panorama.currentVideoId &&
        Tracker.send('video_subtitle', { video_id: panorama.currentVideoId, item_type: 'off' });

      video.textTracks[0].mode = 'hidden';
      Settings.setOne('VIDEO_SUBTITLE', false);
      sendToast(t('video.subtitle_off'));
    } else {
      panorama.currentVideoId &&
        Tracker.send('video_subtitle', { video_id: panorama.currentVideoId, item_type: 'on' });

      video.textTracks[0].mode = 'showing';
      Settings.setOne('VIDEO_SUBTITLE', true);
      sendToast(t('video.subtitle_on'));
    }
  };

  const handleQualityClick = () => {
    setIsQualityActive(isQualityActive => !isQualityActive);
  };

  const handleQualityItemClick = (quality: number) => {
    panorama.currentVideoId &&
      panorama.streamInfo &&
      Tracker.send('video_quality_change', {
        video_id: panorama.currentVideoId,
        quality_from: panorama.streamInfo?.quality,
        quality_to: quality,
      });

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

    sendToast(t('video.seek_forward', { time: 5 }));
  };

  const seekBackward = () => {
    if (!videoRef.current) return false;
    const video = videoRef.current;

    video.currentTime = Math.max(video.currentTime - 5, 0);
    setPlayed(video.currentTime || 0);

    sendToast(t('video.seek_backward', { time: 5 }));
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

  const sendToast = (message: string) => {
    clearTimeout(toastTimeout);
    setToastContent(message);
    toastTimeout = setTimeout(() => {
      setToastContent('');
    }, 1000);
  };

  const getTeleport = () => {
    const video = videoRef.current;
    if (!video) return null;

    const info = panorama.videoInfo;
    if (!info) return null;

    const timeline = info.timeline;
    if (!timeline) return null;

    const teleports = timeline.teleports;
    const currentTime = video.currentTime * 1000;
    for (const teleport of teleports) {
      if (currentTime >= teleport.from && currentTime < teleport.to) {
        if (teleportClose === teleport.to) return null;
        return teleport;
      }
    }

    if (teleportClose) setTeleportClose(null);
    return null;
  };

  const handleTeleport: MouseEventHandler = e => {
    e.stopPropagation();

    const teleport = getTeleport();
    if (!teleport) return;

    const video = videoRef.current;
    if (!video) return;

    video.currentTime = teleport.to / 1000;
    video.play();
  };

  const handleTeleportClose: MouseEventHandler = e => {
    e.stopPropagation();

    const teleport = getTeleport();
    if (!teleport) return;

    setTeleportClose(teleport.to);
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
      onEnded={handleEnded}
      onSeeked={handleSeeked}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleOnCanPlay}
      onLoadStart={handleOnLoad}
      disableRemotePlayback
      playsInline
    >
      {panorama.videoInfo?.properties.includes('cc') && (
        <track
          src={Spaceship.getSubtitle(panorama.videoInfo.id)}
          kind={'subtitles'}
          srcLang={'en'}
          label={'English'}
          default={Settings.getOne('VIDEO_SUBTITLE')}
        />
      )}
    </Video>
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
        onClick={handleClick}
        onPan={handlePan}
        onPanEnd={() => controlsTimeout !== null && setIsControlsActive(false)}
        ref={videoAreaRef}
      >
        {VideoItem}
        <VideoLoader $active={!videoLoaded} src={LoadingGrayRiv} />
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
                    handleTouch();
                    isPlaying ? pause() : play();
                  }}
                >
                  <PlayIcon type={isPlaying ? 'pause' : 'play'} color={Color.DARK_GRAY} />
                </PlayButton>
              )}
              {isEnded && panorama.nextVideo && !isPip() && (
                <NextVideoWrapper>
                  <NextVideo
                    hover={1.05}
                    tap={0.95}
                    onClick={() => {
                      panorama.currentVideoId &&
                        panorama.nextVideo &&
                        Tracker.send('video_next', {
                          video_id: panorama.nextVideo.id,
                          item_from: panorama.currentVideoId,
                          next_type: 'manual',
                        });
                      handleNextVideo();
                    }}
                  >
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
                {/* <QualityWrapper>
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
                </QualityWrapper> */}
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
        <AnimatePresence>
          {toastContent && (
            <Toast
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              key={'toast'}
            >
              {toastContent}
            </Toast>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {getTeleport() && videoLoaded && isPlaying && (
            <Teleport
              hover={1.03}
              tap={0.97}
              onClick={handleTeleport}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              key={'teleport'}
            >
              건너뛰기
              <TeleportIcon type={'close'} color={Color.WHITE} onClick={handleTeleportClose} />
            </Teleport>
          )}
        </AnimatePresence>
        {panorama.state === PanoramaState.ACTIVE && (
          <ProgressBar
            $active={synthedControlsActive}
            onTouchStart={handleTouch}
            onTouchMove={handleTouch}
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
