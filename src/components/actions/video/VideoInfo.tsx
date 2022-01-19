import { Component } from 'react';
import styled from 'styled-components';
import { Color, HideOverflow, MobileQuery, PcQuery } from '../../../styles';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 24px 0;

  ${MobileQuery} {
    height: 48px;
    padding: 0 32px;
  }

  ${PcQuery} {
    height: 68px;
  }
`;

const Title = styled.div`
  max-width: 100%;
  font-weight: 800;
  ${HideOverflow};

  ${MobileQuery} {
    height: 24px;
    font-size: 20px;
  }

  ${PcQuery} {
    height: 36px;
    font-size: 32px;
  }
`;

const Description = styled.div`
  max-width: 100%;
  opacity: 0.7;
  ${HideOverflow};

  ${MobileQuery} {
    height: 16px;
    font-size: 14px;
    font-weight: bold;
  }

  ${PcQuery} {
    height: 22px;
    font-size: 18px;
    font-weight: normal;
  }
`;

const TitlePlaceholder = styled.div`
  width: 80%;
  max-width: 480px;
  border-radius: 4px;
  background: ${Color.DARK_GRAY};

  ${MobileQuery} {
    height: 24px;
  }

  ${PcQuery} {
    height: 36px;
  }
`;

const DescriptionPlaceholder = styled.div`
  width: 50%;
  max-width: 360px;
  border-radius: 4px;
  background: ${Color.DARK_GRAY};

  ${MobileQuery} {
    height: 16px;
  }

  ${PcQuery} {
    height: 22px;
  }
`;

interface Props {
  data: ApiResponse.Video.Info | null;
}

class VideoInfo extends Component<Props> {
  render() {
    const data = this.props.data;

    if (!data)
      return (
        <Layout>
          <TitlePlaceholder />
          <DescriptionPlaceholder />
        </Layout>
      );

    return (
      <Layout>
        <Title>{data.title}</Title>
        <Description>{data.description}</Description>
      </Layout>
    );
  }
}

export default VideoInfo;
