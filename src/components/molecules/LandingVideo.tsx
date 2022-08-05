import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import {
  Color,
  HideOverflow,
  MobileQuery,
  MobileTopMargin,
  PcInnerPadding,
  PcQuery,
  PcTopMargin,
  Placeholder,
  Text,
} from '../../styles';
import Button from '../atoms/Button';

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  z-index: 0;

  ${MobileQuery} {
    gap: 16px;
    height: 320px;
    padding: 24px 32px;
    margin: -${MobileTopMargin}px 0 0 0;
  }

  ${PcQuery} {
    gap: 24px;
    height: 562px;
    padding: 42px ${PcInnerPadding};
    margin: -${PcTopMargin}px 0 0 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;

  ${MobileQuery} {
    gap: 8px;
  }

  ${PcQuery} {
    gap: 12px;
  }
`;

const Title = styled.div`
  color: ${Color.WHITE};
  flex-grow: 1;

  ${HideOverflow};

  ${MobileQuery} {
    ${Text.HEADLINE_1};
  }

  ${PcQuery} {
    ${Text.EX_HEADLINE_1};
  }
`;

const Description = styled.div`
  color: ${Color.WHITE};
  flex-grow: 1;

  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_1};
  }

  ${PcQuery} {
    ${Text.EX_SUBTITLE_1};
  }
`;

const TitlePlaceholder = styled.div`
  ${MobileQuery} {
    width: 70%;
    ${Placeholder.HEADLINE_1};
  }

  ${PcQuery} {
    width: 50%;
    ${Placeholder.EX_HEADLINE_1};
  }
`;

const DescriptionPlaceholder = styled.div`
  width: 30%;

  ${MobileQuery} {
    ${Placeholder.SUBTITLE_1};
  }

  ${PcQuery} {
    ${Placeholder.EX_SUBTITLE_1};
  }
`;

const Action = styled.div`
  display: flex;
  gap: 16px;
  z-index: 1;
`;

const VideoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 0;
`;

const Video = styled.video`
  position: absolute;
  top: 0;

  left: 0;
  width: 100%;
  height: 129%;

  object-fit: cover;
  object-position: center;
`;

const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 130%;
  background: linear-gradient(180deg, rgba(7, 13, 45, 0.2) 0%, rgba(7, 13, 45, 1) 100%);
`;

interface Props {
  data: ApiResponse.Playlist.ReadFeatured | null;
}

const LandingVideo: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const device = useDevice();

  const onActionClick = (type: 'play' | 'playlist') => {
    if (!data) return false;

    if (type === 'play') {
      navigate(`/${data.video.id}`);
    } else {
      navigate(`/playlist/${data.playlist_id}`);
    }
  };

  const video = data && data.video;

  const title = video && video.title;
  const description = video && video.description;
  const url = data && data.url;

  return (
    <Layout>
      <VideoWrapper>
        {url && <Video src={url + '#t=60'} muted autoPlay loop />}
        <Cover />
      </VideoWrapper>
      <Content>
        {title ? <Title>{title}</Title> : <TitlePlaceholder />}
        {description ? <Description>{description}</Description> : <DescriptionPlaceholder />}
      </Content>
      <Action>
        <Button
          color={Color.PRIMARY}
          icon={'play'}
          fluid={device === 'mobile'}
          onClick={() => onActionClick('play')}
        >
          재생하기
        </Button>
        <Button
          color={Color.TRANSPARENT}
          icon={'playlist'}
          fluid={device === 'mobile'}
          onClick={() => onActionClick('playlist')}
        >
          인기 동영상
        </Button>
      </Action>
    </Layout>
  );
};

export default LandingVideo;
