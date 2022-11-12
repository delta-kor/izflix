import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Settings from '../../services/settings';
import { HideOverflow, MobileQuery, PcInnerPadding, PcQuery, Text } from '../../styles';
import SettingsItem from '../atoms/SettingsItem';

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
    gap: 18px;
  }
`;

const GroupTitle = styled.span`
  margin: 0 0 4px 0;
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

  const [settings, setSettings] = useState<ISettings>(Settings.getAll());

  const handleToggle = (key: keyof ISettings) => {
    setSettings(prev => {
      const next = { ...prev, [key]: !prev[key] };
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
      </Group>
    </Layout>
  );
};

export default SettingsTemplate;
