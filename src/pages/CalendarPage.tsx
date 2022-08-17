import { useEffect, useState } from 'react';
import CalendarTemplate from '../components/templates/CalendarTemplate';
import HttpException from '../exceptions/http-exception';
import Spaceship from '../services/spaceship';
import Page from './Page';

const CalendarPage: React.FC = () => {
  const [timestamps, setTimestamps] = useState<CalendarTimestamp[]>([]);
  const [date, setDate] = useState<string | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  const loadAllCalendars = async () => {
    const response = await Spaceship.getAllCalendars();
    if (!response.ok) throw new HttpException(response);

    const timestamps = response.timestamps;
    setTimestamps(timestamps);
  };

  const loadData = () => {
    loadAllCalendars();
  };

  return (
    <Page>
      <CalendarTemplate timestamps={timestamps} date={date} setDate={setDate} />
    </Page>
  );
};

export default CalendarPage;
