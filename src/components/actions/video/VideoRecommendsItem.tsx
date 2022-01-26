import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import { getDuration } from '../../../services/time';
import { Color, HideOverflow, MobileQuery, PcQuery } from '../../../styles';

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
  animation-delay: 0.1s;
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
  font-weight: bold;
  max-width: 100%;
  ${HideOverflow};

  ${MobileQuery} {
    height: 18px;
    margin: 0 0 4px 0;
    font-size: 16px;
  }

  ${PcQuery} {
    height: 24px;
    margin: 4px 0 6px 0;
    font-size: 20px;
  }
`;

const Description = styled.div`
  font-weight: bold;
  max-width: 100%;
  opacity: 0.7;
  ${HideOverflow};

  ${MobileQuery} {
    height: 14px;
    font-size: 12px;
  }

  ${PcQuery} {
    height: 16px;
    font-size: 14px;
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
    bottom: 54px;
    padding: 2px 4px;
    font-size: 10px;
    border-radius: 4px;
  }

  ${PcQuery} {
    right: 6px;
    bottom: 68px;
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 4px;
  }
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
        <Duration>{getDuration(video.duration)}</Duration>
      </Layout>
    );
  }
}

export default VideoRecommendsItem;
