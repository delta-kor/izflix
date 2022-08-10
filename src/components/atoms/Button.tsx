import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon, { IconType } from '../../icons/Icon';
import { Color, MobileQuery, PcQuery } from '../../styles';
import SmoothBox from './SmoothBox';

const Wrapper = styled(Link)<{ $fluid: boolean }>`
  width: ${({ $fluid }) => ($fluid ? '100%' : 'auto')};
`;

const Layout = styled(SmoothBox)<{ $color: string; $fluid: boolean }>`
  width: ${({ $fluid }) => ($fluid ? '100%' : 'auto')};

  & > .content {
    display: flex;
    justify-content: center;
    align-items: center;

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
  scale?: number;
  link?: string;
  onClick?: MouseEventHandler;
}

const Button: React.FC<Props> = ({ color, icon, fluid, link, scale, onClick, children }) => {
  const hover = scale! * 1.1;
  const tap = 1 - (hover - 1);

  const Component = (
    <Layout $color={color} $fluid={fluid!!} hover={hover} tap={tap} onClick={onClick}>
      <Content>{children}</Content>
      {icon && <ActionIcon type={icon} color={Color.WHITE} />}
    </Layout>
  );

  return link ? (
    <Wrapper $fluid={fluid!!} to={link}>
      {Component}
    </Wrapper>
  ) : (
    Component
  );
};

Button.defaultProps = {
  scale: 1,
};

export default Button;
