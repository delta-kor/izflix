import { Component } from 'react';
import LandingVideo from '../molecules/LandingVideo';
import Page from './Page';

class MainPage extends Component<any, any> {
  render() {
    return (
      <Page>
        <LandingVideo />
      </Page>
    );
  }
}

export default MainPage;
