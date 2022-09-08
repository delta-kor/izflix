import styled from 'styled-components';
import { Color, MobileQuery, ModalWidth, PcQuery, Text } from '../../styles';
import ModalAction from '../molecules/ModalAction';
import ModalBase, { ModalProps } from './ModalBase';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: ${ModalWidth};
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

interface Props extends ModalProps<void> {
  content: string;
}

const TextModal: React.FC<Props> = ({ content, onSubmit, onCancel }) => {
  return (
    <ModalBase>
      <Layout>
        <Content>{content}</Content>
        <ModalAction onSubmit={onSubmit} onCancel={onCancel} submit cancel />
      </Layout>
    </ModalBase>
  );
};

export default TextModal;
