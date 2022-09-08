import { createContext } from 'react';

const ModalsDispatchContext = createContext<ModalHandler>({ open: () => {}, close: () => {} });
const ModalsStateContext = createContext<ModalSegment[]>([]);

export { ModalsDispatchContext, ModalsStateContext };
