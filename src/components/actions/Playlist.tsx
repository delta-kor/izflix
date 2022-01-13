import { Component } from 'react';
import styled from 'styled-components';
import { MobileQuery, PcQuery } from '../../styles';
import PlaylistVideo from './PlaylistVideo';

const Layout = styled.div`
  width: 100%;

  ${MobileQuery} {
    margin: 24px 0 0 0;
  }

  ${PcQuery} {
    max-width: 1416px;
    margin: 24px auto 0 auto;
    padding: 0 32px;
  }
`;

const Title = styled.div`
  font-weight: bold;

  ${MobileQuery} {
    font-size: 16px;
    margin: 0 0 16px 32px;
  }

  ${PcQuery} {
    font-size: 28px;
    margin: 0 0 24px 0;
  }
`;

const VideoWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  ${MobileQuery} {
    padding: 0 0 0 32px;
    scroll-padding: 0 0 0 32px;
  }

  ${PcQuery} {
  }

  & > * {
    scroll-snap-align: start;
    flex-shrink: 0;

    ${MobileQuery} {
      margin: 0 16px 0 0;
    }

    ${PcQuery} {
      margin: 0 24px 0 0;
    }

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
