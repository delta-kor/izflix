import { useState } from 'react';
import { VideoPageState } from '../pages/VideoPage';
import Spaceship from '../services/spaceship';

interface PanoramaMethods {
  view(id: string, state?: VideoPageState): Promise<ApiResponse.Video.Info>;
}

interface Panorama extends PanoramaMethods {
  videoInfo?: ApiResponse.Video.Info;
}

function usePanorama(): Panorama {
  const [videoInfo, setVideoInfo] = useState<ApiResponse.Video.Info | undefined>();
  const [streamInfo, setStreamInfo] = useState<ApiResponse.Video.Stream | undefined>();

  const view = async (id: string, state?: VideoPageState) => {
    setVideoInfo(undefined);

    const response = await Spaceship.getVideoInfo(id);
    if (!response.ok) return response;

    state && loadState(state);

    setVideoInfo(response);
    return response;
  };

  const loadState = async (state: VideoPageState) => {};

  const methods = { view };

  return { videoInfo, ...methods };
}

export type { Panorama };
export default usePanorama;
