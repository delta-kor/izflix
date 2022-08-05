import { motion, MotionProps } from 'framer-motion';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  z-index: 1;
`;

const Inner = styled(motion.div)``;

interface Props extends MotionProps {
  hover?: number;
  tap?: number;
  onClick?: MouseEventHandler;
  className?: string;
}

const SmoothBox: React.FC<Props> = ({ hover, tap, onClick, className, children, ...args }) => {
  return (
    <Wrapper className={className} onClick={onClick}>
      <Inner
        {...args}
        className={'content'}
        whileHover={{ scale: hover }}
        whileTap={{ scale: tap }}
      >
        {children}
      </Inner>
    </Wrapper>
  );
};

SmoothBox.defaultProps = {
  hover: 1,
  tap: 1,
};

export default SmoothBox;
