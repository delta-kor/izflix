import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Color, MobileQuery, ModalWidthLarge, PcQuery, Text } from '../../styles';
import SmoothImage from '../atoms/SmoothImage';
import ModalAction from './ModalAction';
import ModalBase from './ModalBase';

const Content = styled.div`
  color: ${Color.WHITE};
  width: ${ModalWidthLarge};
  white-space: pre-line;

  ${MobileQuery} {
    ${Text.BODY_1};
    line-height: 24px;
    height: unset;
  }

  ${PcQuery} {
    ${Text.EX_BODY_1};
    line-height: 30px;
    height: unset;
  }
`;

const Image = styled(SmoothImage)`
  width: 100%;
  aspect-ratio: 1054 / 260;
`;

interface Props {
  modal: LinkModal;
  respond: ModalRespondFunction;
}

const LinkModal: React.FC<Props> = ({ modal, respond }) => {
  const { t } = useTranslation();

  const handleRespond: ModalRespondFunction = result => {
    if (result.type === 'ok') window.open(modal.link, '_blank');
    respond(result);
  };

  return (
    <ModalBase>
      <Image src={modal.image} />
      <Content>{modal.content}</Content>
      <ModalAction
        respond={handleRespond}
        ok
        cancel
        okText={t('modal.watch')}
        cancelText={t('modal.cancel')}
      />
    </ModalBase>
  );
};

export default LinkModal;
