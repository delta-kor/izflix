import styled from 'styled-components';
import SectionTitle from '../atoms/SectionTitle';
import VideoCarousel from '../molecules/VideoCarousel';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  musics: IMusic[];
}

const MusicInfoSection: React.FC<Props> = ({ musics }) => {
  return (
    <Layout>
      {musics.length ? (
        musics.map(music => (
          <Content key={music.id}>
            <SectionTitle action={music.videos.length.toString()}>{music.title}</SectionTitle>
            <VideoCarousel videos={music.videos} />
          </Content>
        ))
      ) : (
        <Repeat
          count={10}
          element={i => (
            <Content key={i}>
              <SectionTitle />
              <VideoCarousel videos={[]} />
            </Content>
          )}
        />
      )}
    </Layout>
  );
};

export default MusicInfoSection;
