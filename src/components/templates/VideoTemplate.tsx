import styled from 'styled-components';
import { Color, MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import VideoInfoSection from '../organisms/VideoInfoSection';
import { Pc } from '../tools/MediaQuery';

const Layout = styled.div`
  ${PcQuery} {
    display: grid;
    padding: 48px ${PcInnerPadding} 0 ${PcInnerPadding};
    grid-template-columns: 1fr min(30vw, 300px);
    gap: 0 16px;
  }
`;

const VideoArea = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
  }

  ${PcQuery} {
    position: fixed;
    width: calc((100vw - ${PcInnerPadding} * 2) - min(30vw, 300px) - 16px);
  }
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;

  background: ${Color.DARK_GRAY};
`;

const ContentPlaceholder = styled.div`
  width: min(30vw, 300px);
  height: 800px;

  background: ${Color.DARK_GRAY};
`;

const VideoAreaPlaceholder = styled.div`
  height: 48px;
`;

interface Props {
  videoInfo?: ApiResponse.Video.Info;
}

const VideoTemplate: React.FC<Props> = ({ videoInfo }) => {
  return (
    <Layout>
      <Pc>
        <VideoAreaPlaceholder />
      </Pc>
      <VideoArea>
        <VideoPlaceholder />
        <VideoInfoSection videoInfo={videoInfo} />
      </VideoArea>
      <ContentPlaceholder />
    </Layout>
  );
};

export default VideoTemplate;
