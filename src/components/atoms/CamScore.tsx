import styled from 'styled-components';
import { Color } from '../../styles';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 480px;
`;

const ScoreBig = styled.div`
  font-weight: 800;
  font-size: 48px;
  color: ${Color.WHITE};
  height: 54px;
`;

const ScoreBigPlaceholder = styled.div`
  height: 54px;
  width: 180px;
  background: ${Color.DARK_GRAY};
  border-radius: 4px;
`;

const ScoreSmall = styled.div<{ $color: string }>`
  font-weight: 800;
  font-size: 24px;
  color: ${({ $color }) => $color};
  height: 28px;
`;

const ScoreSmallPlaceholder = styled.div`
  height: 28px;
  width: 90px;
  background: ${Color.DARK_GRAY};
  border-radius: 4px;
`;

const Header = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: ${Color.WHITE};
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Subgroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const SubgroupItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface Props {
  result?: ICampdResult;
}

const CamScore: React.FC<Props> = ({ result }) => {
  return (
    <Layout>
      <Group>
        <Header>Score</Header>
        {result ? (
          <ScoreBig>{result.total_score.toLocaleString('en')}</ScoreBig>
        ) : (
          <ScoreBigPlaceholder />
        )}
      </Group>
      <Subgroup>
        <SubgroupItem>
          <Group>
            <Header>Solo Cut Bonus</Header>
            {result ? (
              <ScoreSmall $color={Color.PRIMARY}>
                +{result.solo_bonus.toLocaleString('en')}
              </ScoreSmall>
            ) : (
              <ScoreSmallPlaceholder />
            )}
          </Group>
          <Group>
            <Header>Group Cut Bonus</Header>
            {result ? (
              <ScoreSmall $color={Color.PRIMARY}>
                +{result.group_bonus.toLocaleString('en')}
              </ScoreSmall>
            ) : (
              <ScoreSmallPlaceholder />
            )}
          </Group>
        </SubgroupItem>
        <SubgroupItem>
          <Group>
            <Header>Out of focus</Header>
            {result ? (
              <ScoreSmall $color={Color.RED}>
                -{result.miss_penalty.toLocaleString('en')}
              </ScoreSmall>
            ) : (
              <ScoreSmallPlaceholder />
            )}
          </Group>
          <Group>
            <Header>Cut too long</Header>
            {result ? (
              <ScoreSmall $color={Color.RED}>
                -{result.long_penalty.toLocaleString('en')}
              </ScoreSmall>
            ) : (
              <ScoreSmallPlaceholder />
            )}
          </Group>
          <Group>
            <Header>Cut too short</Header>
            {result ? (
              <ScoreSmall $color={Color.RED}>
                -{result.short_penalty.toLocaleString('en')}
              </ScoreSmall>
            ) : (
              <ScoreSmallPlaceholder />
            )}
          </Group>
        </SubgroupItem>
      </Subgroup>
      <Group>
        <Header>Exp</Header>
        {result ? (
          <ScoreSmall $color={Color.WHITE}>+{result.exp.toLocaleString('en')}</ScoreSmall>
        ) : (
          <ScoreSmallPlaceholder />
        )}
      </Group>
    </Layout>
  );
};

export default CamScore;
