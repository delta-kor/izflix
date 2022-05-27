import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import Constants from '../../constants';
import Scroll from '../../services/scroll';
import { Color, MobileQuery } from '../../styles';
import LandingVideo from '../actions/LandingVideo';
import PlaylistMenu from '../menus/PlaylistMenu';
import Meta from '../Meta';
import { Mobile } from '../tools/MediaQuery';

const Page = styled(motion.main)`
  ${MobileQuery} {
    padding: 0 0 64px 0;
  }
`;

const LinkMenu = styled.a`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: calc(100vw - 64px);
  max-width: 720px;
  margin: 8px auto;
  padding: 16px 16px;
  background: ${Color.DARK_GRAY};
  border-radius: 6px;
`;

const LinkMenuTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${Color.WHITE};
`;

const LinkMenuDescription = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: ${Color.WHITE};
  opacity: 0.7;
`;

class MainPage extends Component {
  componentDidMount = () => {
    const point = Constants.LANDING_VIDEO_HEIGHT_PC() - 32;
    if (Constants.IS_PC()) {
      if (Scroll.getPosition() > point) Scroll.to(point);
    }
  };

  render() {
    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Meta
          data={{
            title: 'IZFLIX',
            description: '콘서트, 음악 방송 고화질 인터넷 스트리밍 & 다시보기',
            url: 'https://izflix.net/',
          }}
        />
        <Mobile>
          <LandingVideo />
        </Mobile>
        <LinkMenu href={'https://fanchant.izflix.net'}>
          <LinkMenuTitle>아이즈원 응원법 연습</LinkMenuTitle>
          <LinkMenuDescription>https://fanchant.izflix.net</LinkMenuDescription>
        </LinkMenu>
        <PlaylistMenu />
      </Page>
    );
  }
}

export default MainPage;
