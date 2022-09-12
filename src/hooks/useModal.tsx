import { useContext } from 'react';
import { ModalsDispatchContext } from '../contexts/ModalContext';

function useModal() {
  const { open, close } = useContext(ModalsDispatchContext);

  const openModal = <T,>(Component: React.FC<T>, props: T) => {
    open(Component, props);
  };

  const closeModal = (Component: React.FC) => {
    close(Component);
  };

  return {
    openModal,
    closeModal,
  };
}

export default useModal;
