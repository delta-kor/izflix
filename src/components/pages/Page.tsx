import { motion, useIsPresent } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigationType } from 'react-router-dom';
import styled from 'styled-components';
import intersect from '../../services/intersect';
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

const Content = styled.div`
  ${MobileQuery} {
    min-height: calc(100vh - ${MobileTopMargin}px - 120px);
  }

  ${PcQuery} {
    min-height: calc(100vh - ${PcTopMargin}px - 96px);
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
  const navigationType = useNavigationType();
  const isPresent = useIsPresent();

  const [path] = useState<string>(window.location.pathname);

  useEffect(() => {
    intersect.setBoundary('boundary');

    if (navigationType === 'PUSH') {
      window.scrollTo(0, 0);
    } else {
      const scrollPostion = sessionStorage.getItem(path);
      window.scrollTo(0, scrollPostion ? parseInt(scrollPostion, 10) : 0);
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (!isPresent) {
      const scrollPosition = window.scrollY;
      sessionStorage.setItem(path, scrollPosition.toString());
    }
  }, [isPresent]);

  return (
    <Layout
      className={className}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
    >
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
};

export default Page;
