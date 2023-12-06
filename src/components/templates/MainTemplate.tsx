import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import LandingVideo from '../molecules/LandingVideo';
import PlaylistSection from '../organisms/PlaylistSection';
import RecommendSection from '../organisms/RecommendSection';
import ShortcutSection from '../organisms/ShortcutSection';
import VodSection from '../organisms/VodSection';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface Props {
  featured: ApiResponse.Playlist.ReadFeatured | null;
  playlists: IPlaylist[];
  vodPlaylists: IPlaylist[];
  recommends: IVideo[];
}

const MainTemplate: React.FC<Props> = ({ featured, playlists, vodPlaylists, recommends }) => {
  const device = useDevice();

  return (
    <Layout>
      <LandingVideo type={'performance'} data={featured} />
      <PlaylistSection playlists={playlists} />
      {device === 'mobile' ? <ShortcutSection /> : null}
      <VodSection playlists={vodPlaylists} />
      <RecommendSection recommends={recommends} />
    </Layout>
  );
};

export default MainTemplate;
