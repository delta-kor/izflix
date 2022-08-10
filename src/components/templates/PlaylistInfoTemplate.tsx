import styled from 'styled-components';
import { MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import PlaylistInfo from '../molecules/PlaylistInfo';

const Layout = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 0 32px;
  }

  ${PcQuery} {
    display: grid;
    grid-template-columns: 326px 1fr;
    gap: 0 64px;
    padding: 0 ${PcInnerPadding};
  }
`;

interface Props {
  playlist?: IPlaylist;
}

const PlaylistInfoTemplate: React.FC<Props> = ({ playlist }) => {
  return (
    <Layout>
      <PlaylistInfo data={playlist} />
    </Layout>
  );
};

export default PlaylistInfoTemplate;
