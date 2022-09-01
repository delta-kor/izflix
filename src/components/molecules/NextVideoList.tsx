import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import { VideoPageState } from '../../pages/VideoPage';
import { Color, Ease, HideOverflow, MobileQuery, PcQuery, Text } from '../../styles';
import VideoPanel from '../atoms/VideoPanel';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 -16px;

  background: ${Color.DARK_GRAY};
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  padding: 16px 16px 12px 16px;
  min-width: 0;

  cursor: pointer;
  user-select: none;
`;

const Title = styled.div`
  flex-grow: 1;
  color: ${Color.WHITE};
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_1};
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
  }
`;

const FoldIcon = styled(Icon)`
  width: 20px;
  height: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  overflow-y: hidden;
`;

const ConstantContent = styled.div`
  padding: 0 0 16px 0;
`;

const ExpandedContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExpandedArea = styled(motion.div)`
  ${PcQuery} {
    max-height: 446px;
    overflow-x: hidden;
    overflow-y: scroll;

    margin: 0 -12px;
    padding: 0 12px;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${Color.GRAY};
      border-radius: 4px;
    }
  }
`;

const ExpandedItem = styled(motion.div)`
  padding: 0 0 12px 0;
`;

interface Props {
  videos: IVideo[];
  currentVideoId?: string;
  state?: VideoPageState;
}

const NextVideoList: React.FC<Props> = ({ videos, currentVideoId, state }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const renderingVideos: IVideo[] = [];

  if (currentVideoId && videos.some(video => video.id === currentVideoId)) {
    const sortedVideos: IVideo[] = [];

    const currentVideo = videos.find(video => video.id === currentVideoId)!;
    const currentIndex = videos.indexOf(currentVideo);

    for (let i = currentIndex + 1; i < videos.length; i++) {
      sortedVideos.push(videos[i]);
    }

    for (let i = 0; i < currentIndex; i++) {
      sortedVideos.push(videos[i]);
    }

    renderingVideos.push(...sortedVideos);
  } else {
    renderingVideos.push(...videos);
  }

  const nextExists = renderingVideos.length > 2;

  return (
    <Layout>
      <Header onClick={() => nextExists && setExpanded(!expanded)}>
        <Title>다음 동영상</Title>
        {nextExists && (
          <motion.div
            initial={'down'}
            animate={expanded ? 'down' : 'up'}
            variants={{
              up: { transform: 'rotateX(0deg)' },
              down: { transform: 'rotateX(180deg)' },
            }}
            transition={{ duration: 0.5 }}
          >
            <FoldIcon type={'down'} color={Color.WHITE} />
          </motion.div>
        )}
      </Header>
      <Content>
        <ConstantContent>
          <VideoPanel
            type={'horizontal'}
            data={renderingVideos[0]}
            link={`/${renderingVideos[0].id}`}
            state={state}
            shrink
          />
        </ConstantContent>
        <ExpandedContent>
          <AnimatePresence initial={false}>
            {expanded && (
              <ExpandedArea
                initial={'collapsed'}
                animate={'open'}
                exit={'collapsed'}
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.5, ease: Ease }}
              >
                {renderingVideos.slice(1).map(data => (
                  <ExpandedItem key={data.id}>
                    <VideoPanel
                      type={'horizontal'}
                      data={data}
                      link={`/${data.id}`}
                      state={state}
                      shrink
                    />
                  </ExpandedItem>
                ))}
              </ExpandedArea>
            )}
          </AnimatePresence>
        </ExpandedContent>
      </Content>
    </Layout>
  );
};

export default NextVideoList;