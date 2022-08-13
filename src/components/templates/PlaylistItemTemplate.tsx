import styled from 'styled-components';
import { MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import PlaylistInfo from '../molecules/PlaylistInfo';
import PlaylistItemSection from '../organisms/PlaylistItemSection';
import { Pc } from '../tools/MediaQuery';

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
    gap: 0 32px;
    padding: 0 ${PcInnerPadding};
  }
`;

const PlaylistInfoPlaceholder = styled.div`
  height: 100px;
`;

interface Props {
  playlist?: IPlaylist;
}

const PlaylistItemTemplate: React.FC<Props> = ({ playlist }) => {
  return (
    <Layout>
      <Pc>
        <PlaylistInfoPlaceholder />
      </Pc>
      <PlaylistInfo data={playlist} />
      <PlaylistItemSection playlist={playlist} />
    </Layout>
  );
};

export default PlaylistItemTemplate;
