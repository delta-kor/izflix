import styled from 'styled-components';
import SmoothBox from './SmoothBox';
import { Color } from '../../styles';
import { useState } from 'react';

interface SelectionData {
  key: string;
  label: string;
}

const Layout = styled.div`
  display: flex;
  gap: 8px;
`;

const Item = styled(SmoothBox)<{ $active: boolean }>`
  & > .content {
    display: flex;
    padding: 10px 14px;
    border-radius: 4px;
    background: ${({ $active }) => ($active ? Color.WHITE : Color.GRAY)};

    font-size: 16px;
    font-weight: 700;
    color: ${({ $active }) => ($active ? Color.BLACK : Color.WHITE)};
    transform: skew(0.1deg);

    cursor: pointer;
    user-select: none;
  }
`;

interface Props {
  data: SelectionData[];
  selected: string[];
  onSelect(key: string): void;
}

const SelectionMenu: React.FC<Props> = ({ data, selected, onSelect }) => {
  return (
    <Layout>
      {data.map(item => (
        <Item
          $active={selected.includes(item.key)}
          onClick={() => onSelect(item.key)}
          hover={1.03}
          tap={0.97}
          key={item.key}
        >
          {item.label}
        </Item>
      ))}
    </Layout>
  );
};

export default SelectionMenu;
