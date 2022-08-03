import { motion, MotionProps } from 'framer-motion';
import { Component, MouseEventHandler } from 'react';
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

class SmoothBox extends Component<Props, any> {
  static defaultProps: Partial<Props> = {
    hover: 1,
    tap: 1,
  };

  onClick: MouseEventHandler = e => {
    this.props.onClick && this.props.onClick(e);
  };

  render() {
    const { className, children, hover, tap } = this.props;

    return (
      <Wrapper className={className} onClick={this.onClick}>
        <Inner
          {...this.props}
          className={'content'}
          whileHover={{ scale: hover }}
          whileTap={{ scale: tap }}
        >
          {children}
        </Inner>
      </Wrapper>
    );
  }
}

export default SmoothBox;
