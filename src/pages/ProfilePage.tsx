import { useTranslation } from 'react-i18next';
import Meta from '../components/Meta';
import ProfileTemplate from '../components/templates/ProfileTemplate';
import useUser from '../hooks/useUser';
import Page from './Page';

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();

  const user = useUser();

  return (
    <Page>
      <Meta
        data={{ title: `${t('profile.profile')} - IZFLIX`, url: 'https://izflix.net/profile' }}
      />
      <ProfileTemplate user={user} />
    </Page>
  );
};

export default ProfilePage;
