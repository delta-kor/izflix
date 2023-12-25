import { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';
import { MobileQuery, PcQuery, Color, Text, ModalWidthSmall } from '../../styles';
import ModalAction from './ModalAction';
import ModalBase from './ModalBase';
import { MemberList, getMemberColor, getMemberName } from '../../services/member';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: ${ModalWidthSmall};
  max-width: 360px;

  ${MobileQuery} {
    gap: 12px;
  }

  ${PcQuery} {
    gap: 16px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
`;

const Item = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;

  background: ${({ $active }) => ($active ? Color.PRIMARY : Color.BACKGROUND)};
  border-radius: 8px;
  font-size: 14px;

  transition: background 0.2s;
  cursor: pointer;
  user-select: none;
`;

const Circle = styled.div<{ $color: string; $active: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 2px solid ${({ $active }) => ($active ? Color.WHITE : Color.TRANSPARENT)};
  background: ${({ $color }) => $color};

  transition: border 0.2s;
`;

const Disable = styled.div`
  margin: -8px 0 0 0;
  padding: 8px 0;

  text-align: center;
  background: ${Color.BACKGROUND};
  border-radius: 8px;
  font-size: 14px;

  cursor: pointer;
  user-select: none;
`;

interface Props {
  modal: MemberFilterModal;
  respond: ModalRespondFunction;
}

const FilterModal: React.FC<Props> = ({ modal, respond }) => {
  const [value, setValue] = useState<string[]>(modal.value || []);

  const handleRespond: ModalRespondFunction = result => {
    if (result.type === 'ok') respond({ type: 'member_filter', value });
    else respond(result);
  };

  const handleItemClick = (member: string) => {
    if (value.includes(member)) setValue(value => value.filter(item => item !== member));
    else setValue(value => [...value, member]);
  };

  const handleDisable = () => {
    setValue([]);
  };

  return (
    <ModalBase>
      <Layout>
        <Content>
          {MemberList.map(member => (
            <Item
              key={member}
              $active={value.includes(member)}
              onClick={() => handleItemClick(member)}
            >
              {getMemberName(member)}
              <Circle $color={getMemberColor(member)} $active={value.includes(member)} />
            </Item>
          ))}
        </Content>
        <Disable onClick={handleDisable}>필터 해제</Disable>
        <ModalAction respond={handleRespond} ok cancel />
      </Layout>
    </ModalBase>
  );
};

export default FilterModal;
