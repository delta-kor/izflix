import styled from 'styled-components';
import Icon from '../../icons/Icon';
import { Color, HideOverflow, MobileQuery, PcQuery, Text } from '../../styles';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 -16px;

  background: ${Color.DARK_GRAY};
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  padding: 16px 16px 12px 16px;
  min-width: 0;

  cursor: pointer;
  user-select: none;
`;

const Title = styled.div`
  flex-grow: 1;
  color: ${Color.WHITE};
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_1};
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
  }
`;

const FoldIcon = styled(Icon)`
  width: 20px;
  height: 20px;
`;

interface Props {
  videos: IVideo[];
}

const NextVideoList: React.FC<Props> = ({ videos }) => {
  return (
    <Layout>
      <Header>
        <Title>다음 동영상</Title>
        <FoldIcon type={'down'} color={Color.WHITE} />
      </Header>
    </Layout>
  );
};

export default NextVideoList;
