import { motion } from 'framer-motion';
import { Component } from 'react';
import { Params } from 'react-router-dom';
import styled from 'styled-components';
import PathFinder from '../../services/path-finder';
import Scroll from '../../services/scroll';
import Spaceship from '../../services/spaceship';
import Transmitter from '../../services/transmitter';
import {
  Color,
  HideOverflow,
  MobileQuery,
  PcQuery,
  TabletQuery,
} from '../../styles';
import Playlist from '../actions/playlist/Playlist';
import VideoContent from '../actions/video/VideoContent';
import VideoRecommends from '../actions/video/VideoRecommends';
import withParams from '../tools/Params';

const Page = styled(motion.div)`
  ${MobileQuery} {
    padding: calc(100vw * (9 / 16)) 0 88px 0;
  }

  ${PcQuery} {
    padding: 96px 32px 64px 32px;
    margin: 0 auto;
    width: 100%;
    max-width: 1212px;
  }
`;

const NextPlaceholder = styled.div`
  width: 100%;

  ${PcQuery} {
    margin: 0 0 48px 0;
  }

  ${MobileQuery} {
    margin: 24px 0 32px 0;
  }

  & > *:nth-child(1) {
    font-weight: bold;
    ${HideOverflow};

    ${MobileQuery} {
      margin: 0 32px 16px 32px;
      height: 18px;
      font-size: 16px;
    }

    ${PcQuery} {
      margin: 48px 0 20px 0;
      height: 24px;
      font-size: 20px;
    }
  }

  & > *:nth-child(2) {
    display: flex;
    overflow-x: hidden;

    ${MobileQuery} {
      padding: 0 0 0 32px;
    }

    & > * {
      flex-shrink: 0;

      ${MobileQuery} {
        margin: 0 16px 0 0;
      }

      ${PcQuery} {
        margin: 0 24px 0 0;
      }

      :last-child {
        ${MobileQuery} {
          margin: 0 32px 0 0;
        }

        ${PcQuery} {
          margin: 0;
        }
      }
    }

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const NextVideoPlaceholder = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    width: 208px;
  }

  ${PcQuery} {
    width: calc((100% - 24px * 3) / 4);
  }

  ${TabletQuery} {
    width: calc((100% - 24px * 2) / 3);
  }

  & > *:nth-child(1) {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 6px;
    background: ${Color.DARK_GRAY};

    ${MobileQuery} {
      height: 117px;
      margin: 0 0 8px 0;
    }

    ${PcQuery} {
      margin: 0 0 16px 0;
    }
  }

  & > *:nth-child(2) {
    width: 100%;
    border-radius: 4px;
    background: ${Color.DARK_GRAY};

    ${MobileQuery} {
      margin: 0 0 4px 0;
      height: 18px;
    }

    ${PcQuery} {
      margin: 0 0 8px 0;
      height: 28px;
    }
  }

  & > *:nth-child(3) {
    width: 70%;
    border-radius: 4px;
    background: ${Color.DARK_GRAY};

    ${MobileQuery} {
      height: 14px;
    }

    ${PcQuery} {
      height: 18px;
    }
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
  nextError: boolean;
  quality: number;
}

class VideoPage extends Component<Props, State> {
  state: State = {
    streamInfo: null,
    videoInfo: null,
    nextVideo: [],
    nextError: false,
    quality: 1080,
  };

  componentDidMount = () => {
    Scroll.up();
    this.loadData();
  };

  componentDidUpdate = (_: Props, prevState: State) => {
    if (prevState.quality !== this.state.quality) {
      const id = this.props.params.id!;
      const quality = this.state.quality;
      this.setState({ streamInfo: null });
      this.loadStreamInfo(id, quality);
    }
  };

  loadData = async () => {
    const id = this.props.params.id!;
    const quality = this.state.quality;
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

    for (const { path, count } of data.path) {
      PathFinder.set(path, count);
    }

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
      if (!data.ok) {
        this.setState({ nextError: true });
        return Transmitter.emit('popup', data.message);
      }

      videos.push(...data.videos);
    }

    if (key === 'music') {
      const data = await Spaceship.viewOneMusic(value);
      if (!data.ok) {
        this.setState({ nextError: true });
        return Transmitter.emit('popup', data.message);
      }

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
      if (!data.ok || data.type !== 'children') {
        this.setState({ nextError: true });
        return Transmitter.emit('popup', data.message);
      }

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
        id={id}
        streamInfo={this.state.streamInfo}
        videoInfo={this.state.videoInfo}
        setQuality={(quality) => this.setState({ quality })}
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

    const isNextEnabled =
      ['playlist', 'music', 'category'].includes(key!) && !this.state.nextError;
    const isNextLoaded = this.state.nextVideo.length && this.state.videoInfo;

    const placeholders = [];
    for (let i = 0; i < 4; i++) {
      placeholders.push(
        <NextVideoPlaceholder key={i}>
          <div />
          <div />
          <div />
        </NextVideoPlaceholder>
      );
    }

    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {videoContent}
        {isNextLoaded ? (
          nextVideo.length ? (
            <Playlist
              type="next"
              title={this.state.videoInfo!.title}
              description={this.state.videoInfo!.description}
              videos={nextVideo}
              urlKey={key!}
              urlValue={value!}
            />
          ) : (
            <></>
          )
        ) : isNextEnabled ? (
          <NextPlaceholder>
            <div>다음 동영상</div>
            <div>{placeholders}</div>
          </NextPlaceholder>
        ) : (
          <></>
        )}
        <VideoRecommends id={id} />
      </Page>
    );
  }
}

export default withParams(VideoPage);
