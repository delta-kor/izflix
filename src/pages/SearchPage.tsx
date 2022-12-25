import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import Meta from '../components/Meta';
import SearchTemplate from '../components/templates/SearchTemplate';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import Spaceship from '../services/spaceship';
import Page from './Page';

const SearchPage: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')!;
  const [videos, setVideos] = useState<IVideo[] | null>([]);

  useEffect(() => {
    loadData();
  }, [query]);

  const search = async (query: string) => {
    if (!query) {
      if (videos === null || videos.length) return false;
      return setVideos(null);
    }

    setVideos([]);

    const response = await Spaceship.search(query);
    if (!response.ok) throw new HttpException(response);

    const result = response.videos;
    if (result.length === 0) setVideos(null);
    else setVideos(result);
  };

  const loadData = () => {
    new Evoke(search(query));
  };

  return (
    <Page>
      <Meta
        data={{
          title: `'${query}' ${t('search.search_result')} - IZFLIX`,
          url: `https://izflix.net/search?q=${query}`,
        }}
      />
      <SearchTemplate videos={videos} />
    </Page>
  );
};

export default SearchPage;
