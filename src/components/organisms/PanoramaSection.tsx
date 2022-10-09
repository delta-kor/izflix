import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Panorama, PanoramaState } from '../../hooks/usePanorama';
import Icon from '../../icons/Icon';
import { Color, HideOverflow, MobileQuery, PcInnerPadding, PcQuery, Text } from '../../styles';
import SmoothBox from '../atoms/SmoothBox';

const RenderArea = styled(motion.div)<{ $state: PanoramaState }>`
  background: ${Color.DARK_GRAY}EA;
  z-index: 50;

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

const Video = styled.video`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;

  &::-internal-media-controls-overlay-cast-button {
    display: none;
  }
`;

const VideoArea = styled.div<{ $state: PanoramaState }>`
  flex-shrink: 0;

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
  background: ${Color.BACKGROUND}B4;
  pointer-events: none;
`;

const ProgressBar = styled.div<{ $active: boolean }>`
  position: absolute;
  bottom: -2px;
  width: 100%;
  height: ${({ $active }) => ($active ? '12px' : '2px')};
  background: ${Color.GRAY};
  transition: height 0.2s;
`;

const ProgressAmount = styled(motion.div)`
  height: 100%;
  background: ${Color.PRIMARY};
`;

interface Props {
  panorama: Panorama;
}

const PanoramaSection: React.FC<Props> = ({ panorama }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isControlsActive, setIsControlsActive] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsPlaying(!video.paused);
    document.addEventListener('mousemove', handleMouseEvent);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('touchstart', handleTouchStart);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      document.removeEventListener('mousemove', handleMouseEvent);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('touchstart', handleTouchStart);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoRef.current]);

  useEffect(() => {
    setPlayed(0);
    setDuration(1);
  }, [panorama.currentVideoId]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleMouseEvent = (e: MouseEvent) => {
    if (!videoRef.current) return false;
    const boundingRect = videoRef.current.getBoundingClientRect();
    const isOnTarget =
      boundingRect.left <= e.clientX &&
      e.clientX <= boundingRect.right &&
      boundingRect.top <= e.clientY &&
      e.clientY <= boundingRect.bottom + 2;
    setIsControlsActive(isOnTarget);
  };

  const handleTimeUpdate = (e: Event) => {
    const video = e.target as HTMLVideoElement;
    setPlayed(video.currentTime);
    setDuration(video.duration);
  };

  let timeout: any = null;
  const handleTouchStart = () => {
    clearTimeout(timeout);
    setIsControlsActive(true);
    timeout = setTimeout(() => {
      setIsControlsActive(false);
    }, 1000);
  };

  const play = () => {
    videoRef.current?.play();
  };

  const pause = () => {
    videoRef.current?.pause();
  };

  const panoramaState = panorama.state;
  if (panoramaState === PanoramaState.NONE) return null;

  const VideoItem = (
    <Video src={panorama.streamInfo?.url} ref={videoRef} disableRemotePlayback playsInline />
  );

  const Component = (
    <RenderArea $state={panoramaState}>
      <VideoArea $state={panoramaState}>
        {VideoItem}
        <AnimatePresence>
          {panoramaState === PanoramaState.ACTIVE && isControlsActive && (
            <VideoControls
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              key={'controls'}
            ></VideoControls>
          )}
        </AnimatePresence>
        {panoramaState === PanoramaState.ACTIVE && (
          <ProgressBar $active={isControlsActive}>
            <ProgressAmount
              initial={{ width: '0%' }}
              animate={{ width: `${(played / duration) * 100}%` }}
            />
          </ProgressBar>
        )}
      </VideoArea>
      {panoramaState === PanoramaState.BACKGROUND && (
        <ContentArea>
          <Content>
            <Title>{panorama.videoInfo?.title}</Title>
            <Description>{panorama.videoInfo?.description}</Description>
          </Content>
          <Icons>
            <IconWrapper hover={1.1} tap={0.9} onClick={() => (isPlaying ? pause() : play())}>
              <MenuIcon type={isPlaying ? 'pause' : 'play'} color={Color.WHITE} />
            </IconWrapper>
            <IconWrapper hover={1.1} tap={0.9}>
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
