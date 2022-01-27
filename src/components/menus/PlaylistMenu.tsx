import { Component } from 'react';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
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

    ${MobileQuery} {
      height: 117px;
      margin: 0 0 8px 0;
    }

    ${PcQuery} {
      height: calc(((min(100vw, 1416px) - 32px * 2 - 24px * 3) / 4) * (9 / 16));
      margin: 0 0 16px 0;
    }

    ${TabletQuery} {
      height: calc(((min(100vw, 1416px) - 32px * 2 - 24px * 2) / 3) * (9 / 16));
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

interface State {
  playlists: IPlaylist[];
}

class PlaylistMenu extends Component<any, State> {
  state: State = { playlists: [] };

  componentDidMount = async () => {
    const playlists = await this.getPlaylist();
    if (playlists) this.setState({ playlists });
  };

  getPlaylist = async () => {
    const response = await Spaceship.getAllPlaylists();
    if (!response.ok) return void Transmitter.emit('popup', response.message);

    return response.playlists.filter((playlist) => !playlist.featured);
  };

  render() {
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

    return (
      <Layout>
        {this.state.playlists.length
          ? this.state.playlists.map((playlist) => (
              <Playlist key={playlist.id} type="playlist" playlist={playlist} />
            ))
          : placeholders}
      </Layout>
    );
  }
}

export default PlaylistMenu;
