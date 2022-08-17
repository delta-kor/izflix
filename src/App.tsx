import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Meta from './components/Meta';
import Header from './components/organisms/Header';
import Navigator from './components/organisms/Navigator';
import CalendarPage from './pages/CalendarPage';
import CategoryPage from './pages/CategoryPage';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import MusicItemPage from './pages/MusicItemPage';
import MusicPage from './pages/MusicPage';
import PlaylistItemPage from './pages/PlaylistItemPage';
import VodPage from './pages/VodPage';
import PageManager from './services/page-manager';

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
          <Routes location={location} key={PageManager.getPageKey(location.pathname)}>
            <Route path="/" element={<MainPage />} />
            <Route path="/vod" element={<VodPage />} />
            <Route path="/playlist/:id" element={<PlaylistItemPage />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/music/:id" element={<MusicItemPage />} />
            <Route path="/category/*" element={<CategoryPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="*" element={<ErrorPage data={'NOT_FOUND'} />} />
          </Routes>
        </AnimatePresence>
      </AnimateSharedLayout>
    </>
  );
};

export default App;
