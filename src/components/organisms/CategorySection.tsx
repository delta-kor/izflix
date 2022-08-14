import styled from 'styled-components';
import { getDate } from '../../services/time';
import { MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import ListItem from '../atoms/ListItem';

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
  return (
    <Layout>
      {category
        ? category.data.map(data => (
            <ListItem
              title={data.title}
              description={getDate(data.date)}
              count={'1개'}
              type={'icon'}
              value={'folder'}
              link={`/category/${data.id}`}
              key={data.id}
            />
          ))
        : null}
    </Layout>
  );
};

export default CategorySection;
