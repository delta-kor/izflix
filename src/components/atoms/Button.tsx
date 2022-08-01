import { Component } from 'react';
import styled from 'styled-components';
import Icon, { IconType } from '../../icons/Icon';
import { Color, MobileQuery, PcQuery } from '../../styles';

const Layout = styled.div<{ $color: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  background: ${({ $color }) => $color};
  border-radius: 8px;

  cursor: pointer;
  user-select: none;

  ${MobileQuery} {
    padding: 12px 18px;
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
  onClick?(): void;
}

class Button extends Component<Props, any> {
  render() {
    const { children, color, icon } = this.props;

    return (
      <Layout $color={color}>
        <Content>{children}</Content>
        {icon && <ActionIcon type={icon} color={Color.WHITE} />}
      </Layout>
    );
  }
}

export default Button;
