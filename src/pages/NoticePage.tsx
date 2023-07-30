import { useTranslation } from 'react-i18next';
import Meta from '../components/Meta';
import NoticeTemplate from '../components/templates/NoticeTemplate';
import Page from './Page';

const NoticePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <Meta
        data={{
          title: `${t('profile.notice')} - IZFLIX`,
          url: 'https://izflix.net/profile/notice',
        }}
      />
      <NoticeTemplate />
    </Page>
  );
};

export default NoticePage;
