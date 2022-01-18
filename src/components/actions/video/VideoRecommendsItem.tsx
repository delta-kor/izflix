import { Component } from 'react';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import { HideOverflow } from '../../../styles';

const Layout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Thumbnail = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 0 0 12px 0;
  border-radius: 4px;
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

class VideoRecommendsItem extends Component<Props> {
  render() {
    const video = this.props.video;
    return (
      <Layout>
        <Thumbnail src={Spaceship.getThumbnail(video.id)} />
        <Title>{video.title}</Title>
        <Description>{video.description}</Description>
      </Layout>
    );
  }
}

export default VideoRecommendsItem;
