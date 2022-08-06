import styled from 'styled-components';
import LandingVideo from '../molecules/LandingVideo';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface Props {
  featured: ApiResponse.Playlist.ReadFeatured | null;
}

const VodTemplate: React.FC<Props> = ({ featured }) => {
  return (
    <Layout>
      <LandingVideo type={'vod'} data={featured} />;
    </Layout>
  );
};

export default VodTemplate;
