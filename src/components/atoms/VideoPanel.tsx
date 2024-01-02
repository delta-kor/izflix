import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import { getDate, getDuration, getHumanDuration } from '../../services/time';
import { Color, HideOverflow, MobileQuery, PcQuery, Placeholder, Text } from '../../styles';
import SmoothBox from './SmoothBox';
import SmoothImage from './SmoothImage';
import MemberCircle from './MemberCircle';

const FullLayout = styled(SmoothBox)`
  width: 100%;
  min-width: 0;

  & > .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;

    cursor: pointer;
    user-select: none;
  }
`;

const Image = styled(SmoothImage)`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
`;

const Content = styled.article`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 4px;
  min-width: 0;
`;

const Title = styled.h3<{ $shrink?: boolean }>`
  width: 100%;
  color: ${Color.WHITE};
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_1};
  }

  ${PcQuery} {
    ${({ $shrink }) => ($shrink ? Text.SUBTITLE_1 : Text.EX_SUBTITLE_1)};
  }
`;

const Description = styled.p<{ $shrink?: boolean }>`
  width: 100%;
  color: ${Color.WHITE};
  opacity: 0.7;
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_2};
  }

  ${PcQuery} {
    ${({ $shrink }) => ($shrink ? Text.SUBTITLE_2 : Text.SUBTITLE_1)};
    font-weight: 400;
  }
`;

const PlayTime = styled.p<{ $shrink?: boolean }>`
  width: 100%;
  color: ${Color.PRIMARY};
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_2};
  }

  ${PcQuery} {
    ${({ $shrink }) => ($shrink ? Text.SUBTITLE_2 : Text.SUBTITLE_1)};
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

const HorizontalLayout = styled(SmoothBox)<{ $shrink: boolean }>`
  & > .content {
    display: flex;
    align-items: center;
    gap: 16px;
    height: ${({ $shrink }) => ($shrink ? '60px' : '70px')};

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

const VliveInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${PcQuery} {
    margin: 4px 0 0 0;
  }
`;

const VliveDate = styled.div`
  color: ${Color.GRAY};
  font-weight: 400;

  ${MobileQuery} {
    font-size: 14px;
  }

  ${PcQuery} {
    font-size: 16px;
  }
`;

const VliveInfoPlaceholder = styled.div`
  width: 70%;

  ${PcQuery} {
    margin: 4px 0 0 0;
    ${Placeholder.HEADLINE_2};
  }

  ${MobileQuery} {
    ${Placeholder.SUBTITLE_1};
  }
`;

interface Props {
  type: 'full' | 'horizontal' | 'vertical' | 'vlive_horizontal' | 'vlive_full';
  data?: IVideo;
  link?: string;
  state?: any;
  onClick?: MouseEventHandler;
  shrink?: boolean;
  playTime?: number;
}

const VideoPanel: React.FC<Props> = ({ type, data, link, state, onClick, shrink, playTime }) => {
  const thumbnail = data && Spaceship.getThumbnail(data.id);
  const title = data && data.title;
  const description = data && data.description;
  const properties = data && data.properties;
  const duration = data && getDuration(data.duration, properties);
  const members = data && data.members;
  const date = data && getDate(data.date, 'dot');

  const Component =
    type === 'full' ? (
      <FullLayout hover={1.03} tap={0.97} onClick={onClick}>
        <Image src={thumbnail} text={duration} />
        <Content>
          {title ? <Title>{title}</Title> : <TitlePlaceholder />}
          {description ? <Description>{description}</Description> : <DescriptionPlaceholder />}
        </Content>
      </FullLayout>
    ) : type === 'horizontal' ? (
      <HorizontalLayout $shrink={!!shrink} hover={1.03} tap={0.97} onClick={onClick}>
        <HorizontalImage src={thumbnail} text={duration} />
        <Content>
          {title ? <Title $shrink={!!shrink}>{title}</Title> : <TitlePlaceholder />}
          {description ? (
            <Description $shrink={!!shrink}> {description}</Description>
          ) : (
            <DescriptionPlaceholder />
          )}
          {playTime ? <PlayTime $shrink={!!shrink}>{getHumanDuration(playTime)}</PlayTime> : null}
        </Content>
      </HorizontalLayout>
    ) : type === 'vertical' ? (
      <VerticalLayout hover={1.05} tap={0.95} onClick={onClick}>
        <VerticalImage src={thumbnail} text={duration} />
        {title ? <Title>{title}</Title> : <TitlePlaceholder />}
      </VerticalLayout>
    ) : type === 'vlive_horizontal' ? (
      <HorizontalLayout $shrink={!!shrink} hover={1.03} tap={0.97} onClick={onClick}>
        <HorizontalImage src={thumbnail} text={duration} />
        <Content>
          {title ? <Title $shrink={!!shrink}>{title}</Title> : <TitlePlaceholder />}
          {date ? (
            <VliveInfo>
              <MemberCircle members={members!} />
              <VliveDate>{date}</VliveDate>
            </VliveInfo>
          ) : (
            <VliveInfoPlaceholder />
          )}
        </Content>
      </HorizontalLayout>
    ) : (
      <FullLayout hover={1.02} tap={0.98} onClick={onClick}>
        <Image src={thumbnail} text={duration} />
        <Content>
          {title ? <Title>{title}</Title> : <TitlePlaceholder />}
          {date ? (
            <VliveInfo>
              <MemberCircle members={members!} />
              <VliveDate>{date}</VliveDate>
            </VliveInfo>
          ) : (
            <VliveInfoPlaceholder />
          )}
        </Content>
      </FullLayout>
    );

  return link ? (
    <Link to={link} state={state} style={{ minWidth: 0 }}>
      {Component}
    </Link>
  ) : (
    Component
  );
};

export default VideoPanel;
