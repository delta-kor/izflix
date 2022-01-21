import { Component } from 'react';
import styled from 'styled-components';
import LoaderIcon from '../../../icons/loading-bright.svg';
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

const Loader = styled.img<{ $active: boolean }>`
  position: absolute;
  transition: opacity 0.2s;
  animation: spin 2s infinite linear;
  opacity: ${({ $active: active }) => (active ? 1 : 0)};
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

  render() {
    return (
      <Layout>
        {this.props.url && (
          <Content
            onCanPlay={() => this.setState({ loaded: true })}
            src={this.props.url}
            $active={this.state.loaded}
            controls
          />
        )}
        <Loader $active={!this.props.url} src={LoaderIcon} />
      </Layout>
    );
  }
}

export default Video;
