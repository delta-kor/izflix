import { Component } from 'react';
import Spaceship from '../../services/spaceship';
import MainTemplate from '../templates/MainTemplate';
import Page from './Page';

interface State {
  playlists: IPlaylist[];
}

class MainPage extends Component<any, State> {
  state: State = {
    playlists: [],
  };

  componentDidMount = () => {
    this.loadData();
  };

  loadData = () => {
    this.loadPlaylists();
  };

  loadPlaylists = async () => {
    const response = await Spaceship.readAllPlaylists('performance');
    if (!response.ok) return false;

    const playlists = response.playlists;
    this.setState({ playlists });
  };

  render() {
    const { playlists } = this.state;

    return (
      <Page>
        <MainTemplate playlists={playlists} />
      </Page>
    );
  }
}

export default MainPage;
