import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import { Color, HideOverflow } from '../../../styles';

const Layout = styled(Link)`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Thumbnail = styled.img<{ $active: boolean }>`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 0 0 12px 0;
  border-radius: 4px;
  opacity: ${({ $active }) => ($active ? '1' : '0')};
  transition: opacity 0.2s;
  z-index: 2;
`;

const ThumbnailPlaceholder = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  background: ${Color.DARK_GRAY};
  z-index: 1;
`;

const Title = styled.div`
  margin: 0 0 4px 0;
  font-weight: bold;
  font-size: 16px;
  max-width: 100%;
  ${HideOverflow};
`;

const Description = styled.div`
  font-weight: bold;
  font-size: 12px;
  max-width: 100%;
  opacity: 0.7;
  ${HideOverflow};
`;

interface Props {
  video: IVideoItem;
}

interface State {
  loaded: boolean;
}

class VideoRecommendsItem extends Component<Props, State> {
  state: State = { loaded: false };

  render() {
    const video = this.props.video;
    return (
      <Layout to={`/${video.id}`}>
        <Thumbnail
          onLoad={() => this.setState({ loaded: true })}
          $active={this.state.loaded}
          src={Spaceship.getThumbnail(video.id)}
          loading="lazy"
        />
        <ThumbnailPlaceholder />
        <Title>{video.title}</Title>
        <Description>{video.description}</Description>
      </Layout>
    );
  }
}

export default VideoRecommendsItem;
