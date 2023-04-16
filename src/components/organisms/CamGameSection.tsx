import styled from 'styled-components';
import { Color, MobileQuery, PcQuery } from '../../styles';
import Spaceship from '../../services/spaceship';
import CamVideo from '../atoms/CamVideo';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = styled.div`
  ${PcQuery} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin: 0 auto;
    height: 100vh;
    max-width: 1500px;
  }

  ${MobileQuery} {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    height: 100vh;
    max-width: calc((100vh - 100vw * (27 / 32) - 24px) * (16 / 9));
    min-width: 60vw;
    gap: 24px;
    margin: 0 auto;
  }
`;

const Selector = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 32 / 27;

  ${MobileQuery} {
    flex-shrink: 0;
  }
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${PcQuery} {
    padding: 0 10%;
  }
`;

const ResultVideo = styled(CamVideo)`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
`;

const Masks = styled.div`
  position: absolute;
  display: grid;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const Mask = styled.div`
  position: relative;
`;

const CameraName = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  font-weight: 700;
  color: ${Color.WHITE};
  background-color: ${Color.GRAY};

  user-select: none;

  ${PcQuery} {
    font-size: 16px;
    padding: 8px 12px;
  }

  ${MobileQuery} {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

const CameraNoSignal = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: ${Color.DARK_GRAY};
`;

const CameraNoSignalText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  color: ${Color.GRAY};
  user-select: none;

  ${PcQuery} {
    font-size: 24px;
  }

  ${MobileQuery} {
    font-size: 20px;
  }
`;

const ActiveCamera = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: 2px solid ${Color.WHITE};
`;

interface Props {
  game: ICampdGame;
}

const CamGameSection: React.FC<Props> = ({ game }) => {
  const navigate = useNavigate();

  const [activeCam, setActiveCam] = useState(4);
  const [currentTime, setCurrentTime] = useState(0);
  const [input, setInput] = useState<ICampdInput>({ 0: 4 });

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCamClick = (cam: number) => {
    setActiveCam(cam);

    if (videoRef.current) {
      const key = Math.floor(videoRef.current.currentTime * 1000);
      const newInput = { ...input };
      newInput[key] = cam;
      setInput(newInput);
    }
  };

  const handleTimeupdate = () => {
    setCurrentTime(videoRef.current?.currentTime || 0);
  };

  const handlePause = () => {
    videoRef.current?.play();
  };

  const handleEnd = () => {
    navigate('/campd/result', { state: { game, input } });
  };

  const handleOnCanPlayThrough = () => {
    videoRef.current?.play();
  };

  return (
    <Layout>
      <Selector>
        <Video
          src={Spaceship.getCamVideoUrl(game.id) + '#t=240'}
          ref={videoRef}
          onCanPlayThrough={handleOnCanPlayThrough}
          onPause={handlePause}
          onEnded={handleEnd}
          onTimeUpdate={handleTimeupdate}
          playsInline
          disableRemotePlayback
          disablePictureInPicture
        />
        <Masks>
          <Mask>
            <CameraNoSignal>
              <CameraNoSignalText>No Signal</CameraNoSignalText>
            </CameraNoSignal>
            <CameraName>CAM 1</CameraName>
          </Mask>
          {[0, 1, 2, 3, 4].map(i => (
            <Mask key={i} onClick={() => handleCamClick(i)}>
              <CameraName>CAM {i + 2}</CameraName>
              {activeCam === i && <ActiveCamera />}
            </Mask>
          ))}
        </Masks>
      </Selector>
      <Menu>
        <ResultVideo type={'live'} game={game} active={activeCam + 1} currentTime={currentTime} />
      </Menu>
    </Layout>
  );
};

export default CamGameSection;
