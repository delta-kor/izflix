import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Color } from '../../styles';

const Background = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 90;
`;

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  max-width: 100%;
  max-height: calc(100vh - 32px);
  border: 2px solid ${Color.GRAY};
  background: ${Color.DARK_GRAY};
  border-radius: 8px;
`;

const ModalBase: React.FC = ({ children }) => {
  return (
    <Background>
      <Content layoutId={'modal-content'}>{children}</Content>
    </Background>
  );
};

export default ModalBase;
