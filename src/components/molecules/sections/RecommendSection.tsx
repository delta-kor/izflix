import styled from 'styled-components';
import Settings from '../../../services/settings';
import { Color, MobileQuery, PcInnerPadding, PcQuery } from '../../../styles';
import SectionTitle from '../../atoms/SectionTitle';
import VideoPanel from '../../atoms/VideoPanel';
import Repeat from '../../tools/Repeat';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  background: ${Color.BACKGROUND};
  z-index: 1;

  ${PcQuery} {
    margin: 24px 0 0 0;
  }
`;

const ItemList = styled.div`
  display: grid;

  ${MobileQuery} {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 24px 24px;
    padding: 0 32px;
  }

  ${PcQuery} {
    grid-template-columns: repeat(
      auto-fill,
      minmax(max(280px, calc((100% - (2 * 24px)) / 3)), 1fr)
    );
    gap: 32px 24px;
    padding: 0 ${PcInnerPadding};
  }
`;

interface Props {
  recommends: IVideo[];
}

const RecommendSection: React.FC<Props> = ({ recommends }) => {
  return (
    <Layout>
      <SectionTitle>추천 동영상</SectionTitle>
      <ItemList>
        {recommends.length ? (
          recommends.map(data => (
            <VideoPanel type={'full'} data={data} link={`/${data.id}`} key={data.id} />
          ))
        ) : (
          <Repeat
            count={Settings.getOne('USER_RECOMMEND_COUNT')}
            element={(i: number) => <VideoPanel type={'full'} key={i} />}
          />
        )}
      </ItemList>
    </Layout>
  );
};

export default RecommendSection;
