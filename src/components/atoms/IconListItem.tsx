import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import Icon, { IconType } from '../../icons/Icon';
import { Color, MobileQuery, PcQuery, Text } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled(SmoothBox)`
  & > .content {
    display: flex;
    align-items: center;
    gap: 16px;

    cursor: pointer;
  }
`;

const ContentIcon = styled(Icon)`
  flex-shrink: 0;

  ${MobileQuery} {
    width: 24px;
    height: 24px;
  }

  ${PcQuery} {
    width: 28px;
    height: 28px;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  color: ${Color.WHITE};

  ${MobileQuery} {
    ${Text.SUBTITLE_1};
  }

  ${PcQuery} {
    ${Text.EX_SUBTITLE_1};
  }
`;

interface Props {
  icon: IconType;
  onClick?: MouseEventHandler;
}

const IconListItem: React.FC<Props> = ({ icon, onClick, children }) => {
  const device = useDevice();

  const scale = device === 'mobile' ? [1.05, 0.95] : [1.01, 0.99];

  return (
    <Layout hover={scale[0]} tap={scale[1]} onClick={onClick}>
      <ContentIcon type={icon} color={Color.WHITE} />
      <Content>{children}</Content>
      <ContentIcon type={'right'} color={Color.GRAY} />
    </Layout>
  );
};

export default IconListItem;
