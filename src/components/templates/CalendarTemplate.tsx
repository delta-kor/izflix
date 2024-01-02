import styled from 'styled-components';
import { MobileQuery, MobileSideMargin, PcInnerPadding, PcQuery } from '../../styles';
import CalendarSection from '../organisms/CalendarSection';
import CalendarVideoSection from '../organisms/CalendarVideoSection';
import { Pc } from '../tools/MediaQuery';

const Layout = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 0 ${MobileSideMargin}px;
  }

  ${PcQuery} {
    display: grid;
    grid-template-columns: 326px 1fr;
    gap: 0 32px;
    padding: 0 ${PcInnerPadding};
  }
`;

const CalendarPlaceholder = styled.div`
  height: 100px;
`;

interface Props {
  timestamps: CalendarTimestamp[];
  date: string;
  videos: IVideo[];
  setDate(key: string): void;
}

const CalendarTemplate: React.FC<Props> = ({ timestamps, date, setDate, videos }) => {
  return (
    <Layout>
      <Pc>
        <CalendarPlaceholder />
      </Pc>
      <CalendarSection timestamps={timestamps} date={date} setDate={setDate} />
      <CalendarVideoSection videos={videos} date={date} />
    </Layout>
  );
};

export default CalendarTemplate;
