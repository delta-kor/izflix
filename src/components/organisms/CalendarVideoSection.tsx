import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { Color, MobileQuery, PcQuery } from '../../styles';
import VideoPanel from '../atoms/VideoPanel';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  background: ${Color.BACKGROUND};
  z-index: 1;
`;

const ItemList = styled(motion.div)`
  display: grid;
  margin: -16px;
  padding: 16px;

  ${MobileQuery} {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 24px 24px;
  }

  ${PcQuery} {
    grid-template-columns: repeat(
      auto-fill,
      minmax(max(240px, calc((100% - (2 * 24px)) / 3)), 1fr)
    );
    gap: 32px 24px;
  }
`;
interface Props {
  videos: IVideo[];
}

const CalendarVideoSection: React.FC<Props> = ({ videos }) => {
  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>
        <ItemList
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          key={videos[0]?.id}
        >
          {videos.length ? (
            videos.map(data => (
              <VideoPanel type={'full'} data={data} link={`/${data.id}`} key={data.id} />
            ))
          ) : (
            <Repeat count={6} element={(i: number) => <VideoPanel type={'full'} key={i} />} />
          )}
        </ItemList>
      </AnimatePresence>
    </Layout>
  );
};

export default CalendarVideoSection;
