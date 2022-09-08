import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import { Color, PcQuery, Text } from '../../styles';

const Layout = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px;

  background: rgba(22, 26, 54, 0.5);
  border: 2px solid ${Color.GRAY};
  backdrop-filter: blur(4px);
  border-radius: 8px;

  ${PcQuery} {
    display: inline-flex;
    min-width: 480px;
  }
`;

const HeaderIcon = styled(Icon)`
  flex-shrink: 0;
  width: 22px;
  height: 22px;
`;

const Content = styled.div`
  flex-grow: 1;
  color: ${Color.WHITE};
  white-space: pre-wrap;

  ${Text.BODY_1};
  height: unset;
`;

const CloseIcon = styled(Icon)`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

interface Props {
  data: Popup;
  close(): void;
}

const PopupItem: React.FC<Props> = ({ data, close }) => {
  const { t } = useTranslation();

  let iconType: any;
  switch (data.type) {
    case 'error':
      iconType = 'error';
      break;
    case 'success':
      iconType = 'check';
      break;
    default:
      iconType = 'loader';
      break;
  }

  let color: string;
  switch (data.type) {
    case 'error':
      color = Color.RED;
      break;
    case 'success':
      color = Color.PRIMARY;
      break;
    default:
      color = Color.PRIMARY;
      break;
  }

  return (
    <Layout>
      <HeaderIcon type={iconType} color={color} />
      <Content>{t(data.message)}</Content>
      <CloseIcon type={'close'} color={Color.GRAY} onClick={() => close()} />
    </Layout>
  );
};

export default PopupItem;
