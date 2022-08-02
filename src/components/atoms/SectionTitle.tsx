import { motion } from 'framer-motion';
import { Component, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Color, HideOverflow, MobileQuery, PcInnerPadding, PcQuery, Text } from '../../styles';

const Layout = styled.div`
  display: flex;
  align-items: center;

  ${MobileQuery} {
    padding: 8px 32px;
    gap: 8px;
  }

  ${PcQuery} {
    padding: 8px ${PcInnerPadding};
    gap: 8px;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  color: ${Color.WHITE};
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.HEADLINE_3};
  }

  ${PcQuery} {
    ${Text.HEADLINE_1};
  }
`;

const Action = styled(motion.div)`
  flex-shrink: 0;
  color: ${Color.PRIMARY};

  cursor: pointer;
  user-select: none;

  ${MobileQuery} {
    ${Text.CAPTION};
  }

  ${PcQuery} {
    ${Text.EX_CAPTION};
  }
`;

interface Props {
  action?: string;
  onActionClick?(): void;
}

class SectionTitle extends Component<Props, any> {
  onActionClick: MouseEventHandler = e => {
    e.preventDefault();
    this.props.onActionClick && this.props.onActionClick();
  };

  render() {
    const { children, action } = this.props;

    return (
      <Layout>
        <Content>{children}</Content>
        {action && (
          <Action
            onClick={this.onActionClick}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 1.05 }}
          >
            {action}
          </Action>
        )}
      </Layout>
    );
  }
}

export default SectionTitle;
