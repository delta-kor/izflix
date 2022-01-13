import { motion } from 'framer-motion';
import React, { Component } from 'react';
import styled from 'styled-components';
import LoaderIcon from '../../icons/loading.svg';
import Spaceship from '../../services/spaceship';
import Transmitter from '../../services/transmitter';
import { Color, HideOverflow, MobileQuery, PcQuery } from '../../styles';

const Layout = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  ${MobileQuery} {
    height: calc((100vw + 64px * 2) * (9 / 16));
  }

  ${PcQuery} {
    height: calc(100vh - 180px);
  }
`;

const Video = styled(motion.video)`
  display: block;
  position: absolute;
  object-fit: cover;
  object-position: center;
  background: ${Color.BACKGROUND};

  ${MobileQuery} {
    left: -64px;
    right: -64px;
    height: 99%;
  }

  ${PcQuery} {
    left: 0;
    top: 0;
    width: 100%;
    height: 99%;
  }
`;

const Cover = styled.div`
  position: absolute;

  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  ${MobileQuery} {
    background: linear-gradient(180deg, rgba(7, 13, 45, 0.2) 0%, #070d2d 100%);
  }

  ${PcQuery} {
    background: linear-gradient(180deg, rgba(7, 13, 45, 0.2) 0%, #070d2d 100%);
  }
`;

const Description = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  flex-direction: column;

  & > p {
    width: calc(100vw - 64px);
    max-width: calc(1416px - 64px);
    ${HideOverflow}
  }

  & > p:nth-child(1) {
    font-weight: bold;

    ${MobileQuery} {
      font-size: 16px;
      margin: 0 0 12px 0;
    }

    ${PcQuery} {
      font-size: 24px;
      margin: 0 0 24px 0;
    }
  }

  & > p:nth-child(2) {
    font-weight: 800;

    ${MobileQuery} {
      height: 28px;
      line-height: 28px;
      font-size: 24px;
      margin: 0 0 8px 0;
    }

    ${PcQuery} {
      height: 48px;
      line-height: 48px;
      font-size: 42px;
      margin: 0 0 12px 0;
    }
  }

  & > p:nth-child(3) {
    font-weight: normal;
    opacity: 0.7;

    ${MobileQuery} {
      height: 16px;
      line-height: 16px;
      font-size: 14px;
    }

    ${PcQuery} {
      height: 28px;
      line-height: 28px;
      font-size: 24px;
    }
  }

  & > div:nth-child(2) {
    background: ${Color.DARK_GRAY};
    border-radius: 4px;

    ${MobileQuery} {
      width: 70%;
      max-width: 328px;
      height: 28px;
      margin: 0 0 8px 0;
    }

    ${PcQuery} {
      width: 40%;
      max-width: 388px;
      height: 48px;
      margin: 0 0 12px 0;
    }
  }

  & > div:nth-child(3) {
    background: ${Color.DARK_GRAY};
    border-radius: 4px;

    ${MobileQuery} {
      width: 30%;
      height: 16px;
    }

    ${PcQuery} {
      width: 25%;
      max-width: 246px;
      height: 28px;
    }
  }
`;

const Loader = styled.img<{ active: boolean }>`
  position: absolute;
  transition: opacity 1s;
  animation: spin 2s infinite linear;
  opacity: ${({ active }) => (active ? 1 : 0)};
  user-select: none;
  z-index: 5;

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

interface State {
  loaded: boolean;
  video: IVideoItem | null;
}

class LandingVideo extends Component<any, State> {
  state: State = { loaded: false, video: null };
  videoRef = React.createRef<HTMLVideoElement>();

  componentDidMount = async () => {
    document.addEventListener('scroll', this.onScroll);

    const videoElement = this.videoRef.current!;
    videoElement.onloadedmetadata = () => {
      this.setState({ loaded: true });
    };
    videoElement.onerror = () => {
      Transmitter.emit('popup', '영상 재생중 오류가 발생했어요');
    };

    this.load();
  };

  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.onScroll);
  };

  load = async () => {
    const videoElement = this.videoRef.current!;
    const playlist = await this.getPlaylist();

    if (playlist) {
      const length = playlist.videos.length;
      const random = Math.floor(Math.random() * length);
      const video = playlist.videos[random];
      this.setState({ video });

      const videoData = await Spaceship.streamVideo(video.id, 1080);
      if (!videoData.ok) return Transmitter.emit('popup', videoData.message);

      const startingPoint = Math.round(video.duration * 0.55);
      videoElement.src = `${videoData.url}#t=${startingPoint}`;
    }
  };

  getPlaylist = async () => {
    const response = await Spaceship.getAllPlaylists();
    if (!response.ok) return void Transmitter.emit('popup', response.message);

    return response.playlists.find((playlist) => playlist.featured)!;
  };

  onScroll = () => {
    const videoElement = this.videoRef.current;
    if (!videoElement) return false;

    const scrollLimit = videoElement.clientHeight * 0.9;

    if (window.scrollY > scrollLimit) {
      videoElement.pause();
    }

    if (window.scrollY <= scrollLimit) {
      videoElement.play();
    }
  };

  render() {
    return (
      <Layout>
        <Video
          ref={this.videoRef}
          variants={{ initial: { opacity: 0 }, load: { opacity: 1 } }}
          initial="initial"
          animate={this.state.loaded ? 'load' : 'initial'}
          transition={{ duration: 3 }}
          muted
          autoPlay
          loop
        />
        <Cover />
        <Loader src={LoaderIcon} active={!this.state.loaded} />
        <Description>
          <p>인기 동영상</p>
          {this.state.video ? (
            <>
              <p>{this.state.video.title}</p>
              <p>{this.state.video.description}</p>
            </>
          ) : (
            <>
              <div />
              <div />
            </>
          )}
        </Description>
      </Layout>
    );
  }
}

export default LandingVideo;
