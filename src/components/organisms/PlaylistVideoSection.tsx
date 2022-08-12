import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import { MobileQuery, PcQuery } from '../../styles';
import VideoPanel from '../atoms/VideoPanel';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  ${PcQuery} {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(max(240px, calc((100% - (3 * 24px)) / 4)), 1fr)
    );
    gap: 32px 24px;
  }
`;

interface Props {
  playlist?: IPlaylist;
}

const PlaylistVideoSection: React.FC<Props> = ({ playlist }) => {
  const device = useDevice();
  const videoPanelType = device === 'mobile' ? 'horizontal' : 'full';

  const videos = (playlist && playlist.video) || [];

  return (
    <Layout>
      {videos.length ? (
        videos.map(data => <VideoPanel type={videoPanelType} data={data} key={data.id} />)
      ) : (
        <Repeat count={12} element={i => <VideoPanel type={videoPanelType} key={i} />} />
      )}
    </Layout>
  );
};

export default PlaylistVideoSection;
