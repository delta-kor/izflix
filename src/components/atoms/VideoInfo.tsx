import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import {
  Color,
  HideOverflow,
  MobileQuery,
  MobileSideMargin,
  PcQuery,
  Placeholder,
  Text,
} from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  ${MobileQuery} {
    gap: 8px;
    padding: 16px ${MobileSideMargin}px;
  }

  ${PcQuery} {
    gap: 10px;
    padding: 24px 32px;
  }
`;

const Title = styled.h1`
  flex-grow: 1;
  color: ${Color.WHITE};
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.HEADLINE_2};
  }

  ${PcQuery} {
    ${Text.HEADLINE_1};
  }
`;

const Description = styled.h3`
  flex-grow: 1;
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

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  ${MobileQuery} {
    gap: 8px;
    min-height: 26px;
  }

  ${PcQuery} {
    gap: 10px;
    min-height: 32px;
  }
`;

const MusicIconWrapper = styled(SmoothBox)`
  flex-shrink: 0;

  & > .content {
    position: relative;
    background: ${Color.GRAY};
    border-radius: 100%;
    cursor: pointer;

    ${MobileQuery} {
      width: 26px;
      height: 26px;
    }

    ${PcQuery} {
      width: 32px;
      height: 32px;
    }
  }
`;

const MusicIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${MobileQuery} {
    width: 14px;
    height: 14px;
  }

  ${PcQuery} {
    width: 18px;
    height: 18px;
  }
`;

const TitlePlaceholder = styled.div`
  ${MobileQuery} {
    width: 60%;
    ${Placeholder.HEADLINE_2};
  }

  ${PcQuery} {
    width: 420px;
    ${Placeholder.HEADLINE_1};
  }
`;

const DescriptionPlaceholder = styled.div`
  ${MobileQuery} {
    width: 30%;
    ${Placeholder.SUBTITLE_2};
  }

  ${PcQuery} {
    width: 320px;
    ${Placeholder.SUBTITLE_1};
  }
`;

interface Props {
  videoInfo?: ApiResponse.Video.Info;
}

const VideoInfo: React.FC<Props> = ({ videoInfo }) => {
  const navigate = useNavigate();

  const title = videoInfo?.title;
  const description = videoInfo?.description;
  const music = videoInfo?.music;

  const handleMusicClick = () => {
    if (!music) return false;

    navigate(`/music/${music[0]}`, { state: { selected: music[1] } });
  };

  return (
    <Layout>
      <TitleWrapper>
        {music && (
          <MusicIconWrapper hover={1.1} tap={0.9} onClick={handleMusicClick}>
            <MusicIcon type={'music'} color={Color.WHITE} />
          </MusicIconWrapper>
        )}
        {title ? <Title>{title}</Title> : <TitlePlaceholder />}
      </TitleWrapper>
      {description ? <Description>{description}</Description> : <DescriptionPlaceholder />}
    </Layout>
  );
};

export default VideoInfo;
