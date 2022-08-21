import styled from 'styled-components';
import VideoInfoSection from '../organisms/VideoInfoSection';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  videoInfo?: ApiResponse.Video.Info;
}

const VideoTemplate: React.FC<Props> = ({ videoInfo }) => {
  return (
    <Layout>
      <VideoInfoSection videoInfo={videoInfo} />
    </Layout>
  );
};

export default VideoTemplate;
