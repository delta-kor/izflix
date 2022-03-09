import { Component } from 'react';
import styled from 'styled-components';
import ModalController from '../../services/modal-controller';
import { Color } from '../../styles';

const Layout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 480px;
  max-width: calc(100% - 64px);

  display: flex;
  flex-direction: column;
  padding: 24px 24px 12px 24px;

  background: ${Color.BACKGROUND};
  border: 2px solid ${Color.PRIMARY};
  border-radius: 8px;

  z-index: 500;

  & > * {
    margin: 0 0 16px 0;

    :last-child {
      margin: 0;
    }
  }
`;

const Title = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
`;

const Description = styled.div`
  width: 100%;
  font-weight: normal;
  font-size: 14px;
  opacity: 0.7;
`;

const Submit = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  padding: 8px 0;
  cursor: pointer;
  user-select: none;
`;

interface Props {
  data: InfoModalData;
  modalKey: number;
}

class InfoModal extends Component<Props> {
  onSumbit = () => {
    const key = this.props.modalKey;
    ModalController.submit(key, true);
  };

  render() {
    const data = this.props.data;

    return (
      <Layout>
        <Title>{data.title}</Title>
        <Description>{data.description}</Description>
        <Submit onClick={this.onSumbit}>확인</Submit>
      </Layout>
    );
  }
}

export default InfoModal;
