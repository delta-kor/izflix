import { Component } from 'react';
import styled from 'styled-components';
import Icon, { IconType } from '../../icons/Icon';
import { Color, MobileQuery, PcQuery } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled(SmoothBox)<{ $color: string; $fluid: boolean }>`
  flex-grow: ${({ $fluid }) => ($fluid ? 1 : 0)};

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
  onClick?(): void;
}

class Button extends Component<Props, any> {
  onClick = () => {
    this.props.onClick && this.props.onClick();
  };

  render() {
    const { children, color, icon, fluid } = this.props;

    return (
      <Layout $color={color} $fluid={fluid!!} hover={1.1} tap={0.9} onClick={this.onClick}>
        <Content>{children}</Content>
        {icon && <ActionIcon type={icon} color={Color.WHITE} />}
      </Layout>
    );
  }
}

export default Button;
