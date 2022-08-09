import styled from 'styled-components';
import { Color, MobileQuery, PcQuery } from '../../styles';
import VodItem from '../molecules/VodItem';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  z-index: 1;
  background: ${Color.BACKGROUND};

  ${MobileQuery} {
    margin: -24px 0 0 0;
  }

  ${PcQuery} {
    margin: -16px 0 0 0;
  }
`;

interface Props {
  playlists: IPlaylist[];
}

const VodSection: React.FC<Props> = ({ playlists }) => {
  return (
    <Layout>
      {playlists.length ? (
        playlists.map(data => <VodItem data={data} />)
      ) : (
        <Repeat count={5} element={i => <VodItem key={i} />} />
      )}
    </Layout>
  );
};

export default VodSection;
