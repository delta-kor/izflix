import { motion } from 'framer-motion';
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

const Page: React.FC<Props> = ({ className, children }) => {
  return (
    <Layout
      className={className}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
    >
      {children}
    </Layout>
  );
};

export default Page;
