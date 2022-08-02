import { Component } from 'react';
import styled from 'styled-components';
import { HideScrollbar, MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import PlaylistItem from '../atoms/PlaylistItem';
import SectionTitle from '../atoms/SectionTitle';
import Repeat from '../tools/Repeat';
import withNavigate, { WithNavigateParams } from '../tools/WithNavigate';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemList = styled.div`
  display: flex;

  ${HideScrollbar};

  ${MobileQuery} {
    gap: 24px;
    height: 236px;
    padding: 0 32px;
    scroll-snap-type: x mandatory;
    scroll-padding: 0 32px;
    overflow-x: auto;
  }

  ${PcQuery} {
    gap: 48px 24px;
    height: 332px;
    flex-wrap: wrap;
    justify-content: space-between;

    margin: -32px 0 0 0;
    padding: 32px ${PcInnerPadding} 0 ${PcInnerPadding};
    scroll-padding: 0 ${PcInnerPadding};
    overflow: hidden;
  }
`;

interface Props {
  playlists: IPlaylist[];
}

class PlaylistSection extends Component<Props & WithNavigateParams, any> {
  onSectionTitleClick = () => {
    this.props.navigate('/playlist');
  };

  render() {
    const playlists = this.props.playlists;

    return (
      <Layout>
        <SectionTitle action={'전체보기'} onActionClick={this.onSectionTitleClick}>
          재생목록
        </SectionTitle>
        <ItemList>
          {playlists.length ? (
            playlists.map(data => <PlaylistItem playlist={data} key={data.id} />)
          ) : (
            <Repeat element={PlaylistItem} count={10} />
          )}
        </ItemList>
      </Layout>
    );
  }
}

export default withNavigate<Props>(PlaylistSection);
