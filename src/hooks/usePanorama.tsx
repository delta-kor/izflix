import { useState } from 'react';
import Spaceship from '../services/spaceship';

interface Panorama {
  view(id: string): Promise<ApiResponse.Video.Info>;
}

function usePanorama(): Panorama {
  const [videoInfo, setVideoInfo] = useState<IVideoInfo | null>(null);

  const view = async (id: string) => {
    const response = await Spaceship.getVideoInfo(id);
    if (!response.ok) return response;

    setVideoInfo(response);
    return response;
  };

  return { view };
}

export type { Panorama };
export default usePanorama;
