import { motion } from 'framer-motion';
import { Component } from 'react';
import LandingVideo from '../actions/LandingVideo';

class MainPage extends Component {
  render() {
    return (
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <LandingVideo />
      </motion.div>
    );
  }
}

export default MainPage;
