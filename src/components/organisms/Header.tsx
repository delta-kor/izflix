import { motion } from 'framer-motion';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import intersect from '../../services/intersect';
import PageManager from '../../services/page-manager';
import Tracker from '../../services/tracker';
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
import useModal from '../../hooks/useModal';

const Layout = styled.header<{ $active: boolean; $search: boolean }>`
  position: fixed;
  display: flex;

  top: 0;
  left: 0;
  width: 100%;

  align-items: center;
  user-select: none;

  background: ${({ $active, $search }) =>
    $active ? ($search ? 'rgba(22, 26, 54, 0.8)' : 'rgba(7, 13, 45, 0.8)') : Color.TRANSPARENT};
  backdrop-filter: ${({ $active }) => ($active ? 'blur(6px)' : 'none')};

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

const Content = styled(motion.h1)`
  width: 100%;
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

const SearchLayout = styled.div`
  flex-grow: 1;
  height: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  font-weight: 700;
  color: ${Color.WHITE};

  ${MobileQuery} {
    font-size: 20px;
  }

  ${PcQuery} {
    font-size: 26px;
  }

  &::placeholder {
    font-weight: 400;
    color: ${Color.WHITE};
    opacity: 0.3;
  }
`;

const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const modal = useModal();

  const [active, setActive] = useState<boolean>(false);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    intersect.addListener('bump', onBump);

    return () => {
      intersect.removeListener('bump', onBump);
    };
  }, []);

  const onBump = (type: 'in' | 'out') => {
    setActive(type === 'in');
  };

  const handleHeaderIconClick = (isMain: boolean) => {
    if (!isMain) navigate(-1);
    else modal({ type: 'text', content: '1999.07.05.\nHappy Hyewon Day' });
  };

  const handleIconClick = () => {
    if (!searchActive) {
      Tracker.send('search_clicked');
    }
    setSearchValue('');
    setSearchActive(!searchActive);
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!searchValue) return false;
    navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    setSearchValue('');
    setSearchActive(false);
  };

  const pageInfo = PageManager.getPageInfo(location.pathname);

  if (pageInfo) {
    let title: string = pageInfo.title;
    const pageType = pageInfo.type;

    if (title === '#') {
      title = searchParams.get('q') || 'Search';
    }

    const headerIconActive = pageType !== 'submain' && !searchActive;

    return (
      <Layout $active={searchActive || active} $search={searchActive} id={'boundary_root'}>
        {headerIconActive && (
          <IconClickBox
            onClick={() => handleHeaderIconClick(pageType === 'main')}
            hover={1.1}
            tap={0.9}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <HeaderIcon type={pageType === 'main' ? 'izflix' : 'left'} color={Color.WHITE} />
          </IconClickBox>
        )}
        {!searchActive && (
          <Content initial={{ opacity: 0 }} animate={{ opacity: 1 }} layoutId={'header_content'}>
            {title}
          </Content>
        )}
        {searchActive && (
          <SearchLayout>
            <SearchInput
              type={'text'}
              value={searchValue}
              placeholder={t('search.input_query')}
              onChange={handleSearchChange}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSubmit();
              }}
              autoFocus
              spellCheck={false}
              autoComplete={'off'}
            />
          </SearchLayout>
        )}
        <IconClickBox hover={1.1} tap={0.9} onClick={handleIconClick}>
          <SearchIcon type={searchActive ? 'close' : 'search'} color={Color.WHITE} />
        </IconClickBox>
      </Layout>
    );
  } else {
    return null;
  }
};

export default Header;
