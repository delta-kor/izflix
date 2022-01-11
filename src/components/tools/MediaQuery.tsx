import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { MobileLimit } from '../../styles';

const Mobile: React.FC = ({ children }) => {
  const isMobile = useMediaQuery({
    query: `(max-width:${MobileLimit}px) `,
  });
  return <React.Fragment>{isMobile && children}</React.Fragment>;
};

const Pc: React.FC = ({ children }) => {
  const isPc = useMediaQuery({
    query: `(min-width:${MobileLimit + 1}px) `,
  });
  return <React.Fragment>{isPc && children}</React.Fragment>;
};

export { Mobile, Pc };
