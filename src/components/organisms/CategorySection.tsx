import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import PathFinder from '../../services/path-finder';
import Spaceship from '../../services/spaceship';
import { getDate, getDuration } from '../../services/time';
import { MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import ListItem from '../atoms/ListItem';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    padding: 0 32px;
    gap: 2px;
  }

  ${PcQuery} {
    padding: 0 ${PcInnerPadding};
    gap: 4px;
  }
`;

interface Props {
  setPath(path: IPath[]): void;
  category?: ApiResponse.Category.View;
}

const CategorySection: React.FC<Props> = ({ setPath, category }) => {
  const { i18n, t } = useTranslation();
  const params = useParams();
  const id = params.id || null;

  let Content = null;

  if (category?.type === 'folder') {
    Content = category.data.map(data => (
      <ListItem
        title={data.title}
        description={getDate(data.date, i18n.resolvedLanguage)}
        count={t('common.count', { count: data.count })}
        type={'icon'}
        value={'folder'}
        link={`/category/${data.id}`}
        key={data.id}
      />
    ));
  }

  if (category?.type === 'file') {
    Content = category.data.map(data => (
      <ListItem
        title={data.title}
        description={getDate(data.date, i18n.resolvedLanguage)}
        count={getDuration(data.duration, data.is_4k)}
        type={'image'}
        value={Spaceship.getThumbnail(data.id)}
        link={`/${data.id}`}
        state={{ key: 'category', value: category.path.slice(-1)[0]?.id }}
        key={data.id}
      />
    ));
  }

  if (!category) {
    const count = PathFinder.get(id) || 5;
    Content = <Repeat count={count} element={i => <ListItem type={'placeholder'} key={i} />} />;
  }

  return <Layout>{Content}</Layout>;
};

export default CategorySection;
