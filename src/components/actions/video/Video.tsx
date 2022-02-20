import { AnimatePresence, motion } from 'framer-motion';
import React, { Component } from 'react';
import { NavigateFunction } from 'react-router-dom';
import styled from 'styled-components';
import delay from '../../../delay';
import { ReactComponent as LoaderIcon } from '../../../icons/loading-bright.svg';
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
  row-gap: 24px;
  cursor: pointer;
  user-select: none;
`;

const NextHeader = styled.div`
  font-weight: bold;
  font-size: 24px;
`;

const NextThumbnail = styled.img`
  width: 30%;
  aspect-ratio: 16 / 9;
  border-radius: 4px;
`;

const NextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
`;

const NextTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const NextDescription = styled.div`
  font-weight: normal;
  font-size: 14px;
`;

const NextProgress = styled.div`
  width: 30%;
  height: 4px;
  background: ${Color.GRAY};
  border-radius: 4px;
  overflow: hidden;
`;

const NextIndicator = styled.div`
  width: 0;
  height: 100%;
  background: ${Color.WHITE};
  border-radius: 4px;
  animation: countdown 3s forwards linear;

  @keyframes countdown {
    from {
      width: 0;
    }

    to {
      width: 100%;
    }
  }
`;

interface Props {
  id: string;
  url: string | null;
  nextVideo: IVideoItem | null;
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
  };

  onUrlUpdate = async () => {
    this.setState({ loaded: false });

    if (this.isPipMode()) {
      await this.pipOff(true);
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
    if (this.isPipMode()) return false;
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
    Transmitter.emit('popup', '영상 재생중 오류가 발생했어요');
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
  };

  onVideoPlay = () => {
    Tracker.send('video_play', {
      video_id: this.props.id,
      video_time: this.videoRef.current!.currentTime,
    });
  };

  startNextCountdown = async () => {
    this.setState({ next: true });
    await delay(3000);
    if (!this.state.next) return false;
    this.goNext();
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

  render() {
    return (
      <Layout>
        {this.props.url && (
          <Content
            ref={this.videoRef}
            onCanPlay={this.onVideoLoad}
            onError={this.onVideoError}
            onPlay={this.onVideoPlay}
            onEnded={this.onVideoEnd}
            onPause={this.onVideoPause}
            src={this.props.url}
            $active={this.state.loaded}
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
              onClick={this.goNext}
            >
              <NextHeader>다음 동영상</NextHeader>
              <NextThumbnail
                src={Spaceship.getThumbnail(this.props.nextVideo.id)}
              />
              <NextContent>
                <NextTitle>{this.props.nextVideo.title}</NextTitle>
                <NextDescription>
                  {this.props.nextVideo.description}
                </NextDescription>
              </NextContent>
              <NextProgress>
                <NextIndicator />
              </NextProgress>
            </NextWrapper>
          )}
          {!this.state.loaded && <Loader key="loader" exit={{ opacity: 0 }} />}
        </AnimatePresence>
      </Layout>
    );
  }
}

export default withParams(withNavigate(Video));
