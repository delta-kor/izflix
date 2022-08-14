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
  }

  ${PcQuery} {
    padding: 0 ${PcInnerPadding};
  }
`;

interface Props {
  setPath(path: IPath[]): void;
  category?: ApiResponse.Category.View;
}

const CategorySection: React.FC<Props> = ({ setPath, category }) => {
  const params = useParams();
  const id = params.id || null;

  let Content = null;

  if (category?.type === 'folder') {
    Content = category.data.map(data => (
      <ListItem
        title={data.title}
        description={getDate(data.date)}
        count={`${data.count}개`}
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
        description={getDate(data.date)}
        count={getDuration(data.duration, data.is_4k)}
        type={'image'}
        value={Spaceship.getThumbnail(data.id)}
        link={`/${data.id}?k=category&v=${category.path.slice(-1)[0]?.id}`}
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
