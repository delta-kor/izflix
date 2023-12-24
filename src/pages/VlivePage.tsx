import { useTranslation } from 'react-i18next';
import Meta from '../components/Meta';
import Page from './Page';
import VliveTemplate from '../components/templates/VliveTemplate';
import { useEffect } from 'react';
import Transmitter from '../services/transmitter';
import Cache from '../services/cache';

const VlivePage: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!Cache.has('vod_moved')) {
      Cache.set('vod_moved', 1);
      Transmitter.emit('popup', {
        type: 'loading',
        message: 'VOD 페이지는 메인 페이지로 이동되었습니다.',
      });
    }
  }, []);

  return (
    <Page>
      <Meta data={{ title: `${t('vlive.vlive')} - IZFLIX`, url: 'https://izflix.net/vlive' }} />
      <VliveTemplate />
    </Page>
  );
};

export default VlivePage;
