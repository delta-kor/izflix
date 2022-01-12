import React, { Component } from 'react';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import { Color, HideOverflow } from '../../styles';

const Layout = styled.div`
  position: relative;
  width: 208px;
  user-select: none;
`;

const Placeholder = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 117px;
  background: ${Color.DARK_GRAY};
  border-radius: 4px;
  opacity: ${({ active }) => (!active ? 1 : 0)};
  transition: 0.2s opacity;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 117px;
  margin: 0 0 8px 0;
  object-fit: cover;
  border-radius: 4px;
`;

const Title = styled.div`
  margin: 0 0 4px 0;
  max-width: 100%;
  font-weight: 800;
  font-size: 16px;
  ${HideOverflow}
`;

const Description = styled.div`
  max-width: 100%;
  font-weight: bold;
  font-size: 12px;
  opacity: 0.7;
  ${HideOverflow}
`;

interface Props {
  video: IVideoItem;
}

interface State {
  loaded: boolean;
}

class PlaylistVideo extends Component<Props, State> {
  state: State = { loaded: false };
  imageRef = React.createRef<HTMLImageElement>();

  componentDidMount = () => {
    const imageElement = this.imageRef.current!;
    imageElement.onload = () => {
      this.setState({ loaded: true });
    };

    imageElement.src = Spaceship.getThumbnail(this.props.video.id);
  };

  render() {
    const video = this.props.video;
    console.log(this.state.loaded);

    return (
      <Layout>
        <Placeholder active={this.state.loaded} />
        <Thumbnail ref={this.imageRef} loading="lazy" />
        <Title>{video.title}</Title>
        <Description>{video.description}</Description>
      </Layout>
    );
  }
}

export default PlaylistVideo;
