import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import { Color, MobileQuery, PcQuery, Placeholder, Text } from '../../styles';
import Button from '../atoms/Button';
import SectionTitle from '../atoms/SectionTitle';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  align-items: flex-start;
`;

const PlaylistIcon = styled(LazyLoadImage)`
  display: inline-block;
  height: 32px;
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

interface Props {
  data?: IPlaylist;
}

const VodItem: React.FC<Props> = ({ data }) => {
  const [iconLoaded, setIconLoaded] = useState<boolean>(false);

  const playlistIcon = data!! && Spaceship.getThumbnail(data.id);
  const title = data && data.title;
  const description = data && data.description;

  return (
    <Layout>
      {!iconLoaded && <PlaylistIconPlaceholder />}
      <PlaylistIcon src={playlistIcon} effect={'opacity'} afterLoad={() => setIconLoaded(true)} />
      {title ? <SectionTitle fluid>{title}</SectionTitle> : <TitlePlaceholder />}
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
    </Layout>
  );
};

export default VodItem;
