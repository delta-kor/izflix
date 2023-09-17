import styled from 'styled-components';
import HttpException from '../../exceptions/http-exception';
import Spaceship from '../../services/spaceship';
import { useEffect, useRef, useState } from 'react';
import Evoke from '../../filters/evoke';
import VideoPanel from '../atoms/VideoPanel';
import { MobileQuery, PcQuery, PcInnerPadding, TabletQuery } from '../../styles';
import useDevice from '../../hooks/useDevice';
import session from '../../services/session';
import SelectionMenu from '../atoms/SelectionMenu';

const Layout = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 32px;
  }

  ${PcQuery} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 36px 24px;
    padding: 0 ${PcInnerPadding};
  }

  ${TabletQuery} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Refresh = styled.div``;

interface Session {
  videos: IVideo[];
  anchor: string;
}

const VliveListSection: React.FC = () => {
  const sessionData = session.get<Session>('vlive_list');

  const device = useDevice();

  const [videos, setVideos] = useState<IVideo[]>(sessionData.videos || []);
  const observerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<string>(sessionData.anchor || '');
  const ended = useRef<boolean>(false);

  useEffect(() => {
    !sessionData.anchor && loadVideos();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !ended.current) {
          updateData();
        }
      },
      { threshold: 1, rootMargin: '0px 0px 0px 0px' }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef, videos]);

  const loadVideos = async (anchor?: string) => {
    const response = await Spaceship.getVliveList(anchor);
    if (!response.ok) throw new HttpException(response);

    const newVideos = response.videos;

    if (newVideos.length === 0) {
      ended.current = true;
      return false;
    }

    const appendedVideos = [...videos, ...newVideos];
    anchorRef.current = newVideos.slice(-1)[0].id;

    session.set<Session>('vlive_list', {
      videos: appendedVideos,
      anchor: anchorRef.current,
    });

    setVideos(appendedVideos);
  };

  const updateData = () => {
    new Evoke(loadVideos(anchorRef.current));
  };

  return (
    <Layout>
      <SelectionMenu data={[{ key: 'oldest', label: '날짜순' }]} />
      {videos.map(video => (
        <VideoPanel
          type={device === 'mobile' ? 'vlive_horizontal' : 'vlive_full'}
          data={video}
          link={`/${video.id}`}
          key={video.id}
        />
      ))}
      <Refresh ref={observerRef} />
    </Layout>
  );
};

export default VliveListSection;
