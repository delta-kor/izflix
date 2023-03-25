import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Panorama } from '../../hooks/usePanorama';
import Icon from '../../icons/Icon';
import { VideoPageState } from '../../pages/VideoPage';
import Transmitter from '../../services/transmitter';
import { Color, Ease, EaseReverse, HideOverflow, MobileQuery, PcQuery, Text } from '../../styles';
import ChapterItem from '../atoms/ChapterItem';

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
  transform: skew(0.1deg);
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
  chapters: IChapter[];
}

const ChapterList: React.FC<Props> = ({ chapters }) => {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Layout>
      <Header onClick={() => setExpanded(!expanded)}>
        <Title>{t('video.timeline')}</Title>
        <motion.div
          initial={'down'}
          animate={expanded ? 'down' : 'up'}
          variants={{
            up: { transform: 'rotateX(0deg)' },
            down: { transform: 'rotateX(180deg)' },
          }}
          transition={{ duration: 0.3 }}
        >
          <FoldIcon type={'down'} color={Color.WHITE} />
        </motion.div>
      </Header>
      <Content>
        <ExpandedContent>
          <AnimatePresence initial={false}>
            {expanded && (
              <ExpandedArea
                initial={'collapsed'}
                animate={'open'}
                exit={'collapsed'}
                variants={{
                  open: {
                    opacity: 1,
                    height: 'auto',
                    y: 0,
                    transition: { ease: EaseReverse },
                  },
                  collapsed: {
                    opacity: 0,
                    height: 0,
                    y: -15,
                    transition: { ease: Ease },
                  },
                }}
                transition={{ duration: 0.7 }}
              >
                {chapters.map(data => (
                  <ExpandedItem key={data.time}>
                    <ChapterItem chapter={data} onClick={(time) => Transmitter.emit('seek', time)}/>
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

export default ChapterList;
