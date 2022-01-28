import { Component, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Constants from '../../constants';
import { ReactComponent as InfoIcon } from '../../icons/info.svg';
import { ReactComponent as Logo } from '../../icons/logo.svg';
import { ReactComponent as SettingsIcon } from '../../icons/settings.svg';
import Transmitter from '../../services/transmitter';
import { Color, MobileQuery, PcQuery } from '../../styles';
import { Mobile, Pc } from '../tools/MediaQuery';
import Navigator from './Navigator';

const Layout = styled.div<{
  $float: boolean;
  $instant: boolean;
}>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  align-items: center;
  user-select: none;
  z-index: 10;
  border-bottom: 1px solid transparent;

  ${({ $instant: instant }) =>
    instant
      ? 'transition: border 0.2s'
      : 'transition: border 0.2s, background 0.2s'};

  ${MobileQuery} {
    height: 80px;
    padding: 0 32px;
    justify-content: space-between;
    ${({ $float: float }) =>
      float
        ? `background: ${Color.BACKGROUND}; 
           border-bottom: 1px solid ${Color.DARK_GRAY}`
        : 'background: none'};
  }

  ${PcQuery} {
    height: 96px;
    justify-content: center;
    ${({ $float: float }) =>
      float ? `background: ${Color.DARK_GRAY}` : 'background: none'};
  }

  & > * {
    ${MobileQuery} {
      margin: 0 24px 0 0;
    }

    ${PcQuery} {
      margin: 0 16px 0 0;
    }

    :last-child {
      margin: 0;
    }
  }
`;

const HomeLink = styled(Link)`
  display: flex;
  height: 75%;
  align-items: center;

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

const Icon = styled(Logo)`
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

const IconMenu = styled.div`
  display: flex;

  & > * {
    margin: 0 24px 0 0;

    :last-child {
      margin: 0;
    }
  }

  ${PcQuery} {
    position: absolute;
    right: 48px;
  }
`;

const IconItemBase = (component: FunctionComponent) => styled(component)`
  display: block;

  ${MobileQuery} {
    width: 20px;
    height: 20px;
  }

  ${PcQuery} {
    width: 28px;
    height: 28px;
  }
`;

const InfoIconItem = IconItemBase(InfoIcon);
const SettingsIconItem = IconItemBase(SettingsIcon);

interface State {
  float: boolean;
  stick: boolean;
  instant: boolean;
}

class Header extends Component<any, State> {
  state: State = {
    float: false,
    stick: false,
    instant: false,
  };

  componentDidMount = () => {
    Transmitter.on('levelscroll', this.onScroll);
    this.onScroll();
  };

  componentWillUnmount = () => {
    Transmitter.removeListener('levelscroll', this.onScroll);
  };

  onScroll = () => {
    if (Constants.IS_PC())
      if (Constants.IS_ADDITIONAL_PAGE())
        this.setState({
          stick: false,
          float: Constants.IS_VIDEO_HEADER_FLOAT_POSITION_PC(),
          instant: false,
        });
      else
        this.setState({
          stick: Constants.IS_HEADER_STICK_POSITION_PC(),
          float: Constants.IS_HEADER_STICK_POSITION_PC(),
          instant: false,
        });

    if (Constants.IS_MOBILE())
      if (Constants.IS_MAIN())
        this.setState({
          stick: false,
          float: Constants.IS_HEADER_STICK_POSITION_MOBILE(),
          instant: false,
        });
      else
        this.setState({
          stick: false,
          float: !Constants.IS_ON_TOP(),
          instant: true,
        });
  };

  render() {
    return (
      <Layout $float={this.state.float} $instant={this.state.instant}>
        <Mobile>
          <HomeLink to="/">
            <Icon />
            <Title>IZFLIX</Title>
          </HomeLink>
          <IconMenu>
            <Link to="/info">
              <InfoIconItem />
            </Link>
            <Link to="/settings">
              <SettingsIconItem />
            </Link>
          </IconMenu>
        </Mobile>
        <Pc>
          <HomeLink to="/">
            <Icon />
            <Title>IZFLIX</Title>
          </HomeLink>
          {this.state.stick && <Navigator />}
          <IconMenu>
            <Link to="/info">
              <InfoIconItem />
            </Link>
            <Link to="/settings">
              <SettingsIconItem />
            </Link>
          </IconMenu>
        </Pc>
      </Layout>
    );
  }
}

export default Header;
