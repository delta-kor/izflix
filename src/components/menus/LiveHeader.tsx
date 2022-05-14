import { Component } from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../icons/logo.svg';
import { ReactComponent as SettingsIcon } from '../../icons/settings.svg';
import { Color } from '../../styles';

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 52px;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  column-gap: 16px;
`;

const Icon = styled(Logo)`
  width: 16px;
  height: 16px;
`;

const Text = styled.div`
  font-weight: 800;
  font-size: 16px;
  color: ${Color.WHITE};
`;

const Menu = styled.div`
  display: flex;
  column-gap: 12px;
`;

const Count = styled.div`
  display: flex;
  column-gap: 6px;
  align-items: center;
`;

const CountDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background: ${Color.PRIMARY};
`;

const Settings = styled(SettingsIcon)`
  width: 20px;
  height: 20px;
`;

const CountText = styled.div`
  font-weight: 800;
  font-size: 12px;
  color: ${Color.PRIMARY};
`;

interface Props {
  liveCount: number;
}

class LiveHeader extends Component<Props> {
  render() {
    return (
      <Layout>
        <Header>
          <Icon />
          <Text>IZFLIX</Text>
        </Header>
        <Menu>
          <Count>
            <CountDot />
            <CountText>{this.props.liveCount}</CountText>
          </Count>
          <Settings />
        </Menu>
      </Layout>
    );
  }
}

export default LiveHeader;
