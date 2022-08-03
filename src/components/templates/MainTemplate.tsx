import { Component } from 'react';
import styled from 'styled-components';
import LandingVideo from '../molecules/LandingVideo';
import PlaylistSection from '../molecules/PlaylistSection';
import ShortcutSection from '../molecules/ShortcutSection';
import { Mobile, Pc } from '../tools/MediaQuery';

const Template = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface Props {
  playlists: IPlaylist[];
  featured: ApiResponse.Playlist.ReadFeatured | null;
}

class MainTemplate extends Component<Props, any> {
  render() {
    const { playlists, featured } = this.props;

    const landingVideo = <LandingVideo data={featured} />;
    const playlistSection = <PlaylistSection playlists={playlists} />;
    const shortcutSection = <ShortcutSection />;

    return (
      <Template>
        <Mobile>
          {landingVideo}
          {playlistSection}
          {shortcutSection}
        </Mobile>
        <Pc>
          {landingVideo}
          {playlistSection}
        </Pc>
      </Template>
    );
  }
}

export default MainTemplate;
