import styled from 'styled-components';
import { Color, MobileQuery, PcInnerPadding, PcQuery, Text } from '../../styles';
import Button from '../atoms/Button';
import LiveRules from '../atoms/LiveRules';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    padding: 64px 32px 8px 32px;
    gap: 28px;
  }

  ${PcQuery} {
    gap: 36px;
    max-width: 640px;
    margin: 0 32px 8px ${PcInnerPadding};
    padding: 64px 0 0 0;
  }
`;

const Title = styled.div`
  color: ${Color.WHITE};

  ${MobileQuery} {
    ${Text.HEADLINE_1};
  }

  ${PcQuery} {
    ${Text.EX_HEADLINE_1};
  }
`;

const Rules = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    gap: 12px;
  }

  ${PcQuery} {
    gap: 16px;
  }
`;

const Connect = styled.div`
  display: flex;
`;

const LiveEntranceTemplate: React.FC = () => {
  return (
    <Layout>
      <Title>IZFLIX LIVE</Title>
      <Rules>
        <LiveRules index={1} text={'방송은 자동으로 진행 됩니다.'} />
        <LiveRules index={2} text={'욕설 및 비난, 조롱은 자제 부탁드립니다.'} />
        <LiveRules index={3} text={'접속량에 따라 채팅이 원할하지 않을 수 있습니다.'} />
      </Rules>
      <Connect>
        <Button color={Color.PRIMARY}>접속하기</Button>
      </Connect>
    </Layout>
  );
};

export default LiveEntranceTemplate;
