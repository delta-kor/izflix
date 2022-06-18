import { AnimatePresence, motion } from 'framer-motion';
import React, { Component } from 'react';
import { NavigateFunction } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as LoaderIcon } from '../../../icons/loading-bright.svg';
import Playtime from '../../../services/playtime';
import Settings from '../../../services/settings';
import Spaceship from '../../../services/spaceship';
import Tracker from '../../../services/tracker';
import Transmitter from '../../../services/transmitter';
import { Color, MobileQuery, PcQuery } from '../../../styles';
import withNavigate from '../../tools/Navigate';
import withParams from '../../tools/Params';

const Layout = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${Color.DARK_GRAY};

  ${MobileQuery} {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }
`;

const Content = styled.video<{ $active: boolean }>`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $active }) => ($active ? '1' : 0)};
  transition: opacity 1s;
  z-index: 2;
`;

const Loader = styled(motion(LoaderIcon))`
  position: absolute;
  animation: spin 2s infinite linear;
  user-select: none;
  z-index: 1;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  ${MobileQuery} {
    width: 32px;
    height: 32px;
    left: calc(50% - 16px);
    top: calc(50% - 16px);
  }

  ${PcQuery} {
    width: 72px;
    height: 72px;
    left: calc(50% - 36px);
    top: calc(50% - 36px);
  }
`;

const NextWrapper = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${Color.DARK_GRAY}f0;
  user-select: none;

  ${PcQuery} {
    row-gap: 24px;
  }

  ${MobileQuery} {
    row-gap: 18px;
  }
`;

const NextHeader = styled.div`
  font-weight: bold;

  ${PcQuery} {
    font-size: 24px;
  }

  ${MobileQuery} {
    font-size: 18px;
  }
`;

const NextThumbnail = styled.img`
  border-radius: 4px;
  cursor: pointer;
  aspect-ratio: 16 / 9;

  ${PcQuery} {
    width: 100%;
  }

  ${MobileQuery} {
    width: 30%;
  }
`;

const NextContent = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;

  ${PcQuery} {
    align-items: center;
    row-gap: 10px;
  }

  ${MobileQuery} {
    row-gap: 8px;
  }
`;

const NextTitle = styled.div`
  font-weight: bold;

  ${PcQuery} {
    font-size: 20px;
  }

  ${MobileQuery} {
    font-size: 14px;
  }
`;

const NextDescription = styled.div`
  font-weight: normal;

  ${PcQuery} {
    font-size: 14px;
  }

  ${MobileQuery} {
    font-size: 12px;
  }
`;

const NextProgress = styled.div`
  height: 4px;
  background: ${Color.GRAY};
  border-radius: 4px;
  overflow: hidden;

  ${PcQuery} {
    width: 30%;
  }
  ${MobileQuery} {
    width: 50%;
  }
`;

const NextIndicator = styled.div<{ $length: number }>`
  width: 0;
  height: 100%;
  background: ${Color.WHITE};
  border-radius: 4px;
  animation: countdown ${({ $length }) => $length}s forwards linear;

  @keyframes countdown {
    from {
      width: 0;
    }

    to {
      width: 100%;
    }
  }
`;

const NextDismiss = styled.div`
  width: 30%;
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
`;

const NextMenu = styled.div`
  display: flex;

  ${PcQuery} {
    width: 30%;
    flex-direction: column;
    align-items: center;
    row-gap: 24px;
  }

  ${MobileQuery} {
    width: 100%;
    justify-content: center;
    align-items: center;
    column-gap: 16px;
  }
`;

interface Props {
  id: string;
  url: string | null;
  nextVideo: IVideoItem | null;
  is4K: boolean;
  query: [URLSearchParams];
  navigate: NavigateFunction;
}

interface State {
  loaded: boolean;
  next: boolean;
}

let videoUpdatePip: boolean = false;

class Video extends Component<Props, State> {
  videoRef = React.createRef<HTMLVideoElement>();
  state: State = { loaded: false, next: false };
  unmounted: boolean = false;
  timeout: any;
  startTime: number = 0;
  lastBeacon: number = Date.now();

  componentDidMount = () => {
    Transmitter.on('pip', this.onPipToggle);
    if (!this.isPipMode()) videoUpdatePip = false;
  };

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.url !== this.props.url) {
      this.onUrlUpdate();
    }
  };

  componentWillUnmount = () => {
    Transmitter.removeListener('pip', this.onPipToggle);
    this.unmounted = true;
  };

  onUrlUpdate = async () => {
    this.setState({ loaded: false });

    if (this.isPipMode()) {
      if (document.pictureInPictureElement instanceof HTMLVideoElement) {
        document.pictureInPictureElement.pause();
      }
      videoUpdatePip = true;
    }
  };

  isPipMode = () => {
    return !!document.pictureInPictureElement;
  };

  onPipToggle = () => {
    if (!this.isPipMode()) {
      this.pipOn();
    } else {
      this.pipOff();
    }
  };

  pipOn = async () => {
    const video = this.videoRef.current;
    if (!video) return false;

    try {
      await video.requestPictureInPicture();
    } catch (e) {
      Transmitter.emit(
        'popup',
        'PIP 요청이 거부되었어요\n다른 앱 위에 그리기 권한을 허용해주세요'
      );
    }
  };

  pipOff = async (pause: boolean = false) => {
    videoUpdatePip = false;

    if (!this.isPipMode()) return false;
    try {
      if (
        pause &&
        document.pictureInPictureElement instanceof HTMLVideoElement
      ) {
        document.pictureInPictureElement.pause();
      }

      await document.exitPictureInPicture();
    } catch (e) {}
  };

  onVideoLoad = () => {
    this.setState({ loaded: true });
    if (videoUpdatePip) this.pipOn();

    const video = this.videoRef.current;
    if (!video) return false;

    if (Settings.getOne('VIDEO_AUTOPLAY')) video.play();
  };

  onVideoError = () => {
    Transmitter.emit(
      'popup',
      this.props.is4K
        ? '초고화질 영상을 지원하지 않는 환경이에요\n화질을 조정하고 새로고침 하세요'
        : '영상 재생중 오류가 발생했어요'
    );
  };

  onVideoEnd = () => {
    Tracker.send('video_end', { video_id: this.props.id });
    if (this.props.nextVideo) this.startNextCountdown();
  };

  onVideoPause = () => {
    Tracker.send('video_pause', {
      video_id: this.props.id,
      video_time: this.videoRef.current!.currentTime,
    });

    const video = this.videoRef.current;
    if (!video) return false;

    this.startTime = video.currentTime;
  };

  onVideoPlay = () => {
    Tracker.send('video_play', {
      video_id: this.props.id,
      video_time: this.videoRef.current!.currentTime,
    });

    const video = this.videoRef.current;
    if (!video) return false;

    this.startTime = video.currentTime;
  };

  onVideoTimeUpdate = () => {
    const video = this.videoRef.current;
    if (!video) return false;
    if (video.paused) return false;

    const current = video.currentTime;

    if (process.env.NODE_ENV === 'production') {
      const now = Date.now();
      if (now - this.lastBeacon > 3 * 1000) {
        this.lastBeacon = now;
        Spaceship.videoBeacon(
          this.props.id,
          Math.round(current),
          Math.round(Playtime.total())
        );
      }
    }

    const delta = Math.min(Math.max(0, current - this.startTime), 1);
    Playtime.add(this.props.id, delta);

    this.startTime = current;
  };

  startNextCountdown = async () => {
    if (!Settings.getOne('NEXT_VIDEO_AUTOPLAY')) return false;
    if (this.isPipMode() && Settings.getOne('NEXT_VIDEO_INSTANT_PIP'))
      return this.goNext();
    this.setState({ next: true });

    clearTimeout(this.timeout);

    const delay = Settings.getOne('NEXT_VIDEO_AUTOPLAY_COUNTDOWN') * 1000;
    this.timeout = setTimeout(() => {
      if (!this.state.next || this.unmounted) return false;
      Tracker.send('video_next', { next_type: 'auto' });
      this.goNext();
    }, delay);
  };

  stopNextCountdown = () => {
    clearTimeout(this.timeout);
    this.setState({ next: false });
  };

  goNext = () => {
    const query = this.props.query[0];

    let url: string = `/${this.props.nextVideo!.id}`;

    const key = query.get('k');
    const value = query.get('v');

    if (key && value) {
      const search = new URLSearchParams();
      search.set('k', key);
      search.set('v', value);

      url += '?' + search.toString();
    }

    this.props.navigate(url);
  };

  onNextClick = () => {
    Tracker.send('video_next', { next_type: 'manual' });
    this.goNext();
  };

  render() {
    return (
      <Layout>
        {this.props.url && (
          <Content
            ref={this.videoRef}
            onLoadedMetadata={this.onVideoLoad}
            onError={this.onVideoError}
            onPlay={this.onVideoPlay}
            onEnded={this.onVideoEnd}
            onTimeUpdate={this.onVideoTimeUpdate}
            onPause={this.onVideoPause}
            src={this.props.url}
            $active={this.state.loaded}
            preload={'metadata'}
            playsInline
            controls
          />
        )}
        <AnimatePresence>
          {this.state.next && this.props.nextVideo && (
            <NextWrapper
              key="next"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <NextHeader>다음 동영상</NextHeader>
              <NextMenu>
                <NextThumbnail
                  src={Spaceship.getThumbnail(this.props.nextVideo.id)}
                  onClick={this.onNextClick}
                />
                <NextContent onClick={this.onNextClick}>
                  <NextTitle>{this.props.nextVideo.title}</NextTitle>
                  <NextDescription>
                    {this.props.nextVideo.description}
                  </NextDescription>
                </NextContent>
              </NextMenu>
              <NextProgress>
                <NextIndicator
                  $length={Settings.getOne('NEXT_VIDEO_AUTOPLAY_COUNTDOWN')}
                />
              </NextProgress>
              <NextDismiss onClick={this.stopNextCountdown}>취소</NextDismiss>
            </NextWrapper>
          )}
          {!this.state.loaded && <Loader key="loader" exit={{ opacity: 0 }} />}
        </AnimatePresence>
      </Layout>
    );
  }
}

export default withParams(withNavigate(Video));
