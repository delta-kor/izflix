import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import styled from 'styled-components';
import ModalContext from '../../contexts/ModalContext';
import InputModal from './InputModal';
import SelectModal from './SelectModal';
import TextModal from './TextModal';

const ModalWrapper = styled(motion.div)`
  position: absolute;
  z-index: 90;
`;

const Modal: React.FC = () => {
  const { modal, respond } = useContext(ModalContext);

  const modalWrapperProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  let content;
  if (!modal) content = null;
  else if (modal.type === 'text')
    content = (
      <ModalWrapper key={modal.id!} {...modalWrapperProps}>
        <TextModal modal={modal} respond={respond} />
      </ModalWrapper>
    );
  else if (modal.type === 'select')
    content = (
      <ModalWrapper key={modal.id!} {...modalWrapperProps}>
        <SelectModal modal={modal} respond={respond} />
      </ModalWrapper>
    );
  else if (modal.type === 'input')
    content = (
      <ModalWrapper key={modal.id!} {...modalWrapperProps}>
        <InputModal modal={modal} respond={respond} />
      </ModalWrapper>
    );

  return <AnimatePresence exitBeforeEnter>{content}</AnimatePresence>;
};

export default Modal;
