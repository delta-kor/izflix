import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useDevice from '../../../hooks/useDevice';
import { Color, MobileQuery, PcQuery } from '../../../styles';
import ListButton from '../../atoms/ListButton';
import VerticalButton from '../../atoms/VerticalButton';

const Layout = styled.div`
  display: flex;

  ${MobileQuery} {
    justify-content: space-between;
    gap: 12px;
    padding: 0 32px;
  }

  ${PcQuery} {
    flex-direction: column;
    gap: 12px;
    margin: 46px 0 0 0;
  }
`;

const ShortcutSection: React.FC = () => {
  const navigate = useNavigate();
  const device = useDevice();

  const onItemClick = (path: string) => {
    navigate(path);
  };

  const ButtonElement = device === 'mobile' ? VerticalButton : ListButton;

  return (
    <Layout>
      <ButtonElement icon={'music'} color={Color.DARK_GRAY} onClick={() => onItemClick('/music')}>
        노래
      </ButtonElement>
      <ButtonElement
        icon={'category'}
        color={Color.DARK_GRAY}
        onClick={() => onItemClick('/category')}
      >
        카테고리
      </ButtonElement>
      <ButtonElement
        icon={'calendar'}
        color={Color.DARK_GRAY}
        onClick={() => onItemClick('/calendar')}
      >
        달력
      </ButtonElement>
    </Layout>
  );
};

export default ShortcutSection;
