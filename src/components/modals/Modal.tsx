import { Component } from 'react';
import styled from 'styled-components';
import { Color } from '../../styles';
import SelectModal from './SelectModal';

const Layout = styled.div`
  z-index: 500;
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${Color.BACKGROUND};
  opacity: 0.7;
  z-index: 500;
`;

interface Props {
  data: ModalData;
  modalKey: number;
}

class Modal extends Component<Props> {
  render() {
    const data = this.props.data;

    let content: JSX.Element;

    switch (data.type) {
      case 'select':
        content = <SelectModal data={data} modalKey={this.props.modalKey} />;
        break;
      default:
        console.error('Empty modal');
        content = <h1>EMPTY MODAL</h1>;
    }

    return (
      <Layout>
        <Cover />
        {content}
      </Layout>
    );
  }
}

export default Modal;
