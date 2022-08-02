import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import { Color, HideOverflow, MobileQuery, PcQuery, Placeholder, Text } from '../../styles';
import { Mobile, Pc } from '../tools/MediaQuery';
import withNavigate, { WithNavigateParams } from '../tools/WithNavigate';
import SmoothImage from './SmoothImage';

const Layout = styled(motion.div)`
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
    width: 180px;
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
    height: 18px;
    line-height: 18px;
    ${Text.SUBTITLE_2};
  }

  ${PcQuery} {
    height: 20px;
    line-height: 20px;
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
          <Layout onTap={this.onClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.05 }}>
            <Thumbnail src={thumbnail} />
            {title ? <Title>{title}</Title> : <TitlePlaceholder />}
          </Layout>
        </Pc>
        <Mobile>
          <Layout onTap={this.onClick}>
            <Thumbnail src={thumbnail} />
            {title ? <Title>{title}</Title> : <TitlePlaceholder />}
          </Layout>
        </Mobile>
      </>
    );
  }
}

export default withNavigate<Props>(PlaylistItem);