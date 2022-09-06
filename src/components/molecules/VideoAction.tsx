import styled from 'styled-components';
import { Color, MobileQuery, PcQuery } from '../../styles';
import VerticalButton from '../atoms/VerticalButton';

const Layout = styled.div`
  display: flex;
  justify-content: space-evenly;

  ${MobileQuery} {
    margin: 16px 16px 0 16px;
    background: ${Color.DARK_GRAY};
    border-radius: 8px;
  }

  ${PcQuery} {
    margin: 24px 0;
    padding: 8px 0;
  }
`;

const WidthProtector = styled.div`
  display: flex;
  justify-content: center;

  ${MobileQuery} {
    min-width: 72px;
  }

  ${PcQuery} {
    min-width: 76px;
  }
`;

interface Props {
  action?: ApiResponse.Video.Action;
  onLike(): void;
}

const VideoAction: React.FC<Props> = ({ action, onLike }) => {
  const liked = action?.liked;
  const likesTotal = action?.likes_total;

  return (
    <Layout>
      <WidthProtector>
        <VerticalButton
          icon={liked ? 'heart_filled' : 'heart_border'}
          color={Color.TRANSPARENT}
          onClick={onLike}
        >
          {likesTotal || '좋아요'}
        </VerticalButton>
      </WidthProtector>
      <VerticalButton icon={'share'} color={Color.TRANSPARENT}>
        공유
      </VerticalButton>
      <VerticalButton icon={'download'} color={Color.TRANSPARENT}>
        다운로드
      </VerticalButton>
      <VerticalButton icon={'add'} color={Color.TRANSPARENT}>
        추가
      </VerticalButton>
    </Layout>
  );
};

export default VideoAction;
