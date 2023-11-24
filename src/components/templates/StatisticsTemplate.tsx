import styled from 'styled-components';
import { MobileQuery, PcQuery, PcInnerPadding, MobileSideMargin } from '../../styles';
import StatisticsSection from '../organisms/StatisticsSection';
import { useTranslation } from 'react-i18next';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    padding: 0 ${MobileSideMargin}px;
    gap: 12px;
  }

  ${PcQuery} {
    gap: 16px;
    max-width: 640px;
    margin: 0 32px 0 ${PcInnerPadding};
  }
`;

interface Props {
  myVideos: IVideoWithPlayTime[];
  totalVideos: IVideoWithPlayTime[];
}

const StatisticsTemplate: React.FC<Props> = ({ myVideos, totalVideos }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <StatisticsSection title={t('statistics.me')} videos={myVideos} />
      <StatisticsSection title={t('statistics.total')} videos={totalVideos} />
    </Layout>
  );
};

export default StatisticsTemplate;
