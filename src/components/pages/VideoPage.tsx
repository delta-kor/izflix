import { motion } from 'framer-motion';
import { Component } from 'react';
import { Params } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import Transmitter from '../../services/transmitter';
import { MobileQuery, PcQuery } from '../../styles';
import Playlist from '../actions/playlist/Playlist';
import VideoContent from '../actions/video/VideoContent';
import VideoRecommends from '../actions/video/VideoRecommends';
import withParams from '../tools/Params';

const Page = styled(motion.div)`
  ${MobileQuery} {
    padding: 0 0 88px 0;
  }

  ${PcQuery} {
    padding: 96px 32px 64px 32px;
    margin: 0 auto;
    width: 100%;
    max-width: 1212px;
  }
`;

interface Props {
  params: Params;
  query: [URLSearchParams];
}

interface State {
  streamInfo: ApiResponse.Video.Stream | null;
  videoInfo: ApiResponse.Video.Info | null;
  nextVideo: IVideoItem[];
}

class VideoPage extends Component<Props, State> {
  state: State = { streamInfo: null, videoInfo: null, nextVideo: [] };

  componentDidMount = () => {
    this.loadData();
  };

  loadData = async () => {
    const id = this.props.params.id!;
    const quality = 1080;
    this.loadStreamInfo(id, quality);
    this.loadVideoInfo(id);
    this.loadNextVideo();
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

  loadNextVideo = async () => {
    const query = this.props.query[0];

    const key = query.get('k');
    const value = query.get('v');

    if (!key || !value) return false;

    const videos: IVideoItem[] = [];

    if (key === 'playlist') {
      const data = await Spaceship.getOnePlaylist(value);
      if (!data.ok) return Transmitter.emit('popup', data.message);
      videos.push(...data.videos);
    }

    if (key === 'music') {
      const data = await Spaceship.viewOneMusic(value);
      if (!data.ok) return Transmitter.emit('popup', data.message);
      videos.push(
        ...data.videos
          .sort((a, b) => a.date - b.date)
          .map((video) => ({
            id: video.id,
            title: '',
            description: video.description,
            duration: video.duration,
          }))
      );
    }

    if (key === 'category') {
      const data = await Spaceship.viewOneCategory(value);
      if (!data.ok || data.type !== 'children')
        return Transmitter.emit('popup', data.message);
      videos.push(
        ...data.files
          .sort((a, b) => a.date - b.date)
          .map((file) => ({
            id: file.id,
            title: file.title,
            description: '',
            duration: file.duration,
          }))
      );
    }

    this.setState({ nextVideo: videos });
  };

  render() {
    const query = this.props.query[0];
    const key = query.get('k');
    const value = query.get('v');

    const id = this.props.params.id!;

    const videoContent = (
      <VideoContent
        streamInfo={this.state.streamInfo}
        videoInfo={this.state.videoInfo}
      />
    );

    const nextVideo: IVideoItem[] = [];
    if (!this.state.videoInfo) nextVideo.push(...this.state.nextVideo);
    else {
      let index: number = 0;

      for (const item of this.state.nextVideo) {
        if (item.id === id) {
          const left = this.state.nextVideo.slice(0, index);
          const right = this.state.nextVideo.slice(index + 1);
          nextVideo.push(...right, ...left);
          break;
        }

        index++;
      }
    }

    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {videoContent}
        {this.state.nextVideo.length && this.state.videoInfo ? (
          <Playlist
            type="next"
            title={this.state.videoInfo.title || ''}
            description={this.state.videoInfo.description || ''}
            videos={nextVideo}
            urlKey={key!}
            urlValue={value!}
          />
        ) : (
          <></>
        )}
        <VideoRecommends id={id} />
      </Page>
    );
  }
}

export default withParams(VideoPage);
