import { motion } from 'framer-motion';
import { Component } from 'react';

class MainPage extends Component {
  render() {
    return (
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        MainPage
      </motion.div>
    );
  }
}

export default MainPage;
