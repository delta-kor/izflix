import styled from 'styled-components';
import { MobileQuery, PcQuery } from '../../styles';
import ProfileSection from '../organisms/ProfileSection';

const Layout = styled.div`
  ${MobileQuery} {
    padding: 0 32px;
  }

  ${PcQuery} {
    max-width: 720px;
    padding: 0 32px;
    margin: 0 auto;
  }
`;

interface Props {
  user?: IUser;
}

const ProfileTemplate: React.FC<Props> = ({ user }) => {
  return (
    <Layout>
      <ProfileSection user={user} />
    </Layout>
  );
};

export default ProfileTemplate;
