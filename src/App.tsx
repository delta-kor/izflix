import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import CategoryPage from './components/pages/CategoryPage';
import MainPage from './components/pages/MainPage';
import MusicPage from './components/pages/MusicPage';

const App = (): JSX.Element => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/category" element={<CategoryPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
