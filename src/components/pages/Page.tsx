import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import { MobileQuery, MobileTopMargin, PcLeftMargin, PcQuery, PcTopMargin } from '../../styles';

const Layout = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  ${MobileQuery} {
    margin: ${MobileTopMargin}px 0 0 0;
  }

  ${PcQuery} {
    margin: ${PcTopMargin}px 0 0 ${PcLeftMargin}px;
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
