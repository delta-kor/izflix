import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import { VideoPageState } from '../pages/VideoPage';
import Spaceship from '../services/spaceship';
import { getDate } from '../services/time';
import Transmitter from '../services/transmitter';

interface PanoramaMethods {
  view(id: string, state?: VideoPageState): Promise<ApiResponse>;
}

interface Panorama extends PanoramaMethods {
  videoInfo?: ApiResponse.Video.Info;
  streamInfo?: ApiResponse.Video.Stream;
  currentVideoId?: string;
  nextVideos: IVideo[];
  recommends: IVideo[];
}

function usePanorama(): Panorama {
  const { i18n } = useTranslation();

  const [currentVideoId, setCurrentVideoId] = useState<string | undefined>();
  const [videoInfo, setVideoInfo] = useState<ApiResponse.Video.Info | undefined>();
  const [streamInfo, setStreamInfo] = useState<ApiResponse.Video.Stream | undefined>();
  const [nextVideos, setNextVideos] = useState<IVideo[]>([]);
  const [recommends, setRecommends] = useState<IVideo[]>([]);

  const view = async (id: string, state?: VideoPageState) => {
    setVideoInfo(undefined);
    setStreamInfo(undefined);
    setCurrentVideoId(id);
    setRecommends([]);

    if (!nextVideos.some(video => video.id === id)) setNextVideos([]);

    const videoInfoResponse = await Spaceship.getVideoInfo(id);
    if (!videoInfoResponse.ok) return videoInfoResponse;

    setVideoInfo(videoInfoResponse);

    const stream = Spaceship.streamVideo(id, 1080);
    stream.then(streamInfoResponse => {
      if (!streamInfoResponse.ok)
        Transmitter.emit('popup', {
          type: 'error',
          message: streamInfoResponse.message || 'error.service',
        });
      else setStreamInfo(streamInfoResponse);
    });

    state && new Evoke(loadState(state, videoInfoResponse));
    new Evoke(loadRecommend(id));

    return videoInfoResponse;
  };

  const loadState = async (state: VideoPageState, videoInfo: ApiResponse.Video.Info) => {
    switch (state.key) {
      case 'playlist': {
        const response = await Spaceship.readPlaylist(state.value);
        if (!response.ok) throw new HttpException(response);

        setNextVideos(response.playlist.video);
        break;
      }

      case 'category': {
        const response = await Spaceship.viewCategory(state.value);
        if (!response.ok) throw new HttpException(response);

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
        if (!response.ok) throw new HttpException(response);

        setNextVideos(response.videos);
        break;
      }

      case 'music': {
        const response = await Spaceship.getOneMusic(state.value);
        if (!response.ok) throw new HttpException(response);

        setNextVideos(
          response.music.videos.map(data => ({
            ...data,
            title: data.description,
            description: getDate(data.date, i18n.resolvedLanguage),
          }))
        );
        break;
      }
    }
  };

  const loadRecommend = async (id: string) => {
    const response = await Spaceship.getVideoRecommends(id);
    if (!response.ok) throw new HttpException(response);

    setRecommends(response.videos);
  };

  const methods = { view };

  return { videoInfo, currentVideoId: currentVideoId, nextVideos, recommends, ...methods };
}

export type { Panorama };
export default usePanorama;
