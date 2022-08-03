import { AnimateSharedLayout, motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import PageManager from '../../services/page-manager';
import {
  Color,
  HideOverflow,
  MobileQuery,
  MobileTopMargin,
  PcInnerPadding,
  PcLeftMargin,
  PcQuery,
  PcTopMargin,
  Text,
} from '../../styles';
import SmoothBox from '../atoms/SmoothBox';
import withLocation, { WithLocationParams } from '../tools/WithLocation';
import withNavigate, { WithNavigateParams } from '../tools/WithNavigate';

const Layout = styled.div`
  position: fixed;
  display: flex;

  top: 0;
  left: 0;
  width: 100%;

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
    width: calc(100% - ${PcLeftMargin}px);
    margin: 0 0 0 ${PcLeftMargin}px;

    padding: 32px ${PcInnerPadding};
    gap: 32px;
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

const IconClickBox = styled(SmoothBox)`
  & > .content {
    position: relative;
    flex-shrink: 0;
    width: 32px;
    height: 32px;

    cursor: pointer;
  }
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HeaderIcon type={pageType === 'main' ? 'izflix' : 'left'} color={Color.WHITE} />
            </IconClickBox>
          )}
          <AnimateSharedLayout>
            <Content layoutId={'header_key'}>{title}</Content>
          </AnimateSharedLayout>
          <IconClickBox hover={1.1} tap={0.9} onClick={this.onSearchIconClick}>
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
