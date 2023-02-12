import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Meta from './components/Meta';
import Modal from './components/modals/Modal';
import Header from './components/organisms/Header';
import Navigator from './components/organisms/Navigator';
import PanoramaSection from './components/organisms/PanoramaSection';
import Popup from './components/organisms/Popup';
import usePanorama from './hooks/usePanorama';
import AppPage from './pages/AppPage';
import CalendarPage from './pages/CalendarPage';
import CategoryPage from './pages/CategoryPage';
import ErrorPage from './pages/ErrorPage';
import InfoPage from './pages/InfoPage';
import LiveEntrancePage from './pages/LiveEntrancePage';
import MainPage from './pages/MainPage';
import MusicItemPage from './pages/MusicItemPage';
import MusicPage from './pages/MusicPage';
import NoticePage from './pages/NoticePage';
import PlaylistItemPage from './pages/PlaylistItemPage';
import PlaylistPage from './pages/PlaylistPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
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

      <PanoramaSection panorama={panorama} />

      <Popup />
      <Modal />

      <Header />
      <Navigator />

      <AnimatePresence exitBeforeEnter>
        <Routes
          location={location}
          key={PageManager.getPageKey(location.pathname + location.search)}
        >
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/vod" element={<VodPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/playlist/:id" element={<PlaylistItemPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/music/:id" element={<MusicItemPage />} />
          <Route path="/category/*" element={<CategoryPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/live" element={<LiveEntrancePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/settings" element={<SettingsPage />} />
          <Route path="/profile/info" element={<InfoPage />} />
          <Route path="/profile/notice" element={<NoticePage />} />
          <Route path="/profile/app" element={<AppPage />} />
          <Route path="/:id" element={<VideoPage panorama={panorama} />} />
          <Route path="*" element={<ErrorPage data={'error.not_found'} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
