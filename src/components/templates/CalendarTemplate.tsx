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
}

const CalendarTemplate: React.FC<Props> = ({ timestamps }) => {
  return (
    <Layout>
      <CalendarSection timestamps={timestamps} />
    </Layout>
  );
};

export default CalendarTemplate;
