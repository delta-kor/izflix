import { Component } from 'react';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import Transmitter from '../../../services/transmitter';
import { MobileQuery, PcQuery } from '../../../styles';
import VideoRecommendsItem from './VideoRecommendsItem';

const Wrapper = styled.div`
  ${MobileQuery} {
    padding: 0 32px;
  }
`;

const Layout = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;

    & > * {
      margin: 0 0 24px 0;

      :last-child {
        margin: 0;
      }
    }
  }

  ${PcQuery} {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-gap: 36px 48px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin: 0 0 16px 0;
`;

interface Props {
  id: string;
}

interface State {
  videos: IVideoItem[];
}

class VideoRecommends extends Component<Props, State> {
  state: State = { videos: [] };

  componentDidMount = () => {
    this.loadData();
  };

  loadData = async () => {
    const id = this.props.id;
    const data = await Spaceship.getRecommends(id, 12);
    if (!data.ok) return Transmitter.emit('popup', data.message);
    this.setState({ videos: data.videos });
  };

  render() {
    return (
      <Wrapper>
        <Title>연관 동영상</Title>
        <Layout>
          {this.state.videos.map((video) => (
            <VideoRecommendsItem key={video.id} video={video} />
          ))}
        </Layout>
      </Wrapper>
    );
  }
}

export default VideoRecommends;
