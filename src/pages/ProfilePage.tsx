import ProfileTemplate from '../components/templates/ProfileTemplate';
import useUser from '../hooks/useUser';
import Page from './Page';

const ProfilePage: React.FC = () => {
  const user = useUser();

  return (
    <Page>
      <ProfileTemplate user={user} />
    </Page>
  );
};

export default ProfilePage;
