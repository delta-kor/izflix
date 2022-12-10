import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import Settings from '../../services/settings';
import Spaceship from '../../services/spaceship';
import {
  Color,
  HideOverflow,
  MobileQuery,
  MobileTopMargin,
  PcInnerPadding,
  PcLeftMargin,
  PcQuery,
  PcTopMargin,
  Placeholder,
  Text,
} from '../../styles';
import Button from '../atoms/Button';
import Loader from '../atoms/Loader';

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

const PerformanceContent = styled.div`
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

const VodContent = styled.div`
  position: relative;
  display: flex;
  z-index: 1;
  justify-content: space-between;
`;

const PlaylistIcon = styled(LazyLoadImage)`
  flex-shrink: 0;
  height: 100%;
  margin: 0 8px 0 0;
`;

const Title = styled.div`
  color: ${Color.WHITE};

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

const TitlePlaceholder = styled.div<{ $type: 'performance' | 'vod' }>`
  ${MobileQuery} {
    width: 70%;
    margin: ${props => (props.$type === 'performance' ? '0' : '0 0 0 auto')};
    ${Placeholder.HEADLINE_1};
  }

  ${PcQuery} {
    width: 50%;
    margin: ${props => (props.$type === 'performance' ? '0' : '0 0 0 auto')};
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

const PlaylistIconPlaceholder = styled.div`
  position: absolute;
  width: 80px;
  height: 100%;

  background: ${Color.DARK_GRAY};
  border-radius: 4px;
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

const Video = styled.video<{ $active: boolean }>`
  position: fixed;
  top: -10px;

  width: 100%;

  object-fit: cover;
  object-position: 50% 50%;
  opacity: ${({ $active }) => ($active ? 1 : 0)};

  transition: opacity 1s ease;

  ${MobileQuery} {
    left: 0;
    height: calc(320px * 1.39);
  }

  ${PcQuery} {
    left: ${PcLeftMargin}px;
    height: calc(562px * 1.39);
  }
`;

const VideoHider = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 720px;
  background: ${Color.BACKGROUND};

  ${MobileQuery} {
    top: calc(320px * 1.39);
  }

  ${PcQuery} {
    top: calc(562px * 1.39);
  }
`;

const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 140%;
  background: linear-gradient(180deg, rgba(7, 13, 45, 0.2) 0%, rgba(7, 13, 45, 1) 95%);
`;

const VideoLoader = styled(Loader)<{ $active: boolean }>`
  position: absolute;

  z-index: 1;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.5s ease;

  ${MobileQuery} {
    top: 108px;
    left: calc(50% - 18px);
    width: 36px;
    height: 36px;
  }

  ${PcQuery} {
    top: 220px;
    left: calc(50% - 24px);
    width: 48px;
    height: 48px;
  }
`;

interface Props {
  type: 'performance' | 'vod';
  data: ApiResponse.Playlist.ReadFeatured | null;
}

const LandingVideo: React.FC<Props> = ({ type, data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const device = useDevice();

  const [iconLoaded, setIconLoaded] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

  const onActionClick = (type: 'play' | 'playlist') => {
    if (!data) return false;

    if (type === 'play') {
      navigate(`/${data.video.id}`, { state: { key: 'playlist', value: data.playlist_id } });
    } else {
      navigate(`/playlist/${data.playlist_id}`);
    }
  };

  const video = data && data.video;

  const playlistId = data && data.playlist_id;
  const title = video && video.title;
  const description = video && video.description;
  const url = data && data.url + `#t=${type === 'performance' ? 60 : 300}`;

  return (
    <Layout>
      <VideoWrapper>
        <VideoLoader $active={!videoLoaded} color={Color.DARK_GRAY} />
        {url && (
          <Video
            $active={videoLoaded}
            onCanPlay={() => setVideoLoaded(true)}
            src={url}
            muted
            autoPlay={Settings.getOne('FEATURED_VIDEO_AUTOPLAY')}
            loop
            playsInline
          />
        )}
        <VideoHider />
        <Cover />
      </VideoWrapper>
      {type === 'performance' ? (
        <PerformanceContent id={'boundary'}>
          {title ? <Title>{title}</Title> : <TitlePlaceholder $type={'performance'} />}
          {description ? <Description>{description}</Description> : <DescriptionPlaceholder />}
        </PerformanceContent>
      ) : (
        <VodContent id={'boundary'}>
          {!iconLoaded && <PlaylistIconPlaceholder />}
          {playlistId && (
            <PlaylistIcon
              src={Spaceship.getThumbnail(playlistId)}
              effect={'opacity'}
              wrapperProps={{
                style: { height: device === 'mobile' ? '28px' : '36px' },
              }}
              afterLoad={() => setIconLoaded(true)}
            />
          )}
          {title ? <Title>{description}</Title> : <TitlePlaceholder $type={'vod'} />}
        </VodContent>
      )}
      <Action>
        <Button
          color={Color.PRIMARY}
          icon={'play'}
          fluid={device === 'mobile'}
          scale={0.96}
          onClick={() => onActionClick('play')}
        >
          {type === 'performance' ? t('video.play') : t('video.play_first')}
        </Button>
        <Button
          color={Color.TRANSPARENT}
          icon={'playlist'}
          fluid={device === 'mobile'}
          scale={0.96}
          onClick={() => onActionClick('playlist')}
        >
          {type === 'performance' ? t('video.trending') : t('playlist.playlist')}
        </Button>
      </Action>
    </Layout>
  );
};

export default LandingVideo;
