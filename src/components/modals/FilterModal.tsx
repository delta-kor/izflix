import { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';
import { MobileQuery, PcQuery, Color, Text, ModalWidthSmall } from '../../styles';
import ModalAction from './ModalAction';
import ModalBase from './ModalBase';

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

  return (
    <ModalBase>
      <Layout>
        <Content></Content>
        <ModalAction respond={handleRespond} ok cancel />
      </Layout>
    </ModalBase>
  );
};

export default FilterModal;
