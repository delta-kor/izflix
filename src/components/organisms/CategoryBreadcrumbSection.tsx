import styled from 'styled-components';
import { MobileQuery, MobileSideMargin, PcInnerPadding, PcQuery } from '../../styles';
import Breadcrumb from '../atoms/Breadcrumb';

const Layout = styled.div`
  ${MobileQuery} {
    padding: 0 ${MobileSideMargin}px;
  }

  ${PcQuery} {
    padding: 0 ${PcInnerPadding};
  }
`;

interface Props {
  path: IPath[];
}

const CategoryBreadcrumbSection: React.FC<Props> = ({ path }) => {
  return (
    <Layout>
      <Breadcrumb path={path} />
    </Layout>
  );
};

export default CategoryBreadcrumbSection;
