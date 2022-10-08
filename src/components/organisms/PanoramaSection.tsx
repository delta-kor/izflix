import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Panorama, PanoramaState } from '../../hooks/usePanorama';
import { Color, MobileQuery, PcInnerPadding, PcQuery } from '../../styles';

const RenderArea = styled.div<{ $state: PanoramaState }>`
  background: ${Color.DARK_GRAY}AA;
  z-index: 50;

  ${MobileQuery} {
    position: fixed;
    width: 100%;

    ${({ $state }) =>
      $state === PanoramaState.ACTIVE
        ? `
        top: 0;
        left: 0;
        aspect-ratio: 16 / 9;
        `
        : `
        display: flex;
        bottom: 85px;
        height: 86px;
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
        `}
  }
`;

const Video = styled(motion.video)`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoArea = styled.div<{ $state: PanoramaState }>`
  ${MobileQuery} {
    height: 100%;
    aspect-ratio: ${({ $state }) => ($state === PanoramaState.ACTIVE ? '16 / 9' : '20 / 9')};
  }
`;

const ContentArea = styled.div`
  display: flex;
  width: 100%;
`;

interface Props {
  panorama: Panorama;
}

const PanoramaSection: React.FC<Props> = ({ panorama }) => {
  const panoramaState = panorama.state;

  if (panoramaState === PanoramaState.NONE) return null;

  const video = <Video src={panorama.streamInfo?.url} layoutId={'panorama_video'} />;

  return (
    <RenderArea $state={panoramaState}>
      {panoramaState === PanoramaState.BACKGROUND && <ContentArea></ContentArea>}
      <VideoArea $state={panoramaState}>{video}</VideoArea>
    </RenderArea>
  );
};

export default PanoramaSection;
