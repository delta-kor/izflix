import { Panorama, PanoramaState } from '../../hooks/usePanorama';

interface Props {
  panorama: Panorama;
}

const PanoramaSection: React.FC<Props> = ({ panorama }) => {
  const panoramaState = panorama.state;

  if (panoramaState === PanoramaState.ACTIVE) {
    return null;
  }

  return null;
};

export default PanoramaSection;
