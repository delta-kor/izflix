import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { User } from '../../hooks/useUser';
import { MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import IconListItem from '../atoms/IconListItem';
import IconListSection from '../organisms/IconListSection';
import ProfileSection from '../organisms/ProfileSection';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    padding: 0 32px;
    gap: 28px;
  }

  ${PcQuery} {
    gap: 36px;
    max-width: 640px;
    margin: 0 32px 0 ${PcInnerPadding};
  }
`;

interface Props {
  user: User;
}

const ProfileTemplate: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLanguageClick = () => {};

  return (
    <Layout>
      <ProfileSection user={user} />
      <IconListSection>
        <IconListItem icon={'settings'} onClick={() => navigate('/profile/settings')}>
          {t('profile.settings')}
        </IconListItem>
        <IconListItem icon={'language'} onClick={handleLanguageClick}>
          {t('profile.language')}
        </IconListItem>
      </IconListSection>
    </Layout>
  );
};

export default ProfileTemplate;
