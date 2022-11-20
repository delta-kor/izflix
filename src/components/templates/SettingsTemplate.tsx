import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import Settings from '../../services/settings';
import { HideOverflow, MobileQuery, PcInnerPadding, PcQuery, Text } from '../../styles';
import SettingsItem from '../atoms/SettingsItem';
import SelectModal from '../modals/SelectModal';

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

const Group = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    gap: 16px;
  }

  ${PcQuery} {
    gap: 20px;
  }
`;

const GroupTitle = styled.span`
  margin: 0 0 4px 0;
  transform: skew(0.1deg);
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_1};
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
  }
`;

const SettingsTemplate: React.FC = () => {
  const { t } = useTranslation();
  const modal = useModal();

  const [settings, setSettings] = useState<ISettings>(Settings.getAll());

  const handleToggle = (key: keyof ISettings) => {
    setSettings(prev => {
      const next = { ...prev, [key]: !prev[key] };
      Settings.setAll(next);
      return next;
    });
  };

  const setValue = (key: keyof ISettings, value: any) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      Settings.setAll(next);
      return next;
    });
  };

  return (
    <Layout>
      <Group>
        <GroupTitle>{t('settings.playback')}</GroupTitle>
        <SettingsItem
          title={t('settings.featured_video_autoplay')}
          description={t('settings.featured_video_autoplay_description')}
          state={settings.FEATURED_VIDEO_AUTOPLAY}
          onClick={() => handleToggle('FEATURED_VIDEO_AUTOPLAY')}
        />
        <SettingsItem
          title={t('settings.video_autoplay')}
          description={t('settings.video_autoplay_description')}
          state={settings.VIDEO_AUTOPLAY}
          onClick={() => handleToggle('VIDEO_AUTOPLAY')}
        />
        <SettingsItem
          title={t('settings.video_subtitle')}
          description={t('settings.video_subtitle_description')}
          state={settings.VIDEO_SUBTITLE}
          onClick={() => handleToggle('VIDEO_SUBTITLE')}
        />
      </Group>
      <Group>
        <GroupTitle>{t('settings.feed')}</GroupTitle>
        <SettingsItem
          title={t('settings.user_recommend_count')}
          description={t('settings.user_recommend_count_description')}
          state={t('common.count', { count: settings.USER_RECOMMEND_COUNT })}
          onClick={() =>
            modal.openModal(SelectModal, {
              content: 'profile.select_language',
              items: [10, 15, 20, 25, 30].map(
                count => [count.toString(), t('common.count', { count })] as [string, string]
              ),
              current: settings.USER_RECOMMEND_COUNT.toString(),
              onSubmit(data) {
                setValue('USER_RECOMMEND_COUNT', Number(data.selected));
              },
            })
          }
        />
      </Group>
    </Layout>
  );
};

export default SettingsTemplate;
