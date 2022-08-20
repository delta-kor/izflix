import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import { Color, HideOverflow, MobileQuery, PcQuery, Placeholder, Text } from '../../styles';
import SmoothBox from './SmoothBox';
import SmoothImage from './SmoothImage';

const FullLayout = styled(SmoothBox)`
  width: 100%;
  min-width: 0;

  & > .content {
    display: flex;
    flex-direction: column;
    gap: 10px;

    cursor: pointer;
    user-select: none;
  }
`;

const Image = styled(SmoothImage)`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 4px;
  min-width: 0;
`;

const Title = styled.div`
  width: 100%;
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
  width: 100%;
  color: ${Color.WHITE};
  opacity: 0.7;
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_2};
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
  }
`;

const TitlePlaceholder = styled.div`
  width: 100%;

  ${MobileQuery} {
    ${Placeholder.SUBTITLE_1};
  }

  ${PcQuery} {
    ${Placeholder.EX_SUBTITLE_1};
  }
`;

const DescriptionPlaceholder = styled.div`
  width: 70%;

  ${MobileQuery} {
    ${Placeholder.SUBTITLE_2};
  }

  ${PcQuery} {
    ${Placeholder.SUBTITLE_1};
  }
`;

const HorizontalLayout = styled(SmoothBox)`
  & > .content {
    display: flex;
    align-items: center;
    gap: 16px;
    height: 70px;

    cursor: pointer;
    user-select: none;
  }
`;

const HorizontalImage = styled(SmoothImage)`
  flex-shrink: 0;
  height: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
`;

const VerticalLayout = styled(SmoothBox)`
  & > .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 240px;

    cursor: pointer;
    user-select: none;
  }
`;

const VerticalImage = styled(SmoothImage)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

interface Props {
  type: 'full' | 'horizontal' | 'vertical';
  data?: IVideo;
  link?: string;
  state?: any;
  onClick?: MouseEventHandler;
}

const VideoPanel: React.FC<Props> = ({ type, data, link, state, onClick }) => {
  const thumbnail = data && Spaceship.getThumbnail(data.id);
  const title = data && data.title;
  const description = data && data.description;

  const Component =
    type === 'full' ? (
      <FullLayout hover={1.05} tap={0.95} onClick={onClick}>
        <Image src={thumbnail} />
        <Content>
          {title ? <Title>{title}</Title> : <TitlePlaceholder />}
          {description ? <Description>{description}</Description> : <DescriptionPlaceholder />}
        </Content>
      </FullLayout>
    ) : type === 'horizontal' ? (
      <HorizontalLayout hover={1.05} tap={0.95}>
        <HorizontalImage src={thumbnail} />
        <Content>
          {title ? <Title>{title}</Title> : <TitlePlaceholder />}
          {description ? <Description>{description}</Description> : <DescriptionPlaceholder />}
        </Content>
      </HorizontalLayout>
    ) : (
      <VerticalLayout hover={1.05} tap={0.95} onClick={onClick}>
        <VerticalImage src={thumbnail} />
        {title ? <Title>{title}</Title> : <TitlePlaceholder />}
      </VerticalLayout>
    );

  return link ? (
    <Link to={link} state={state}>
      {Component}
    </Link>
  ) : (
    Component
  );
};

export default VideoPanel;
