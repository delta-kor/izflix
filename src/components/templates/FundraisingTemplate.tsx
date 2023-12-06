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

const FundraisingTemplate: React.FC = () => {
  return <Layout></Layout>;
};

export default FundraisingTemplate;
