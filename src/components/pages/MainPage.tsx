import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import Constants from '../../constants';
import Scroll from '../../services/scroll';
import { MobileQuery } from '../../styles';
import LandingVideo from '../actions/LandingVideo';
import PlaylistMenu from '../menus/PlaylistMenu';
import { Mobile } from '../tools/MediaQuery';

const Page = styled(motion.div)`
  ${MobileQuery} {
    padding: 0 0 64px 0;
  }
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
        <Mobile>
          <LandingVideo />
        </Mobile>
        <PlaylistMenu />
      </Page>
    );
  }
}

export default MainPage;
