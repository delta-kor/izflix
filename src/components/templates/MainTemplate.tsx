import { Component } from 'react';
import LandingVideo from '../molecules/LandingVideo';
import PlaylistSection from '../molecules/PlaylistSection';

interface Props {
  playlists: IPlaylist[];
}

class MainTemplate extends Component<Props, any> {
  render() {
    const { playlists } = this.props;

    return (
      <>
        <LandingVideo />
        <PlaylistSection playlists={playlists}/>
      </>
    );
  }
}

export default MainTemplate;
