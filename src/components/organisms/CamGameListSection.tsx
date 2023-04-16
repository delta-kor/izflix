import styled from 'styled-components';
import CamGameItem from '../atoms/CamGameItem';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface Props {
  activeGame?: ICampdGame;
  games: ICampdGame[];
  onSelect: (game: ICampdGame) => void;
}

const CamGameListSection: React.FC<Props> = ({ activeGame, games, onSelect }) => {
  return (
    <Layout>
      {games.map(game => (
        <CamGameItem
          game={game}
          active={activeGame?.id === game.id}
          onClick={() => onSelect(game)}
          key={game.id}
        />
      ))}
    </Layout>
  );
};

export default CamGameListSection;
