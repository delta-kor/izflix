import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import { Color, MobileQuery, MobileSideMargin, PcInnerPadding, PcQuery, Text } from '../../styles';
import VideoPanel from '../atoms/VideoPanel';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
    padding: 0 ${MobileSideMargin}px;
    gap: 12px;
  }

  ${PcQuery} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(max(240px, calc(100% - 3 * 16px) / 4), 1fr));
    gap: 24px 16px;
    padding: 0 ${PcInnerPadding};
  }
`;

const NoResult = styled.div`
  color: ${Color.WHITE};

  ${MobileQuery} {
    padding: 0 ${MobileSideMargin}px;
    ${Text.HEADLINE_1};
  }

  ${PcQuery} {
    padding: 0 ${PcInnerPadding};
    ${Text.EX_HEADLINE_1};
  }
`;

interface Props {
  videos: IVideo[] | null;
}

const SearchSection: React.FC<Props> = ({ videos }) => {
  const { t } = useTranslation();
  const device = useDevice();

  if (videos === null) {
    return <NoResult>{t('search.no_result')}</NoResult>;
  }

  return (
    <Layout>
      {videos.length ? (
        videos.map(data => (
          <VideoPanel
            type={device === 'mobile' ? 'horizontal' : 'full'}
            data={data}
            link={`/${data.id}`}
            key={data.id}
          />
        ))
      ) : (
        <Repeat
          count={20}
          element={i => <VideoPanel type={device === 'mobile' ? 'horizontal' : 'full'} key={i} />}
        />
      )}
    </Layout>
  );
};

export default SearchSection;
