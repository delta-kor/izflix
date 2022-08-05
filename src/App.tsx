import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Meta from './components/Meta';
import Header from './components/organisms/Header';
import Navigator from './components/organisms/Navigator';
import MainPage from './components/pages/MainPage';
import VodPage from './components/pages/VodPage';

interface Props {}

const App: React.FC<Props> = () => {
  const location = useLocation();

  return (
    <>
      <Meta data={{}} />

      <Header />
      <Navigator />

      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname.split('/').splice(1, 1).join('/')}>
          <Route path="/" element={<MainPage />} />
          <Route path="/vod" element={<VodPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
