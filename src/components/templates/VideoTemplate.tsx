import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { Panorama } from '../../hooks/usePanorama';
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

  ${MobileQuery} {
    gap: 16px;
    padding: 0 32px;
  }

  ${PcQuery} {
    gap: 24px;
    width: min(30vw, 300px);
  }
`;

const VideoAreaPlaceholder = styled.div`
  height: 48px;
`;

interface Props {
  panorama: Panorama;
}

const VideoTemplate: React.FC<Props> = ({ panorama }) => {
  const motionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const videoId = panorama.videoInfo?.id || panorama.currentVideoId;

  return (
    <Layout>
      <Pc>
        <VideoAreaPlaceholder />
      </Pc>
      <VideoArea>
        <VideoPlaceholder />
        <VideoInfoSection videoInfo={panorama.videoInfo} />
      </VideoArea>
      <ContentArea>
        <AnimatePresence>
          {panorama.nextVideos.length > 1 && (
            <motion.div layoutId={'next videos' + videoId} key={'next videos'} {...motionProps}>
              <NextVideoList videos={panorama.nextVideos} currentVideoId={videoId} />
            </motion.div>
          )}
          <motion.div layoutId={'recommend' + videoId} key={'recommend'}>
            <RecommendSection recommends={panorama.recommends} fluid />
          </motion.div>
        </AnimatePresence>
      </ContentArea>
    </Layout>
  );
};

export default VideoTemplate;
