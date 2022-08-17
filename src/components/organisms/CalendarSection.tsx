import Calendar from '../atoms/Calendar';

interface Props {
  timestamps: CalendarTimestamp[];
}

const CalendarSection: React.FC<Props> = ({ timestamps }) => {
  return <Calendar timestamps={timestamps} />;
};

export default CalendarSection;
