import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import { MobileQuery } from '../../styles';
import MusicMenu from '../menus/MusicMenu';

const Page = styled(motion.div)`
  ${MobileQuery} {
    padding: 80px 0 72px 0;
  }
`;

class MusicPage extends Component {
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
