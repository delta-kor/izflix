import styled from 'styled-components';
import ProfileInfo from '../atoms/ProfileInfo';

const Layout = styled.div``;

interface Props {
  user?: IUser;
}

const ProfileSection: React.FC<Props> = ({ user }) => {
  return <ProfileInfo data={user} />;
};

export default ProfileSection;
