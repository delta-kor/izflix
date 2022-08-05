import { Component } from 'react';
import delay from '../../delay';
import HttpException from '../../exceptions/http-exception';
import Evoke from '../../filters/evoke';
import Spaceship from '../../services/spaceship';
import MainTemplate from '../templates/MainTemplate';
import Page from './Page';

interface State {
  featured: ApiResponse.Playlist.ReadFeatured | null;
  playlists: IPlaylist[];
  recommends: IVideo[];
}

class MainPage extends Component<any, State> {
  state: State = {
    featured: null,
    playlists: [],
    recommends: [],
  };

  componentDidMount = () => {
    this.loadData();
  };

  loadData = async () => {
    await delay(200);
    Evoke(this.loadPlaylists, this.loadFeatured, this.loadRecommends);
  };

  loadPlaylists = async () => {
    const response = await Spaceship.readAllPlaylists('performance');
    if (!response.ok) throw new HttpException(response);

    const playlists = response.playlists;
    this.setState({ playlists });
  };

  loadFeatured = async () => {
    const response = await Spaceship.readFeatured('performance');
    if (!response.ok) throw new HttpException(response);

    this.setState({ featured: response });
  };

  loadRecommends = async () => {
    const response = await Spaceship.getUserRecommends();
    if (!response.ok) throw new HttpException(response);

    const recommends = response.videos;
    this.setState({ recommends });
  };

  render() {
    const { featured, playlists, recommends } = this.state;

    return (
      <Page>
        <MainTemplate playlists={playlists} featured={featured} recommends={recommends} />
      </Page>
    );
  }
}

export default MainPage;
