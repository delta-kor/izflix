import { motion } from 'framer-motion';
import { Component } from 'react';
import LandingVideo from '../actions/LandingVideo';
import { Mobile } from '../tools/MediaQuery';

class MainPage extends Component {
  render() {
    return (
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Mobile>
          <LandingVideo />
        </Mobile>
      </motion.div>
    );
  }
}

export default MainPage;
