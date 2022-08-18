import styled from 'styled-components';
import { MobileQuery } from '../../styles';
import CalendarSection from '../organisms/CalendarSection';
import CalendarVideoSection from '../organisms/CalendarVideoSection';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${MobileQuery} {
    padding: 0 32px;
  }
`;

interface Props {
  timestamps: CalendarTimestamp[];
  date?: string;
  videos: IVideo[];
  setDate(key: string): void;
}

const CalendarTemplate: React.FC<Props> = ({ timestamps, date, setDate, videos }) => {
  return (
    <Layout>
      <CalendarSection timestamps={timestamps} date={date} setDate={setDate} />
      <CalendarVideoSection videos={videos} />
    </Layout>
  );
};

export default CalendarTemplate;
