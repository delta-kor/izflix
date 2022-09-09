import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Color } from '../../styles';

const Layout = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  gap: 8px;
`;

const Button = styled.div<{ $background: string }>`
  display: inline-block;
  padding: 12px 16px;

  background: ${({ $background }) => $background};
  color: ${Color.WHITE};
  font-size: 16px;
  border-radius: 8px;

  cursor: pointer;
  user-select: none;
`;

interface Props {
  onSubmit?(): void;
  onCancel?(): void;
  submit?: boolean;
  cancel?: boolean;
}

const ModalAction: React.FC<Props> = ({ onSubmit, onCancel, submit, cancel }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      {cancel && (
        <Button $background={Color.TRANSPARENT} onClick={onCancel}>
          {t('modal.cancel')}
        </Button>
      )}
      {submit && (
        <Button $background={Color.PRIMARY} onClick={onSubmit}>
          {t('modal.submit')}
        </Button>
      )}
    </Layout>
  );
};

export default ModalAction;
