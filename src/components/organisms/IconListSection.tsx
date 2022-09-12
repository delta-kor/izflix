import styled from 'styled-components';
import { MobileQuery, PcQuery } from '../../styles';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    gap: 16px;
  }

  ${PcQuery} {
    gap: 20px;
  }
`;

const IconListSection: React.FC = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default IconListSection;
