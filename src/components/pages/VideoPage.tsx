import { motion } from 'framer-motion';
import { Component } from 'react';
import { Params } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import Transmitter from '../../services/transmitter';
import { MobileQuery } from '../../styles';
import Video from '../actions/video/Video';
import VideoInfo from '../actions/video/VideoInfo';
import VideoRecommends from '../actions/video/VideoRecommends';
import { Mobile } from '../tools/MediaQuery';
import withParams from '../tools/Params';

const Page = styled(motion.div)`
  ${MobileQuery} {
    padding: 0 0 64px 0;
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
    this.setState({ videoInfo: data });
  };

  render() {
    const id = this.props.params.id!;

    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Video url={this.state.streamInfo?.url || null} />
        <Mobile>
          <VideoInfo data={this.state.videoInfo} />
          <VideoRecommends id={id} />
        </Mobile>
      </Page>
    );
  }
}

export default withParams(VideoPage);
