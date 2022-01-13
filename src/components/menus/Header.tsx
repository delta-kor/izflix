import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../icons/logo.svg';
import { Color, MobileLimit, MobileQuery, PcQuery } from '../../styles';

const Layout = styled(Link)<{ float: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  align-items: center;
  user-select: none;
  cursor: pointer;
  z-index: 10;
  ${({ float }) =>
    float ? `background: ${Color.DARK_GRAY};` : 'background: none;'}
  transition: background 0.2s;

  ${MobileQuery} {
    height: 80px;
    padding: 0 32px;
  }

  ${PcQuery} {
    height: 96px;
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

interface State {
  float: boolean;
}

class Header extends Component<any, State> {
  state: State = { float: false };

  componentDidMount = () => {
    document.addEventListener('scroll', this.onScroll);
  };

  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.onScroll);
  };

  onScroll = () => {
    const scrollTop = window.scrollY;
    const width = window.innerWidth;
    const height = window.innerHeight;
    let scrollLimit = 0;

    if (window.location.pathname === '/' && width > MobileLimit)
      scrollLimit = height - 180 - 96;

    if (scrollTop > scrollLimit) {
      this.setState({ float: true });
    } else {
      this.setState({ float: false });
    }
  };

  render() {
    return (
      <Layout to="/" float={this.state.float}>
        <Icon src={Logo} />
        <Title>IZFLIX</Title>
      </Layout>
    );
  }
}

export default Header;
