import { AnimatePresence, motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import LoaderIcon from '../../../icons/loading-bright.svg';
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

const Loader = styled(motion.img)`
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

class Video extends Component<Props, State> {
  state: State = { loaded: false };

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.url !== this.props.url) {
      this.setState({ loaded: false });
    }
  };

  onVideoError = () => {
    Transmitter.emit('popup', '영상 재생중 오류가 발생했어요');
  };

  render() {
    return (
      <Layout>
        {this.props.url && (
          <Content
            onCanPlay={() => this.setState({ loaded: true })}
            onError={this.onVideoError}
            src={this.props.url}
            $active={this.state.loaded}
            controls
          />
        )}
        <AnimatePresence>
          {!this.state.loaded && (
            <Loader exit={{ opacity: 0 }} src={LoaderIcon} />
          )}
        </AnimatePresence>
      </Layout>
    );
  }
}

export default Video;
