import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import PageManager from '../../services/page-manager';
import { Color, MobileQuery, PcLeftMargin, PcQuery } from '../../styles';
import SmoothBox from '../atoms/SmoothBox';

const Layout = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  align-items: center;

  z-index: 10;

  ${MobileQuery} {
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: space-around;

    padding: 16px 32px;
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

const ItemClickBox = styled(SmoothBox)`
  & > .content {
    position: relative;

    width: 52px;
    height: 52px;

    cursor: pointer;

    & svg {
      transition: fill 0.2s;
    }
  }
`;

const Navigator: React.FC = () => {
  const location = useLocation();

  const pageInfo = PageManager.getPageInfo(location.pathname);

  if (pageInfo) {
    return (
      <Layout>
        <Link to={'/'}>
          <ItemClickBox hover={1.1} tap={0.9}>
            <Item type={'home'} color={location.pathname === '/' ? Color.WHITE : Color.GRAY} />
          </ItemClickBox>
        </Link>
        <Link to={'/vod'}>
          <ItemClickBox hover={1.1} tap={0.9}>
            <Item type={'tv'} color={location.pathname === '/vod' ? Color.WHITE : Color.GRAY} />
          </ItemClickBox>
        </Link>
        <Link to={'/playlist'}>
          <ItemClickBox hover={1.1} tap={0.9}>
            <Item
              type={'playlist'}
              color={location.pathname === '/playlist' ? Color.WHITE : Color.GRAY}
            />
          </ItemClickBox>
        </Link>
        {/* <Link to={'/live'}>
          <ItemClickBox hover={1.1} tap={0.9}>
            <Item type={'chat'} color={location.pathname === '/live' ? Color.WHITE : Color.GRAY} />
          </ItemClickBox>
        </Link> */}
        <Link to={'/profile'}>
          <ItemClickBox hover={1.1} tap={0.9}>
            <Item
              type={'user'}
              color={location.pathname === '/profile' ? Color.WHITE : Color.GRAY}
            />
          </ItemClickBox>
        </Link>
      </Layout>
    );
  } else {
    return null;
  }
};

export default Navigator;
