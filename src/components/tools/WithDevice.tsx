import { useMediaQuery } from 'react-responsive';
import { MobileLimit } from '../../styles';

export interface WithDeviceParams {
  device: 'pc' | 'mobile';
}

function withDevice<T>(Component: any) {
  return (props: Omit<T, 'device'>) => (
    <Component
      {...props}
      device={
        useMediaQuery({
          query: `(max-width:${MobileLimit}px) `,
        })
          ? 'mobile'
          : 'pc'
      }
    />
  );
}

export default withDevice;
