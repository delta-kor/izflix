import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Color, MobileQuery, MobileSideMargin, PcInnerPadding, PcQuery, Text } from '../../styles';
import Button from '../atoms/Button';
import LiveRules from '../atoms/LiveRules';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    padding: 64px ${MobileSideMargin}px 8px ${MobileSideMargin}px;
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
  const { t } = useTranslation();

  return (
    <Layout>
      <Title>IZFLIX LIVE</Title>
      <Rules>
        <LiveRules index={1} text={t('live.rules.0')} />
        <LiveRules index={2} text={t('live.rules.1')} />
        <LiveRules index={3} text={t('live.rules.2')} />
      </Rules>
      <Connect>
        <Button color={Color.PRIMARY}>접속하기</Button>
      </Connect>
    </Layout>
  );
};

export default LiveEntranceTemplate;
