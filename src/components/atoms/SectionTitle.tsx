import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Color, HideOverflow, MobileQuery, PcInnerPadding, PcQuery, Text } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled.div<{ $fluid: boolean }>`
  display: flex;
  align-items: center;

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
  link?: string;
  onActionClick?: MouseEventHandler;
  fluid?: boolean;
  className?: string;
}

const SectionTitle: React.FC<Props> = ({
  action,
  link,
  onActionClick,
  fluid,
  className,
  children,
}) => {
  const ActionComponent = (
    <Action hover={1.1} tap={0.9} onClick={onActionClick}>
      {action}
    </Action>
  );

  return (
    <Layout $fluid={fluid!!} className={className}>
      <Content>{children}</Content>
      {action && link ? <Link to={link}>{ActionComponent}</Link> : ActionComponent}
    </Layout>
  );
};

export default SectionTitle;
