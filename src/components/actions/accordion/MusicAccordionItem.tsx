import { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import { getDate } from '../../../services/time';
import Tracker from '../../../services/tracker';
import { Color, HideOverflow } from '../../../styles';

const Layout = styled(Link)`
  position: relative;
  display: flex;
  width: 100%;
  height: 44px;
  padding: 0 32px;
`;

const Content = styled.div`
  display: flex;
  width: calc(100% - 78px - 8px);
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  height: 16px;
  font-weight: bold;
  font-size: 14px;
  margin: 0 0 6px 0;
  ${HideOverflow};
`;

const Date = styled.div`
  height: 14px;
  font-weight: normal;
  font-size: 12px;
  opacity: 0.7;
  ${HideOverflow};
`;

const Thumbnail = styled(LazyLoadImage)`
  position: relative;
  width: 78px;
  height: 44px;
  border-radius: 4px;
  margin: 0 0 0 8px;
  z-index: 1;
`;

const ThumbnailPlaceholder = styled.div`
  position: absolute;
  top: 0;
  right: 32px;
  width: 78px;
  height: 44px;
  border-radius: 4px;
  background: ${Color.BACKGROUND};
  z-index: 0;
`;

interface Props {
  musicId: string;
  video: IMusicVideoItem;
}

class MusicAccordionItem extends Component<Props> {
  render() {
    const video = this.props.video;

    return (
      <Layout
        to={`/${video.id}?k=music&v=${this.props.musicId}`}
        onClick={() =>
          Tracker.send('music_accordion_clicked', {
            music_id: this.props.musicId,
          })
        }
      >
        <Content>
          <Title>{video.description}</Title>
          <Date>{getDate(video.date)}</Date>
        </Content>
        <Thumbnail
          src={Spaceship.getThumbnail(video.id)}
          effect="opacity"
          width="78px"
          wrapperProps={{ style: { position: 'relative', zIndex: '1' } }}
        />
        <ThumbnailPlaceholder />
      </Layout>
    );
  }
}

export default MusicAccordionItem;
