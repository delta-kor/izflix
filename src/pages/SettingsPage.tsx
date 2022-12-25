import { useTranslation } from 'react-i18next';
import Meta from '../components/Meta';
import SettingsTemplate from '../components/templates/SettingsTemplate';
import Page from './Page';

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <Meta
        data={{ title: `${t('settings.settings')} - IZFLIX`, url: 'https://izflix.net/settings' }}
      />
      <SettingsTemplate />
    </Page>
  );
};

export default SettingsPage;
