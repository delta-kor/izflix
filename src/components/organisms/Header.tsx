import { Component } from 'react';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import PageManager from '../../services/page-manager';
import { Color, HideOverflow, Text } from '../../styles';
import withLocation, { WithLocationParams } from '../tools/WithLocation';

const Layout = styled.div`
  display: flex;
  padding: 24px 28px;
  gap: 16px;
  align-items: center;
  user-select: none;
`;

const Content = styled.div`
  ${Text.HEADLINE_1};
  color: ${Color.WHITE};
  flex-grow: 1;
  ${HideOverflow};
`;

const HeaderIcon = styled(Icon)`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const IconClickBox = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  cursor: pointer;
`;

class Header extends Component<WithLocationParams, any> {
  render() {
    const location = this.props.location;
    const pageInfo = PageManager.getPageInfo(location.pathname);

    if (pageInfo) {
      const title = pageInfo.title;
      const isMain = pageInfo.isMain;

      return (
        <Layout>
          <IconClickBox>
            <HeaderIcon id={isMain ? 'izflix' : 'left'} />
          </IconClickBox>
          <Content>{title}</Content>
          <IconClickBox>
            <SearchIcon id={'search'} />
          </IconClickBox>
        </Layout>
      );
    } else {
      return null;
    }
  }
}

export default withLocation(Header);
