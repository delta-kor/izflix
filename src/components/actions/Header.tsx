import { Component } from 'react';
import styled from 'styled-components';
import Logo from '../../icons/logo.svg';
import { Mobile, Pc } from '../tools/MediaQuery';

const MobileLayout = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  padding: 0 32px;
  align-items: center;
  user-select: none;

  & > * {
    margin: 0 24px 0 0;
    cursor: pointer;

    :last-child {
      margin: 0;
    }
  }
`;

const MobileIcon = styled.img`
  width: 22px;
  height: 24px;
`;

const MobileTitle = styled.div`
  font-weight: 800;
  font-size: 20px;
`;

const PcLayout = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 108px;
  align-items: center;
  justify-content: center;
  user-select: none;

  & > * {
    margin: 0 32px 0 0;
    cursor: pointer;

    :last-child {
      margin: 0;
    }
  }
`;

const PcIcon = styled.img`
  width: 33px;
  height: 36px;
`;

const PcTitle = styled.div`
  font-weight: 800;
  font-size: 28px;
`;

class Header extends Component {
  render() {
    return (
      <>
        <Mobile>
          <MobileLayout>
            <MobileIcon src={Logo} />
            <MobileTitle>IZFLIX</MobileTitle>
          </MobileLayout>
        </Mobile>
        <Pc>
          <PcLayout>
            <PcIcon src={Logo} />
            <PcTitle>IZFLIX</PcTitle>
          </PcLayout>
        </Pc>
      </>
    );
  }
}

export default Header;
