import { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import HttpException from '../../exceptions/http-exception';
import Evoke from '../../filters/evoke';
import useDevice from '../../hooks/useDevice';
import useModal from '../../hooks/useModal';
import Icon from '../../icons/Icon';
import Spaceship from '../../services/spaceship';
import Transmitter from '../../services/transmitter';
import { Color, MobileQuery, PcQuery } from '../../styles';
import SmoothBox from '../atoms/SmoothBox';
import VideoPanel from '../atoms/VideoPanel';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  ${PcQuery} {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(max(240px, calc((100% - (3 * 24px)) / 4)), 1fr)
    );
    gap: 32px 24px;

    padding: 16px;
    margin: -16px;

    z-index: 2;
  }
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Action = styled.div`
  display: flex;
  gap: 12px;

  & > *:last-child {
    margin-left: auto;
  }
`;

const ActionIconWrapper = styled(SmoothBox)`
  & > .content {
    padding: 2px;
  }
`;

const ActionIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

interface Props {
  playlist?: IPlaylist;
  access: boolean;
}

const PlaylistItemSection: React.FC<Props> = ({ playlist, access }) => {
  const modal = useModal();
  const device = useDevice();

  const [videos, setVideos] = useState<IVideo[]>((playlist && playlist.video) || []);

  useEffect(() => {
    if (playlist?.video) setVideos(playlist.video);
  }, [playlist]);

  const refresh = () => {
    setVideos([]);
    new Evoke(loadVideo());
  };

  const loadVideo = async () => {
    if (!playlist?.id) return false;
    const response = await Spaceship.readPlaylist(playlist.id);
    if (!response.ok) throw new HttpException(response);

    setVideos(response.playlist.video);
  };

  const removeVideo = async (playlistId: string, videoId: string) => {
    const response = await Spaceship.removeVideoFromUserPlaylist(playlistId, videoId);
    if (!response.ok) throw new HttpException(response);
    return response;
  };

  const reorderVideo = async (playlistId: string, videoId: string, order: number) => {
    const response = await Spaceship.reorderVideoFromUserPlaylist(playlistId, videoId, order);
    if (!response.ok) throw new HttpException(response);
    return response;
  };

  const handleActionClick = (
    e: MouseEvent,
    type: 'up' | 'down' | 'remove',
    videoId: string,
    order?: number
  ) => {
    if (!playlist?.id) return false;
    const playlistId = playlist.id;

    e.preventDefault();
    e.stopPropagation();

    if (type === 'remove') {
      modal({ type: 'text', content: '정말로 재생목록에서 영상을 삭제하시겠어요?' }).then(
        result => {
          if (result.type !== 'ok') return false;

          Transmitter.emit('popup', { type: 'loading', message: '영상을 삭제하는 중...' });
          new Evoke(removeVideo(playlistId, videoId)).then(() => {
            Transmitter.emit('popup', { type: 'success', message: '영상을 삭제했어요' });
            refresh();
          });
        }
      );
    }

    if (type === 'up' || type === 'down') {
      order = order || 0;
      if (order < 0 || order >= videos.length) return false;

      Transmitter.emit('popup', { type: 'loading', message: '영상 순서를 변경하는 중,,,' });
      new Evoke(reorderVideo(playlistId, videoId, order)).then(() => {
        Transmitter.emit('popup', { type: 'success', message: '영상 순서를 변경했어요' });
        refresh();
      });
    }
  };

  const videoPanelType = device === 'mobile' ? 'horizontal' : 'full';

  return (
    <Layout>
      {videos.length ? (
        videos.map((data, index, { length }) => (
          <VideoWrapper key={data.id}>
            <VideoPanel
              type={videoPanelType}
              data={data}
              link={`/${data.id}`}
              state={{ key: 'playlist', value: playlist!.id }}
            />

            {access && (
              <Action>
                <ActionIconWrapper hover={1.1} tap={0.9}>
                  <ActionIcon
                    type={device === 'mobile' ? 'arrow_up' : 'left'}
                    color={index === 0 ? Color.GRAY : Color.PRIMARY}
                    onClick={e => handleActionClick(e, 'up', data.id, index - 1)}
                  />
                </ActionIconWrapper>
                <ActionIconWrapper hover={1.1} tap={0.9}>
                  <ActionIcon
                    type={device === 'mobile' ? 'arrow_down' : 'right'}
                    color={index === length - 1 ? Color.GRAY : Color.PRIMARY}
                    onClick={e => handleActionClick(e, 'down', data.id, index + 1)}
                  />
                </ActionIconWrapper>
                <ActionIconWrapper hover={1.1} tap={0.9}>
                  <ActionIcon
                    type={'delete'}
                    color={Color.RED}
                    onClick={e => handleActionClick(e, 'remove', data.id)}
                  />
                </ActionIconWrapper>
              </Action>
            )}
          </VideoWrapper>
        ))
      ) : (
        <Repeat count={12} element={i => <VideoPanel type={videoPanelType} key={i} />} />
      )}
    </Layout>
  );
};

export default PlaylistItemSection;
