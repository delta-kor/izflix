import { Component } from 'react';
import styled from 'styled-components';
import PlaylistVideo from './PlaylistVideo';

const Layout = styled.div`
  width: 100%;
  margin: 24px 0 0 0;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin: 0 0 16px 32px;
`;

const VideoWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0 0 0 32px;
  scroll-padding: 0 0 0 32px;

  & > * {
    scroll-snap-align: start;
    flex-shrink: 0;
    margin: 0 16px 0 0;

    :last-child {
      margin: 0 32px 0 0;
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

interface Props {
  playlist: IPlaylist;
}

class Playlist extends Component<Props> {
  render() {
    return (
      <Layout>
        <Title>{this.props.playlist.title}</Title>
        <VideoWrapper>
          {this.props.playlist.videos.map((video) => (
            <PlaylistVideo video={video} key={video.id} />
          ))}
        </VideoWrapper>
      </Layout>
    );
  }
}

export default Playlist;
