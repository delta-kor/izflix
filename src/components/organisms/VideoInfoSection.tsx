import styled from 'styled-components';
import VideoInfo from '../atoms/VideoInfo';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  videoInfo?: ApiResponse.Video.Info;
}

const VideoInfoSection: React.FC<Props> = ({ videoInfo }) => {
  return (
    <Layout>
      <VideoInfo videoInfo={videoInfo} />
    </Layout>
  );
};

export default VideoInfoSection;
