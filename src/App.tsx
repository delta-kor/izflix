import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LandingVideo from './components/actions/LandingVideo';
import Popup from './components/actions/Popup';
import Header from './components/menus/Header';
import Navigator from './components/menus/Navigator';
import Meta from './components/Meta';
import Modal from './components/modals/Modal';
import CategoryPage from './components/pages/CategoryPage';
import InfoPage from './components/pages/InfoPage';
import LivePage from './components/pages/LivePage';
import MainPage from './components/pages/MainPage';
import MusicPage from './components/pages/MusicPage';
import NotFoundPage from './components/pages/NotFoundPage';
import SettingsPage from './components/pages/SettingsPage';
import VideoPage from './components/pages/VideoPage';
import { Mobile, Pc } from './components/tools/MediaQuery';
import Constants from './constants';
import ModalController from './services/modal-controller';
import Tracker from './services/tracker';
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

    Tracker.page(location.pathname);

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
  useEffect(() => {
    ModalController.fire({
      type: 'info',
      title: '접속 지연 안내',
      description:
        '네트워크 연결에 문제가 발생했으며,\n현재 복구중에 있습니다\n잠시후 다시 시도해주세요',
    });
  }, []);

  return (
    <AnimateSharedLayout>
      <Meta data={{}} />

      <Popup />
      <AnimatePresence>
        {modalData && (
          <Modal key="modal" data={modalData[0]} modalKey={modalData[1]} />
        )}
      </AnimatePresence>

      {!Constants.IS_BLANK_PAGE() ? (
        <>
          <Mobile>
            <Navigator />
          </Mobile>
          <Pc>
            <Header />
          </Pc>
        </>
      ) : (
        <></>
      )}

      <Pc>
        <AnimatePresence exitBeforeEnter>
          {!Constants.IS_ADDITIONAL_PAGE() ? (
            <LandingBlock
              key="default layout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LandingVideo />
              {headerSticked ? <NavigatorBlock /> : <Navigator />}
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
      </Pc>

      <Mobile>
        <AnimatePresence exitBeforeEnter>
          {!Constants.IS_VIDEO_PAGE() ? (
            <LandingBlock
              key="default layout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Header />
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
      </Mobile>

      <AnimatePresence exitBeforeEnter>
        <Routes
          location={location}
          key={location.pathname.split('/').splice(1, 1).join('/')}
        >
          <Route path="/" element={<MainPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/category/*" element={<CategoryPage />} />
          <Route path="/:id" element={<VideoPage />} />
          <Route path="/live" element={<LivePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default App;
