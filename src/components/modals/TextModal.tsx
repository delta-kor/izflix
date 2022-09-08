import styled from 'styled-components';
import { Color, MobileQuery, PcQuery, Text } from '../../styles';
import ModalAction from '../molecules/ModalAction';
import ModalBase from './ModalBase';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  max-width: 360px;
`;

const Content = styled.div`
  color: ${Color.WHITE};

  ${MobileQuery} {
    ${Text.BODY_2};
    line-height: 20px;
    height: unset;
  }

  ${PcQuery} {
    ${Text.BODY_1};
    line-height: 26px;
    height: unset;
  }
`;

interface Props {
  content: string;
  onSubmit?(): void;
  onClose?(): void;
}

const TextModal: React.FC<Props> = ({ content, onSubmit, onClose }) => {
  return (
    <ModalBase>
      <Layout>
        <Content>{content}</Content>
        <ModalAction onSubmit={onSubmit} onCancel={onClose} submit cancel />
      </Layout>
    </ModalBase>
  );
};

export default TextModal;
