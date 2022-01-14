import { AnimatePresence, motion } from 'framer-motion';
import React, { Component } from 'react';
import styled from 'styled-components';
import LeftArrowIcon from '../../../icons/arrow-left.svg';
import RightArrowIcon from '../../../icons/arrow-right.svg';
import {
  Color,
  HideOverflow,
  MobileQuery,
  PcQuery,
  TabletQuery,
} from '../../../styles';
import { Pc } from '../../tools/MediaQuery';
import PlaylistVideo from './PlaylistVideo';

const Layout = styled.div`
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
`;

const Title = styled.div`
  font-weight: bold;
  ${HideOverflow};

  ${MobileQuery} {
    font-size: 16px;
    margin: 0 32px 16px 32px;
  }

  ${PcQuery} {
    font-size: 28px;
    height: 32px;
    margin: 0 0 24px 0;
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

  ${PcQuery} {
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

  & > img {
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

interface Props {
  playlist: IPlaylist;
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

    return (
      <Layout>
        <Title>{this.props.playlist.title}</Title>
        <VideoWrapper ref={this.scrollRef}>
          {this.props.playlist.videos.map((video) => (
            <PlaylistVideo video={video} key={video.id} />
          ))}
        </VideoWrapper>
        <Pc>
          <AnimatePresence>
            {this.state.arrows[0] && (
              <Arrow
                direction="left"
                onClick={this.scrollLeft}
                key="left"
                {...options}
              >
                <img src={LeftArrowIcon} alt={'scroll left'} />
              </Arrow>
            )}
            {this.state.arrows[1] && (
              <Arrow
                direction="right"
                onClick={this.scrollRight}
                key="right"
                {...options}
              >
                <img src={RightArrowIcon} alt={'scroll right'} />
              </Arrow>
            )}
          </AnimatePresence>
        </Pc>
      </Layout>
    );
  }
}

export default Playlist;
