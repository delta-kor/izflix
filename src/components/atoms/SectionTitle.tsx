import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Color, HideOverflow, MobileQuery, PcInnerPadding, PcQuery, Text } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled.div<{ $fluid: boolean }>`
  display: flex;
  align-items: center;
  z-index: 1;

  ${MobileQuery} {
    padding: 8px ${({ $fluid }) => ($fluid ? '0' : '32px')};
    gap: 8px;
  }

  ${PcQuery} {
    padding: 8px ${({ $fluid }) => ($fluid ? '0' : PcInnerPadding)};
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

const Action = styled(SmoothBox)`
  & > .content {
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
  }
`;

interface Props {
  action?: string;
  onActionClick?: MouseEventHandler;
  fluid?: boolean;
}

const SectionTitle: React.FC<Props> = ({ action, onActionClick, fluid, children }) => {
  const onClick: MouseEventHandler = e => {
    e.preventDefault();
    onActionClick && onActionClick(e);
  };

  return (
    <Layout $fluid={fluid!!}>
      <Content>{children}</Content>
      {action && (
        <Action hover={1.1} tap={0.9} onClick={onClick}>
          {action}
        </Action>
      )}
    </Layout>
  );
};

export default SectionTitle;
