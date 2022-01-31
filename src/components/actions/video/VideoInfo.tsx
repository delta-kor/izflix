import { motion } from 'framer-motion';
import { Component } from 'react';
import { NavigateFunction } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BackIcon } from '../../../icons/back.svg';
import ModalController from '../../../services/modal-controller';
import Settings from '../../../services/settings';
import { Color, HideOverflow, MobileQuery, PcQuery } from '../../../styles';
import withNavigate from '../../tools/Navigate';

const Layout = styled.div`
  display: flex;
  width: 100%;

  ${MobileQuery} {
    padding: 0 32px;
  }

  ${PcQuery} {
    margin: 24px 0 0 0;
  }
`;

const Content = styled.div`
  display: flex;
  width: calc(100% - 64px - 16px - 16px);
  flex-direction: column;
  justify-content: space-between;

  ${MobileQuery} {
    height: 48px;
    margin: 24px 0;
    padding: 0 0 0 16px;
  }

  ${PcQuery} {
    height: 68px;
    padding: 0 0 0 24px;
  }
`;

const Title = styled.h1`
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

const Description = styled.p`
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
    margin: 0 0 0 auto;
    padding: 6px 10px;
    font-size: 12px;
  }

  ${PcQuery} {
    margin: 0 0 0 8px;
    padding: 12px 16px;
    font-size: 16px;
  }
`;

const BackButton = styled.div`
  position: relative;
  align-self: center;
  border-radius: 100%;
  background: ${Color.PRIMARY};
  cursor: pointer;
  user-select: none;

  ${MobileQuery} {
    width: 32px;
    height: 32px;
  }

  ${PcQuery} {
    width: 38px;
    height: 38px;
  }

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    ${MobileQuery} {
      width: 20px;
      height: 20px;
    }

    ${PcQuery} {
      width: 24px;
      height: 24px;
    }
  }
`;

interface Props {
  navigate: NavigateFunction;
  data: ApiResponse.Video.Info | null;
  streamInfo: ApiResponse.Video.Stream | null;
  setQuality(quality: number): void;
}

class VideoInfo extends Component<Props> {
  onQualityClicked = async () => {
    const streamInfo = this.props.streamInfo;
    if (!streamInfo) return false;

    const content: SelectModalContent[] = [];
    for (const quality of streamInfo.qualities) {
      content.push({ id: quality, text: `${quality}p` });
    }

    const result = await ModalController.fire<number>({
      type: 'select',
      title: '화질 선택',
      content,
      default: streamInfo.quality,
    });

    Settings.setOne('DEFAULT_VIDEO_QUALITY', result);
    this.props.setQuality(result);
  };

  onBack = () => {
    this.props.navigate(-1);
  };

  render() {
    const data = this.props.data;
    const streamInfo = this.props.streamInfo;

    const backButton = (
      <BackButton onClick={this.onBack}>
        <BackIcon />
      </BackButton>
    );

    if (!data)
      return (
        <Layout>
          {backButton}
          <Content>
            <TitlePlaceholder />
            <DescriptionPlaceholder />
          </Content>
        </Layout>
      );

    return (
      <Layout>
        {backButton}
        <Content>
          <Title>{data.title}</Title>
          <Description>{data.description}</Description>
        </Content>
        {streamInfo && (
          <QualityButton
            onClick={this.onQualityClicked}
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

export default withNavigate(VideoInfo);
