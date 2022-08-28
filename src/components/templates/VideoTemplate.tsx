import styled from 'styled-components';
import { Color, MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import NextVideoList from '../molecules/NextVideoList';
import RecommendSection from '../organisms/RecommendSection';
import VideoInfoSection from '../organisms/VideoInfoSection';
import { Pc } from '../tools/MediaQuery';

const Layout = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  ${PcQuery} {
    display: grid;
    padding: 48px ${PcInnerPadding} 0 ${PcInnerPadding};
    grid-template-columns: 1fr min(30vw, 300px);
    gap: 0 32px;
  }
`;

const VideoArea = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
  }

  ${PcQuery} {
    position: fixed;
    width: calc((100vw - ${PcInnerPadding} * 2) - min(30vw, 300px) - 32px);
  }
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;

  background: ${Color.DARK_GRAY};
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${MobileQuery} {
    padding: 0 32px;
  }

  ${PcQuery} {
    width: min(30vw, 300px);
  }
`;

const VideoAreaPlaceholder = styled.div`
  height: 48px;
`;

interface Props {
  videoInfo?: ApiResponse.Video.Info;
  nextVideos: IVideo[];
  recommends: IVideo[];
}

const VideoTemplate: React.FC<Props> = ({ videoInfo, nextVideos, recommends }) => {
  return (
    <Layout>
      <Pc>
        <VideoAreaPlaceholder />
      </Pc>
      <VideoArea>
        <VideoPlaceholder />
        <VideoInfoSection videoInfo={videoInfo} />
      </VideoArea>
      <ContentArea>
        <NextVideoList videos={nextVideos} />
        <RecommendSection recommends={recommends} fluid />
      </ContentArea>
    </Layout>
  );
};

export default VideoTemplate;
