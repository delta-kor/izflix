import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import { HideScrollbar, MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import PlaylistItem from '../atoms/PlaylistItem';
import SectionTitle from '../atoms/SectionTitle';
import Repeat from '../tools/Repeat';
import ShortcutSection from './ShortcutSection';

const Wrapper = styled.div`
  z-index: 1;

  ${MobileQuery} {
    margin: -24px 0 0 0;
  }

  ${PcQuery} {
    display: grid;
    grid-template-columns: auto 182px;
    gap: 32px;
    margin: -16px 0 -32px 0;
    padding: 0 ${PcInnerPadding};
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled(SectionTitle)`
  z-index: 1;
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
    flex-wrap: wrap;
    gap: 48px 16px;
    height: 268px;
    justify-content: space-between;

    margin: -32px -32px 0 -32px;
    padding: 32px 32px 0 32px;
    overflow: hidden;
  }
`;

interface Props {
  playlists: IPlaylist[];
}

const PlaylistSection: React.FC<Props> = ({ playlists }) => {
  const device = useDevice();

  return (
    <Wrapper>
      <Layout>
        <Title action={'전체보기'} link={'/playlist'} fluid={device === 'pc'}>
          재생목록
        </Title>
        <ItemList>
          {playlists.length ? (
            playlists
              .slice(0, device === 'pc' ? 6 : undefined)
              .map(data => <PlaylistItem playlist={data} key={data.id} />)
          ) : (
            <Repeat
              count={device === 'pc' ? 6 : 10}
              element={(i: number) => <PlaylistItem key={i} />}
            />
          )}
        </ItemList>
      </Layout>
      {device === 'pc' && <ShortcutSection />}
    </Wrapper>
  );
};

export default PlaylistSection;
