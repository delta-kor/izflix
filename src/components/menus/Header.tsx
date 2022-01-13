import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../icons/logo.svg';
import { Color, Constants, MobileQuery, PcQuery } from '../../styles';
import Navigator from './Navigator';

const Layout = styled(Link)<{ float: number }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  align-items: center;
  user-select: none;
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s, border 0.2s;
  border-bottom: 1px solid transparent;

  ${MobileQuery} {
    height: 80px;
    padding: 0 32px;
    ${({ float }) =>
      float
        ? `background: ${Color.BACKGROUND}; border-bottom: 1px solid ${Color.DARK_GRAY}`
        : 'background: none;'}
  }

  ${PcQuery} {
    height: 96px;
    justify-content: center;
    ${({ float }) =>
      float ? `background: ${Color.DARK_GRAY};` : 'background: none;'}
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
  stick: boolean;
}

class Header extends Component<any, State> {
  state: State = { float: false, stick: false };

  componentDidMount = () => {
    document.addEventListener('scroll', this.onScroll);
  };

  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.onScroll);
  };

  onScroll = () => {
    if (Constants.IS_PC())
      this.setState({
        stick: window.scrollY > Constants.HEADER_STICK_LIMIT() - 96,
      });

    const scrollTop = window.scrollY;
    let scrollLimit = 0;

    if (window.location.pathname === '/' && Constants.IS_PC())
      scrollLimit = Constants.HEADER_STICK_LIMIT() - 96;

    this.setState({ float: scrollTop > scrollLimit });
  };

  render() {
    return (
      <Layout to="/" float={this.state.float ? 1 : 0}>
        <Icon src={Logo} />
        <Title>IZFLIX</Title>
        {this.state.stick && <Navigator />}
      </Layout>
    );
  }
}

export default Header;
