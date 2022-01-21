import { Component } from 'react';
import styled from 'styled-components';
import { Color, MobileQuery } from '../../../styles';

const Layout = styled.div`
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
      </Layout>
    );
  }
}

export default Video;
