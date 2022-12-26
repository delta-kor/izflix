import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import Cache from '../../services/cache';
import Tracker from '../../services/tracker';
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

const ItemList = styled.div`
  display: grid;
  margin: -16px;
  padding: 16px;

  ${MobileQuery} {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 8px 8px;
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
  date: string;
}

const CalendarVideoSection: React.FC<Props> = ({ videos, date }) => {
  const device = useDevice();

  return (
    <Layout>
      <ItemList>
        {videos.length ? (
          videos.map(data => (
            <VideoPanel
              type={device === 'mobile' ? 'horizontal' : 'full'}
              data={data}
              link={`/${data.id}`}
              state={{ key: 'calendar', value: date }}
              onClick={() => Tracker.send('calendar_video_clicked', { video_id: data.id })}
              key={data.id}
            />
          ))
        ) : (
          <Repeat
            count={Cache.get(date) || 6}
            element={(i: number) => (
              <VideoPanel type={device === 'mobile' ? 'horizontal' : 'full'} key={i} />
            )}
          />
        )}
      </ItemList>
    </Layout>
  );
};

export default CalendarVideoSection;
