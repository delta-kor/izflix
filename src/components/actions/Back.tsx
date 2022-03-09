import { Component } from 'react';
import { NavigateFunction } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BackIcon } from '../../icons/back.svg';
import { Color } from '../../styles';
import withNavigate from '../tools/Navigate';

const Layout = styled.div`
  display: flex;
  padding: 14px 16px;
  margin: 0 32px 8px 32px;
  background: ${Color.DARK_GRAY};
  border-radius: 4px;
  align-items: center;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;

  :hover {
    opacity: 1;
  }
`;

const Icon = styled(BackIcon)`
  width: 20px;
  height: 20px;
  margin: 0 8px 0 0;
`;

const Text = styled.div`
  font-weight: normal;
  font-size: 14px;
  color: ${Color.WHITE};
`;

interface Props {
  navigate: NavigateFunction;
}

class Back extends Component<Props> {
  onBack = () => {
    this.props.navigate(-1);
  };

  render() {
    return (
      <Layout onClick={this.onBack}>
        <Icon />
        <Text>이전 화면으로</Text>
      </Layout>
    );
  }
}

export default withNavigate(Back);
