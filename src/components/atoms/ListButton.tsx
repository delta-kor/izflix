import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon, { IconType } from '../../icons/Icon';
import { Color, MobileQuery, PcQuery } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled(SmoothBox)<{ $color: string; $fluid: boolean }>`
  width: ${({ $fluid }) => ($fluid ? '100%' : 'auto')};

  & > .content {
    display: flex;
    align-items: center;

    background: ${({ $color }) => $color};
    border-radius: 8px;

    cursor: pointer;
    user-select: none;

    ${MobileQuery} {
      padding: 14px 18px;
      gap: 12px;
    }

    ${PcQuery} {
      padding: 16px 28px;
      gap: 16px;
    }
  }
`;

const Content = styled.div`
  flex-grow: 1;
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
    width: 16px;
    height: 16px;
  }

  ${PcQuery} {
    width: 18px;
    height: 18px;
  }
`;

interface Props {
  icon: IconType;
  color: string;
  fluid?: boolean;
  link?: string;
  onClick?: MouseEventHandler;
}

const ListButton: React.FC<Props> = ({ icon, color, fluid, link, onClick, children }) => {
  const Component = (
    <Layout $color={color} $fluid={fluid!!} hover={1.05} tap={0.95} onClick={onClick}>
      <ActionIcon type={icon} color={Color.WHITE} />
      <Content>{children}</Content>
    </Layout>
  );

  return link ? <Link to={link}>{Component}</Link> : Component;
};

ListButton.defaultProps = {
  fluid: true,
};

export default ListButton;
