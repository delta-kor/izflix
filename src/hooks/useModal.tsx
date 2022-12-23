import { useContext } from 'react';
import ModalContext from '../contexts/ModalContext';

function useModal() {
  const context = useContext(ModalContext);
  return context.fire;
}

export default useModal;
