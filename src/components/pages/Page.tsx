import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  Color,
  MobileQuery,
  MobileTopMargin,
  PcLeftMargin,
  PcQuery,
  PcTopMargin,
} from '../../styles';

const Layout = styled(motion.div)`
  position: relative;

  ${MobileQuery} {
    margin: ${MobileTopMargin}px 0 0 0;
  }

  ${PcQuery} {
    margin: ${PcTopMargin}px 0 0 ${PcLeftMargin}px;
  }
`;

const Footer = styled.div`
  position: absolute;
  width: 100%;
  margin: -2px 0 0 0;

  background: ${Color.BACKGROUND};
  z-index: 1;

  ${MobileQuery} {
    height: 120px;
  }

  ${PcQuery} {
    height: 96px;
  }
`;

interface Props {
  className?: string;
}

const Page: React.FC<Props> = ({ className, children }) => {
  return (
    <Layout
      className={className}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
    >
      {children}
      <Footer />
    </Layout>
  );
};

export default Page;
