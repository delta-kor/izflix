import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import Tracker from '../../services/tracker';
import Notice from '../../stores/notice';
import {
  Color,
  Ease,
  EaseReverse,
  HideOverflow,
  MobileQuery,
  PcInnerPadding,
  PcQuery,
  Text,
} from '../../styles';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    padding: 0 32px;
    gap: 8px;
  }

  ${PcQuery} {
    gap: 12px;
    max-width: 640px;
    margin: 0 32px 0 ${PcInnerPadding};
  }
`;

const ArticleWrapper = styled.div`
  padding: 16px;
  background: ${Color.DARK_GRAY};
  border-radius: 8px;
  overflow: hidden;
`;

const ArticleHeader = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
  user-select: none;

  z-index: 2;
`;

const ArticleTitle = styled.div`
  flex-grow: 1;
  color: ${Color.WHITE};
  ${Text.HEADLINE_3};
  ${HideOverflow};
`;

const ArticleIcon = styled(Icon)`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
`;

const ArticleContent = styled(motion.div)`
  p {
    margin: 2px 0;
    color: ${Color.WHITE};
    ${Text.BODY_1};
    height: unset;
  }

  a {
    color: ${Color.PRIMARY};
    font-weight: 700;
  }

  b {
    font-weight: 800;
  }

  h3 {
    margin: 16px 0 8px 0;
  }

  hr {
    border: 1px solid ${Color.GRAY};
    margin: 12px 0;
  }
`;

const PositionBlock = styled.div`
  width: 100%;
  height: 12px;
`;

const NoticeTemplate: React.FC = () => {
  const { i18n } = useTranslation();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (expanded !== null) {
      Tracker.send('notice_selected', { notice_id: expanded });
    }
  }, [expanded]);

  const language = i18n.language === 'ko' ? 'ko' : 'en';

  return (
    <Layout>
      {Notice.map(notice => (
        <ArticleWrapper key={notice.id}>
          <ArticleHeader onClick={() => setExpanded(expanded === notice.id ? null : notice.id)}>
            <ArticleTitle>{notice.title[language]}</ArticleTitle>
            <motion.div
              initial={'down'}
              animate={expanded === notice.id ? 'down' : 'up'}
              variants={{
                up: { transform: 'rotateX(0deg)' },
                down: { transform: 'rotateX(180deg)' },
              }}
              transition={{ duration: 0.3 }}
            >
              <ArticleIcon type={'down'} color={Color.WHITE} />
            </motion.div>
          </ArticleHeader>
          <AnimatePresence initial={false}>
            {expanded === notice.id && (
              <ArticleContent
                initial={'collapsed'}
                animate={'open'}
                exit={'collapsed'}
                variants={{
                  open: {
                    opacity: 1,
                    height: 'auto',
                    scale: 1,
                    transition: { ease: EaseReverse },
                  },
                  collapsed: {
                    opacity: 0,
                    height: 0,
                    scale: 0.9,
                    transition: { ease: Ease },
                  },
                }}
                transition={{ duration: 0.3 }}
                key={'content'}
              >
                <PositionBlock />
                <ReactMarkdown>{notice.content[language]}</ReactMarkdown>
              </ArticleContent>
            )}
          </AnimatePresence>
        </ArticleWrapper>
      ))}
    </Layout>
  );
};

export default NoticeTemplate;
