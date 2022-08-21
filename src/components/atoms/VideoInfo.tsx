import styled from 'styled-components';
import { Color, HideOverflow, Placeholder, Text } from '../../styles';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  min-width: 0;
  padding: 16px 32px;
`;

const Title = styled.div`
  flex-grow: 1;

  color: ${Color.WHITE};
  ${Text.HEADLINE_2};
  ${HideOverflow};
`;

const Description = styled.div`
  flex-grow: 1;

  color: ${Color.WHITE};
  opacity: 0.7;
  ${Text.SUBTITLE_2};
  ${HideOverflow};
`;

const TitlePlaceholder = styled.div`
  width: 60%;
  ${Placeholder.HEADLINE_2};
`;

const DescriptionPlaceholder = styled.div`
  width: 30%;
  ${Placeholder.SUBTITLE_2};
`;

interface Props {
  videoInfo?: ApiResponse.Video.Info;
}

const VideoInfo: React.FC<Props> = ({ videoInfo }) => {
  const title = videoInfo?.title;
  const description = videoInfo?.description;

  return (
    <Layout>
      {title ? <Title>{title}</Title> : <TitlePlaceholder />}
      {description ? <Description>{description}</Description> : <DescriptionPlaceholder />}
    </Layout>
  );
};

export default VideoInfo;
