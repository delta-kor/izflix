import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LandingVideo from './components/actions/LandingVideo';
import Popup from './components/actions/Popup';
import Header from './components/menus/Header';
import Navigator from './components/menus/Navigator';
import Modal from './components/modals/Modal';
import CategoryPage from './components/pages/CategoryPage';
import InfoPage from './components/pages/InfoPage';
import MainPage from './components/pages/MainPage';
import MusicPage from './components/pages/MusicPage';
import VideoPage from './components/pages/VideoPage';
import { Mobile, Pc } from './components/tools/MediaQuery';
import Constants from './constants';
import ModalController from './services/modal-controller';
import Transmitter from './services/transmitter';

const NavigatorBlock = styled.div`
  width: 100%;
  height: 64px;
`;

const LandingBlock = styled(motion.div)``;

const App = (): JSX.Element => {
  const location = useLocation();

  const [headerSticked, setHeaderSticked] = useState(false);
  const [modalData, setModalData] = useState<[ModalData, number] | null>(null);

  const navigatorController = () => {
    if (Constants.IS_PC() && !Constants.IS_ADDITIONAL_PAGE())
      setHeaderSticked(Constants.IS_HEADER_STICK_POSITION_PC());
    else setHeaderSticked(false);
  };

  const prevPath = useRef(location.pathname);
  useEffect(() => {
    Transmitter.emit('locationupdate', location.pathname, prevPath.current);
    prevPath.current = location.pathname;

    Transmitter.on('levelscroll', navigatorController);
    return () => {
      Transmitter.removeListener('levelscroll', navigatorController);
    };
  }, [location]);

  function onModalUpdate(data: ModalData | null, key: number) {
    if (!data) return setModalData(null);
    setModalData([data, key]);
  }

  useEffect(() => ModalController.subscribe(onModalUpdate), []);
  useEffect(() => () => ModalController.unsubscribe(onModalUpdate), []);

  return (
    <AnimateSharedLayout>
      <Popup />
      <AnimatePresence>
        {modalData && (
          <Modal key="modal" data={modalData[0]} modalKey={modalData[1]} />
        )}
      </AnimatePresence>

      <Mobile>
        <Navigator />
      </Mobile>
      <Pc>
        <Header />
      </Pc>

      <AnimatePresence exitBeforeEnter>
        {!Constants.IS_ADDITIONAL_PAGE() ? (
          <LandingBlock
            key="default layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Pc>
              <LandingVideo />
            </Pc>
            <Pc>{headerSticked ? <NavigatorBlock /> : <Navigator />}</Pc>
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
          <Route path="/info" element={<InfoPage />} />
          <Route path="/category/*" element={<CategoryPage />} />
          <Route path="/:id" element={<VideoPage />} />
        </Routes>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default App;
