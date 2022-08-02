import { Component } from 'react';
import LandingVideo from '../molecules/LandingVideo';
import PlaylistSection from '../molecules/PlaylistSection';

interface Props {
  playlists: IPlaylist[];
  featured: ApiResponse.Playlist.ReadFeatured | null;
}

class MainTemplate extends Component<Props, any> {
  render() {
    const { playlists, featured } = this.props;

    return (
      <>
        <LandingVideo data={featured} />
        <PlaylistSection playlists={playlists} />
      </>
    );
  }
}

export default MainTemplate;
