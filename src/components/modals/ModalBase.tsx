import ReactModal from 'react-modal';
import { Color } from '../../styles';

const ModalStyle: ReactModal.Styles = {
  content: {
    position: 'absolute',
    inset: 'unset',
    padding: '24px',
    maxWidth: '100%',
    maxHeight: 'calc(100vh - 32px)',
    background: Color.DARK_GRAY,
    border: '2px solid #454B6B',
    borderRadius: '8px',
  },
  overlay: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(7, 13, 45, 0.5)',
    backdropFilter: 'blur(2px)',
    zIndex: 90,
  },
};

const ModalBase: React.FC = ({ children }) => {
  return (
    <ReactModal closeTimeoutMS={200} style={ModalStyle} isOpen>
      {children}
    </ReactModal>
  );
};

export type ModalProps<T> = {
  onSubmit?(data: T): void;
  onCancel?(): void;
};

export default ModalBase;
