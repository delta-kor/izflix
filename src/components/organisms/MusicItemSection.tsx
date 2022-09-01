import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import { VideoPageState } from '../../pages/VideoPage';
import { getDate } from '../../services/time';
import { Color, MobileQuery, PcInnerPadding, PcQuery, PcTopMargin } from '../../styles';
import MusicItem from '../atoms/MusicItem';
import SectionTitle from '../atoms/SectionTitle';
import VideoPanel from '../atoms/VideoPanel';
import VideoCarousel from '../molecules/VideoCarousel';
import { Mobile, Pc } from '../tools/MediaQuery';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  ${PcQuery} {
    display: grid;
    align-items: flex-start;
    grid-template-columns: 326px 1fr;
    gap: 0 32px;

    padding: 0 ${PcInnerPadding};
  }
`;

const Content = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
  }

  ${PcQuery} {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(max(240px, calc((100% - (3 * 24px)) / 4)), 1fr)
    );
    gap: 32px 24px;

    min-width: 0;
    padding: 16px;
    margin: -16px;

    z-index: 2;
  }
`;

const MusicSelector = styled.div`
  position: fixed;

  display: flex;
  flex-direction: column;
  gap: 16px;

  top: ${PcTopMargin}px;
  bottom: 16px;

  width: 358px;
  padding: 16px;
  margin: -16px;

  z-index: 2;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Color.DARK_GRAY};
    border-radius: 4px;
  }
`;

const MusicSelectorPlaceholder = styled.div`
  height: 100px;
`;

const MusicItemPlaceholder = styled.div`
  width: 316px;
  height: 55px;

  background: ${Color.DARK_GRAY};
  border-radius: 8px;
`;

interface Props {
  musics: IMusic[];
}

const MusicItemSection: React.FC<Props> = ({ musics }) => {
  const device = useDevice();

  const [selectedMusic, setSelectedMusic] = useState<IMusic | undefined>();

  useEffect(() => {
    if (musics.length) {
      const music = musics.reduce((prev, curr) => {
        return prev.videos.length > curr.videos.length ? prev : curr;
      });

      setSelectedMusic(music);
    }
  }, [musics]);

  useEffect(() => {
    device === 'pc' && window.scrollTo(0, 0);
  }, [selectedMusic]);

  const createLink = (id: string): [string, VideoPageState] => {
    const link = `/${id}`;
    const state: VideoPageState = { key: 'music', value: selectedMusic!.id };
    return [link, state];
  };

  return (
    <Layout>
      <Mobile>
        {selectedMusic ? (
          musics.map(music => (
            <Content key={music.id}>
              <SectionTitle action={music.videos.length.toString()}>{music.title}</SectionTitle>
              <VideoCarousel data={music.videos} createLink={createLink} />
            </Content>
          ))
        ) : (
          <Repeat
            count={10}
            element={i => (
              <Content key={i}>
                <SectionTitle />
                <VideoCarousel data={[]} />
              </Content>
            )}
          />
        )}
      </Mobile>
      <Pc>
        <Pc>
          <MusicSelectorPlaceholder />
        </Pc>
        <MusicSelector>
          {selectedMusic ? (
            musics.map(data => (
              <MusicItem
                data={data}
                active={selectedMusic.id === data.id}
                onClick={() => setSelectedMusic(data)}
                key={data.id}
              />
            ))
          ) : (
            <Repeat count={8} element={i => <MusicItemPlaceholder key={i} />} />
          )}
        </MusicSelector>
        <Content>
          {selectedMusic ? (
            selectedMusic.videos.map(({ id, description, date, duration }) => (
              <VideoPanel
                type={'full'}
                data={{ id, title: description, description: getDate(date), duration } as IVideo}
                link={createLink(id)[0]}
                state={createLink(id)[1]}
                key={id}
              />
            ))
          ) : (
            <Repeat count={12} element={i => <VideoPanel type={'full'} key={i} />} />
          )}
        </Content>
      </Pc>
    </Layout>
  );
};

export default MusicItemSection;
