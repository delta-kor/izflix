import styled from 'styled-components';
import { MobileQuery } from '../../styles';
import CalendarSection from '../organisms/CalendarSection';

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
  setDate(key: string): void;
}

const CalendarTemplate: React.FC<Props> = ({ timestamps, date, setDate }) => {
  return (
    <Layout>
      <CalendarSection timestamps={timestamps} date={date} setDate={setDate} />
    </Layout>
  );
};

export default CalendarTemplate;
