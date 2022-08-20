import { UIEventHandler, useRef, useState } from 'react';
import styled from 'styled-components';
import { VideoPageState } from '../../pages/VideoPage';
import { getDate } from '../../services/time';
import { Color } from '../../styles';
import VideoPanel from '../atoms/VideoPanel';
import Repeat from '../tools/Repeat';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const CarouselHandle = styled.span`
  display: flex;
  margin: 12px 0 0 0;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const CarouselHandleItem = styled.div<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  background: ${({ $active }) => ($active ? Color.WHITE : Color.GRAY)};
  border-radius: 100%;
  transition: background 0.1s;
`;

interface Props {
  data: IVideo[];
  createLink?(id: string): [string, VideoPageState];
}

const VideoCarousel: React.FC<Props> = ({ data, createLink }) => {
  const [page, setPage] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onScroll: UIEventHandler<HTMLDivElement> = e => {
    const element = e.target as HTMLDivElement;
    const scrollLeft = element.scrollLeft;
    const elementWidth = element.clientWidth;
    const page = Math.round(scrollLeft / elementWidth);
    setPage(page);
  };

  const groups = data.reduce((acc, video, index) => {
    const group = Math.floor(index / 3);
    if (!acc[group]) acc[group] = [];
    acc[group].push(video);
    return acc;
  }, [] as IVideo[][]);

  return (
    <Wrapper>
      <Layout ref={scrollRef} onScroll={onScroll}>
        {groups.length ? (
          groups.map((group, index) => (
            <Content key={index}>
              {group.map(({ id, description, date, duration }) => (
                <VideoPanel
                  type={'horizontal'}
                  data={{ id, title: description, description: getDate(date), duration } as IVideo}
                  link={createLink && createLink(id)[0]}
                  state={createLink && createLink(id)[1]}
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
      <CarouselHandle>
        <Repeat
          count={groups.length || 3}
          element={i => <CarouselHandleItem $active={page === i} key={i} />}
        />
      </CarouselHandle>
    </Wrapper>
  );
};

export default VideoCarousel;
