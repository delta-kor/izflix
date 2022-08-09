import styled from 'styled-components';
import LandingVideo from '../molecules/LandingVideo';
import VodSection from '../organisms/VodSection';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface Props {
  featured: ApiResponse.Playlist.ReadFeatured | null;
  playlists: IPlaylist[];
}

const VodTemplate: React.FC<Props> = ({ featured, playlists }) => {
  return (
    <Layout>
      <LandingVideo type={'vod'} data={featured} />
      <VodSection playlists={playlists} />
    </Layout>
  );
};

export default VodTemplate;
