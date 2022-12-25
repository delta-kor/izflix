import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Meta from '../components/Meta';
import CategoryInnerTemplate from '../components/templates/CategoryInnerTemplate';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import Cache from '../services/cache';
import Spaceship from '../services/spaceship';
import Page from './Page';

interface Props {
  setPath(path: IPath[]): void;
}

const CategoryInnerPage: React.FC<Props> = ({ setPath }) => {
  const { t } = useTranslation();
  const params = useParams();
  const id = params.id || null;

  const [category, setCategory] = useState<ApiResponse.Category.View | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  const loadCategory = async (id: string | null) => {
    const response = await Spaceship.viewCategory(id);
    if (!response.ok) throw new HttpException(response);

    setCategory(response);
    setPath(response.path);

    for (const path of response.path) {
      Cache.set(path.id, path.children);
    }

    if (response.type === 'folder') {
      for (const data of response.data) {
        Cache.set(data.id, data.children);
      }
    }
  };

  const loadData = () => {
    new Evoke(loadCategory(id));
  };

  return (
    <Page noStyle>
      {category?.path?.length ? (
        <Meta
          data={{
            title: `${category.path
              .map(path => path.title)
              .reverse()
              .join(' / ')} - IZFLIX`,
            url: `https://izflix.net/category/${id}`,
          }}
        />
      ) : (
        <Meta
          data={{
            title: `${t('category.category')} - IZFLIX`,
            url: `https://izflix.net/category/${id}`,
          }}
        />
      )}
      <CategoryInnerTemplate setPath={setPath} category={category} />
    </Page>
  );
};

export default CategoryInnerPage;
