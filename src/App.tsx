import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Meta from './components/Meta';
import Header from './components/organisms/Header';
import Navigator from './components/organisms/Navigator';
import Popup from './components/organisms/Popup';
import usePanorama from './hooks/usePanorama';
import CalendarPage from './pages/CalendarPage';
import CategoryPage from './pages/CategoryPage';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import MusicItemPage from './pages/MusicItemPage';
import MusicPage from './pages/MusicPage';
import PlaylistItemPage from './pages/PlaylistItemPage';
import VideoPage from './pages/VideoPage';
import VodPage from './pages/VodPage';
import PageManager from './services/page-manager';
import Spaceship from './services/spaceship';

const App: React.FC = () => {
  const location = useLocation();
  const panorama = usePanorama();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    Spaceship.load();
  }, []);

  return (
    <>
      <Meta data={{}} />

      <Popup />

      <Header />
      <Navigator />

      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={PageManager.getPageKey(location.pathname)}>
          <Route path="/" element={<MainPage />} />
          <Route path="/vod" element={<VodPage />} />
          <Route path="/playlist/:id" element={<PlaylistItemPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/music/:id" element={<MusicItemPage />} />
          <Route path="/category/*" element={<CategoryPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/:id" element={<VideoPage panorama={panorama} />} />
          <Route path="*" element={<ErrorPage data={'error.not_found'} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
