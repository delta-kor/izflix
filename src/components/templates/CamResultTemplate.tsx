import styled from 'styled-components';
import { MobileQuery, PcQuery, PcInnerPadding } from '../../styles';
import CamVideoController from '../molecules/CamVideoController';
import CamScore from '../atoms/CamScore';
import CamResultSection from '../organisms/CamResultSection';

const Layout = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
    padding: 32px 32px 0 32px;
    gap: 32px;
  }

  ${PcQuery} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
    padding: 0 ${PcInnerPadding};

    align-items: center;
    justify-content: center;
    gap: 64px;
  }
`;

interface Props {
  game: ICampdGame;
  input: ICampdInput;
  result?: ICampdResult;
}

const CamResultTemplate: React.FC<Props> = ({ game, input, result }) => {
  return (
    <Layout>
      <CamVideoController game={game} input={input} />
      <CamResultSection game={game} result={result} />
    </Layout>
  );
};

export default CamResultTemplate;
