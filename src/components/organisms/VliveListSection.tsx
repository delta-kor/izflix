import styled from 'styled-components';
import HttpException from '../../exceptions/http-exception';
import Spaceship from '../../services/spaceship';
import { useEffect, useReducer, useRef, useState } from 'react';
import Evoke from '../../filters/evoke';
import VideoPanel from '../atoms/VideoPanel';
import { MobileQuery, PcQuery, PcInnerPadding, TabletQuery } from '../../styles';
import useDevice from '../../hooks/useDevice';
import session from '../../services/session';
import SelectionMenu from '../atoms/SelectionMenu';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${MobileQuery} {
    padding: 0 32px;
  }

  ${PcQuery} {
    padding: 0 ${PcInnerPadding};
  }
`;

const List = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  ${PcQuery} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 36px 24px;
  }

  ${TabletQuery} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Refresh = styled.div``;

interface Session {
  videos: IVideo[];
  anchor: string;
  sort: string;
}

const VliveListSection: React.FC = () => {
  const sessionData = session.get<Session>('vlive_list');

  const device = useDevice();

  const [videos, setVideos] = useState<IVideo[]>(sessionData.videos || []);
  const [sort, setSort] = useState<string>(sessionData.sort || 'oldest');

  const observerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<string>(sessionData.anchor || '');
  const loading = useRef<boolean>(false);
  const ended = useRef<boolean>(false);

  const forceUpdate = useReducer(x => x + 1, 0)[1];

  useEffect(() => {
    !sessionData.anchor && loadVideos();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !ended.current && !loading.current) {
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

  const loadVideos = async (anchor?: string, sortInput?: string) => {
    const reset = !!sortInput;
    if (reset) {
      setVideos([]);
      ended.current = false;
    }

    loading.current = true;
    const response = await Spaceship.getVliveList(reset ? '0' : anchor, sortInput || sort);
    loading.current = false;

    if (!response.ok) throw new HttpException(response);

    const newVideos = response.videos;

    if (newVideos.length === 0) {
      ended.current = true;
      forceUpdate();
      return false;
    }

    const appendedVideos = sortInput ? newVideos : [...videos, ...newVideos];
    anchorRef.current = newVideos.slice(-1)[0].id;

    session.set<Session>('vlive_list', {
      videos: appendedVideos,
      anchor: anchorRef.current,
      sort: sortInput || sort,
    });

    setVideos(appendedVideos);
  };

  const updateData = (sort?: string) => {
    new Evoke(loadVideos(anchorRef.current, sort));
  };

  const handleFilterUpdate = (key: string) => {
    session.remove('vlive_list');
    setSort(key);
    updateData(key);
  };

  return (
    <Layout>
      <SelectionMenu
        data={[
          { key: 'oldest', label: '날짜순' },
          { key: 'newest', label: '최근순' },
        ]}
        selected={[sort]}
        onSelect={handleFilterUpdate}
      />
      <List id={'boundary'}>
        {videos.map(video => (
          <VideoPanel
            type={device === 'mobile' ? 'vlive_horizontal' : 'vlive_full'}
            data={video}
            link={`/${video.id}`}
            key={video.id}
          />
        ))}

        {!ended.current && (
          <Repeat
            count={3 - (videos.length % 3)}
            element={i => (
              <VideoPanel type={device === 'mobile' ? 'vlive_horizontal' : 'vlive_full'} key={i} />
            )}
          />
        )}
        <Refresh ref={observerRef} />
      </List>
    </Layout>
  );
};

export default VliveListSection;
