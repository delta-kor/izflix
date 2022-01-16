import { Component } from 'react';
import styled from 'styled-components';
import getDate from '../../../services/date';
import Spaceship from '../../../services/spaceship';
import { Color, HideOverflow } from '../../../styles';

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Thumbnail = styled.img<{ $active: boolean }>`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 4px;
  margin: 0 0 20px 0;
  opacity: ${({ $active }) => ($active ? '1' : '0')};
  transition: opacity 0.2s;
  z-index: 1;
`;

const ThumbnailPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  background: ${Color.DARK_GRAY};
  z-index: 0;
`;

const Title = styled.div`
  height: 28px;
  margin: 0 0 8px 0;
  font-weight: bold;
  font-size: 24px;
  ${HideOverflow};
`;

const Date = styled.div`
  height: 18px;
  font-weight: normal;
  font-size: 16px;
  opacity: 0.7;
  ${HideOverflow};
`;

interface Props {
  video: IMusicVideoItem;
}

interface State {
  loaded: boolean;
}

class MusicGridItem extends Component<Props, State> {
  state: State = { loaded: false };

  onLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    const music = this.props.video;

    return (
      <Layout>
        <Thumbnail
          onLoad={this.onLoad}
          $active={this.state.loaded}
          src={Spaceship.getThumbnail(music.id)}
        />
        <ThumbnailPlaceholder />
        <Title>{music.description}</Title>
        <Date>{getDate(music.date)}</Date>
      </Layout>
    );
  }
}
export default MusicGridItem;
