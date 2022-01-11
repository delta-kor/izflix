import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/actions/Header';
import CategoryPage from './components/pages/CategoryPage';
import MainPage from './components/pages/MainPage';
import MusicPage from './components/pages/MusicPage';

const App = (): JSX.Element => {
  const location = useLocation();

  return (
    <div>
      <Header />
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
