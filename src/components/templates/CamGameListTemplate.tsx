import styled from 'styled-components';
import CamGameListSection from '../organisms/CamGameListSection';
import { MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import CamGamePreviewSection from '../organisms/CamGamePreviewSection';
import { useState } from 'react';

const Layout = styled.div`
  ${MobileQuery} {
    display: flex;
    flex-direction: column;
    padding: 0 32px;
  }

  ${PcQuery} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 ${PcInnerPadding};
    gap: 32px;
  }
`;

interface Props {
  games: ICampdGame[];
}

const CamGameListTemplate: React.FC<Props> = ({ games }) => {
  const [game, setGame] = useState<ICampdGame | undefined>(undefined);

  return (
    <Layout>
      <CamGamePreviewSection game={game} />
      <CamGameListSection activeGame={game} games={games} onSelect={game => setGame(game)} />
    </Layout>
  );
};

export default CamGameListTemplate;
