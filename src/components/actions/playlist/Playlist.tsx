import { AnimatePresence, motion } from 'framer-motion';
import React, { Component } from 'react';
import styled from 'styled-components';
import { ReactComponent as LeftArrowIcon } from '../../../icons/arrow-left.svg';
import { ReactComponent as RightArrowIcon } from '../../../icons/arrow-right.svg';
import {
  Color,
  HideOverflow,
  MobileQuery,
  PcQuery,
  TabletQuery,
} from '../../../styles';
import { Pc } from '../../tools/MediaQuery';
import PlaylistVideo from './PlaylistVideo';

const Layout = styled.section`
  position: relative;
  width: 100%;

  ${MobileQuery} {
    margin: 24px 0 48px 0;
  }

  ${PcQuery} {
    max-width: 1416px;
    margin: 24px auto 72px auto;
    padding: 0 32px;
  }

  &[data-next='true'] {
    ${PcQuery} {
      max-width: unset;
      margin: 0 0 48px 0;
      padding: unset;
    }

    ${MobileQuery} {
      margin: 24px 0 32px 0;
    }
  }
`;

const Title = styled.h2`
  font-weight: bold;
  ${HideOverflow};

  ${MobileQuery} {
    margin: 0 32px 16px 32px;
    height: 18px;
    font-size: 16px;
  }

  ${PcQuery} {
    margin: 0 0 24px 0;
    height: 32px;
    font-size: 28px;
  }

  &[data-next='true'] {
    ${PcQuery} {
      margin: 48px 0 20px 0;
      height: 24px;
      font-size: 20px;
    }
  }
`;

const VideoWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  ${MobileQuery} {
    padding: 0 0 0 32px;
    scroll-padding: 0 0 0 32px;
  }

  & > * {
    scroll-snap-align: start;
    flex-shrink: 0;

    ${MobileQuery} {
      margin: 0 16px 0 0;
    }

    ${PcQuery} {
      margin: 0 24px 0 0;
    }

    :last-child {
      ${MobileQuery} {
        margin: 0 32px 0 0;
      }

      ${PcQuery} {
        margin: 0;
      }
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Arrow = styled(motion.div)<{ direction: 'left' | 'right' }>`
  position: absolute;
  transform: translateY(-50%);
  border-radius: 100%;
  background: ${Color.WHITE};
  user-select: none;
  cursor: pointer;
  z-index: 2;

  ${PcQuery} {
    width: 48px;
    height: 48px;
    top: calc(
      32px + 24px +
        (((min(100vw, 1416px) - 32px * 2 - 24px * 3) / 4) * (9 / 16)) / 2
    );

    ${({ direction }) => (direction === 'right' ? 'right: 8px;' : 'left: 8px;')}
  }

  ${TabletQuery} {
    width: 36px;
    height: 36px;
    top: calc(
      32px + 24px +
        (((min(100vw, 1416px) - 32px * 2 - 24px * 2) / 3) * (9 / 16)) / 2
    );

    ${({ direction }) =>
      direction === 'right' ? 'right: 16px;' : 'left: 16px;'}
  }

  &[data-next='true'] {
    ${PcQuery} {
      top: calc(
        24px + 20px + (((min(100vw - 64px, 1148px) - 24px * 3) / 4) * (9 / 16)) /
          2
      );

      ${({ direction }) =>
        direction === 'right' ? 'right: -24px;' : 'left: -24px;'}
    }

    ${TabletQuery} {
      top: calc(
        24px + 20px + (((min(100vw - 64px, 1148px) - 24px * 2) / 3) * (9 / 16)) /
          2
      );

      ${({ direction }) =>
        direction === 'right' ? 'right: -18px;' : 'left: -18px;'}
    }
  }

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-drag: none;

    ${PcQuery} {
      width: 32px;
      height: 32px;
    }

    ${TabletQuery} {
      width: 24px;
      height: 24px;
    }
  }
`;

type Props = PlaylistProps | NextProps;

interface PlaylistProps {
  type: 'playlist';
  playlist: IPlaylist;
}

interface NextProps {
  type: 'next';
  title: string;
  description: string;
  videos: IVideoItem[];
  urlKey: string;
  urlValue: string;
}

interface State {
  arrows: [boolean, boolean];
}

class Playlist extends Component<Props> {
  state: State = { arrows: [false, true] };
  scrollRef = React.createRef<HTMLDivElement>();

  componentDidMount = () => {
    const element = this.scrollRef.current!;
    element.addEventListener('scroll', this.onScroll);
  };

  componentWillUnmount = () => {
    const element = this.scrollRef.current!;
    element.removeEventListener('scroll', this.onScroll);
  };

  onScroll = () => {
    const element = this.scrollRef.current!;

    const { clientWidth, scrollWidth } = element;
    const currentPosition = element.scrollLeft;

    const arrows = [true, true];
    if (currentPosition === 0) arrows[0] = false;
    if (currentPosition === scrollWidth - clientWidth) arrows[1] = false;

    this.setState({ arrows });
  };

  scrollRight = () => {
    const element = this.scrollRef.current;
    if (!element) return false;

    const { clientWidth, scrollWidth } = element;
    const currentPosition = element.scrollLeft;

    if (Math.abs(scrollWidth - currentPosition - clientWidth * 2) < 32) {
      return element.scrollTo({
        left: scrollWidth,
        behavior: 'smooth',
      });
    }

    element.scrollTo({
      left: currentPosition + clientWidth,
      behavior: 'smooth',
    });
  };

  scrollLeft = () => {
    const element = this.scrollRef.current;
    if (!element) return false;

    const { clientWidth } = element;
    const currentPosition = element.scrollLeft;

    element.scrollTo({
      left: currentPosition - clientWidth,
      behavior: 'smooth',
    });
  };

  render() {
    const options = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
    };

    const type = this.props.type;
    const title =
      type === 'playlist' ? this.props.playlist.title : '다음 동영상';
    const id = type === 'playlist' ? this.props.playlist.id : 'next';
    const videos =
      type === 'playlist' ? this.props.playlist.videos : this.props.videos;

    if (type === 'next') {
      videos.forEach((video) => {
        const title = video.title || (this.props as NextProps).title;
        const description =
          video.description || (this.props as NextProps).description;
        video.title = title;
        video.description = description;
      });
    }

    return (
      <Layout data-next={type === 'next'}>
        <Title data-next={type === 'next'}>{title}</Title>
        <VideoWrapper ref={this.scrollRef}>
          {videos.map((video) =>
            type === 'playlist' ? (
              <PlaylistVideo
                key={video.id}
                type="playlist"
                video={video}
                playlistId={id}
              />
            ) : (
              <PlaylistVideo
                key={video.id}
                type="next"
                video={video}
                urlKey={this.props.urlKey}
                urlValue={this.props.urlValue}
              />
            )
          )}
        </VideoWrapper>
        <Pc>
          <AnimatePresence>
            {this.state.arrows[0] && (
              <Arrow
                data-next={type === 'next'}
                direction="left"
                onClick={this.scrollLeft}
                key="left"
                {...options}
              >
                <LeftArrowIcon />
              </Arrow>
            )}
            {this.state.arrows[1] && (
              <Arrow
                data-next={type === 'next'}
                direction="right"
                onClick={this.scrollRight}
                key="right"
                {...options}
              >
                <RightArrowIcon />
              </Arrow>
            )}
          </AnimatePresence>
        </Pc>
      </Layout>
    );
  }
}

export default Playlist;
