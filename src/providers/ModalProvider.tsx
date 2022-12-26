import { useContext, useRef, useState } from 'react';
import ModalContext from '../contexts/ModalContext';

const ModalProvider: React.FC = ({ children }) => {
  const [modal, setModal] = useState<Modal | null>(null);
  const resolve = useRef<any>(null);

  const fire: ModalFireFunction = async (modal: Modal) => {
    modal.id = Math.floor(Math.random() * 0xffffff).toString(16);

    setModal(modal);
    return new Promise(res => {
      resolve.current = res;
    });
  };

  const respond = (result: ModalResult) => {
    resolve.current(result);
    setModal(null);
  };

  return <ModalContext.Provider value={{ modal, fire, respond }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
