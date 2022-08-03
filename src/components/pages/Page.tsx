import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import { MobileQuery, MobileTopMargin, PcLeftMargin, PcQuery, PcTopMargin } from '../../styles';

const Layout = styled(motion.div)`
  ${MobileQuery} {
    margin: ${MobileTopMargin}px 0 0 0;
    padding: 0 0 120px 0;
  }

  ${PcQuery} {
    margin: ${PcTopMargin}px 0 0 ${PcLeftMargin}px;
    padding: 0 0 96px 0;
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
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.25 } }}
      >
        {this.props.children}
      </Layout>
    );
  }
}

export default Page;
