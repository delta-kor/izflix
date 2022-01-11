import { motion } from 'framer-motion';
import { Component } from 'react';

class CategoryPage extends Component {
  render() {
    return (
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        CategoryPage
      </motion.div>
    );
  }
}

export default CategoryPage;
