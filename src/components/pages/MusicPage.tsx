import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import Constants from '../../constants';
import Scroll from '../../services/scroll';
import { MobileQuery } from '../../styles';
import MusicMenu from '../menus/MusicMenu';

const Page = styled(motion.div)`
  ${MobileQuery} {
    padding: 80px 0 72px 0;
  }
`;

class MusicPage extends Component {
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
        <MusicMenu />
      </Page>
    );
  }
}

export default MusicPage;
