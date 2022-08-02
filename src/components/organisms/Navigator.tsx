import { Component } from 'react';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import PageManager from '../../services/page-manager';
import { Color, MobileQuery, PcLeftMargin, PcQuery } from '../../styles';
import withLocation, { WithLocationParams } from '../tools/WithLocation';
import withNavigate, { WithNavigateParams } from '../tools/WithNavigate';

const Layout = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  align-items: center;

  z-index: 10;

  ${MobileQuery} {
    bottom: 0;
    justify-content: space-between;

    width: 100%;
    padding: 16px 52px;
    background: ${Color.BACKGROUND};

    border-top: 1px solid ${Color.DARK_GRAY};
  }

  ${PcQuery} {
    top: 0;
    bottom: 0;
    flex-direction: column;
    justify-content: flex-start;
    gap: 58px;

    height: 100%;
    width: ${PcLeftMargin}px;
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
    width: 28px;
    height: 28px;
  }

  ${PcQuery} {
    width: 36px;
    height: 36px;
  }
`;

const ItemClickBox = styled.div`
  position: relative;

  width: 52px;
  height: 52px;

  cursor: pointer;

  & svg {
    transition: fill 0.2s;
  }

  &:hover svg:not([fill='${Color.WHITE}']) {
    fill: ${Color.GRAY_HOVER};
  }

  &:active svg:not([fill='${Color.WHITE}']) {
    fill: ${Color.GRAY_ACTIVE};
  }
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
            <Item type={'home'} color={location.pathname === '/' ? Color.WHITE : Color.GRAY} />
          </ItemClickBox>
          <ItemClickBox onClick={() => this.onItemClick('/vod')}>
            <Item type={'tv'} color={location.pathname === '/vod' ? Color.WHITE : Color.GRAY} />
          </ItemClickBox>
          <ItemClickBox onClick={() => this.onItemClick('/live')}>
            <Item type={'chat'} color={location.pathname === '/live' ? Color.WHITE : Color.GRAY} />
          </ItemClickBox>
          <ItemClickBox onClick={() => this.onItemClick('/profile')}>
            <Item
              type={'user'}
              color={location.pathname === '/profile' ? Color.WHITE : Color.GRAY}
            />
          </ItemClickBox>
        </Layout>
      );
    } else {
      return null;
    }
  }
}

export default withNavigate(withLocation(Navigator));
