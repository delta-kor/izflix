import styled from 'styled-components';
import CamScore from '../atoms/CamScore';
import { Color } from '../../styles';
import Button from '../atoms/Button';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Menu = styled.div`
  display: flex;
  gap: 8px;
`;

interface Props {
  game: ICampdGame;
  result?: ICampdResult;
}

const CamResultSection: React.FC<Props> = ({ game, result }) => {
  return (
    <Layout>
      <CamScore result={result} />
      <Menu>
        <Button color={Color.GRAY} icon={'close'} scale={0.95} link={'/campd'}>
          Exit
        </Button>
        <Button
          color={Color.TRANSPARENT}
          icon={'play'}
          scale={0.95}
          link={'/campd/play'}
          state={{ game }}
        >
          Restart
        </Button>
      </Menu>
    </Layout>
  );
};

export default CamResultSection;
