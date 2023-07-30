import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import { User } from '../../hooks/useUser';
import Spaceship from '../../services/spaceship';
import Tracker from '../../services/tracker';
import { MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import AppDownload from '../atoms/AppDownload';
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

const ThemeImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

interface Props {
  user: User;
}

const ProfileTemplate: React.FC<Props> = ({ user }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const modal = useModal();

  const handleLanguageClick = () => {
    Tracker.send('profile_list_clicked', { item_type: 'language' });

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
        Tracker.send('language_selected', { item_type: result.selected });
        i18n.changeLanguage(result.selected);
        Spaceship.flush();
      }
    });
  };

  let isMobile = false;
  // @ts-ignore
  const agent = navigator.userAgent || navigator.vendor || window.opera;

  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      agent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      agent.substr(0, 4)
    )
  )
    isMobile = true;

  const isInStandaloneMode = (() =>
    window.matchMedia('(display-mode: standalone)').matches ||
    // @ts-ignore
    window.navigator.standalone ||
    document.referrer.includes('android-app://'))();

  return (
    <Layout>
      <ProfileSection user={user} />
      {isMobile && !isInStandaloneMode && <AppDownload />}
      <IconListSection>
        <IconListItem icon={'language'} onClick={handleLanguageClick}>
          {t('profile.language')}
        </IconListItem>
        <IconListItem
          icon={'settings'}
          onClick={() => {
            Tracker.send('profile_list_clicked', { item_type: 'settings' });
            navigate('/profile/settings');
          }}
        >
          {t('profile.settings')}
        </IconListItem>
        <IconListItem
          icon={'compass'}
          onClick={() => {
            Tracker.send('profile_list_clicked', { item_type: 'statistics' });
            navigate('/profile/statistics');
          }}
        >
          {t('profile.statistics')}
        </IconListItem>
        <IconListItem
          icon={'notice'}
          onClick={() => {
            Tracker.send('profile_list_clicked', { item_type: 'notice' });
            navigate('/profile/notice');
          }}
        >
          {t('profile.notice')}
        </IconListItem>
        <IconListItem
          icon={'info'}
          onClick={() => {
            Tracker.send('profile_list_clicked', { item_type: 'info' });
            navigate('/profile/info');
          }}
        >
          {t('profile.info')}
        </IconListItem>
      </IconListSection>
      {/* <ThemeImage
        src={
          'https://github.com/delta-kor/izflix/assets/48397257/9c971c9d-8b49-4df3-8333-fafe3ea0a3b8'
        }
      /> */}
    </Layout>
  );
};

export default ProfileTemplate;
