import styled from 'styled-components';
import { MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import AlbumItem from '../atoms/AlbumItem';

const Layout = styled.div`
  display: grid;
  ${MobileQuery} {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    padding: 0 32px 16px 32px;
  }

  ${PcQuery} {
    grid-template-columns: repeat(auto-fill, minmax(max(120px, (100% - 5 * 16px) / 6), 1fr));
    gap: 16px;
    padding: 0 ${PcInnerPadding} 16px ${PcInnerPadding};
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
