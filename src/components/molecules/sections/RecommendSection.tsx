import { Component } from 'react';
import styled from 'styled-components';
import { MobileQuery, PcInnerPadding, PcQuery } from '../../../styles';
import SectionTitle from '../../atoms/SectionTitle';
import VideoPanel from '../../atoms/VideoPanel';
import Repeat from '../../tools/Repeat';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

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

class RecommendSection extends Component<Props, any> {
  render() {
    const recommends: IVideo[] = this.props.recommends;

    return (
      <Layout>
        <SectionTitle>추천 동영상</SectionTitle>
        <ItemList>
          {recommends.length ? (
            recommends.map(data => <VideoPanel type={'full'} data={data} key={data.id} />)
          ) : (
            <Repeat count={10}>{(i: number) => <VideoPanel type={'full'} key={i} />}</Repeat>
          )}
        </ItemList>
      </Layout>
    );
  }
}

export default RecommendSection;
