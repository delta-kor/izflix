import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchTemplate from '../components/templates/SearchTemplate';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import Spaceship from '../services/spaceship';
import Page from './Page';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')!;
  const [videos, setVideos] = useState<IVideo[] | null>([]);

  useEffect(() => {
    loadData();
  }, [query]);

  const search = async (query: string) => {
    if (!query) return setVideos(null);

    setVideos([]);

    const response = await Spaceship.search(query);
    if (!response.ok) throw new HttpException(response);

    const videos = response.videos;
    if (videos.length === 0) setVideos(null);
    else setVideos(response.videos);
  };

  const loadData = () => {
    new Evoke(search(query));
  };

  return (
    <Page>
      <SearchTemplate videos={videos} />
    </Page>
  );
};

export default SearchPage;
