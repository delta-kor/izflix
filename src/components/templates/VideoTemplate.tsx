import styled from 'styled-components';
import VideoInfoSection from '../organisms/VideoInfoSection';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
`;

interface Props {
  videoInfo?: ApiResponse.Video.Info;
}

const VideoTemplate: React.FC<Props> = ({ videoInfo }) => {
  return (
    <Layout>
      <VideoPlaceholder />
      <VideoInfoSection videoInfo={videoInfo} />
    </Layout>
  );
};

export default VideoTemplate;
