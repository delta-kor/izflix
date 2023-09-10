import { useTranslation } from 'react-i18next';
import Meta from '../components/Meta';
import AppTemplate from '../components/templates/AppTemplate';
import Page from './Page';

const AppPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <Meta
        data={{ title: `${t('app.download')} - IZFLIX`, url: 'https://izflix.net/profile/app' }}
      />
      <AppTemplate />
    </Page>
  );
};

export default AppPage;
