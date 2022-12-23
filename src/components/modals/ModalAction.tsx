import { motion, AnimateSharedLayout } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Color, MobileQuery, PcQuery } from '../../styles';

const Layout = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  gap: 8px;
`;

const Button = styled(motion.div)<{ $background: string }>`
  display: inline-block;
  background: ${({ $background }) => $background};
  color: ${Color.WHITE};
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  ${MobileQuery} {
    padding: 12px 16px;
    font-size: 14px;
  }
  ${PcQuery} {
    padding: 14px 18px;
    font-size: 16px;
  }
`;

interface Props {
  respond: ModalRespondFunction;
  ok?: boolean;
  cancel?: boolean;
}

const ModalAction: React.FC<Props> = ({ respond, ok, cancel }) => {
  const { t } = useTranslation();

  const handleOk = () => {
    respond({ type: 'ok' });
  };

  const handleCancel = () => {
    respond({ type: 'cancel' });
  };

  return (
    <Layout>
      {cancel && (
        <Button
          $background={Color.TRANSPARENT}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCancel}
          layoutId={'modal_cancel'}
        >
          {t('modal.cancel')}
        </Button>
      )}
      {ok && (
        <Button
          $background={Color.PRIMARY}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOk}
          layoutId={'modal_ok'}
        >
          {t('modal.ok')}
        </Button>
      )}
    </Layout>
  );
};

export default ModalAction;
