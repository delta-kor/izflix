import { useTranslation } from 'react-i18next';
import Meta from '../components/Meta';
import InfoTemplate from '../components/templates/InfoTemplate';
import Page from './Page';

const InfoPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <Meta data={{ title: `${t('profile.info')} - IZFLIX`, url: 'https://izflix.net/info' }} />
      <InfoTemplate />
    </Page>
  );
};

export default InfoPage;
