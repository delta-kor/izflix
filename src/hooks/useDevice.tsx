import { useMediaQuery } from 'react-responsive';
import { MobileLimit } from '../styles';

function useDevice(): 'mobile' | 'pc' {
  return useMediaQuery({
    query: `(max-width:${MobileLimit}px) `,
  })
    ? 'mobile'
    : 'pc';
}

export default useDevice;
