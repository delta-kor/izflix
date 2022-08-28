import { useState } from 'react';
import { VideoPageState } from '../pages/VideoPage';
import Spaceship from '../services/spaceship';

interface PanoramaMethods {
  view(id: string, state?: VideoPageState): Promise<ApiResponse.Video.Info>;
}

interface Panorama extends PanoramaMethods {
  videoInfo?: ApiResponse.Video.Info;
  recommends: IVideo[];
}

function usePanorama(): Panorama {
  const [videoInfo, setVideoInfo] = useState<ApiResponse.Video.Info | undefined>();
  const [streamInfo, setStreamInfo] = useState<ApiResponse.Video.Stream | undefined>();
  const [videoList, setVideoList] = useState<IVideo[]>([]);
  const [recommends, setRecommends] = useState<IVideo[]>([]);

  const view = async (id: string, state?: VideoPageState) => {
    setVideoInfo(undefined);
    setRecommends([]);
    if (!videoList.some(video => video.id === id)) setVideoList([]);

    const response = await Spaceship.getVideoInfo(id);
    if (!response.ok) return response;

    state && loadState(state);
    loadRecommend(id);

    setVideoInfo(response);
    return response;
  };

  const loadState = async (state: VideoPageState) => {
    switch (state.key) {
      case 'playlist': {
        const response = await Spaceship.readPlaylist(state.value);
        if (!response.ok) return false;

        setVideoList(response.playlist.video);
        break;
      }

      case 'category': {
        const response = await Spaceship.viewCategory(state.value);
        if (!response.ok) return false;

        if (response.type === 'file') setVideoList(response.data);
        break;
      }

      case 'calendar': {
        const response = await Spaceship.getOneCalendar(state.value);
        if (!response.ok) return false;

        setVideoList(response.videos);
        break;
      }
    }
  };

  const loadRecommend = async (id: string) => {
    const response = await Spaceship.getVideoRecommends(id);
    if (!response.ok) return false;

    setRecommends(response.videos);
  };

  const methods = { view };

  return { videoInfo, recommends, ...methods };
}

export type { Panorama };
export default usePanorama;
