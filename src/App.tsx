import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/menus/Header';
import LandingVideo from './components/actions/LandingVideo';
import Navigator from './components/menus/Navigator';
import Popup from './components/actions/Popup';
import CategoryPage from './components/pages/CategoryPage';
import MainPage from './components/pages/MainPage';
import MusicPage from './components/pages/MusicPage';
import { Pc } from './components/tools/MediaQuery';

const App = (): JSX.Element => {
  const location = useLocation();

  return (
    <div>
      <Popup />
      <Header />
      <Pc>
        <LandingVideo />
      </Pc>
      <Navigator />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/category" element={<CategoryPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
