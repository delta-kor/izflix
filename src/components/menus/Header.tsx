import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../icons/logo.svg';
import { MobileQuery, PcQuery } from '../../styles';

const Layout = styled(Link)`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  align-items: center;
  user-select: none;
  cursor: pointer;
  z-index: 10;

  ${MobileQuery} {
    height: 80px;
    padding: 0 32px;
  }

  ${PcQuery} {
    height: 108px;
    justify-content: center;
  }

  & > * {
    ${MobileQuery} {
      margin: 0 24px 0 0;
    }

    ${PcQuery} {
      margin: 0 32px 0 0;
    }

    :last-child {
      margin: 0;
    }
  }
`;

const Icon = styled.img`
  ${MobileQuery} {
    width: 22px;
    height: 24px;
  }

  ${PcQuery} {
    width: 28px;
    height: 30px;
  }
`;

const Title = styled.div`
  font-weight: 800;

  ${MobileQuery} {
    font-size: 20px;
  }

  ${PcQuery} {
    font-size: 28px;
  }
`;

class Header extends Component {
  render() {
    return (
      <Layout to="/">
        <Icon src={Logo} />
        <Title>IZFLIX</Title>
      </Layout>
    );
  }
}

export default Header;
