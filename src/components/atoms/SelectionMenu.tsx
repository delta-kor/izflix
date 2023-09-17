import styled from 'styled-components';
import SmoothBox from './SmoothBox';
import { Color } from '../../styles';

interface SelectionData {
  key: string;
  label: string;
}

const Layout = styled.div`
  display: flex;
  gap: 8px;
`;

const Item = styled(SmoothBox)`
  & > .content {
    display: flex;
    padding: 8px 12px;
    border-radius: 4px;
    background: ${Color.DARK_GRAY};
  }
`;

interface Props {
  data: SelectionData[];
}

const SelectionMenu: React.FC<Props> = ({ data }) => {
  return (
    <Layout>
      {data.map(item => (
        <Item key={item.key}>{item.label}</Item>
      ))}
    </Layout>
  );
};

export default SelectionMenu;
