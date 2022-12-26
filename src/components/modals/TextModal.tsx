import styled from 'styled-components';
import { Color, MobileQuery, ModalWidthLarge, PcQuery, Text } from '../../styles';
import ModalAction from './ModalAction';
import ModalBase from './ModalBase';

const Content = styled.div`
  color: ${Color.WHITE};
  width: ${ModalWidthLarge};

  ${MobileQuery} {
    ${Text.BODY_1};
    line-height: 24px;
    height: unset;
  }

  ${PcQuery} {
    ${Text.EX_BODY_1};
    line-height: 30px;
    height: unset;
  }
`;

interface Props {
  modal: TextModal;
  respond: ModalRespondFunction;
}

const TextModal: React.FC<Props> = ({ modal, respond }) => {
  return (
    <ModalBase>
      <Content>{modal.content}</Content>
      <ModalAction respond={respond} ok cancel />
    </ModalBase>
  );
};

export default TextModal;
