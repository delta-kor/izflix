import { AnimateSharedLayout, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import intersect from '../../services/intersect';
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

const Layout = styled.div<{ $active: boolean }>`
  position: fixed;
  display: flex;

  top: 0;
  left: 0;
  width: 100%;

  align-items: center;
  user-select: none;

  background: ${({ $active }) => ($active ? '#070D2DBA' : Color.TRANSPARENT)};
  backdrop-filter: ${({ $active }) => ($active ? 'blur(10px)' : 'none')};

  transition: background 0.2s;

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

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    intersect.addListener('bump', onBump);

    return () => {
      intersect.removeListener('bump', onBump);
    };
  }, []);

  const onBump = (type: 'in' | 'out') => {
    setActive(type === 'in');
  };

  const onHeaderIconClick = (isMain: boolean) => {
    if (!isMain) navigate(-1);
  };

  const onSearchIconClick = () => {};

  const pageInfo = PageManager.getPageInfo(location.pathname);

  if (pageInfo) {
    const title = pageInfo.title;
    const pageType = pageInfo.type;

    return (
      <Layout $active={active} id={'boundary_root'}>
        {pageType !== 'submain' && (
          <IconClickBox
            onClick={() => onHeaderIconClick(pageType === 'main')}
            hover={1.1}
            tap={0.9}
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
        <IconClickBox hover={1.1} tap={0.9} onClick={onSearchIconClick}>
          <SearchIcon type={'search'} color={Color.WHITE} />
        </IconClickBox>
      </Layout>
    );
  } else {
    return null;
  }
};

export default Header;
