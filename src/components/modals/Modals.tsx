import { useContext } from 'react';
import { ModalsDispatchContext, ModalsStateContext } from '../../contexts/ModalContext';

const Modals: React.FC = () => {
  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchContext);

  return (
    <>
      {openedModals.map((modal, index) => {
        const { Component, props } = modal;
        const { onSubmit, ...restProps } = props;

        const handleCancel = () => {
          close(Component);
        };

        const handleSubmit = async (data?: any) => {
          if (typeof onSubmit === 'function') {
            await onSubmit(data);
          }
          handleCancel();
        };

        return (
          <Component {...restProps} onCancel={handleCancel} onSubmit={handleSubmit} key={index} />
        );
      })}
    </>
  );
};

export default Modals;
