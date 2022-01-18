import { Component } from 'react';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import Transmitter from '../../../services/transmitter';
import { Color } from '../../../styles';
import MusicGridItem from './MusicGridItem';

const Layout = styled.div`
  display: grid;
  width: 100%;
  max-width: 1416px;
  padding: 0 32px 64px 32px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 36px 48px;
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > *:nth-child(1) {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 4px;
    margin: 0 0 20px 0;
    background: ${Color.DARK_GRAY};
  }

  & > *:nth-child(2) {
    width: 100%;
    height: 28px;
    margin: 0 0 8px 0;
    border-radius: 4px;
    background: ${Color.DARK_GRAY};
  }

  & > *:nth-child(3) {
    width: 40%;
    height: 18px;
    border-radius: 4px;
    background: ${Color.DARK_GRAY};
  }
`;

interface Props {
  selected: string | null;
  count: number;
}

interface State {
  videos: IMusicVideoItem[];
}

class MusicGrid extends Component<Props, State> {
  state: State = { videos: [] };

  componentDidMount = () => {
    this.updateData();
  };

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.selected !== this.props.selected) this.updateData();
  };

  updateData = async () => {
    this.setState({ videos: [] });

    if (!this.props.selected) return false;

    const data = await Spaceship.viewOneMusic(this.props.selected);
    if (!data.ok) return Transmitter.emit('popup', data.message);

    this.setState({ videos: data.videos.sort((a, b) => a.date - b.date) });
  };

  render() {
    const placeholders = [];
    for (let i = 0; i < this.props.count; i++) {
      placeholders.push(
        <Placeholder key={i}>
          <div />
          <div />
          <div />
        </Placeholder>
      );
    }

    return (
      <Layout>
        {this.state.videos.length
          ? this.state.videos.map((video) => (
              <MusicGridItem
                key={video.id}
                musicId={this.props.selected!}
                video={video}
              />
            ))
          : placeholders}
      </Layout>
    );
  }
}

export default MusicGrid;
