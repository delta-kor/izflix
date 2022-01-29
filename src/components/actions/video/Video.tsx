import { AnimatePresence, motion } from 'framer-motion';
import React, { Component } from 'react';
import styled from 'styled-components';
import { ReactComponent as LoaderIcon } from '../../../icons/loading-bright.svg';
import Settings from '../../../services/settings';
import Transmitter from '../../../services/transmitter';
import { Color, MobileQuery, PcQuery } from '../../../styles';

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

interface Props {
  url: string | null;
}

interface State {
  loaded: boolean;
}

let videoUpdatePip: boolean = false;

class Video extends Component<Props, State> {
  videoRef = React.createRef<HTMLVideoElement>();
  state: State = { loaded: false };

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

  render() {
    return (
      <Layout>
        {this.props.url && (
          <Content
            ref={this.videoRef}
            onCanPlay={this.onVideoLoad}
            onError={this.onVideoError}
            src={this.props.url}
            $active={this.state.loaded}
            controls
          />
        )}
        <AnimatePresence>
          {!this.state.loaded && <Loader exit={{ opacity: 0 }} />}
        </AnimatePresence>
      </Layout>
    );
  }
}

export default Video;
