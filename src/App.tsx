import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Component } from 'react';
import { Routes } from 'react-router-dom';
import Meta from './components/Meta';
import withLocation, { WithLocationParams } from './components/tools/WithLocation';

interface Props extends WithLocationParams {}

class App extends Component<Props> {
  render() {
    const location = this.props.location;

    return (
      <AnimateSharedLayout>
        <Meta data={{}} />

        <AnimatePresence exitBeforeEnter>
          <Routes
            location={location}
            key={location.pathname.split('/').splice(1, 1).join('/')}
          ></Routes>
        </AnimatePresence>
      </AnimateSharedLayout>
    );
  }
}

export default withLocation(App);
