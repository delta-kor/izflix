import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Meta from './components/Meta';
import Header from './components/organisms/Header';
import Navigator from './components/organisms/Navigator';
import MainPage from './components/pages/MainPage';
import PlaylistInfoPage from './components/pages/PlaylistInfoPage';
import VodPage from './components/pages/VodPage';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Meta data={{}} />

      <Header />
      <Navigator />

      <AnimateSharedLayout>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname.split('/').splice(1, 1).join('/')}>
            <Route path="/" element={<MainPage />} />
            <Route path="/vod" element={<VodPage />} />
            <Route path="/playlist/:id" element={<PlaylistInfoPage />} />
          </Routes>
        </AnimatePresence>
      </AnimateSharedLayout>
    </>
  );
};

export default App;
