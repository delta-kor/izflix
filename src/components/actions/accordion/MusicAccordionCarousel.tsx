import { Component } from 'react';
import styled from 'styled-components';
import { Color } from '../../../styles';
import MusicAccordionItem from './MusicAccordionItem';

const Layout = styled.div`
  width: 100vw;
  scroll-snap-align: start;
  flex-shrink: 0;
  padding: 0 0 12px 0;

  & > * {
    margin: 0 0 12px 0;

    :last-child {
      margin: 0;
    }
  }
`;

const Placeholder = styled.div`
  position: relative;
  width: 100%;
  height: 44px;

  & > div:nth-child(1) {
    position: absolute;
    top: 4px;
    left: 32px;
    width: 50%;
    max-width: calc(100% - 78px - 64px - 8px);
    height: 16px;
    border-radius: 4px;
    background: ${Color.BACKGROUND};
  }

  & > div:nth-child(2) {
    position: absolute;
    bottom: 4px;
    left: 32px;
    width: 30%;
    max-width: calc(100% - 78px - 64px - 8px);
    height: 14px;
    border-radius: 4px;
    background: ${Color.BACKGROUND};
  }

  & > div:nth-child(3) {
    position: absolute;
    top: 0;
    right: 32px;
    width: 78px;
    height: 44px;
    border-radius: 4px;
    background: ${Color.BACKGROUND};
  }
`;

const CarouselLayout = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
`;

interface Props {
  videos: IMusicVideoItem[];
  count: number;
}

class MusicAccordionCarousel extends Component<Props> {
  render() {
    const videos = this.props.videos;

    if (this.props.videos.length === 0) {
      const count = Math.min(this.props.count, 5);
      const placeholders = [];

      for (let i = 0; i < count; i++) {
        placeholders.push(
          <Placeholder key={i}>
            <div />
            <div />
            <div />
          </Placeholder>
        );
      }

      return <Layout>{placeholders}</Layout>;
    }

    if (videos.length < 5) {
      return (
        <Layout>
          {videos.map((video) => (
            <MusicAccordionItem video={video} key={video.id} />
          ))}
        </Layout>
      );
    }

    const chunked = [];
    for (let i = 0; i < videos.length; i += 5) {
      chunked.push(videos.slice(i, i + 5));
    }

    return (
      <CarouselLayout>
        {chunked.map((videos) => (
          <Layout>
            {videos.map((video) => (
              <MusicAccordionItem video={video} key={video.id} />
            ))}
          </Layout>
        ))}
      </CarouselLayout>
    );
  }
}

export default MusicAccordionCarousel;
