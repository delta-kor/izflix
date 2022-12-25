import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import { User } from '../../hooks/useUser';
import Spaceship from '../../services/spaceship';
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
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const modal = useModal();

  const handleLanguageClick = () => {
    modal({
      type: 'select',
      content: 'profile.select_language',
      items: [
        ['ko', '한국어'],
        ['en', 'English'],
      ],
      current: i18n.resolvedLanguage === 'ko' ? 'ko' : 'en',
    }).then(result => {
      if (result.type === 'select') {
        i18n.changeLanguage(result.selected);
        Spaceship.flush();
      }
    });
  };

  return (
    <Layout>
      <ProfileSection user={user} />
      <IconListSection>
        <IconListItem icon={'language'} onClick={handleLanguageClick}>
          {t('profile.language')}
        </IconListItem>
        <IconListItem icon={'settings'} onClick={() => navigate('/profile/settings')}>
          {t('profile.settings')}
        </IconListItem>
        <IconListItem icon={'notice'} onClick={() => navigate('/profile/notice')}>
          {t('profile.notice')}
        </IconListItem>
        <IconListItem icon={'info'} onClick={() => navigate('/profile/info')}>
          {t('profile.info')}
        </IconListItem>
      </IconListSection>
    </Layout>
  );
};

export default ProfileTemplate;
