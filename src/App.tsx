import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Meta from './components/Meta';
import Header from './components/organisms/Header';
import Navigator from './components/organisms/Navigator';
import ErrorPage from './components/pages/ErrorPage';
import MainPage from './components/pages/MainPage';
import MusicItemPage from './components/pages/MusicItemPage';
import MusicPage from './components/pages/MusicPage';
import PlaylistItemPage from './components/pages/PlaylistItemPage';
import VodPage from './components/pages/VodPage';

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <>
      <Meta data={{}} />

      <Header />
      <Navigator />

      <AnimateSharedLayout>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MainPage />} />
            <Route path="/vod" element={<VodPage />} />
            <Route path="/playlist/:id" element={<PlaylistItemPage />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/music/:id" element={<MusicItemPage />} />
            <Route path="*" element={<ErrorPage data={'NOT_FOUND'} />} />
          </Routes>
        </AnimatePresence>
      </AnimateSharedLayout>
    </>
  );
};

export default App;
