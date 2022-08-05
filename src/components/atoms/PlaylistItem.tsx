import { Component } from 'react';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import { Color, HideOverflow, MobileQuery, PcQuery, Placeholder, Text } from '../../styles';
import { Mobile, Pc } from '../tools/MediaQuery';
import withNavigate, { WithNavigateParams } from '../tools/WithNavigate';
import SmoothBox from './SmoothBox';
import SmoothImage from './SmoothImage';

const Layout = styled(SmoothBox)`
  & > .content {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    flex-shrink: 0;
    scroll-snap-align: start;

    cursor: pointer;
    user-select: none;

    ${MobileQuery} {
      gap: 10px;
      width: 160px;
    }

    ${PcQuery} {
      gap: 12px;
      width: 150px;
    }
  }
`;

const Thumbnail = styled(SmoothImage)`
  aspect-ratio: 7 / 9;
  border-radius: 8px;
`;

const Title = styled.div`
  color: ${Color.WHITE};
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_2};
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
  }
`;

const TitlePlaceholder = styled.div`
  width: 70%;

  ${MobileQuery} {
    ${Placeholder.SUBTITLE_2};
  }

  ${PcQuery} {
    ${Placeholder.SUBTITLE_1};
  }
`;

interface Props {
  playlist?: IPlaylist;
}

class PlaylistItem extends Component<Props & WithNavigateParams, any> {
  onClick = () => {
    const playlist = this.props.playlist;
    if (playlist) {
      this.props.navigate(`/playlist/${playlist.id}`, {});
    }
  };

  render() {
    const playlist = this.props.playlist;

    const thumbnail = playlist && Spaceship.getThumbnail(playlist.thumbnail);
    const title = playlist && playlist.title;

    return (
      <>
        <Pc>
          <Layout hover={1.1} tap={0.9} onClick={this.onClick}>
            <Thumbnail src={thumbnail} />
            {title ? <Title>{title}</Title> : <TitlePlaceholder />}
          </Layout>
        </Pc>
        <Mobile>
          <Layout onClick={this.onClick}>
            <Thumbnail src={thumbnail} />
            {title ? <Title>{title}</Title> : <TitlePlaceholder />}
          </Layout>
        </Mobile>
      </>
    );
  }
}

export default withNavigate<Props>(PlaylistItem);
