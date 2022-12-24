import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import HttpException from '../../exceptions/http-exception';
import Evoke from '../../filters/evoke';
import useModal from '../../hooks/useModal';
import Icon from '../../icons/Icon';
import Spaceship from '../../services/spaceship';
import Transmitter from '../../services/transmitter';
import { ModalWidthSmall, MobileQuery, PcQuery, Color, Text } from '../../styles';
import ListItem from '../atoms/ListItem';
import SmoothBox from '../atoms/SmoothBox';
import SmoothImage from '../atoms/SmoothImage';
import ModalAction from './ModalAction';
import ModalBase from './ModalBase';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: ${ModalWidthSmall};
  max-width: 360px;
  margin: 0 0 8px 0;

  ${MobileQuery} {
    gap: 12px;
  }

  ${PcQuery} {
    gap: 16px;
  }
`;

const AddButton = styled(SmoothBox)`
  display: inline-block;

  & > .content {
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    font-weight: 400;

    cursor: pointer;
    user-select: none;
  }
`;

const AddIcon = styled(Icon)`
  width: 18px;
  height: 18px;
`;

const NoPlaylist = styled.div`
  ${Text.BODY_1};
  color: ${Color.WHITE};
  opacity: 0.7;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${Color.GRAY};
`;

const PlaylistList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${MobileQuery} {
    gap: 6px;
  }

  ${PcQuery} {
    gap: 8px;
  }
`;

const PlaylistItem = styled(SmoothBox)`
  width: 100%;

  & > .content {
    display: flex;
    align-items: center;
    gap: 10px;

    cursor: pointer;
    user-select: none;
  }
`;

const PlaylistThumbnail = styled(SmoothImage)`
  width: 32px;
  height: 32px;
  border-radius: 4px;
`;

const PlaylistContent = styled.div`
  flex-grow: 1;
  ${Text.BODY_1};
  color: ${Color.WHITE};
`;

interface Props {
  modal: PlaylistModal;
  respond: ModalRespondFunction;
}

let playlistsCache: IPlaylist[] | null = null;

const PlaylistModal: React.FC<Props> = ({ modal, respond }) => {
  const { t } = useTranslation();
  const modalHook = useModal();

  const [playlists, setPlaylists] = useState<IPlaylist[] | null>(playlistsCache || null);

  useEffect(() => {
    if (modal.promise) modal.promise.then(loadData);
    else loadData();
  }, []);

  useEffect(() => {
    playlistsCache = playlists;
  }, [playlists]);

  const loadPlaylists = async () => {
    const response = await Spaceship.readAllPlaylists('user');
    if (!response.ok) throw new HttpException(response);

    const playlists = response.playlists;
    setPlaylists(playlists);
  };

  const createPlaylist = async (title: string) => {
    const response = await Spaceship.createUserPlaylist(title);
    if (!response.ok) throw new HttpException(response);
  };

  const addVideoToPlaylist = async (playlistId: string, videoId: string) => {
    const response = await Spaceship.addVideotoUserPlaylist(playlistId, videoId);
    if (!response.ok) throw new HttpException(response);
  };

  const loadData = () => {
    new Evoke(loadPlaylists());
  };

  const handleAdd = () => {
    modalHook({
      type: 'input',
      content: t('playlist.add'),
      placeholder: t('playlist.enter_title'),
    }).then(async result => {
      let promise: Evoke<void> | undefined;
      if (result.type === 'input') {
        playlistsCache = null;
        promise = new Evoke(createPlaylist(result.value));
      }

      modalHook({ type: 'playlist', videoId: modal.videoId, promise });
    });
  };

  const handlePlaylistClick = (playlistId: string) => {
    Transmitter.emit('popup', { type: 'loading', message: t('playlist.adding') });

    new Evoke(addVideoToPlaylist(playlistId, modal.videoId)).then(() => {
      Transmitter.emit('popup', { type: 'success', message: t('playlist.added') });
      loadData();
    });
  };

  return (
    <ModalBase>
      <Layout>
        {playlists === null || !playlists.length ? (
          <NoPlaylist>
            {playlists === null ? t('playlist.loading') : t('playlist.no_playlist')}
          </NoPlaylist>
        ) : (
          <PlaylistList>
            {playlists.map(playlist => (
              <PlaylistItem
                hover={1.02}
                tap={0.98}
                onClick={() => handlePlaylistClick(playlist.id)}
                key={playlist.id}
              >
                <PlaylistThumbnail
                  src={playlist.thumbnail && Spaceship.getThumbnail(playlist.thumbnail)}
                  color={Color.GRAY}
                />
                <PlaylistContent>{playlist.title}</PlaylistContent>
              </PlaylistItem>
            ))}
          </PlaylistList>
        )}
        <Line />
        <AddButton hover={1.05} tap={0.95} onClick={handleAdd}>
          <AddIcon type={'add'} color={Color.WHITE} />
          {t('playlist.add')}
        </AddButton>
      </Layout>
      <ModalAction respond={respond} ok />
    </ModalBase>
  );
};

export default PlaylistModal;
