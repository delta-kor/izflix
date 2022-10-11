import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useFullscreen } from 'rooks';
import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import { Panorama, PanoramaState } from '../../hooks/usePanorama';
import Icon from '../../icons/Icon';
import { getDuration } from '../../services/time';
import { Color, HideOverflow, MobileQuery, PcInnerPadding, PcQuery, Text } from '../../styles';
import Loader from '../atoms/Loader';
import SmoothBox from '../atoms/SmoothBox';

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

const Video = styled(motion.video)<{ $active: boolean; $screenAdjust: ScreenAdjust }>`
  display: block;
  position: absolute;
  object-fit: ${({ $screenAdjust }) => ($screenAdjust === 'top' ? 'cover' : 'contain')};
  z-index: 0;
  width: 100%;
  height: 100%;

  &::-internal-media-controls-overlay-cast-button {
    display: none;
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

const FullscreenButton = styled(SmoothBox)`
  position: absolute;
  cursor: pointer;

  ${MobileQuery} {
    bottom: 20px;
    right: 12px;
  }

  ${PcQuery} {
    bottom: 24px;
    right: 16px;
  }

  & > .content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
  }
`;

const ScreenAdjustButton = styled(SmoothBox)`
  position: absolute;
  cursor: pointer;

  ${MobileQuery} {
    bottom: 20px;
    right: 52px;
  }

  ${PcQuery} {
    bottom: 24px;
    right: 58px;
  }

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

interface Props {
  panorama: Panorama;
}

type ScreenAdjust = 'left' | 'top';

let timeout: any = null;
const PanoramaSection: React.FC<Props> = ({ panorama }) => {
  const navigate = useNavigate();
  const device = useDevice();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isControlsActive, setIsControlsActive] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [screenAdjust, setScreenAdjust] = useState<ScreenAdjust>('top');

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoAreaRef = useRef<HTMLDivElement>(null);
  const { isFullscreenEnabled, enableFullscreen, disableFullscreen } = useFullscreen({
    target: videoAreaRef,
  });
  const isFullScreenRef = useRef<boolean>(false);
  const panoramaStateRef = useRef<PanoramaState>(PanoramaState.NONE);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsPlaying(!video.paused);
    document.addEventListener('mousemove', handleMouseEvent);

    return () => {
      document.removeEventListener('mousemove', handleMouseEvent);
    };
  }, [videoRef.current]);

  useEffect(() => {
    setPlayed(0);
    setDuration(0);
    setVideoLoaded(false);
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
    panoramaStateRef.current = panorama.state;
  }, [panorama.state]);

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

    const boundingRect = videoRef.current.getBoundingClientRect();
    const isOnTarget =
      boundingRect.left <= e.clientX &&
      e.clientX <= boundingRect.right &&
      boundingRect.top <= e.clientY &&
      e.clientY <= boundingRect.bottom + 2;

    setIsControlsActive(isOnTarget);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return false;
    const video = videoRef.current;
    setPlayed(video.currentTime);
    setDuration(video.duration);
  };

  const handleTouchStart = () => {
    if (panoramaStateRef.current !== PanoramaState.ACTIVE) return false;
    document.body.style.cursor = 'unset';

    clearTimeout(timeout);
    timeout = null;

    setIsControlsActive(true);
    timeout = setTimeout(
      () => {
        setIsControlsActive(false);
        if (isFullScreenRef.current) {
          document.body.style.cursor = 'none';
        }
        timeout = null;
      },
      device === 'pc' ? 1000 : 3000
    );
  };

  const handlePan = (e: MouseEvent, info: PanInfo) => {
    if (!videoRef.current || panoramaStateRef.current !== PanoramaState.ACTIVE) return false;

    const video = videoRef.current;
    const boundingRect = video.getBoundingClientRect();
    const percentage = (info.point.x - boundingRect.left) / boundingRect.width;

    video.currentTime = percentage * (video.duration || 0);
    setPlayed(video.currentTime || 0);
    setDuration(video.duration || 0);
  };

  const handleProgressBarClick: MouseEventHandler = e => {
    if (!videoRef.current || panoramaStateRef.current !== PanoramaState.ACTIVE) return false;

    const video = videoRef.current;
    const boundingRect = video.getBoundingClientRect();
    const percentage = (e.clientX - boundingRect.left) / boundingRect.width;

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
      else enableFullscreen();
    }
  };

  const handleOnCanPlay = () => {
    if (!videoRef.current) return false;

    const video = videoRef.current;
    setVideoLoaded(true);
    setPlayed(video.currentTime || 0);
    setDuration(video.duration || 0);

    video.play();
  };

  const handleBackClick = () => {
    if (isFullScreenRef.current) disableFullscreen();
    navigate(-1);
  };

  const handleScreenAdjust = () => {
    setScreenAdjust(screenAdjust => (screenAdjust === 'left' ? 'top' : 'left'));
  };

  const play = () => {
    videoRef.current?.play();
  };

  const pause = () => {
    videoRef.current?.pause();
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
      disableRemotePlayback
      playsInline
    />
  );

  const synthedControlsActive = (isControlsActive || !isPlaying) && videoLoaded;

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
        onPanEnd={() => timeout !== null && setIsControlsActive(false)}
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
              <Time>
                <div>{getDuration(played)}</div>
                <div>/</div>
                <div>{getDuration(duration)}</div>
              </Time>
              <FullscreenButton hover={1.1} tap={0.9} onClick={handleFullscreenClick}>
                <ControlIcon
                  type={isFullscreenEnabled ? 'downscreen' : 'fullscreen'}
                  color={Color.WHITE}
                />
              </FullscreenButton>
              {isFullscreenEnabled && (
                <ScreenAdjustButton hover={1.1} tap={0.9} onClick={handleScreenAdjust}>
                  <ControlIcon type={'adjust'} color={Color.WHITE} />
                </ScreenAdjustButton>
              )}
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
            onClick={handleProgressBarClick}
          >
            <ProgressAmount style={{ width: `${(played / (duration || 1)) * 100}%` }} />
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
