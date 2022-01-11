import { Component } from 'react';
import styled from 'styled-components';
import { HideOverflow, MobileQuery, PcQuery } from '../../styles';

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

const Video = styled.video`
  display: block;
  position: absolute;
  object-fit: cover;
  object-position: center;

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

class LandingVideo extends Component {
  render() {
    return (
      <Layout>
        <Video
          src="https://v.iz-cdn.kro.kr/one_the_story/day1/mise_en_scene#t=30"
          muted
          autoPlay
          loop
        ></Video>
        <Cover />
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
