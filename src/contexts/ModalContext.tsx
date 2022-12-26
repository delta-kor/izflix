import { createContext } from 'react';

const ModalContext = createContext<ModalContextType>({
  modal: null,
  fire: (() => {}) as any,
  respond: () => {},
});

export default ModalContext;
