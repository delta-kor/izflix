import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
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
import VideoPage from './components/pages/VideoPage';
import { Mobile, Pc } from './components/tools/MediaQuery';
import Constants from './constants';
import Transmitter from './services/transmitter';

const NavigatorBlock = styled.div`
  width: 100%;
  height: 64px;
`;

const LandingBlock = styled(motion.div)``;

const App = (): JSX.Element => {
  const location = useLocation();
  const [headerSticked, setHeaderSticked] = useState(false);

  const navigatorController = () => {
    if (Constants.IS_PC() && !Constants.IS_VIDEO_PAGE())
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

      <Pc>
        <Header />
      </Pc>

      <AnimatePresence exitBeforeEnter>
        {!Constants.IS_VIDEO_PAGE() ? (
          <LandingBlock
            key="default layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Mobile>
              <Header />
            </Mobile>
            <Pc>
              <LandingVideo />
            </Pc>
            {headerSticked ? <NavigatorBlock /> : <Navigator />}
          </LandingBlock>
        ) : (
          <LandingBlock
            key="video layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></LandingBlock>
        )}
      </AnimatePresence>

      <AnimatePresence exitBeforeEnter>
        <Routes
          location={location}
          key={location.pathname.split('/').splice(1, 1).join('/')}
        >
          <Route path="/" element={<MainPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/category/*" element={<CategoryPage />} />
          <Route path="/:id" element={<VideoPage />} />
        </Routes>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default App;
