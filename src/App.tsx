import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LandingVideo from './components/actions/LandingVideo';
import Popup from './components/actions/Popup';
import Header from './components/menus/Header';
import Navigator from './components/menus/Navigator';
import CategoryPage from './components/pages/CategoryPage';
import MainPage from './components/pages/MainPage';
import MusicPage from './components/pages/MusicPage';
import { Pc } from './components/tools/MediaQuery';
import Constants from './constants';
import Transmitter from './services/transmitter';

const NavigatorBlock = styled.div`
  width: 100%;
  height: 64px;
`;

const App = (): JSX.Element => {
  const location = useLocation();
  const [headerSticked, setHeaderSticked] = useState(false);

  const navigatorController = () => {
    if (Constants.IS_PC())
      setHeaderSticked(Constants.IS_HEADER_STICK_POSITION_PC());
    else setHeaderSticked(false);
  };

  useEffect(() => {
    Transmitter.emit('locationupdate', location.pathname);
    Transmitter.on('levelscroll', navigatorController);
    return () => {
      Transmitter.removeListener('levelscroll', navigatorController);
    };
  }, [location]);

  return (
    <AnimateSharedLayout>
      <Popup />
      <Header />
      <Pc>
        <LandingVideo />
      </Pc>
      {headerSticked ? <NavigatorBlock /> : <Navigator />}
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainPage />} />
          <Route path="/music" element={<MusicPage />} />

          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:path" element={<CategoryPage />} />
        </Routes>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default App;
