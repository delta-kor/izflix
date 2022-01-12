import { motion } from 'framer-motion';
import React, { Component } from 'react';
import styled from 'styled-components';
import LoaderIcon from '../../icons/loading.svg';
import { Color, HideOverflow, MobileQuery, PcQuery } from '../../styles';

const Layout = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  ${MobileQuery} {
    height: calc((100vw + 64px * 2) * (9 / 16));
  }

  ${PcQuery} {
    height: calc(100vh - 120px);
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
  left: 32px;
  bottom: 24px;
  flex-direction: column;

  & > p {
    width: calc(100vw - 64px);
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
      font-size: 24px;
      margin: 0 0 8px 0;
    }

    ${PcQuery} {
      font-size: 42px;
      margin: 0 0 12px 0;
    }
  }

  & > p:nth-child(3) {
    font-weight: normal;
    opacity: 0.7;

    ${MobileQuery} {
      font-size: 14px;
    }

    ${PcQuery} {
      font-size: 24px;
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

const src = 'https://v.iz-cdn.kro.kr/one_the_story/day1/mise_en_scene#t=30';

interface State {
  loaded: boolean;
}

class LandingVideo extends Component<any, State> {
  state: State = { loaded: false };
  videoRef = React.createRef<HTMLVideoElement>();

  componentDidMount = () => {
    const videoElement = this.videoRef.current!;
    videoElement.onloadedmetadata = () => {
      this.setState({ loaded: true });
    };
    videoElement.src = src;
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
          <p>Mise-en-Scene</p>
          <p>ONE, THE STORY Day 1</p>
        </Description>
      </Layout>
    );
  }
}

export default LandingVideo;
