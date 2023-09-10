import { useTranslation } from 'react-i18next';
import Meta from '../components/Meta';
import Page from './Page';
import FundraisingTemplate from '../components/templates/FundraisingTemplate';

const FundraisingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <Meta
        data={{
          title: `${t('fund.fund')} - IZFLIX`,
          url: 'https://izflix.net/profile/fundraising',
        }}
      />
      <FundraisingTemplate />
    </Page>
  );
};

export default FundraisingPage;
