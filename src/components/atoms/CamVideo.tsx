import styled from 'styled-components';
import { Color } from '../../styles';
import Spaceship from '../../services/spaceship';
import { useEffect, useRef, useState } from 'react';

const Layout = styled.div`
  position: relative;
  background: ${Color.DARK_GRAY};
  overflow: hidden;
`;

const Video = styled.video<{ $x: number; $y: number }>`
  position: absolute;
  width: 200%;
  transform: ${({ $x, $y }) => `translate(-${$x}%, -${$y}%)`};
`;

interface Props {
  type: 'preview' | 'live' | 'live_paused' | 'replay';
  game: ICampdGame;
  active?: number;
  input?: ICampdInput;
  className?: string;
  currentTime?: number;
}

const CamVideo: React.FC<Props> = ({ type, game, active, input, currentTime, className }) => {
  const [activeCamera, setActiveCamera] = useState<number>(active || 0);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setActiveCamera(active || 0);
  }, [active]);

  if (type === 'live' && videoRef.current) {
    const delta = Math.abs(videoRef.current.currentTime - (currentTime ?? 0));
    if (delta > 0.2) {
      videoRef.current.play();
      videoRef.current.currentTime = currentTime ?? 0;
    }
  }

  const handleTimeUpdate = () => {
    if (type === 'replay' && input && videoRef.current) {
      const keys = Object.keys(input).map(Number);
      const index = keys.findIndex(key => key > (videoRef.current?.currentTime || 0) * 1000);

      const closestKey = index === -1 ? keys[keys.length - 1] : keys[index - 1];

      setActiveCamera(input[closestKey]);
    }
  };

  let x = 0;
  let y = 0;

  if ([0, 2, 4].includes(activeCamera)) {
    x = 0;
  } else {
    x = 50;
  }

  if ([2, 3].includes(activeCamera)) {
    y = (1 / 3) * 100;
  }

  if ([4, 5].includes(activeCamera)) {
    y = (2 / 3) * 100;
  }

  return (
    <Layout className={className}>
      <Video
        $x={x}
        $y={y}
        src={Spaceship.getCamVideoUrl(game.id) + '#t=240'}
        ref={videoRef}
        muted={type !== 'replay'}
        loop={type === 'replay'}
        playsInline
        autoPlay={type === 'preview' || type === 'replay'}
        onTimeUpdate={handleTimeUpdate}
      />
    </Layout>
  );
};

export default CamVideo;
