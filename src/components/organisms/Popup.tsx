import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import delay from '../../services/delay';
import PageManager from '../../services/page-manager';
import Transmitter from '../../services/transmitter';
import { MobileQuery, PcLeftMargin, PcQuery } from '../../styles';
import PopupItem from '../atoms/PopupItem';

const Layout = styled.div<{ $large: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 8px;

  z-index: 100;

  ${MobileQuery} {
    left: 16px;
    right: 16px;
    bottom: ${({ $large }) => ($large ? 16 : 96)}px;
    transform: translateZ(0);
  }

  ${PcQuery} {
    left: ${({ $large }) => ($large ? 16 : PcLeftMargin + 16)}px;
    bottom: 16px;
  }
`;

type PopupSet = [string, Popup];

const Popup: React.FC = () => {
  const location = useLocation();

  const [popups, setPopups] = useState<PopupSet[]>([]);

  useEffect(() => {
    Transmitter.on('popup', onPopupReceive);

    return () => {
      Transmitter.removeListener('popup', onPopupReceive);
    };
  });

  const onPopupReceive = async (popup: Popup) => {
    const id = Math.floor(Math.random() * 10000000).toString();
    const popupSet = [id, popup] as PopupSet;

    setPopups(popups => [...popups, popupSet]);
    let duration = popup.duration;
    if (!duration) duration = popup.type === 'error' ? 5000 : 3000;

    await delay(duration);
    closePopup(id);
  };

  const closePopup = (id: string) => {
    setPopups(popups => popups.filter(p => p[0] !== id));
  };

  const motionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2, delay: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
  };

  const isLarge = !PageManager.getPageInfo(location.pathname);

  return (
    <Layout $large={isLarge}>
      <AnimatePresence>
        {popups.map(popupSet => (
          <motion.div layoutId={popupSet[0]} key={popupSet[0]} {...motionProps}>
            <PopupItem data={popupSet[1]} close={() => closePopup(popupSet[0])} />
          </motion.div>
        ))}
      </AnimatePresence>
    </Layout>
  );
};

export default Popup;
