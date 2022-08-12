import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import { Color, MobileQuery, PcQuery, Placeholder, Text } from '../../styles';
import SmoothBox from './SmoothBox';
import SmoothImage from './SmoothImage';

const Layout = styled(SmoothBox)`
  & > .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    background: ${Color.DARK_GRAY};
    border-radius: 8px;

    ${MobileQuery} {
      gap: 12px;
      padding: 16px 0;
    }

    ${PcQuery} {
      gap: 16px;
      padding: 20px 0 16px 0;
    }
  }
`;

const Thumbnail = styled(SmoothImage)`
  width: 80%;
  max-width: 160px;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
`;

const Title = styled.div`
  text-align: center;
  color: ${Color.WHITE};

  ${MobileQuery} {
    ${Text.SUBTITLE_1};
    line-height: unset;
    height: unset;
  }

  ${PcQuery} {
    ${Text.EX_SUBTITLE_1};
    height: unset;
  }
`;

const TitlePlaceholder = styled.div`
  width: 100%;

  ${MobileQuery} {
    ${Placeholder.SUBTITLE_1};
  }

  ${PcQuery} {
    ${Placeholder.EX_SUBTITLE_1};
  }
`;

interface Props {
  data?: IAlbum;
}

const AlbumItem: React.FC<Props> = ({ data }) => {
  const id = data && data.id;
  const title = data && data.title;
  const thumbnail = data && Spaceship.getThumbnail(data.id);

  return (
    <Layout hover={1.1} tap={0.9}>
      <Thumbnail src={thumbnail} />
      {title ? <Title>{title}</Title> : <TitlePlaceholder />}
    </Layout>
  );
};

export default AlbumItem;
