import { Component } from 'react';
import styled from 'styled-components';
import LandingVideo from '../molecules/LandingVideo';
import PlaylistSection from '../molecules/sections/PlaylistSection';
import RecommendSection from '../molecules/sections/RecommendSection';
import ShortcutSection from '../molecules/sections/ShortcutSection';
import { Mobile, Pc } from '../tools/MediaQuery';

const Template = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface Props {
  featured: ApiResponse.Playlist.ReadFeatured | null;
  playlists: IPlaylist[];
  recommends: IVideo[];
}

class MainTemplate extends Component<Props, any> {
  render() {
    const { featured, playlists, recommends } = this.props;

    const landingVideo = <LandingVideo data={featured} />;
    const playlistSection = <PlaylistSection playlists={playlists} />;
    const shortcutSection = <ShortcutSection />;
    const recommendSection = <RecommendSection recommends={recommends} />;

    return (
      <Template>
        <Mobile>
          {landingVideo}
          {playlistSection}
          {shortcutSection}
          {recommendSection}
        </Mobile>
        <Pc>
          {landingVideo}
          {playlistSection}
          {recommendSection}
        </Pc>
      </Template>
    );
  }
}

export default MainTemplate;
