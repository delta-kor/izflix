import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import {
  Color,
  HideOverflow,
  MobileQuery,
  PcQuery,
  TabletQuery,
} from '../../../styles';

const Layout = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
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

const Thumbnail = styled.img<{ $active: boolean }>`
  object-fit: cover;
  border-radius: 6px;
  width: 100%;
  aspect-ratio: 16 / 9;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.2s;
  z-index: 1;

  ${MobileQuery} {
    height: 117px;
    margin: 0 0 8px 0;
  }

  ${PcQuery} {
    margin: 0 0 16px 0;
  }
`;

const Title = styled.div`
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

interface State {
  loaded: boolean;
}

class PlaylistVideo extends Component<Props, State> {
  state: State = { loaded: false };

  render() {
    const video = this.props.video;
    const type = this.props.type;

    const key = type === 'playlist' ? 'playlist' : this.props.urlKey;
    const value =
      type === 'playlist' ? this.props.playlistId : this.props.urlValue;

    return (
      <Layout to={`/${video.id}?k=${key}&v=${value}`}>
        <Placeholder />
        <Thumbnail
          onLoad={() => this.setState({ loaded: true })}
          $active={this.state.loaded}
          src={Spaceship.getThumbnail(video.id)}
          loading="lazy"
        />
        <Title>{video.title}</Title>
        <Description>{video.description}</Description>
      </Layout>
    );
  }
}

export default PlaylistVideo;
