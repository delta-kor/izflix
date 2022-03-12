import { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import { getDate, getDuration } from '../../../services/time';
import Tracker from '../../../services/tracker';
import { Color, HideOverflow } from '../../../styles';

const Layout = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  user-select: none;
  font-size: 0;
`;

const Thumbnail = styled(LazyLoadImage)`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 4px;
  margin: 0 0 20px 0;
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

const Title = styled.h1`
  height: 28px;
  margin: 0 0 8px 0;
  font-weight: bold;
  font-size: 24px;
  ${HideOverflow};
`;

const Date = styled.time`
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

class MusicGridItem extends Component<Props> {
  render() {
    const video = this.props.video;

    return (
      <Layout
        to={`/${video.id}?k=music&v=${this.props.musicId}`}
        onClick={() =>
          Tracker.send('music_grid_clicked', { video_id: video.id })
        }
      >
        <Thumbnail
          src={Spaceship.getThumbnail(video.id)}
          effect="opacity"
          width="100%"
          wrapperProps={{
            style: { zIndex: '1' },
          }}
        />
        <ThumbnailPlaceholder />
        <Title>{video.description}</Title>
        <Date>{getDate(video.date)}</Date>
        <Duration>{getDuration(video.duration, video.is_4k)}</Duration>
      </Layout>
    );
  }
}
export default MusicGridItem;
