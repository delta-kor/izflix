import { useEffect, useState } from 'react';
import HttpException from '../exceptions/http-exception';
import Evoke from '../filters/evoke';
import Spaceship from '../services/spaceship';

interface UserMethods {
  updateNickname(nickname: string): Promise<IUser>;
}

interface User extends UserMethods {
  user?: IUser;
}

function useUser(): User {
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

  const updateNickname = async (nickname: string) => {
    const response = await Spaceship.updateUser({ nickname });
    if (!response.ok) throw new HttpException(response);

    const user = response.user;
    setUser(user);
    return user;
  };

  return { user, updateNickname };
}

export type { User };
export default useUser;
