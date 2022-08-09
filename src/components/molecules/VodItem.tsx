import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import {
  Color,
  HideOverflow,
  MobileQuery,
  PcInnerPadding,
  PcQuery,
  Placeholder,
  Text,
} from '../../styles';
import Button from '../atoms/Button';
import VideoPanel from '../atoms/VideoPanel';
import { Pc } from '../tools/MediaQuery';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  display: flex;
  gap: 48px;

  ${MobileQuery} {
    padding: 0 32px;
  }

  ${PcQuery} {
    padding: 0 ${PcInnerPadding};
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${MobileQuery} {
    flex-grow: 1;
  }

  ${PcQuery} {
    width: 480px;
    flex-shrink: 0;
  }
`;

const PlaylistIcon = styled(LazyLoadImage)`
  display: inline-block;
  height: 32px;
`;

const Title = styled.div`
  width: 100%;
  margin: 8px 0;
  color: ${Color.WHITE};
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.HEADLINE_3};
  }

  ${PcQuery} {
    ${Text.HEADLINE_1};
  }
`;

const Description = styled.div`
  flex-grow: 1;

  ${Text.BODY_3};
  color: ${Color.WHITE};
  opacity: 0.7;

  height: unset;
  line-height: 16px;
`;

const PlaylistIconPlaceholder = styled.div`
  position: absolute;
  width: 80px;
  height: 32px;

  background: ${Color.DARK_GRAY};
  border-radius: 4px;
`;

const TitlePlaceholder = styled.div`
  margin: 8px 0;

  ${MobileQuery} {
    width: 70%;
    ${Placeholder.HEADLINE_3};
  }

  ${PcQuery} {
    width: 30%;
    ${Placeholder.HEADLINE_1};
  }
`;

const DescriptionPlaceholder = styled.div`
  display: inline;
  width: 100%;

  ${MobileQuery} {
    ${Placeholder.BODY_3};
    height: 12px;
    margin: 2px 0;
  }

  ${PcQuery} {
    ${Placeholder.BODY_1};
  }
`;

const Action = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  margin: 8px 0 0 0;
`;

const VideoList = styled.div`
  display: grid;
  gap: 48px 16px;
  grid-template-columns: repeat(auto-fill, minmax(max(112px, (100% - 4 * 16px) / 4), 1fr));

  margin: -16px;
  padding: 16px;
  width: calc(100% + 32px);
  height: calc(240px + 32px);

  overflow: hidden;
`;

interface Props {
  data?: IPlaylist;
}

const VodItem: React.FC<Props> = ({ data }) => {
  const [iconLoaded, setIconLoaded] = useState<boolean>(false);

  const playlistIcon = data!! && Spaceship.getThumbnail(data.id);
  const title = data && data.title;
  const description = data && data.description;
  const video = data && data.video;

  return (
    <Layout>
      <Content>
        {!iconLoaded && <PlaylistIconPlaceholder />}
        <PlaylistIcon src={playlistIcon} effect={'opacity'} afterLoad={() => setIconLoaded(true)} />
        {title ? <Title>{title}</Title> : <TitlePlaceholder />}
        {description ? (
          <Description>{description}</Description>
        ) : (
          <Repeat count={3} element={i => <DescriptionPlaceholder key={i} />} />
        )}
        <Action>
          <Button color={Color.DARK_GRAY} icon={'play'} fluid>
            첫화재생
          </Button>
          <Button color={Color.TRANSPARENT} icon={'playlist'} fluid>
            재생목록
          </Button>
        </Action>
      </Content>
      <Pc>
        <VideoList>
          {video ? (
            video.map(item => (
              <VideoPanel
                type={'vertical'}
                data={item}
                link={`/${item.id}?k=playlist&v=${data!.id}`}
                key={data.id}
              />
            ))
          ) : (
            <Repeat count={6} element={i => <VideoPanel type={'vertical'} key={i} />} />
          )}
        </VideoList>
      </Pc>
    </Layout>
  );
};

export default VodItem;
