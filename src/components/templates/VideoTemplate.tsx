import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Panorama } from '../../hooks/usePanorama';
import { VideoPageState } from '../../pages/VideoPage';
import {
  Color,
  MobileQuery,
  MobileSideMargin,
  PcInnerPadding,
  PcQuery,
  TabletQuery,
} from '../../styles';
import FundraisingPanel from '../atoms/FundraisingPanel';
import ChapterList from '../molecules/ChapterList';
import NextVideoList from '../molecules/NextVideoList';
import VideoAction from '../molecules/VideoAction';
import RecommendSection from '../organisms/RecommendSection';
import VideoInfoSection from '../organisms/VideoInfoSection';
import Funder from '../../services/funder';

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

  ${TabletQuery} {
    grid-template-columns: 1fr min(30vw, 220px);
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

  ${TabletQuery} {
    width: calc((100vw - ${PcInnerPadding} * 2) - min(30vw, 220px) - 32px);
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
    padding: 0 ${MobileSideMargin}px;
  }

  ${PcQuery} {
    gap: 16px;
    width: min(30vw, 300px);
  }

  ${TabletQuery} {
    width: min(30vw, 220px);
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
        <VideoAction action={action} panorama={panorama} onLike={onLike} />
      </VideoArea>
      <ContentArea>
        <AnimatePresence>
          {Funder.isActive() && (
            <motion.div layoutId={'fundraising' + videoId} key={'fundraising'} {...motionProps}>
              <FundraisingPanel />
            </motion.div>
          )}
          {(panorama.videoInfo?.timeline?.chapters.length || 0) > 0 && (
            <motion.div layoutId={'chapters' + videoId} key={'chapters'} {...motionProps}>
              <ChapterList panorama={panorama} chapters={panorama.videoInfo!.timeline!.chapters} />
            </motion.div>
          )}
          {panorama.nextVideos.length > 1 && (
            <motion.div layoutId={'next videos' + videoId} key={'next videos'} {...motionProps}>
              <NextVideoList videos={panorama.nextVideos} currentVideoId={videoId} state={state} />
            </motion.div>
          )}
          <motion.div layoutId={'recommend' + videoId} key={'recommend'}>
            <RecommendSection recommends={panorama.recommends} videoRecommend />
          </motion.div>
        </AnimatePresence>
      </ContentArea>
    </Layout>
  );
};

export default VideoTemplate;
