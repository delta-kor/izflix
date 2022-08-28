import styled from 'styled-components';
import { Color, MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
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
    gap: 0 24px;
  }
`;

const VideoArea = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
  }

  ${PcQuery} {
    position: fixed;
    width: calc((100vw - ${PcInnerPadding} * 2) - min(30vw, 300px) - 24px);
  }
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;

  background: ${Color.DARK_GRAY};
`;

const ContentArea = styled.div`
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
  recommends: IVideo[];
}

const VideoTemplate: React.FC<Props> = ({ videoInfo, recommends }) => {
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
        <RecommendSection recommends={recommends} fluid />
      </ContentArea>
    </Layout>
  );
};

export default VideoTemplate;
