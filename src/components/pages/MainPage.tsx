import { Component } from 'react';
import MainTemplate from '../templates/MainTemplate';
import Page from './Page';

class MainPage extends Component<any, any> {
  render() {
    return (
      <Page>
        <MainTemplate />
      </Page>
    );
  }
}

export default MainPage;
