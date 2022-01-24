import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import { getDate, getDuration } from '../../../services/time';
import { Color, HideOverflow } from '../../../styles';

const Layout = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  user-select: none;
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
  user-drag: none;
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

const Duration = styled.div`
  position: absolute;
  display: inline-block;
  font-weight: bold;
  background: ${Color.DARK_GRAY};
  z-index: 2;

  right: 6px;
  bottom: 80px;
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 4px;
`;

interface Props {
  musicId: string;
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
    const video = this.props.video;

    return (
      <Layout to={`/${video.id}?k=music&v=${this.props.musicId}`}>
        <Thumbnail
          onLoad={this.onLoad}
          $active={this.state.loaded}
          src={Spaceship.getThumbnail(video.id)}
          loading="lazy"
        />
        <ThumbnailPlaceholder />
        <Title>{video.description}</Title>
        <Date>{getDate(video.date)}</Date>
        <Duration>{getDuration(video.duration)}</Duration>
      </Layout>
    );
  }
}
export default MusicGridItem;
