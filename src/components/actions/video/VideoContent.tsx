import { Component } from 'react';
import styled from 'styled-components';
import Video from './Video';
import VideoInfo from './VideoInfo';

const Layout = styled.div``;

interface Props {
  streamInfo: ApiResponse.Video.Stream | null;
  videoInfo: ApiResponse.Video.Info | null;
}

class VideoContent extends Component<Props> {
  render() {
    return (
      <Layout>
        <Video url={this.props.streamInfo?.url || null} />
        <VideoInfo data={this.props.videoInfo} />
      </Layout>
    );
  }
}

export default VideoContent;
