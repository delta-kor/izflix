import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon, { IconType } from '../../icons/Icon';
import { Color, Text } from '../../styles';
import SmoothBox from './SmoothBox';

const Wrapper = styled(Link)`
  width: 100%;
`;

const Layout = styled(SmoothBox)<{ $color: string }>`
  width: 100%;

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
  width: 20px;
  height: 20px;
`;

const Content = styled.div`
  ${Text.SUBTITLE_2};
`;

interface Props {
  icon: IconType;
  color: string;
  link?: string;
  onClick?: MouseEventHandler;
}

const VerticalButton: React.FC<Props> = ({ icon, color, link, onClick, children }) => {
  const Component = (
    <Layout $color={color} hover={1.1} tap={0.9} onClick={onClick}>
      <ActionIcon type={icon} color={Color.WHITE} />
      <Content>{children}</Content>
    </Layout>
  );

  return link ? <Wrapper to={link}>{Component}</Wrapper> : Component;
};

export default VerticalButton;
