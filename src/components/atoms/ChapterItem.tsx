import styled from 'styled-components';
import { Panorama } from '../../hooks/usePanorama';
import { getDuration } from '../../services/time';
import { Color, HideOverflow } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled(SmoothBox)`
  & > .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: ${Color.WHITE};
  ${HideOverflow};
`;

const Time = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 4px;

  font-weight: 700;
  font-size: 10px;
  color: ${Color.WHITE};
  background: ${Color.GRAY};
  border-radius: 4px;
`;

interface Props {
  chapter: IChapter;
  onClick: (time: number) => void;
}

const ChapterItem: React.FC<Props> = ({ chapter, onClick }) => {
  return (
    <Layout hover={1.01} tap={0.99} onClick={() => onClick(chapter.time)}>
      <Title>{chapter.title}</Title>
      <Time>{getDuration(chapter.time / 1000)}</Time>
    </Layout>
  );
};

export default ChapterItem;
