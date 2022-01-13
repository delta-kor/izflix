import React, { Component } from 'react';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import {
  Color,
  HideOverflow,
  MobileQuery,
  PcQuery,
  TabletQuery,
} from '../../styles';

const Layout = styled.div`
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

const Placeholder = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: ${Color.DARK_GRAY};
  border-radius: 4px;
  opacity: ${({ active }) => (!active ? 1 : 0)};
  transition: 0.5s opacity;

  ${MobileQuery} {
    height: 117px;
  }

  ${PcQuery} {
    height: calc(((min(100vw, 1416px) - 32px * 2 - 24px * 3) / 4) * (9 / 16));
  }

  ${TabletQuery} {
    height: calc(((min(100vw, 1416px) - 32px * 2 - 24px * 2) / 3) * (9 / 16));
  }
`;

const Thumbnail = styled.img`
  object-fit: cover;
  border-radius: 4px;
  width: 100%;
  opacity: 0;

  ${MobileQuery} {
    height: 117px;
    margin: 0 0 8px 0;
  }

  ${PcQuery} {
    height: calc(((min(100vw, 1416px) - 32px * 2 - 24px * 3) / 4) * (9 / 16));
    margin: 0 0 16px 0;
  }

  ${TabletQuery} {
    height: calc(((min(100vw, 1416px) - 32px * 2 - 24px * 2) / 3) * (9 / 16));
  }
`;

const Title = styled.div`
  max-width: 100%;
  font-weight: 800;
  ${HideOverflow}

  ${MobileQuery} {
    font-size: 16px;
    margin: 0 0 4px 0;
  }

  ${PcQuery} {
    font-size: 24px;
    margin: 0 0 8px 0;
  }
`;

const Description = styled.div`
  max-width: 100%;
  font-weight: bold;
  opacity: 0.7;
  ${HideOverflow}

  ${MobileQuery} {
    font-size: 12px;
  }

  ${PcQuery} {
    font-size: 16px;
  }
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
      imageElement.style.opacity = '1';
      this.setState({ loaded: true });
    };

    imageElement.src = Spaceship.getThumbnail(this.props.video.id);
  };

  render() {
    const video = this.props.video;

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
