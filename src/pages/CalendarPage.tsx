import { useEffect, useState } from 'react';
import CalendarTemplate from '../components/templates/CalendarTemplate';
import HttpException from '../exceptions/http-exception';
import Spaceship from '../services/spaceship';
import Page from './Page';

const CalendarPage: React.FC = () => {
  const [timestamps, setTimestamps] = useState<CalendarTimestamp[]>([]);
  const [date, setDate] = useState<string>('190401');
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadOneCalendar(date);
  }, [date]);

  const loadAllCalendars = async () => {
    const response = await Spaceship.getAllCalendars();
    if (!response.ok) throw new HttpException(response);

    const timestamps = response.timestamps;
    setTimestamps(timestamps);
  };

  const loadOneCalendar = async (key: string) => {
    setVideos([]);

    const response = await Spaceship.getOneCalendar(key);
    if (!response.ok) throw new HttpException(response);

    const videos = response.videos;
    setVideos(videos);
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
