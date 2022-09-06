import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon, { IconType } from '../../icons/Icon';
import { Color, MobileQuery, PcQuery, Text } from '../../styles';
import SmoothBox from './SmoothBox';

const Wrapper = styled(Link)<{ $fluid: boolean }>`
  width: ${({ $fluid }) => ($fluid ? '100%' : 'fit-content')};
`;

const Layout = styled(SmoothBox)<{ $color: string; $fluid: boolean }>`
  width: ${({ $fluid }) => ($fluid ? '100%' : 'fit-content')};

  & > .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
    gap: 10px;

    background: ${({ $color }) => $color};
    border-radius: 8px;

    cursor: pointer;
    user-select: none;
  }
`;

const ActionIcon = styled(Icon)`
  ${MobileQuery} {
    width: 20px;
    height: 20px;
  }

  ${PcQuery} {
    width: 24px;
    height: 24px;
  }
`;

const Content = styled.div`
  ${MobileQuery} {
    ${Text.SUBTITLE_2};
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
  }
`;

interface Props {
  icon: IconType;
  color: string;
  fluid?: boolean;
  link?: string;
  onClick?: MouseEventHandler;
}

const VerticalButton: React.FC<Props> = ({ icon, color, fluid, link, onClick, children }) => {
  const Component = (
    <Layout $color={color} $fluid={fluid!!} hover={1.1} tap={0.9} onClick={onClick}>
      <ActionIcon type={icon} color={Color.WHITE} />
      <Content>{children}</Content>
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

export default VerticalButton;
