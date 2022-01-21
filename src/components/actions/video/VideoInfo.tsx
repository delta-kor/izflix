import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import { Color, HideOverflow, MobileQuery, PcQuery } from '../../../styles';

const Layout = styled.div`
  display: flex;
  width: 100%;

  ${MobileQuery} {
    padding: 0 32px;
  }
`;

const Content = styled.div`
  display: flex;
  width: calc(100% - 64px);
  flex-direction: column;
  justify-content: space-between;

  ${MobileQuery} {
    height: 48px;
    margin: 24px 0;
  }

  ${PcQuery} {
    height: 68px;
    margin: 24px 0 0 0;
  }
`;

const Title = styled.div`
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

const QualityButton = styled(motion.div)`
  align-self: center;
  font-weight: bold;
  border-radius: 4px;
  background: ${Color.GRAY};
  cursor: pointer;
  user-select: none;

  ${MobileQuery} {
    margin: 0 0 0 8px;
    padding: 6px 10px;
    font-size: 12px;
  }

  ${PcQuery} {
    margin: 0 0 0 8px;
    padding: 12px 16px;
    font-size: 16px;
  }
`;

interface Props {
  data: ApiResponse.Video.Info | null;
  streamInfo: ApiResponse.Video.Stream | null;
}

class VideoInfo extends Component<Props> {
  render() {
    const data = this.props.data;
    const streamInfo = this.props.streamInfo;

    if (!data)
      return (
        <Layout>
          <Content>
            <TitlePlaceholder />
            <DescriptionPlaceholder />
          </Content>
        </Layout>
      );

    return (
      <Layout>
        <Content>
          <Title>{data.title}</Title>
          <Description>{data.description}</Description>
        </Content>
        {streamInfo && (
          <QualityButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {streamInfo.quality}p
          </QualityButton>
        )}
      </Layout>
    );
  }
}

export default VideoInfo;
