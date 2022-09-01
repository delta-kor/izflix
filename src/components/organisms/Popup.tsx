import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import delay from '../../services/delay';
import Transmitter from '../../services/transmitter';
import PopupItem from '../atoms/PopupItem';

const Layout = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 8px;

  left: 16px;
  right: 16px;
  bottom: 96px;

  z-index: 100;
`;

type PopupSet = [string, Popup];

const Popup: React.FC = () => {
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
    await delay(popup.duration || 5000);
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

  return (
    <Layout>
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
