import { useEffect, useState } from 'react';
import ProfileTemplate from '../components/templates/ProfileTemplate';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import Spaceship from '../services/spaceship';
import Page from './Page';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<IUser | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  const loadUser = async () => {
    const response = await Spaceship.getUser();
    if (!response.ok) throw new HttpException(response);

    setUser(response.user);
  };

  const loadData = () => {
    new Evoke(loadUser());
  };

  return (
    <Page>
      <ProfileTemplate user={user} />
    </Page>
  );
};

export default ProfilePage;
