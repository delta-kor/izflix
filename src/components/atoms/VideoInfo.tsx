import styled from 'styled-components';
import { Color, HideOverflow, MobileQuery, PcQuery, Placeholder, Text } from '../../styles';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  ${MobileQuery} {
    gap: 8px;
    padding: 16px 32px;
  }

  ${PcQuery} {
    gap: 10px;
    padding: 24px 32px;
  }
`;

const Title = styled.div`
  flex-grow: 1;
  color: ${Color.WHITE};
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.HEADLINE_2};
  }

  ${PcQuery} {
    ${Text.HEADLINE_1};
  }
`;

const Description = styled.div`
  flex-grow: 1;
  color: ${Color.WHITE};
  opacity: 0.7;
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_2};
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
  }
`;

const TitlePlaceholder = styled.div`
  ${MobileQuery} {
    width: 60%;
    ${Placeholder.HEADLINE_2};
  }

  ${PcQuery} {
    width: 420px;
    ${Placeholder.HEADLINE_1};
  }
`;

const DescriptionPlaceholder = styled.div`
  ${MobileQuery} {
    width: 30%;
    ${Placeholder.SUBTITLE_2};
  }

  ${PcQuery} {
    width: 320px;
    ${Placeholder.SUBTITLE_1};
  }
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
