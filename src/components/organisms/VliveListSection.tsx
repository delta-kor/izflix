import styled from 'styled-components';
import HttpException from '../../exceptions/http-exception';
import Spaceship from '../../services/spaceship';
import { useEffect, useReducer, useRef, useState } from 'react';
import Evoke from '../../filters/evoke';
import VideoPanel from '../atoms/VideoPanel';
import { MobileQuery, PcQuery, PcInnerPadding, TabletQuery, Color } from '../../styles';
import useDevice from '../../hooks/useDevice';
import session from '../../services/session';
import SelectionMenu from '../atoms/SelectionMenu';
import Repeat from '../tools/Repeat';
import useModal from '../../hooks/useModal';
import SmoothBox from '../atoms/SmoothBox';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${MobileQuery} {
    padding: 0 24px;
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

const Refresh = styled.div`
  ${MobileQuery} {
    margin: 0 0 16px 0;
  }

  ${PcQuery} {
    margin: 0 0 36px 0;
  }
`;

const ListSector = styled.div``;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled(SmoothBox)<{ $active: boolean }>`
  & > .content {
    display: flex;
    padding: 10px 14px;
    border-radius: 4px;
    background: ${({ $active }) => ($active ? Color.PRIMARY : Color.GRAY)};

    font-size: 16px;
    font-weight: 700;
    color: ${Color.WHITE};
    transform: skew(0.1deg);

    transition: background 0.2s;
    cursor: pointer;
    user-select: none;
  }
`;

const NoItems = styled.div`
  text-align: center;
  font-size: 20px;
`;

interface Session {
  videos: IVideo[];
  filter: IVliveFilter;
}

const VliveListSection: React.FC = () => {
  const sessionData = session.get<Session>('vlive_list');

  const device = useDevice();
  const modal = useModal();

  const [videos, setVideos] = useState<IVideo[]>(sessionData.videos || []);

  const observerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<IVliveFilter>(sessionData.filter || { sort: 'oldest', count: 18 });

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

  const loadVideos = async (reset: boolean = false) => {
    if (reset) filterRef.current.anchor = '0';

    loading.current = true;
    const response = await Spaceship.getVliveList(filterRef.current);
    loading.current = false;

    if (!response.ok) throw new HttpException(response);

    const newVideos = response.videos;

    if (newVideos.length === 0) {
      ended.current = true;
      forceUpdate();
      session.set<Session>('vlive_list', {
        videos,
        filter: filterRef.current,
      });

      return false;
    }

    const appendedVideos = reset ? newVideos : [...videos, ...newVideos];
    filterRef.current.anchor = appendedVideos.slice(-1)[0].id;

    session.set<Session>('vlive_list', {
      videos: appendedVideos,
      filter: filterRef.current,
    });

    setVideos(appendedVideos);
  };

  const updateData = (reset: boolean = false) => {
    new Evoke(loadVideos(reset));
  };

  const resetData = () => {
    setVideos([]);
    ended.current = false;
    session.remove('vlive_list');
  };

  const handleFilterUpdate = (key: string) => {
    if (key === 'set') return setDateFilter();

    resetData();
    filterRef.current.sort = key;
    updateData(true);
  };

  const setDateFilter = async () => {
    const result = await modal({
      type: 'date',
      content: '날짜',
      value: new Date(filterRef.current.from || '2018-10-29').toLocaleDateString('sv-SE'),
    });
    if (result.type === 'date') {
      resetData();
      filterRef.current.sort = 'set';
      filterRef.current.from = new Date(result.value).getTime() - 24 * 60 * 60 * 1000 || 0;
      updateData(true);
    }
  };

  const handleFilterSelect = async () => {
    const response = await modal({ type: 'member_filter', value: filterRef.current.members || [] });
    if (response.type === 'member_filter') {
      resetData();
      filterRef.current.members = response.value;
      updateData(true);
    }
  };

  return (
    <Layout>
      <Menu>
        <SelectionMenu
          data={[
            { key: 'oldest', label: '날짜순' },
            { key: 'newest', label: '최근순' },
            { key: 'set', label: '기간 설정' },
          ]}
          selected={[filterRef.current.sort!]}
          onSelect={handleFilterUpdate}
        />
        <Filter
          $active={filterRef.current.members ? !!filterRef.current.members.length : false}
          hover={1.03}
          tap={0.97}
          onClick={handleFilterSelect}
        >
          필터
        </Filter>
      </Menu>
      <ListSector>
        <List>
          {videos.map(video => (
            <VideoPanel
              type={device === 'mobile' ? 'vlive_horizontal' : 'vlive_full'}
              data={video}
              link={`/${video.id}`}
              key={video.id}
            />
          ))}
        </List>
        {!!videos.length && <Refresh ref={observerRef} />}
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
        {ended.current && !videos.length && <NoItems>영상을 찾지 못했어요.</NoItems>}
      </ListSector>
    </Layout>
  );
};

export default VliveListSection;
