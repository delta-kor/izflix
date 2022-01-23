import { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';
import UrlIcon from '../../icons/url.svg';
import ModalController from '../../services/modal-controller';
import Transmitter from '../../services/transmitter';
import { Color, HideOverflow } from '../../styles';

const Layout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 540px;
  max-width: calc(100% - 64px);

  display: flex;
  flex-direction: column;
  padding: 24px 24px 12px 24px;

  background: ${Color.BACKGROUND};
  border: 4px solid ${Color.PRIMARY};
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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  user-select: none;
`;

const Url = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  background: ${Color.GRAY};
  border-radius: 4px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 16px 0 0;
`;

const Text = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 16px;
  ${HideOverflow};
`;

const Description = styled.div`
  margin: 8px 0 0 0;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
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
  data: ShareModalData;
  modalKey: number;
}

class ShareModal extends Component<Props> {
  onSumbit = () => {
    const key = this.props.modalKey;
    ModalController.submit(key, true);
  };

  onCopy = () => {
    Transmitter.emit('popup', '클립보드에 복사되었습니다');
  };

  render() {
    const data = this.props.data;

    const url = `https://izflix.cf/${data.id}`;

    return (
      <Layout>
        <Title>공유</Title>
        <CopyToClipboard text={url} onCopy={this.onCopy}>
          <Content>
            <Url>
              <Icon src={UrlIcon} />
              <Text>{url}</Text>
            </Url>
            <Description>클릭하여 복사</Description>
          </Content>
        </CopyToClipboard>
        <Submit onClick={this.onSumbit}>확인</Submit>
      </Layout>
    );
  }
}

export default ShareModal;
