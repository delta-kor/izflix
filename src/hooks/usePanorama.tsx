import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import { VideoPageState } from '../pages/VideoPage';
import PageManager from '../services/page-manager';
import Spaceship from '../services/spaceship';
import { getDate } from '../services/time';
import Transmitter from '../services/transmitter';

interface PanoramaMethods {
  view(id: string, state?: VideoPageState): Promise<ApiResponse>;
  setState(state: PanoramaState): void;
}

interface Panorama extends PanoramaMethods {
  state: PanoramaState;
  videoInfo?: ApiResponse.Video.Info;
  streamInfo?: ApiResponse.Video.Stream;
  currentVideoId?: string;
  currentVideoState?: VideoPageState;
  nextVideos: IVideo[];
  recommends: IVideo[];
}

enum PanoramaState {
  NONE = 'none',
  ACTIVE = 'active',
  BACKGROUND = 'background',
}

function usePanorama(): Panorama {
  const { i18n } = useTranslation();
  const location = useLocation();

  const [state, setState] = useState<PanoramaState>(PanoramaState.NONE);
  const [currentVideoId, setCurrentVideoId] = useState<string | undefined>();
  const [currentVideoState, setCurrentState] = useState<VideoPageState | undefined>();
  const [videoInfo, setVideoInfo] = useState<ApiResponse.Video.Info | undefined>();
  const [streamInfo, setStreamInfo] = useState<ApiResponse.Video.Stream | undefined>();
  const [nextVideos, setNextVideos] = useState<IVideo[]>([]);
  const [recommends, setRecommends] = useState<IVideo[]>([]);

  useEffect(() => {
    if (state === PanoramaState.BACKGROUND && location.pathname === `/${currentVideoId}`)
      return setState(PanoramaState.ACTIVE);
    const isBackgroudState = PageManager.isBackgroundState(location.pathname);
    state !== PanoramaState.NONE &&
      setState(isBackgroudState ? PanoramaState.BACKGROUND : PanoramaState.NONE);
  }, [location]);

  const view = async (id: string, videoState?: VideoPageState) => {
    if (id === currentVideoId) return { ok: true, status: 200 };

    setState(PanoramaState.NONE);
    setVideoInfo(undefined);
    setStreamInfo(undefined);
    setCurrentVideoId(id);
    setCurrentState(videoState);
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

    videoState && new Evoke(loadState(videoState, videoInfoResponse));
    new Evoke(loadRecommend(id));

    setState(
      PageManager.isBackgroundState(window.location.pathname)
        ? PanoramaState.BACKGROUND
        : PanoramaState.ACTIVE
    );

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

  const setStateMethod = (state: PanoramaState) => {
    if (state === PanoramaState.NONE) {
      setCurrentState(undefined);
      setCurrentVideoId(undefined);
    }
    setState(state);
  };

  const methods = { view, setState: setStateMethod };

  return {
    state,
    videoInfo,
    streamInfo,
    currentVideoId,
    currentVideoState,
    nextVideos,
    recommends,
    ...methods,
  };
}

export type { Panorama };
export { PanoramaState };
export default usePanorama;
