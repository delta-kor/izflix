import { useTranslation } from 'react-i18next';
import Meta from '../components/Meta';
import Page from './Page';
import VliveTemplate from '../components/templates/VliveTemplate';

const VlivePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <Meta data={{ title: `${t('vlive.vlive')} - IZFLIX`, url: 'https://izflix.net/vlive' }} />
      <VliveTemplate />
    </Page>
  );
};

export default VlivePage;
