import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import PageManager from '../../services/page-manager';
import {
  Color,
  HideOverflow,
  MobileQuery,
  MobileTopMargin,
  PcQuery,
  PcStretchLimitOuter,
  PcTopMargin,
  Text,
} from '../../styles';
import withLocation, { WithLocationParams } from '../tools/WithLocation';
import withNavigate, { WithNavigateParams } from '../tools/WithNavigate';

const Layout = styled.div`
  position: fixed;
  display: flex;

  top: 0;

  align-items: center;
  user-select: none;

  z-index: 10;

  ${MobileQuery} {
    width: 100%;
    height: ${MobileTopMargin}px;

    padding: 24px 28px;
    gap: 16px;
  }

  ${PcQuery} {
    height: ${PcTopMargin}px;
    left: 112px;
    right: 0;

    padding: 32px 132px;
    gap: 32px;

    max-width: ${PcStretchLimitOuter}px;
    margin: 0 auto;
  }
`;

const Content = styled(motion.div)`
  flex-grow: 1;
  color: ${Color.WHITE};
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.HEADLINE_1};
  }

  ${PcQuery} {
    ${Text.EX_HEADLINE_1};
  }
`;

const HeaderIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${MobileQuery} {
    width: 24px;
    height: 24px;
  }

  ${PcQuery} {
    width: 32px;
    height: 32px;
  }
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${MobileQuery} {
    width: 24px;
    height: 24px;
  }

  ${PcQuery} {
    width: 32px;
    height: 32px;
  }
`;

const IconClickBox = styled(motion.div)`
  position: relative;
  flex-shrink: 0;
  width: 32px;
  height: 32px;

  cursor: pointer;
`;

class Header extends Component<WithLocationParams & WithNavigateParams, any> {
  onHeaderIconClick = (isMain: boolean) => {
    if (!isMain) this.props.navigate(-1);
  };

  onSearchIconClick = () => {};

  render() {
    const location = this.props.location;
    const pageInfo = PageManager.getPageInfo(location.pathname);

    if (pageInfo) {
      const title = pageInfo.title;
      const pageType = pageInfo.type;

      return (
        <Layout>
          {pageType !== 'submain' && (
            <IconClickBox
              onClick={() => this.onHeaderIconClick(pageType === 'main')}
              layoutId={'header_icon'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={'header_icon'}
            >
              <HeaderIcon type={pageType === 'main' ? 'izflix' : 'left'} color={Color.WHITE} />
            </IconClickBox>
          )}
          <Content layoutId={'header_title'} key={'header_title'}>
            {title}
          </Content>
          <IconClickBox
            onClick={this.onSearchIconClick}
            layoutId={'header_search'}
            key={'header_search'}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 1.05 }}
          >
            <SearchIcon type={'search'} color={Color.WHITE} />
          </IconClickBox>
        </Layout>
      );
    } else {
      return null;
    }
  }
}

export default withNavigate(withLocation(Header));