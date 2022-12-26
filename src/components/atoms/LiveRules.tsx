import styled from 'styled-components';
import { Color, MobileQuery, PcQuery, Text } from '../../styles';

const Layout = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Bubble = styled.div`
  position: relative;
  flex-shrink: 0;
  border-radius: 100%;
  background: ${Color.PRIMARY};

  ${MobileQuery} {
    width: 24px;
    height: 24px;
  }

  ${PcQuery} {
    width: 32px;
    height: 32px;
  }
`;

const BubbleText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) skew(0.1deg);
  font-weight: 700;
  color: ${Color.WHITE};

  ${MobileQuery} {
    font-size: 12px;
  }

  ${PcQuery} {
    font-size: 16px;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  color: ${Color.WHITE};

  ${MobileQuery} {
    ${Text.BODY_1};
    height: unset;
  }

  ${PcQuery} {
    ${Text.EX_BODY_1};
    height: unset;
  }
`;

interface Props {
  index: number;
  text: string;
}

const LiveRules: React.FC<Props> = ({ index, text }) => {
  return (
    <Layout>
      <Bubble>
        <BubbleText>{index}</BubbleText>
      </Bubble>
      <Content>{text}</Content>
    </Layout>
  );
};

export default LiveRules;
