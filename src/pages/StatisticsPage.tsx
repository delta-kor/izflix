import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Meta from '../components/Meta';
import StatisticsTemplate from '../components/templates/StatisticsTemplate';
import Page from './Page';
import Spaceship from '../services/spaceship';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import Playtime from '../services/playtime';

const StatisticsPage: React.FC = () => {
  const { t } = useTranslation();

  const [myVideos, setMyVideos] = useState<IVideoWithPlayTime[]>([]);
  const [totalVideos, setTotalVideos] = useState<IVideoWithPlayTime[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const myTops = Playtime.rank(5);
  const totalTops: [string, number][] =
    JSON.parse(process.env.REACT_APP_VIDEO_RANK_2 || '[]') || [];

  const loadVideos = async () => {
    const response = await Spaceship.getVideoList([
      ...new Set([...myTops.map(([id]) => id), ...totalTops.map(([id]) => id)]),
    ]);
    if (!response.ok) throw new HttpException(response);

    const videos = response.data;

    const myVideosWithPlayTime: IVideoWithPlayTime[] = [];
    for (const video of videos.filter(video => myTops.map(([id]) => id).includes(video.id))) {
      const rankItem = myTops.find(([id]) => id === video.id);
      myVideosWithPlayTime.push({
        ...video,
        playTime: rankItem ? rankItem[1] : 0,
      });
    }

    const totalVideosWithPlayTime: IVideoWithPlayTime[] = [];
    for (const video of videos.filter(video => totalTops.map(([id]) => id).includes(video.id))) {
      const rankItem = totalTops.find(([id]) => id === video.id);
      totalVideosWithPlayTime.push({
        ...video,
        playTime: rankItem ? rankItem[1] : 0,
      });
    }

    setMyVideos(myVideosWithPlayTime);
    setTotalVideos(totalVideosWithPlayTime);
  };

  const loadData = () => {
    new Evoke(loadVideos());
  };

  return (
    <Page>
      <Meta
        data={{
          title: `${t('profile.statistics')} - IZFLIX`,
          url: 'https://izflix.net/profile/statistics',
        }}
      />
      <StatisticsTemplate myVideos={myVideos} totalVideos={totalVideos} />
    </Page>
  );
};

export default StatisticsPage;
