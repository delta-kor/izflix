import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon, { IconType } from '../../icons/Icon';
import { Color, Placeholder, Text } from '../../styles';
import SmoothBox from './SmoothBox';
import SmoothImage from './SmoothImage';

const Layout = styled(SmoothBox)<{ $short: boolean }>`
  & > .content {
    display: flex;
    align-items: center;
    gap: ${({ $short }) => ($short ? '12px' : '20px')};
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

const ListImage = styled(SmoothImage)`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 4px;
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

const TitlePlaceholder = styled.div`
  width: 80%;
  ${Placeholder.SUBTITLE_1};
`;

const DescriptionPlaceholder = styled.div`
  width: 40%;
  ${Placeholder.SUBTITLE_2};
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

type Props = IconProps | ImageProps | { type: 'placeholder' };

const ListItem: React.FC<Props> = props => {
  const link = props.type === 'placeholder' ? undefined : props.link;

  const Inner =
    props.type !== 'placeholder' ? (
      <Layout $short={props.type === 'image'} hover={1.05} tap={0.95} onClick={props.onClick}>
        {props.type === 'icon' ? (
          <ListIcon type={props.value} color={Color.PRIMARY} />
        ) : (
          <ListImage src={props.value} />
        )}
        <Content>
          <Title>{props.title}</Title>
          <Description>{props.description}</Description>
        </Content>
        <Count>{props.count}</Count>
      </Layout>
    ) : (
      <Layout $short={true} hover={1.05} tap={0.95}>
        <ListImage />
        <Content>
          <TitlePlaceholder />
          <DescriptionPlaceholder />
        </Content>
      </Layout>
    );
  return link ? <Link to={link}> {Inner}</Link> : Inner;
};

export default ListItem;
