import Calendar from '../atoms/Calendar';

interface Props {
  timestamps: CalendarTimestamp[];
  date?: string;
  setDate(key: string): void;
}

const CalendarSection: React.FC<Props> = ({ timestamps, date, setDate }) => {
  return <Calendar timestamps={timestamps} date={date} setDate={setDate} />;
};

export default CalendarSection;
