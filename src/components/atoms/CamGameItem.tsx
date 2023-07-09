import styled from 'styled-components';
import { Color, HideOverflow, Text } from '../../styles';
import SmoothBox from './SmoothBox';
import { ReactEventHandler } from 'react';

const Layout = styled(SmoothBox)<{ $active: boolean }>`
  .content {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px 18px;

    background: ${props => (props.$active ? Color.PRIMARY : Color.DARK_GRAY)};
    border-radius: 8px;
    transition: background 0.2s;

    cursor: pointer;
    user-select: none;
  }
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  flex-grow: 1;
  color: ${Color.WHITE};
  ${Text.SUBTITLE_1};
  ${HideOverflow};
`;

const Score = styled.div<{ $active: boolean }>`
  flex-shrink: 0;
  color: ${props => (props.$active ? Color.BACKGROUND : Color.PRIMARY)};
  transition: color 0.2s;
  ${Text.SUBTITLE_2};
`;

const Description = styled.div`
  color: ${Color.WHITE};
  ${Text.BODY_2};
  ${HideOverflow};
`;

interface Props {
  game: ICampdGame;
  active: boolean;
  onClick: ReactEventHandler;
}

const CamGameItem: React.FC<Props> = ({ game, active, onClick }) => {
  return (
    <Layout hover={1.02} tap={0.98} onClick={onClick} $active={active}>
      <Heading>
        <Title>{game.title}</Title>
        <Score $active={active}>{game.score}</Score>
      </Heading>
      <Description>{game.description}</Description>
    </Layout>
  );
};

export default CamGameItem;
