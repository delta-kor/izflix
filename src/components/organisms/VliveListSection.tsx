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
import useModal from '../../hooks/useModal';

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
  margin: 0 0 32px 0;

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

const ListSector = styled.div``;

interface Session {
  videos: IVideo[];
  filter: IVliveFilter;
}

const VliveListSection: React.FC = () => {
  const sessionData = session.get<Session>('vlive_list');

  const device = useDevice();
  const modal = useModal();

  const [videos, setVideos] = useState<IVideo[]>(sessionData.videos || []);
  const [sort, setSort] = useState<string>(sessionData.filter?.sort || 'oldest');

  const observerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<string>(sessionData.filter?.anchor || '0');
  const loading = useRef<boolean>(false);
  const ended = useRef<boolean>(false);

  const forceUpdate = useReducer(x => x + 1, 0)[1];

  useEffect(() => {
    !sessionData.filter?.anchor && updateData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !ended.current && !loading.current) {
          updateData();
        }
      },
      { threshold: 1, rootMargin: '0px 0px 500px 0px' }
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

  const loadVideos = async (filter: IVliveFilter, reset: boolean = false) => {
    loading.current = true;
    const response = await Spaceship.getVliveList(filter);
    loading.current = false;

    if (!response.ok) throw new HttpException(response);

    const newVideos = response.videos;

    if (newVideos.length === 0) {
      ended.current = true;
      forceUpdate();
      return false;
    }

    const appendedVideos = reset ? newVideos : [...videos, ...newVideos];
    anchorRef.current = newVideos.slice(-1)[0].id;

    session.set<Session>('vlive_list', {
      videos: appendedVideos,
      filter,
    });

    setVideos(appendedVideos);
  };

  const updateData = (filter: IVliveFilter = {}, reset: boolean = false) => {
    filter.anchor = reset ? '0' : anchorRef.current;
    filter.sort = filter.sort || sort;
    filter.count = filter.count || 12;

    new Evoke(loadVideos(filter, reset));
  };

  const handleFilterUpdate = (key: string) => {
    if (key === 'set') return setDateFilter();

    setSort(key);
    setVideos([]);
    ended.current = false;
    session.remove('vlive_list');
    updateData({ sort: key }, true);
  };

  const setDateFilter = async () => {
    const result = await modal({ type: 'date', content: '날짜', value: '2019-01-01' });
    if (result.type === 'date') {
      setSort('set');
      setVideos([]);
      ended.current = false;
      session.remove('vlive_list');

      updateData({ sort: 'oldest', from: new Date(result.type).getTime() }, true);
    }
  };

  return (
    <Layout>
      <SelectionMenu
        data={[
          { key: 'oldest', label: '날짜순' },
          { key: 'newest', label: '최근순' },
          { key: 'set', label: '기간 설정' },
        ]}
        selected={[sort]}
        onSelect={handleFilterUpdate}
      />
      <ListSector>
        <List id={'boundary'}>
          {videos.map(video => (
            <VideoPanel
              type={device === 'mobile' ? 'vlive_horizontal' : 'vlive_full'}
              data={video}
              link={`/${video.id}`}
              key={video.id}
            />
          ))}
        </List>
        <Refresh ref={observerRef} />
        <List>
          {!ended.current && (
            <Repeat
              count={3}
              element={i => (
                <VideoPanel
                  type={device === 'mobile' ? 'vlive_horizontal' : 'vlive_full'}
                  key={i}
                />
              )}
            />
          )}
        </List>
      </ListSector>
    </Layout>
  );
};

export default VliveListSection;
