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
    const currentUser: IUser | undefined = user && { ...user };
    currentUser && setUser(undefined);

    const response = await Spaceship.updateUser({ nickname });
    if (!response.ok) {
      currentUser && setUser(currentUser);
      throw new HttpException(response);
    }

    const newUser = response.user;
    setUser(newUser);
    return newUser;
  };

  return { user, updateNickname };
}

export type { User };
export default useUser;
