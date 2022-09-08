import styled from 'styled-components';
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
