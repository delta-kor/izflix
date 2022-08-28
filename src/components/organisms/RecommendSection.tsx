import styled from 'styled-components';
import Settings from '../../services/settings';
import { Color, MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import SectionTitle from '../atoms/SectionTitle';
import VideoPanel from '../atoms/VideoPanel';
import Repeat from '../tools/Repeat';

const Layout = styled.div<{ $fluid: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  background: ${Color.BACKGROUND};
  z-index: 1;

  ${PcQuery} {
    margin: ${({ $fluid }) => ($fluid ? 0 : '24px')} 0 0 0;
  }
`;

const ItemList = styled.div<{ $fluid: boolean }>`
  display: grid;
  min-width: 0;

  ${MobileQuery} {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 24px 24px;
    padding: 0 ${({ $fluid: $flat }) => ($flat ? 0 : '32px')};
  }

  ${PcQuery} {
    grid-template-columns: repeat(
      auto-fill,
      minmax(
        max(${({ $fluid }) => ($fluid ? '220px' : '240px')}, calc((100% - (2 * 24px)) / 3)),
        1fr
      )
    );
    gap: 32px 24px;
    padding: 0 ${({ $fluid: $flat }) => ($flat ? 0 : PcInnerPadding)};
  }
`;

interface Props {
  recommends: IVideo[];
  fluid?: boolean;
}

const RecommendSection: React.FC<Props> = ({ recommends, fluid }) => {
  return (
    <Layout $fluid={!!fluid}>
      {!fluid && <SectionTitle>추천 동영상</SectionTitle>}
      <ItemList $fluid={!!fluid}>
        {recommends.length ? (
          recommends.map(data => (
            <VideoPanel type={'full'} data={data} link={`/${data.id}`} key={data.id} />
          ))
        ) : (
          <Repeat
            count={Settings.getOne(fluid ? 'VIDEO_RECOMMEND_COUNT' : 'USER_RECOMMEND_COUNT')}
            element={(i: number) => <VideoPanel type={'full'} key={i} />}
          />
        )}
      </ItemList>
    </Layout>
  );
};

export default RecommendSection;
