import styled from 'styled-components';
import { User } from '../../hooks/useUser';
import { MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import ProfileSection from '../organisms/ProfileSection';

const Layout = styled.div`
  ${MobileQuery} {
    padding: 0 32px;
  }

  ${PcQuery} {
    max-width: 640px;
    margin: 0 32px 0 ${PcInnerPadding};
  }
`;

interface Props {
  user: User;
}

const ProfileTemplate: React.FC<Props> = ({ user }) => {
  return (
    <Layout>
      <ProfileSection user={user} />
    </Layout>
  );
};

export default ProfileTemplate;
