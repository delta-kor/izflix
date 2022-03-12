import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import isCrawler from '../../../services/crawl';
import Spaceship from '../../../services/spaceship';
import { getDuration } from '../../../services/time';
import Tracker from '../../../services/tracker';
import {
  Color,
  HideOverflow,
  MobileQuery,
  PcQuery,
  TabletQuery,
} from '../../../styles';

const Layout = styled.article`
  position: relative;
  user-select: none;

  ${MobileQuery} {
    width: 208px;
  }

  ${PcQuery} {
    width: calc((100% - 24px * 3) / 4);
  }

  ${TabletQuery} {
    width: calc((100% - 24px * 2) / 3);
  }
`;

const Content = styled(Link)`
  display: flex;
  flex-direction: column;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${Color.DARK_GRAY};
  border-radius: 6px;
  z-index: 0;

  ${MobileQuery} {
    height: 117px;
  }
`;

const Thumbnail = styled(LazyLoadImage)`
  position: relative;
  object-fit: cover;
  border-radius: 6px;
  width: 100%;
  aspect-ratio: 16 / 9;
  z-index: 1;

  ${MobileQuery} {
    height: 117px;
    margin: 0 0 4px 0;
  }

  ${PcQuery} {
    margin: 0 0 12px 0;
  }
`;

const Title = styled.div`
  display: block;
  max-width: 100%;
  font-weight: 800;

  ${HideOverflow}

  ${MobileQuery} {
    margin: 0 0 4px 0;
    height: 18px;
    font-size: 16px;
  }

  ${PcQuery} {
    margin: 0 0 8px 0;
    font-size: 24px;
    height: 28px;
  }
`;

const Description = styled.div`
  display: block;
  max-width: 100%;
  font-weight: bold;
  opacity: 0.7;
  ${HideOverflow}

  ${MobileQuery} {
    height: 14px;
    font-size: 12px;
  }

  ${PcQuery} {
    height: 18px;
    font-size: 16px;
  }
`;

const Duration = styled.div`
  position: absolute;
  display: inline-block;
  font-weight: bold;
  background: ${Color.DARK_GRAY};
  z-index: 2;

  ${MobileQuery} {
    right: 6px;
    bottom: 50px;
    padding: 2px 4px;
    font-size: 10px;
    border-radius: 2px;
  }

  ${PcQuery} {
    right: 6px;
    bottom: 76px;
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 4px;
  }
`;

type Props = PlaylistProps | NextProps;

interface PlaylistProps {
  type: 'playlist';
  video: IVideoItem;
  playlistId: string;
}

interface NextProps {
  type: 'next';
  video: IVideoItem;
  urlKey: string;
  urlValue: string;
}

class PlaylistVideo extends Component<Props> {
  render() {
    const video = this.props.video;
    const type = this.props.type;

    const key = type === 'playlist' ? 'playlist' : this.props.urlKey;
    const value =
      type === 'playlist' ? this.props.playlistId : this.props.urlValue;

    return (
      <Layout>
        <Content
          to={`/${video.id}?k=${key}&v=${value}`}
          onClick={() =>
            Tracker.send(
              type === 'playlist' ? 'playlist_clicked' : 'next_clicked',
              { video_id: video.id }
            )
          }
        >
          <Placeholder />
          {!isCrawler() && (
            <Thumbnail
              src={Spaceship.getThumbnail(video.id)}
              effect="opacity"
              width="100%"
            />
          )}
          <Title>{video.title}</Title>
          <Description>{video.description}</Description>
          <Duration>{getDuration(video.duration, video.is_4k)}</Duration>
        </Content>
      </Layout>
    );
  }
}

export default PlaylistVideo;
