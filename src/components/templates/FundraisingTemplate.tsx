import styled from 'styled-components';
import { Color, MobileQuery, PcInnerPadding, PcQuery, Text } from '../../styles';
import Funder from '../../services/funder';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1230px;

  ${MobileQuery} {
    padding: 0 32px 64px 32px;
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

const FundraisingTemplate: React.FC = () => {
  return (
    <Layout>
      <Title>IZFLIX 모금 안내</Title>
      <Description>
        <p>안녕하세요, IZFLIX 운영진입니다.</p>
        <p>먼저, 여러분의 지속적인 사랑과 관심에 진심으로 감사드립니다.</p>
        <p>IZFLIX는 처음에는 단순히 개인적인 용도로 시작된 작은 프로젝트였습니다.</p>
        <p>하지만 여러분들의 관심과 참여 덕분에 예상치 못하게 커져나갔고,</p>
        <p>현재는 많은 사용자들이 방문하는 서비스가 되었습니다.</p>
        <p>&nbsp;</p>
        <p>그동안 서비스를 지속적으로 제공하기 위해 서버 자원 사용 기간을 수차례 연장해왔습니다.</p>
        <p>
          그러나 <u>최근 서비스 자원 비용 상승으로 인하여 운영진이 전액을 부담하기 어려운 상황</u>에
          이르렀습니다.
        </p>
        <p>
          특히, 사용자 분들이 지속적으로 늘어나며 필요한 서버 자원이 증가함에 따라 비용 부담이
          커져왔습니다.
        </p>
        <p>
          그래서 저희는 항상 무료로 제공하는 것을 원칙으로 하면서도 현재의 상황을 고려하여&nbsp;
          <u>모금 방식을 도입하기로 결정하게 되었습니다.</u>
        </p>
        <p>모금은 아래와 같은 방식으로 진행됩니다:</p>
        <p>&nbsp;</p>
        <p>1. 모든 모금액은 사이트 운영 및 유지 관리 비용에 사용됩니다.</p>
        <p>2. 모금액은 자유롭게 설정하실 수 있습니다.</p>
        <p>3. 매월 마지막 주에 받은 모금액과 그 사용 내역을 공개합니다.</p>
        <p>&nbsp;</p>
        <p>현재 사이트 유지비용은 월 약 12만원으로,</p>
        <p>이 중 65%인 78,000원은 운영진에서 직접 부담하고 있습니다.</p>
        <p>
          나머지 35%인 <u>42,000원을 모금을 통해 조달하려 합니다.</u>
        </p>
        <p>&nbsp;</p>
        <p>모금 참여를 원치 않으시더라도 계속해서 사이트를 이용할 수 있음을 알려드립니다.</p>
        <p>단지 좋아하는 영상을 볼 수 있는 장소로서 사랑받고 싶다는 저희의 바람입니다.</p>
        <p>IZFLIX가 여러분과 함께 계속 성장하고 발전할 수 있도록 도와주시면 감사하겠습니다.</p>
        <p>여러분의 작은 도움이 IZFLIX를 더 나은 서비스로 만들어갈 것입니다.</p>
        <p>감사합니다.</p>
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
      </Content>
      <Link href={'https://toss.me/izfx12'} target={'_blank'}>
        모금링크 (toss.me/izfx12)
      </Link>
    </Layout>
  );
};

export default FundraisingTemplate;
