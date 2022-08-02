import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import Icon, { IconType } from '../../icons/Icon';
import { Color, MobileQuery, PcQuery } from '../../styles';

const Layout = styled(motion.div)<{ $color: string; $fluid: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  flex-grow: ${({ $fluid }) => ($fluid ? 1 : 0)};

  background: ${({ $color }) => $color};
  border-radius: 8px;

  cursor: pointer;
  user-select: none;

  ${MobileQuery} {
    padding: 14px 18px;
    gap: 10px;
  }

  ${PcQuery} {
    padding: 16px 28px;
    gap: 16px;
  }
`;

const Content = styled.div`
  font-weight: 700;
  color: ${Color.WHITE};

  ${MobileQuery} {
    font-size: 14px;
  }

  ${PcQuery} {
    font-size: 20px;
  }
`;

const ActionIcon = styled(Icon)`
  flex-shrink: 0;

  ${MobileQuery} {
    width: 14px;
    height: 14px;
  }

  ${PcQuery} {
    width: 18px;
    height: 18px;
  }
`;

interface Props {
  color: string;
  icon?: IconType;
  fluid?: boolean;
  onClick?(): void;
}

class Button extends Component<Props, any> {
  onClick = () => {
    this.props.onClick && this.props.onClick();
  };

  render() {
    const { children, color, icon, fluid } = this.props;

    return (
      <Layout
        $color={color}
        $fluid={fluid!!}
        onClick={this.onClick}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 1.05 }}
      >
        <Content>{children}</Content>
        {icon && <ActionIcon type={icon} color={Color.WHITE} />}
      </Layout>
    );
  }
}

export default Button;
