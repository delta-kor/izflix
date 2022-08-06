import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import LandingVideo from '../molecules/LandingVideo';
import PlaylistSection from '../molecules/sections/PlaylistSection';
import RecommendSection from '../molecules/sections/RecommendSection';
import ShortcutSection from '../molecules/sections/ShortcutSection';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface Props {
  featured: ApiResponse.Playlist.ReadFeatured | null;
  playlists: IPlaylist[];
  recommends: IVideo[];
}

const MainTemplate: React.FC<Props> = ({ featured, playlists, recommends }) => {
  const device = useDevice();

  const landingVideo = <LandingVideo type={'performance'} data={featured} />;
  const playlistSection = <PlaylistSection playlists={playlists} />;
  const shortcutSection = <ShortcutSection />;
  const recommendSection = <RecommendSection recommends={recommends} />;

  return (
    <Layout>
      {landingVideo}
      {playlistSection}
      {device === 'mobile' ? shortcutSection : null}
      {recommendSection}
    </Layout>
  );
};

export default MainTemplate;
