import styled from 'styled-components';
import { Color, Text } from '../../styles';
import Icon from '../../icons/Icon';
import SmoothBox from './SmoothBox';
import { useNavigate } from 'react-router-dom';
import Funder from '../../services/funder';

const Layout = styled(SmoothBox)`
  margin: 0 -16px;

  & > .content {
    display: flex;
    flex-direction: column;
    background: ${Color.DARK_GRAY};
    border-radius: 8px;
    padding: 16px 16px 12px 16px;
    gap: 8px;
    cursor: pointer;
  }
`;

const Header = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  color: ${Color.WHITE};
  ${Text.SUBTITLE_1};
`;

const Content = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Graph = styled.div`
  flex-grow: 1;
  height: 6px;
  background: ${Color.GRAY};
  border-radius: 16px;
`;

const GraphIndicator = styled.div`
  height: 100%;
  background: ${Color.PRIMARY};
  border-radius: 16px;
`;

const Index = styled.div`
  color: ${Color.PRIMARY};
  ${Text.SUBTITLE_2};
`;

const LinkIcon = styled(Icon)`
  width: 20px;
  height: 20px;
`;

const FundraisingPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout hover={1.03} tap={0.97} onClick={() => navigate('/profile/fundraising')}>
      <Header>
        <Title>9월 모금 진행률</Title>
        <LinkIcon type={'right'} color={Color.WHITE} />
      </Header>
      <Content>
        <Index>{Funder.percentage()}</Index>
        <Graph>
          <GraphIndicator style={{ width: Funder.percentage() }} />
        </Graph>
      </Content>
    </Layout>
  );
};

export default FundraisingPanel;
