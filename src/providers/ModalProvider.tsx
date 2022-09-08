import { useMemo, useState } from 'react';
import { ModalsDispatchContext, ModalsStateContext } from '../contexts/ModalContext';

const ModalsProvider: React.FC = ({ children }) => {
  const [openedModals, setOpenedModals] = useState<ModalSegment[]>([]);

  const open = (Component: React.FC, props: any) => {
    setOpenedModals(modals => {
      return [...modals, { Component, props }];
    });
  };

  const close = (Component: React.FC) => {
    setOpenedModals(modals => {
      return modals.filter(modal => {
        return modal.Component !== Component;
      });
    });
  };

  const dispatch = useMemo<ModalHandler>(() => ({ open, close }), []);

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>{children}</ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};
export default ModalsProvider;
