import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import { MobileQuery } from '../../styles';

const Page = styled(motion.div)`
  ${MobileQuery} {
    padding: 0 0 64px 0;
  }
`;

class VideoPage extends Component {
  render() {
    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1>VideoPage</h1>
      </Page>
    );
  }
}

export default VideoPage;
