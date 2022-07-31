import { Component } from 'react';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import PageManager from '../../services/page-manager';
import { Color, MobileQuery, PcQuery } from '../../styles';
import withLocation, { WithLocationParams } from '../tools/WithLocation';
import withNavigate, { WithNavigateParams } from '../tools/WithNavigate';

const Layout = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  align-items: center;

  ${MobileQuery} {
    bottom: 0;
    justify-content: space-between;

    width: 100%;
    padding: 14px 56px;
    background: ${Color.BACKGROUND};
  }

  ${PcQuery} {
    top: 0;
    bottom: 0;
    flex-direction: column;
    justify-content: flex-start;
    gap: 58px 0;

    height: 100%;
    width: 112px;
    padding: 72px 0;
    background: ${Color.DARK_GRAY};
  }
`;

const Item = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${MobileQuery} {
    width: 24px;
    height: 24px;
  }

  ${PcQuery} {
    width: 36px;
    height: 36px;
  }
`;

const ItemClickBox = styled.div`
  position: relative;

  width: 44px;
  height: 44px;

  cursor: pointer;
`;

class Navigator extends Component<WithLocationParams & WithNavigateParams, any> {
  onItemClick = (path: string) => {
    this.props.navigate(path);
  };

  render() {
    const location = this.props.location;
    const pageInfo = PageManager.getPageInfo(location.pathname);

    if (pageInfo) {
      return (
        <Layout>
          <ItemClickBox onClick={() => this.onItemClick('/')}>
            <Item id={'home'} color={location.pathname === '/' ? Color.WHITE : Color.GRAY} />
          </ItemClickBox>
          <ItemClickBox onClick={() => this.onItemClick('/vod')}>
            <Item id={'tv'} color={location.pathname === '/vod' ? Color.WHITE : Color.GRAY} />
          </ItemClickBox>
          <ItemClickBox onClick={() => this.onItemClick('/live')}>
            <Item id={'chat'} color={location.pathname === '/live' ? Color.WHITE : Color.GRAY} />
          </ItemClickBox>
          <ItemClickBox onClick={() => this.onItemClick('/profile')}>
            <Item id={'user'} color={location.pathname === '/profile' ? Color.WHITE : Color.GRAY} />
          </ItemClickBox>
        </Layout>
      );
    } else {
      return null;
    }
  }
}

export default withNavigate(withLocation(Navigator));
