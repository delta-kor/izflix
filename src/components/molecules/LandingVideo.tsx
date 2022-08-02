import { Component } from 'react';
import styled from 'styled-components';
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
import withDevice, { WithDeviceParams } from '../tools/WithDevice';
import withNavigate, { WithNavigateParams } from '../tools/WithNavigate';

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;

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

class LandingVideo extends Component<Props & WithDeviceParams & WithNavigateParams, any> {
  onActionClick = (type: 'play' | 'playlist') => {
    const data = this.props.data;
    if (!data) return false;

    if (type === 'play') {
      this.props.navigate(`/${data.video.id}`);
    } else {
      this.props.navigate(`/playlist/${data.playlist_id}`);
    }
  };

  render() {
    const data = this.props.data;
    const video = data && data.video;

    const title = video && video.title;
    const description = video && video.description;
    const url = data && data.url;

    return (
      <Layout>
        <VideoWrapper>
          {url && <Video src={url + '#t=60'} muted autoPlay />}
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
            fluid={this.props.device === 'mobile'}
            onClick={() => this.onActionClick('play')}
          >
            재생하기
          </Button>
          <Button
            color={Color.TRANSPARENT}
            icon={'playlist'}
            fluid={this.props.device === 'mobile'}
            onClick={() => this.onActionClick('playlist')}
          >
            인기 동영상
          </Button>
        </Action>
      </Layout>
    );
  }
}

export default withNavigate<Props>(withDevice(LandingVideo));
