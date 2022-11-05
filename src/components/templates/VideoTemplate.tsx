import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Panorama } from '../../hooks/usePanorama';
import { VideoPageState } from '../../pages/VideoPage';
import { Color, MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import NextVideoList from '../molecules/NextVideoList';
import VideoAction from '../molecules/VideoAction';
import RecommendSection from '../organisms/RecommendSection';
import VideoInfoSection from '../organisms/VideoInfoSection';

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
    width: calc((100vw - ${PcInnerPadding} * 2) - min(30vw, 300px) - 32px);
  }
`;

const VideoPlaceholder = styled.div`
  ${MobileQuery} {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  ${PcQuery} {
    display: none;
  }
`;

const VideoHider = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${Color.DARK_GRAY};
  z-index: 49;

  ${MobileQuery} {
    position: fixed;
    top: 0;
    left: 0;
  }
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

interface Props {
  panorama: Panorama;
  action?: ApiResponse.Video.Action;
  onLike(): void;
}

const VideoTemplate: React.FC<Props> = ({ panorama, action, onLike }) => {
  const location = useLocation();
  const state = location.state as VideoPageState | undefined;

  const motionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const videoId = panorama.videoInfo?.id || panorama.currentVideoId;

  return (
    <Layout>
      <VideoArea>
        <VideoPlaceholder />
        <VideoHider />
        <VideoInfoSection videoInfo={panorama.videoInfo} />
        <VideoAction action={action} downloadUrl={panorama.streamInfo?.url} onLike={onLike} />
      </VideoArea>
      <ContentArea>
        <AnimatePresence>
          {panorama.nextVideos.length > 1 && (
            <motion.div layoutId={'next videos' + videoId} key={'next videos'} {...motionProps}>
              <NextVideoList videos={panorama.nextVideos} currentVideoId={videoId} state={state} />
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
