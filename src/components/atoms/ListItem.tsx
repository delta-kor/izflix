import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import Icon, { IconType } from '../../icons/Icon';
import { Color, HideOverflow, MobileQuery, PcQuery, Placeholder, Text } from '../../styles';
import SmoothBox from './SmoothBox';
import SmoothImage from './SmoothImage';

const Layout = styled(SmoothBox)<{ $short: boolean }>`
  & > .content {
    display: flex;
    align-items: center;
    padding: 8px 0;

    cursor: pointer;
    user-select: none;

    ${MobileQuery} {
      gap: ${({ $short }) => ($short ? '12px' : '20px')};
    }

    ${PcQuery} {
      gap: ${({ $short }) => ($short ? '16px' : '26px')};
    }
  }
`;

const ListIcon = styled(Icon)`
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

const ListImage = styled(SmoothImage)`
  flex-shrink: 0;
  border-radius: 4px;

  ${MobileQuery} {
    width: 32px;
    height: 32px;
  }

  ${PcQuery} {
    width: 38px;
    height: 38px;
  }
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
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_1};
  }

  ${PcQuery} {
    ${Text.EX_SUBTITLE_1};
  }
`;

const Description = styled.div`
  color: ${Color.GRAY};
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_2};
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
  }
`;

const Count = styled.div`
  flex-shrink: 0;
  color: ${Color.GRAY};

  ${MobileQuery} {
    ${Text.SUBTITLE_2};
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
  }
`;

const TitlePlaceholder = styled.div`
  width: 80%;

  ${MobileQuery} {
    ${Placeholder.SUBTITLE_1};
  }

  ${PcQuery} {
    ${Placeholder.EX_SUBTITLE_1};
  }
`;

const DescriptionPlaceholder = styled.div`
  width: 40%;

  ${MobileQuery} {
    ${Placeholder.SUBTITLE_2};
  }

  ${PcQuery} {
    ${Placeholder.SUBTITLE_1};
  }
`;

interface PropsBase {
  title: string;
  description: string;
  count: string;
  link?: string;
  state?: any;
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
  const device = useDevice();

  const scale = device === 'mobile' ? [1.05, 0.95] : [1.01, 0.99];

  const link = props.type === 'placeholder' ? undefined : props.link;
  const state = props.type === 'placeholder' ? undefined : props.state;

  const Inner =
    props.type !== 'placeholder' ? (
      <Layout
        $short={props.type === 'image'}
        hover={scale[0]}
        tap={scale[1]}
        onClick={props.onClick}
      >
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
      <Layout $short={true} hover={scale[0]} tap={scale[1]}>
        <ListImage />
        <Content>
          <TitlePlaceholder />
          <DescriptionPlaceholder />
        </Content>
      </Layout>
    );
  return link ? (
    <Link to={link} state={state}>
      {' '}
      {Inner}
    </Link>
  ) : (
    Inner
  );
};

export default ListItem;
