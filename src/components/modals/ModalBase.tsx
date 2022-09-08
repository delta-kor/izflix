import ReactModal from 'react-modal';
import { Color } from '../../styles';

const ModalStyle: ReactModal.Styles = {
  content: {
    position: 'static',
    maxWidth: '640px',
    padding: '16px',
    margin: '0 16px',
    background: Color.DARK_GRAY,
    border: '2px solid #454B6B',
    borderRadius: '8px',
  },
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

export default ModalBase;
