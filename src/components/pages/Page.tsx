import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import { MobileQuery } from '../../styles';

const Layout = styled(motion.div)`
  ${MobileQuery} {
    padding: 80px 0 0 0;
  }
`;

interface Props {
  className?: string;
}

class Page extends Component<Props, any> {
  render() {
    return (
      <Layout
        className={this.props.className}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {this.props.children}
      </Layout>
    );
  }
}

export default Page;
