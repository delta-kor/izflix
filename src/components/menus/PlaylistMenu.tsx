import { Component } from 'react';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import Transmitter from '../../services/transmitter';
import Playlist from '../actions/Playlist';

const Layout = styled.div``;

interface State {
  playlists: IPlaylist[];
}

class PlaylistMenu extends Component<any, State> {
  state: State = { playlists: [] };

  componentDidMount = async () => {
    const playlists = await this.getPlaylist();
    if (playlists) {
      this.setState({ playlists });
    }
  };

  getPlaylist = async () => {
    const response = await Spaceship.getAllPlaylists();
    if (!response.ok) return void Transmitter.emit('popup', response.message);

    return response.playlists.filter((playlist) => !playlist.featured);
  };

  render() {
    return (
      <Layout>
        {this.state.playlists.map((playlist) => (
          <Playlist playlist={playlist} key={playlist.id} />
        ))}
      </Layout>
    );
  }
}

export default PlaylistMenu;
