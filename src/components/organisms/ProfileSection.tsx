import { User } from '../../hooks/useUser';
import ProfileInfo from '../atoms/ProfileInfo';

interface Props {
  user: User;
}

const ProfileSection: React.FC<Props> = ({ user }) => {
  return <ProfileInfo user={user} />;
};

export default ProfileSection;
