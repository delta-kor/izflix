import styled from 'styled-components';
import { MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import AlbumItem from '../atoms/AlbumItem';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  ${MobileQuery} {
    padding: 0 32px;
  }

  ${PcQuery} {
    padding: 0 ${PcInnerPadding};
  }
`;

interface Props {
  albums: IAlbum[];
}

const AlbumSection: React.FC<Props> = ({ albums }) => {
  return (
    <Layout>
      {albums.map(data => (
        <AlbumItem data={data} />
      ))}
    </Layout>
  );
};

export default AlbumSection;
