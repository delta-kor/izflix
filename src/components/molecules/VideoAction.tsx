import { useTranslation } from 'react-i18next';
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

  min-width: 76px;
  margin: 0 -7px;
`;

interface Props {
  action?: ApiResponse.Video.Action;
  downloadUrl?: string;
  onLike(): void;
}

const VideoAction: React.FC<Props> = ({ action, downloadUrl, onLike }) => {
  const { t } = useTranslation();

  const liked = action?.liked;
  const likesTotal = action?.likes_total;

  const handleDownloadClick = () => {
    if (!downloadUrl) return;
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Layout>
      <WidthProtector>
        <VerticalButton
          icon={liked ? 'heart_filled' : 'heart_border'}
          color={Color.TRANSPARENT}
          onClick={onLike}
        >
          {likesTotal || t('video.like')}
        </VerticalButton>
      </WidthProtector>
      <VerticalButton icon={'share'} color={Color.TRANSPARENT}>
        {t('video.share')}
      </VerticalButton>
      <VerticalButton icon={'download'} color={Color.TRANSPARENT} onClick={handleDownloadClick}>
        {t('video.save')}
      </VerticalButton>
      <VerticalButton icon={'add'} color={Color.TRANSPARENT}>
        {t('video.add')}
      </VerticalButton>
    </Layout>
  );
};

export default VideoAction;
