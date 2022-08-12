import styled from 'styled-components';
import AlbumSection from '../organisms/AlbumSection';

const Layout = styled.div``;

interface Props {
  albums: IAlbum[];
}

const MusicTemplate: React.FC<Props> = ({ albums }) => {
  return (
    <Layout>
      <AlbumSection albums={albums} />
    </Layout>
  );
};

export default MusicTemplate;
