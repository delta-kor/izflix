import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import { Color, MobileQuery, PcQuery, Placeholder, Text } from '../../styles';
import Button from '../atoms/Button';
import SmoothImage from '../atoms/SmoothImage';
import { Pc } from '../tools/MediaQuery';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 0 4px 0;

  ${PcQuery} {
    position: fixed;
    width: 326px;
  }
`;

const Thumbnail = styled(SmoothImage)`
  width: 100%;
  margin: 0 0 8px 0;
  aspect-ratio: 16 / 9;

  border-radius: 8px;
`;

const Title = styled.div`
  color: ${Color.WHITE};

  ${MobileQuery} {
    ${Text.HEADLINE_3};
    height: unset;
  }

  ${PcQuery} {
    ${Text.HEADLINE_1};
    height: unset;
  }
`;

const Description = styled.div`
  margin: 0 0 8px 0;

  color: ${Color.WHITE};
  opacity: 0.7;

  ${MobileQuery} {
    ${Text.BODY_3};
    line-height: 16px;
    height: unset;
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
    height: unset;
  }
`;

const TitlePlaceholder = styled.div`
  width: 70%;

  ${MobileQuery} {
    ${Placeholder.HEADLINE_3};
  }

  ${PcQuery} {
    ${Placeholder.HEADLINE_1};
  }
`;

const DescriptionPlaceholder = styled.div`
  width: 100%;
  margin: 0 0 8px 0;

  & > div {
    width: 100%;

    ${MobileQuery} {
      ${Placeholder.BODY_3};
      height: 10px;
      margin: 3px 0;
    }

    ${PcQuery} {
      ${Placeholder.SUBTITLE_1};
      height: 14px;
      margin: 3px 0;
    }
  }
`;

interface Props {
  data?: IPlaylist;
}

const PlaylistInfo: React.FC<Props> = ({ data }) => {
  const thumbnail = data && Spaceship.getThumbnail(data.thumbnail);
  const title = data && data.title;
  const description = data && data.description;
  const link = data && `/${data.video[0].id}`;
  const linkState = data && { key: 'playlist', value: data && data.id };

  return (
    <Layout>
      <Pc>
        <Thumbnail src={thumbnail} />
      </Pc>
      {title ? <Title>{title}</Title> : <TitlePlaceholder />}
      {description ? (
        <Description>{description}</Description>
      ) : (
        <DescriptionPlaceholder>
          <div />
        </DescriptionPlaceholder>
      )}
      <Button color={Color.PRIMARY} icon={'play'} fluid scale={0.95} link={link} state={linkState}>
        재생하기
      </Button>
    </Layout>
  );
};

export default PlaylistInfo;
