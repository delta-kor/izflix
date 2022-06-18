import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as SettingsIcon } from '../../icons/settings.svg';
import { ReactComponent as StatsIcon } from '../../icons/stats.svg';
import ModalController from '../../services/modal-controller';
import Spaceship from '../../services/spaceship';
import Tracker from '../../services/tracker';
import Transmitter from '../../services/transmitter';
import { Color, MobileQuery, PcQuery, TabletQuery } from '../../styles';
import Playlist from '../actions/playlist/Playlist';

const Layout = styled.div``;

const Placeholder = styled.div`
  position: relative;
  width: 100%;

  ${MobileQuery} {
    margin: 24px 0 48px 0;
  }

  ${PcQuery} {
    max-width: 1416px;
    margin: 24px auto 72px auto;
    padding: 0 32px;
  }

  & > *:nth-child(1) {
    background: ${Color.DARK_GRAY};
    border-radius: 4px;
    width: 40%;
    max-width: 480px;

    ${MobileQuery} {
      margin: 0 32px 16px 32px;
      height: 18px;
    }

    ${PcQuery} {
      margin: 0 0 24px 0;
      height: 32px;
    }
  }

  & > *:nth-child(2) {
    display: flex;
    overflow: hidden;

    ${MobileQuery} {
      padding: 0 0 0 32px;
    }

    & > * {
      flex-shrink: 0;

      ${MobileQuery} {
        margin: 0 16px 0 0;
      }

      ${PcQuery} {
        margin: 0 24px 0 0;
      }

      :last-child {
        ${MobileQuery} {
          margin: 0 32px 0 0;
        }

        ${PcQuery} {
          margin: 0;
        }
      }
    }

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const PlaceholderVideo = styled.div`
  position: relative;
  user-select: none;

  ${MobileQuery} {
    width: 208px;
  }

  ${PcQuery} {
    width: calc((100% - 24px * 3) / 4);
  }

  ${TabletQuery} {
    width: calc((100% - 24px * 2) / 3);
  }

  & > *:nth-child(1) {
    background: ${Color.DARK_GRAY};
    border-radius: 6px;
    width: 100%;
    aspect-ratio: 16 / 9;

    ${MobileQuery} {
      margin: 0 0 8px 0;
    }

    ${PcQuery} {
      margin: 0 0 16px 0;
    }
  }

  & > *:nth-child(2) {
    width: 90%;
    background: ${Color.DARK_GRAY};
    border-radius: 4px;

    ${MobileQuery} {
      margin: 0 0 4px 0;
      height: 18px;
    }

    ${PcQuery} {
      margin: 0 0 8px 0;
      height: 28px;
    }
  }

  & > *:nth-child(3) {
    width: 70%;
    background: ${Color.DARK_GRAY};
    border-radius: 4px;

    ${MobileQuery} {
      height: 14px;
    }

    ${PcQuery} {
      height: 18px;
    }
  }
`;

const ButtonMenuWrapper = styled.div`
  display: flex;
  column-gap: 16px;
  align-items: flex-start;
  width: 100%;
  padding: 0 32px;

  ${MobileQuery} {
    margin: -16px 0 32px 0;
  }

  ${PcQuery} {
    max-width: 1416px;
    margin: -32px auto 36px auto;
  }
`;

const ButtonMenu = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  max-width: 204px;
  background: ${Color.DARK_GRAY};
  border-radius: 4px;
  cursor: pointer;
  user-select: none;

  ${MobileQuery} {
    padding: 16px 24px;
  }

  ${PcQuery} {
    padding: 18px 30px;
  }

  & > svg {
    ${MobileQuery} {
      width: 16px;
      height: 16px;
    }

    ${PcQuery} {
      width: 20px;
      height: 20px;
    }
  }
`;

const ButtonMenuText = styled.div`
  font-weight: 700;
  color: ${Color.WHITE};

  ${MobileQuery} {
    font-size: 14px;
  }

  ${PcQuery} {
    font-size: 18px;
  }
`;

interface State {
  playlists: IPlaylist[];
  emotion: number[];
}

class PlaylistMenu extends Component<any, State> {
  state: State = { playlists: [], emotion: [0, 0, 0, 0] };

  componentDidMount = async () => {
    this.load();
  };

  load = async () => {
    const playlistsPromise = this.getPlaylist();
    const recommendsPromise = this.getRecommends();
    const result = await Promise.all([playlistsPromise, recommendsPromise]);

    if (result[0] && result[1]) {
      const playlists = result[0] as any;
      const recommends = result[1] as any;

      const recommendsPlaylist: IPlaylist = {
        id: 'recommends',
        title: '추천 동영상',
        videos: recommends,
        featured: false,
        recommend: true,
      };

      const output: IPlaylist[] = recommends.length
        ? [recommendsPlaylist, ...playlists]
        : [...playlists];
      this.setState({ playlists: output });
    }
  };

  getPlaylist = async () => {
    const response = await Spaceship.getAllPlaylists();
    if (!response.ok) return void Transmitter.emit('popup', response.message);

    return response.playlists.filter((playlist) => !playlist.featured);
  };

  getRecommends = async () => {
    const response = await Spaceship.getUserRecommends(20);
    if (!response.ok) return void Transmitter.emit('popup', response.message);

    this.setState({ emotion: response.emotion });
    return response.videos;
  };

  render() {
    const menu = (
      <ButtonMenuWrapper>
        <ButtonMenu to={'/stats'}>
          <ButtonMenuText>통계</ButtonMenuText>
          <StatsIcon />
        </ButtonMenu>
        <ButtonMenu to={'/settings'}>
          <ButtonMenuText>설정</ButtonMenuText>
          <SettingsIcon />
        </ButtonMenu>
      </ButtonMenuWrapper>
    );

    const placeholders = [];
    for (let i = 0; i < 11; i++) {
      placeholders.push(
        <Placeholder key={i}>
          <div />
          <div>
            {[...Array(10)].map((_, index) => (
              <PlaceholderVideo key={index}>
                <div />
                <div />
                <div />
              </PlaceholderVideo>
            ))}
          </div>
        </Placeholder>
      );
    }

    const emotions = this.state.emotion || [0, 0, 0, 0];
    const infoText = `최근 시청한 영상에 따라 추천 동영상을 선정해요

EXCITEMENT : ${(emotions[0] * 100).toFixed(2)}%
AMUSEMENT : ${(emotions[1] * 100).toFixed(2)}%
RELAXATION : ${(emotions[2] * 100).toFixed(2)}%
SADNESS : ${(emotions[3] * 100).toFixed(2)}%`;

    const playlists = this.state.playlists.map((playlist) => {
      if (playlist.recommend)
        return (
          <>
            <Playlist
              key={playlist.id}
              type="playlist"
              playlist={playlist}
              onReload={() => {
                Spaceship.refreshUserRecommends(20);
                this.load();
              }}
              onInfo={() => {
                Tracker.send('recommend_info');
                ModalController.fire({
                  type: 'info',
                  title: '추천 동영상',
                  description: infoText,
                });
              }}
            />
          </>
        );
      else
        return (
          <Playlist key={playlist.id} type="playlist" playlist={playlist} />
        );
    });

    const list = this.state.playlists.length ? playlists : placeholders;
    list.splice(1, 0, menu);

    return <Layout>{list}</Layout>;
  }
}

export default PlaylistMenu;
