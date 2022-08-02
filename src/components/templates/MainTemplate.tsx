import { Component } from 'react';
import LandingVideo from '../molecules/LandingVideo';
import PlaylistSection from '../molecules/PlaylistSection';

class MainTemplate extends Component<any, any> {
  render() {
    return (
      <>
        <LandingVideo />
        <PlaylistSection />
      </>
    );
  }
}

export default MainTemplate;
