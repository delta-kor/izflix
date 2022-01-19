import { motion } from 'framer-motion';
import { Component } from 'react';
import { Params } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import Transmitter from '../../services/transmitter';
import { MobileQuery, PcQuery } from '../../styles';
import VideoContent from '../actions/video/VideoContent';
import VideoRecommends from '../actions/video/VideoRecommends';
import withParams from '../tools/Params';

const Page = styled(motion.div)`
  ${MobileQuery} {
    padding: 0 0 88px 0;
  }

  ${PcQuery} {
    padding: 96px 32px 0 32px;
    margin: 0 auto;
    width: 100%;
    max-width: 1212px;
  }
`;

interface Props {
  params: Params;
}

interface State {
  streamInfo: ApiResponse.Video.Stream | null;
  videoInfo: ApiResponse.Video.Info | null;
}

class VideoPage extends Component<Props, State> {
  state: State = { streamInfo: null, videoInfo: null };

  componentDidMount = () => {
    this.loadData();
  };

  loadData = () => {
    const id = this.props.params.id!;
    const quality = 1080;
    this.loadVideoInfo(id);
    this.loadStreamInfo(id, quality);
  };

  loadStreamInfo = async (id: string, quality: number) => {
    const data = await Spaceship.streamVideo(id, quality);
    if (!data.ok) return Transmitter.emit('popup', data.message);
    this.setState({ streamInfo: data });
  };

  loadVideoInfo = async (id: string) => {
    const data = await Spaceship.getVideoInfo(id);
    if (!data.ok) return Transmitter.emit('popup', data.message);
    setTimeout(() => {
      this.setState({ videoInfo: data });
    }, 1000);
  };

  render() {
    const id = this.props.params.id!;

    const videoContent = (
      <VideoContent
        streamInfo={this.state.streamInfo}
        videoInfo={this.state.videoInfo}
      />
    );

    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {videoContent}
        <VideoRecommends id={id} />
      </Page>
    );
  }
}

export default withParams(VideoPage);
