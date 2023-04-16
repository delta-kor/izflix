import styled from 'styled-components';
import { Color } from '../../styles';
import Spaceship from '../../services/spaceship';
import { useRef } from 'react';

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
  type: 'preview' | 'live';
  game: ICampdGame;
  active?: number;
  className?: string;
  currentTime?: number;
}

const CamVideo: React.FC<Props> = ({ type, game, active, currentTime, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (type === 'live' && videoRef.current) {
    const delta = Math.abs(videoRef.current.currentTime - (currentTime ?? 0));
    if (delta > 0.2) {
      videoRef.current.play();
      videoRef.current.currentTime = currentTime ?? 0;
    }
  }

  active = active ?? 0;

  let x = 0;
  let y = 0;

  if ([0, 2, 4].includes(active)) {
    x = 0;
  } else {
    x = 50;
  }

  if ([2, 3].includes(active)) {
    y = (1 / 3) * 100;
  }

  if ([4, 5].includes(active)) {
    y = (2 / 3) * 100;
  }

  return (
    <Layout className={className}>
      <Video
        $x={x}
        $y={y}
        src={Spaceship.getCamVideoUrl(game.id)}
        ref={videoRef}
        muted
        playsInline
        autoPlay={type === 'preview'}
      />
    </Layout>
  );
};

export default CamVideo;
