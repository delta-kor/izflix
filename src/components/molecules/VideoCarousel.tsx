import styled from 'styled-components';
import { getDate } from '../../services/time';
import VideoPanel from '../atoms/VideoPanel';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 0 32px;

  width: 100vw;
  scroll-snap-align: start;
  flex-shrink: 0;
  overflow: hidden;
`;

interface Props {
  data: IVideo[];
  createLink?(id: string): string;
}

const VideoCarousel: React.FC<Props> = ({ data, createLink }) => {
  const groups = data.reduce((acc, video, index) => {
    const group = Math.floor(index / 3);
    if (!acc[group]) acc[group] = [];
    acc[group].push(video);
    return acc;
  }, [] as IVideo[][]);

  return (
    <Layout>
      {groups.length ? (
        groups.map((group, index) => (
          <Content key={index}>
            {group.map(({ id, description, date, duration }) => (
              <VideoPanel
                type={'horizontal'}
                data={{ id, title: description, description: getDate(date), duration } as IVideo}
                link={createLink && createLink(id)}
                key={id}
              />
            ))}
          </Content>
        ))
      ) : (
        <Repeat
          count={3}
          element={i => (
            <Content key={i}>
              <VideoPanel type={'horizontal'} />
              <VideoPanel type={'horizontal'} />
              <VideoPanel type={'horizontal'} />
            </Content>
          )}
        />
      )}
    </Layout>
  );
};

export default VideoCarousel;
