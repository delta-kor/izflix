import { useState } from 'react';
import { VideoPageState } from '../pages/VideoPage';
import Spaceship from '../services/spaceship';

interface PanoramaMethods {
  view(id: string, state?: VideoPageState): Promise<ApiResponse.Video.Info>;
}

interface Panorama extends PanoramaMethods {
  videoInfo?: ApiResponse.Video.Info;
  currentVideoId?: string;
  nextVideos: IVideo[];
  recommends: IVideo[];
}

function usePanorama(): Panorama {
  const [videoInfo, setVideoInfo] = useState<ApiResponse.Video.Info | undefined>();
  const [currentVideoId, setCurrentVideoId] = useState<string | undefined>();
  const [streamInfo, setStreamInfo] = useState<ApiResponse.Video.Stream | undefined>();
  const [nextVideos, setNextVideos] = useState<IVideo[]>([]);
  const [recommends, setRecommends] = useState<IVideo[]>([]);

  const view = async (id: string, state?: VideoPageState) => {
    setVideoInfo(undefined);
    setCurrentVideoId(id);
    setRecommends([]);
    if (!nextVideos.some(video => video.id === id)) setNextVideos([]);

    const response = await Spaceship.getVideoInfo(id);
    if (!response.ok) return response;

    setVideoInfo(response);

    state && loadState(state, response);
    loadRecommend(id);

    return response;
  };

  const loadState = async (state: VideoPageState, videoInfo: ApiResponse.Video.Info) => {
    switch (state.key) {
      case 'playlist': {
        const response = await Spaceship.readPlaylist(state.value);
        if (!response.ok) return false;

        setNextVideos(response.playlist.video);
        break;
      }

      case 'category': {
        const response = await Spaceship.viewCategory(state.value);
        if (!response.ok) return false;

        if (response.type === 'file')
          setNextVideos(
            response.data.map(data => ({
              ...data,
              description: videoInfo?.description || data.description,
            }))
          );
        break;
      }

      case 'calendar': {
        const response = await Spaceship.getOneCalendar(state.value);
        if (!response.ok) return false;

        setNextVideos(response.videos);
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

  return { videoInfo, currentVideoId: currentVideoId, nextVideos, recommends, ...methods };
}

export type { Panorama };
export default usePanorama;
