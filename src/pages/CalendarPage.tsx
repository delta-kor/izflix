import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Meta from '../components/Meta';
import CalendarTemplate from '../components/templates/CalendarTemplate';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import Cache from '../services/cache';
import Spaceship from '../services/spaceship';
import Page from './Page';

const CalendarPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const state = location.state as { date?: string };

  const [timestamps, setTimestamps] = useState<CalendarTimestamp[]>([]);
  const [date, setDate] = useState<string>(state?.date || '190401');
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

    for (const timestamp of timestamps) {
      Cache.set(timestamp[0], timestamp[1]);
    }
  };

  const loadOneCalendar = async (key: string) => {
    setVideos([]);

    const response = await Spaceship.getOneCalendar(key);
    if (!response.ok) throw new HttpException(response);

    const videos = response.videos;
    setVideos(videos);
  };

  const loadData = () => {
    new Evoke(loadAllCalendars());
  };

  return (
    <Page>
      <Meta
        data={{ title: `${t('calendar.calendar')} - IZFLIX`, url: 'https://izflix.net/calendar' }}
      />
      <CalendarTemplate timestamps={timestamps} date={date} videos={videos} setDate={setDate} />
    </Page>
  );
};

export default CalendarPage;
