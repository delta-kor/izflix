import { Component } from 'react';
import Spaceship from '../../services/spaceship';
import MainTemplate from '../templates/MainTemplate';
import Page from './Page';

interface State {
  playlists: IPlaylist[];
  featured: ApiResponse.Playlist.ReadFeatured | null;
}

class MainPage extends Component<any, State> {
  state: State = {
    playlists: [],
    featured: null,
  };

  componentDidMount = () => {
    this.loadData();
  };

  loadData = () => {
    this.loadPlaylists();
    this.loadFeatured();
  };

  loadPlaylists = async () => {
    const response = await Spaceship.readAllPlaylists('performance');
    if (!response.ok) return false;

    const playlists = response.playlists;
    this.setState({ playlists });
  };

  loadFeatured = async () => {
    const response = await Spaceship.readFeatured('performance');
    if (!response.ok) return false;

    this.setState({ featured: response });
  };

  render() {
    const { playlists, featured } = this.state;

    return (
      <Page>
        <MainTemplate playlists={playlists} featured={featured} />
      </Page>
    );
  }
}

export default MainPage;
