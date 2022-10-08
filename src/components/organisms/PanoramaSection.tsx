import styled from 'styled-components';
import { Panorama, PanoramaState } from '../../hooks/usePanorama';
import { Color, MobileQuery, PcInnerPadding, PcQuery } from '../../styles';

const RenderArea = styled.div`
  background: ${Color.PRIMARY};
  z-index: 50;

  ${MobileQuery} {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  ${PcQuery} {
    position: absolute;
    top: 48px;
    left: ${PcInnerPadding};
    width: calc((100vw - ${PcInnerPadding} * 2) - min(30vw, 300px) - 32px);
    aspect-ratio: 16 / 9;
  }
`;

interface Props {
  panorama: Panorama;
}

const PanoramaSection: React.FC<Props> = ({ panorama }) => {
  const panoramaState = panorama.state;

  if (panoramaState === PanoramaState.ACTIVE) {
    return <RenderArea>-- render area --</RenderArea>;
  }

  return null;
};

export default PanoramaSection;
