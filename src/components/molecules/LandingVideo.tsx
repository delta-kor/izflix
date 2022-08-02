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

    return (
      <Layout>
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
