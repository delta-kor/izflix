import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { useContext } from 'react';
import styled from 'styled-components';
import ModalContext from '../../contexts/ModalContext';
import InputModal from './InputModal';
import LinkModal from './LinkModal';
import PlaylistModal from './PlaylistModal';
import SelectModal from './SelectModal';
import TextModal from './TextModal';
import DateModal from './DateModal';
import FilterModal from './FilterModal';

const Background = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(7, 13, 45, 0.8);
  z-index: 90;
`;

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
  else if (modal.type === 'playlist')
    content = (
      <ModalWrapper key={modal.id!} {...modalWrapperProps}>
        <PlaylistModal modal={modal} respond={respond} />
      </ModalWrapper>
    );
  else if (modal.type === 'link')
    content = (
      <ModalWrapper key={modal.id!} {...modalWrapperProps}>
        <LinkModal modal={modal} respond={respond} />
      </ModalWrapper>
    );
  else if (modal.type === 'date')
    content = (
      <ModalWrapper key={modal.id!} {...modalWrapperProps}>
        <DateModal modal={modal} respond={respond} />
      </ModalWrapper>
    );
  else if (modal.type === 'member_filter')
    content = (
      <ModalWrapper key={modal.id!} {...modalWrapperProps}>
        <FilterModal modal={modal} respond={respond} />
      </ModalWrapper>
    );

  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        {content && <Background key={'background'} {...modalWrapperProps} />}
        {content}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default Modal;
