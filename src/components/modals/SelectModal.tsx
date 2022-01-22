import { Component } from 'react';
import styled from 'styled-components';
import ModalController from '../../services/modal-controller';
import { Color, MobileQuery, PcQuery } from '../../styles';

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
  row-gap: 12px;
`;

const Chip = styled.div<{ $active: boolean }>`
  display: inline-block;
  font-weight: bold;
  border-radius: 4px;
  background: ${({ $active }) => ($active ? Color.PRIMARY : Color.DARK_GRAY)};
  transition: background 0.2s;
  cursor: pointer;
  user-select: none;

  ${MobileQuery} {
    padding: 10px 12px;
    font-size: 14px;
  }

  ${PcQuery} {
    padding: 12px 16px;
    font-size: 16px;
  }
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
  data: SelectModalData;
  modalKey: number;
}

interface State {
  selected: any;
}

class SelectModal extends Component<Props, State> {
  state: State = { selected: this.props.data.default };

  onSumbit = () => {
    const key = this.props.modalKey;
    ModalController.submit(key, this.state.selected);
  };

  render() {
    const data = this.props.data;

    return (
      <Layout>
        <Title>{data.title}</Title>
        <Content>
          {data.content.map((item) => (
            <Chip
              key={item.id}
              $active={item.id === this.state.selected}
              onClick={() => this.setState({ selected: item.id })}
            >
              {item.text}
            </Chip>
          ))}
        </Content>
        <Submit onClick={this.onSumbit}>{data.submit || '확인'}</Submit>
      </Layout>
    );
  }
}

export default SelectModal;
