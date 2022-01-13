import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
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
