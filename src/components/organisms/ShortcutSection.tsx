import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import Tracker from '../../services/tracker';
import { Color, MobileQuery, MobileSideMargin, PcQuery } from '../../styles';
import ListButton from '../atoms/ListButton';
import VerticalButton from '../atoms/VerticalButton';

const Layout = styled.div`
  display: flex;
  z-index: 1;

  ${MobileQuery} {
    justify-content: space-between;
    gap: 12px;
    padding: 0 ${MobileSideMargin}px;
  }

  ${PcQuery} {
    flex-direction: column;
    gap: 12px;
    margin: 46px 0 0 0;
  }
`;

const ShortcutSection: React.FC = () => {
  const { t } = useTranslation();
  const device = useDevice();

  const ButtonElement = device === 'mobile' ? VerticalButton : ListButton;

  return (
    <Layout>
      <ButtonElement
        icon={'music'}
        color={Color.DARK_GRAY}
        link={'/music'}
        onClick={() => Tracker.send('button_menu_clicked', { button_menu_type: 'music' })}
        fluid
      >
        {t('music.music')}
      </ButtonElement>
      <ButtonElement
        icon={'category'}
        color={Color.DARK_GRAY}
        link={'/category'}
        onClick={() => Tracker.send('button_menu_clicked', { button_menu_type: 'category' })}
        fluid
      >
        {t('category.category')}
      </ButtonElement>
      <ButtonElement
        icon={'calendar'}
        color={Color.DARK_GRAY}
        link={'/calendar'}
        onClick={() => Tracker.send('button_menu_clicked', { button_menu_type: 'calendar' })}
        fluid
      >
        {t('calendar.calendar')}
      </ButtonElement>
    </Layout>
  );
};

export default ShortcutSection;
