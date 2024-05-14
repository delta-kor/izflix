import styled from 'styled-components';
import { Color, MobileQuery, MobileSideMargin, PcInnerPadding, PcQuery, Text } from '../../styles';
import Funder from '../../services/funder';
import SmoothBox from '../atoms/SmoothBox';
import SmoothImage from '../atoms/SmoothImage';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1230px;

  ${MobileQuery} {
    padding: 0 ${MobileSideMargin}px 64px ${MobileSideMargin}px;
    gap: 32px;
  }

  ${PcQuery} {
    gap: 48px;
    margin: 0 32px 0 ${PcInnerPadding};
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
  line-height: 24px;

  color: ${Color.WHITE};
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  ${MobileQuery} {
    gap: 6px;
  }

  ${PcQuery} {
    gap: 8px;
  }

  & > p {
    font-weight: 400;

    color: ${Color.WHITE}dd;

    ${MobileQuery} {
      font-size: 16px;
      line-height: 20px;
    }

    ${PcQuery} {
      font-size: 18px;
      line-height: 24px;
    }
  }

  & > p > u {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  ${MobileQuery} {
    margin: -20px 0 0 0;
  }

  ${PcQuery} {
    margin: -28px 0 0 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Graph = styled.div`
  flex-grow: 1;
  height: 24px;
  background: ${Color.GRAY};
  border-radius: 4px;
`;

const GraphIndicator = styled.div`
  height: 100%;
  background: ${Color.PRIMARY};
  border-radius: 4px;
`;

const Indexes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Index = styled.div`
  color: ${Color.WHITE};
  font-weight: 700;

  ${PcQuery} {
    font-size: 20px;
  }

  ${MobileQuery} {
    font-size: 16px;
  }
`;

const Date = styled.div`
  color: ${Color.GRAY};
  font-weight: 700;

  ${PcQuery} {
    font-size: 16px;
  }

  ${MobileQuery} {
    font-size: 12px;
  }
`;

const Link = styled.a`
  color: ${Color.PRIMARY};
  font-weight: 700;
  text-align: center;

  ${PcQuery} {
    font-size: 24px;
  }

  ${MobileQuery} {
    font-size: 18px;
  }
`;

const Image = styled(SmoothImage)`
  width: 100%;
  aspect-ratio: 1200 / 928;
  border-radius: 16px;
`;

const Line = styled.div`
  height: 2px;
  width: 100%;
  background: ${Color.DARK_GRAY};
`

const FundraisingTemplate: React.FC = () => {
  return (
    <Layout>
      <Title>IZFLIX 운영 안내</Title>
      <Description>
        <p>안녕하세요, IZFLIX 운영진입니다.</p>
        <p>현재 IZFLIX는 정식 서비스 2년째에 들어서고 있습니다.</p>
        <p>4월 기준, 누적 스트리밍 20만 시간, 총 페이지 조회수 1,000만을 달성했으며</p>
        <p>현재까지도 일 평균 500시간 이상 많은 분이 이용하고 있습니다.</p>
        <br/>
        <p><u>IZFLIX는 계속해서 운영 예정</u>이며</p>
        <p>운영 종료 계획은 없습니다.</p>
      </Description>
      <Line/>
      <Title>IZFLIX 모금 결과 안내</Title>
      <Description>
        <p>안녕하세요, IZFLIX 운영진입니다.</p>
        <p>2월 정기 모금을 통해 약 38만원 가량의 모금액이 모였음을 알려드립니다.</p>
        <p>해당 모금액은 사이트 유지비용으로 사용되었습니다.</p>
        <p>또한, 2월 모금에 대한 목표 초과액은 3월, 4월 사이트 유지비용으로 사용하였습니다.</p>
        <p>모금에 참여해주신 모든 분께 감사드립니다.</p>
      </Description>
      <Line />
      <Title>5월 모금 안내</Title>
      <Description>
        <p>현재 예상되는 사이트 유지비용은 월 약 22만원으로,</p>
        <p>
          운영진 부담액을 제외한 <u>70,000원을 모금을 통해 충당하려 합니다.</u>
        </p>
        <br />
        <p>모금은 아래와 같은 방식으로 진행됩니다:</p>
        <br />
        <p>1. 모든 모금액은 사이트 운영 및 유지 관리 비용에 사용됩니다.</p>
        <p>2. 모금액은 자유롭게 설정하실 수 있습니다.</p>
        <p>3. 매월 받은 모금액과 그 사용 내역을 공개합니다.</p>
        <br />
        <p>모금 참여를 원치 않으시더라도 계속해서 사이트를 이용할 수 있습니다.</p>
        <p>모금은 하단 링크를 통해 진행하실 수 있습니다.</p>
      </Description>
      <Content>
        <Indexes>
          <Index>
            {Funder.left()}원 남음 ({Funder.percentage()})
          </Index>
          <Index>목표 : {Funder.target()}원</Index>
        </Indexes>
        <Graph>
          <GraphIndicator style={{ width: Funder.percentage() }} />
        </Graph>
        <Date>2024. 5. 14. 20:00 기준</Date>
      </Content>
      <Link href={'https://toss.me/twelve1212'} target={'_blank'}>
        모금링크 (toss.me/twelve1212)
      </Link>
    </Layout>
  );
};

export default FundraisingTemplate;
