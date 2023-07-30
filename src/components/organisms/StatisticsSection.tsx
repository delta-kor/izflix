import styled from 'styled-components';
import SectionTitle from '../atoms/SectionTitle';
import VideoPanel from '../atoms/VideoPanel';
import { Color, MobileQuery, PcQuery, Text } from '../../styles';
import { useTranslation } from 'react-i18next';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const VideoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 420px;
`;

const NoData = styled.div`
  ${MobileQuery} {
    color: ${Color.WHITE};
    ${Text.BODY_1};
  }

  ${PcQuery} {
    color: ${Color.WHITE};
    ${Text.BODY_1};
  }
`;

interface Props {
  title: string;
  videos: IVideoWithPlayTime[];
}

const StatisticsSection: React.FC<Props> = ({ title, videos }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <SectionTitle fluid>{title}</SectionTitle>
      <VideoList>
        {videos.length ? (
          [...videos]
            .sort((a, b) => b.playTime - a.playTime)
            .map(video => (
              <VideoPanel
                type={'horizontal'}
                data={video}
                link={`/${video.id}`}
                playTime={video.playTime}
                key={video.id}
              />
            ))
        ) : (
          <NoData>{t('statistics.no_data')}</NoData>
        )}
      </VideoList>
    </Layout>
  );
};

export default StatisticsSection;
