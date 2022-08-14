import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon, { IconType } from '../../icons/Icon';
import { Color, Text } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled(SmoothBox)`
  & > .content {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px 0;

    cursor: pointer;
    user-select: none;
  }
`;

const ListIcon = styled(Icon)`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 4px;
  min-width: 0;
`;

const Title = styled.div`
  color: ${Color.WHITE};
  ${Text.SUBTITLE_1};
`;

const Description = styled.div`
  color: ${Color.GRAY};
  ${Text.SUBTITLE_2};
`;

const Count = styled.div`
  flex-shrink: 0;

  color: ${Color.GRAY};
  ${Text.SUBTITLE_2};
`;

interface PropsBase {
  title: string;
  description: string;
  count: string;
  link?: string;
  onClick?: MouseEventHandler;
}

interface IconProps extends PropsBase {
  type: 'icon';
  value: IconType;
}

interface ImageProps extends PropsBase {
  type: 'image';
  value: string;
}

type Props = IconProps | ImageProps;

const ListItem: React.FC<Props> = props => {
  if (props.type === 'icon') {
    const Inner = (
      <Layout onClick={props.onClick}>
        <ListIcon type={props.value} color={Color.PRIMARY} />
        <Content>
          <Title>{props.title}</Title>
          <Description>{props.description}</Description>
        </Content>
        <Count>{props.count}</Count>
      </Layout>
    );
    return props.link ? <Link to={props.link}> {Inner}</Link> : Inner;
  } else {
    return null;
  }
};

export default ListItem;
