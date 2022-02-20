import { Component } from 'react';
import styled from 'styled-components';
import { Color, MobileQuery, PcQuery } from '../../../styles';
import VideoRecommendsItem from './VideoRecommendsItem';

const Wrapper = styled.div`
  ${MobileQuery} {
    padding: 0 32px;
  }
`;

const Layout = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;

    & > * {
      margin: 0 0 24px 0;

      :last-child {
        margin: 0;
      }
    }
  }

  ${PcQuery} {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-gap: 36px 48px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  user-select: none;

  ${MobileQuery} {
    margin: 24px 0 16px 0;
    font-size: 16px;
  }

  ${PcQuery} {
    margin: 24px 0 20px 0;
    font-size: 20px;
  }
`;

const Placeholder = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;

  & > *:nth-child(1) {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    margin: 0 0 12px 0;
    border-radius: 4px;
    background: ${Color.DARK_GRAY};
  }

  & > *:nth-child(2) {
    width: 100%;
    border-radius: 4px;
    background: ${Color.DARK_GRAY};

    ${MobileQuery} {
      height: 18px;
      margin: 0 0 4px 0;
    }

    ${PcQuery} {
      height: 24px;
      margin: 4px 0 6px 0;
    }
  }

  & > *:nth-child(3) {
    width: 70%;
    border-radius: 4px;
    background: ${Color.DARK_GRAY};

    ${MobileQuery} {
      height: 14px;
      font-size: 12px;
    }

    ${PcQuery} {
      height: 16px;
      font-size: 14px;
    }
  }
`;

interface Props {
  id: string;
  videos: IVideoItem[];
}

class VideoRecommends extends Component<Props> {
  render() {
    const placeholders = [];
    for (let i = 0; i < 12; i++) {
      placeholders.push(
        <Placeholder key={i}>
          <div />
          <div />
          <div />
        </Placeholder>
      );
    }

    return (
      <Wrapper>
        <Title>연관 동영상</Title>
        <Layout>
          {this.props.videos.length
            ? this.props.videos.map((video) => (
                <VideoRecommendsItem key={video.id} video={video} />
              ))
            : placeholders}
        </Layout>
      </Wrapper>
    );
  }
}

export default VideoRecommends;
