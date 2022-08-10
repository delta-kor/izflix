import styled from 'styled-components';
import { MobileQuery } from '../../styles';
import VideoPanel from '../atoms/VideoPanel';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

interface Props {
  playlist?: IPlaylist;
}

const PlaylistVideoSection: React.FC<Props> = ({ playlist }) => {
  const videos = (playlist && playlist.video) || [];

  return (
    <Layout>
      {videos.length ? (
        videos.map(data => <VideoPanel type={'horizontal'} data={data} />)
      ) : (
        <Repeat count={6} element={i => <VideoPanel type={'horizontal'} key={i} />} />
      )}
    </Layout>
  );
};

export default PlaylistVideoSection;
