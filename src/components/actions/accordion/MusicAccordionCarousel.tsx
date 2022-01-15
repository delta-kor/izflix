import { Component, UIEvent } from 'react';
import styled from 'styled-components';
import { Color } from '../../../styles';
import MusicAccordionItem from './MusicAccordionItem';

const Layout = styled.div`
  width: 100vw;
  scroll-snap-align: start;
  flex-shrink: 0;
  overflow: hidden;

  & > div {
    margin: 0 0 12px 0;

    :last-of-type {
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

const CarouselWrapper = styled.div`
  overflow: hidden;
`;

const CarouselLayout = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const CarouselHandle = styled.span`
  display: flex;
  height: 32px;
  justify-content: center;
  align-items: center;

  & > * {
    margin: 0 16px 0 0;

    :last-child {
      margin: 0;
    }
  }
`;

const CarouselHandleItem = styled.div<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  background: ${({ $active }) => ($active ? Color.WHITE : Color.GRAY)};
  border-radius: 100%;
  transition: background 0.1s;
`;

interface Props {
  videos: IMusicVideoItem[];
  count: number;
}

interface State {
  page: number;
}

class MusicAccordionCarousel extends Component<Props> {
  state: State = { page: 0 };

  onScroll = (e: UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const scrollLeft = element.scrollLeft;
    const elementWidth = element.clientWidth;
    const page = Math.round(scrollLeft / elementWidth);
    this.setState({ page });
  };

  render() {
    const videos = this.props.videos;

    const handleItems = [];
    for (let i = 0; i < this.props.count / 5; i++)
      handleItems.push(
        <CarouselHandleItem key={i} $active={this.state.page === i} />
      );

    const handle = <CarouselHandle>{handleItems}</CarouselHandle>;

    if (videos.length === 0) {
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

      return (
        <CarouselWrapper>
          <CarouselLayout>
            <Layout>{placeholders}</Layout>
          </CarouselLayout>
          {handle}
        </CarouselWrapper>
      );
    }

    const chunked = [];
    for (let i = 0; i < videos.length; i += 5) {
      chunked.push(videos.slice(i, i + 5));
    }

    return (
      <CarouselWrapper>
        <CarouselLayout onScroll={this.onScroll}>
          {chunked.map((videos, index) => (
            <Layout key={index}>
              {videos.map((video) => (
                <MusicAccordionItem video={video} key={video.id} />
              ))}
            </Layout>
          ))}
        </CarouselLayout>
        {handle}
      </CarouselWrapper>
    );
  }
}

export default MusicAccordionCarousel;
