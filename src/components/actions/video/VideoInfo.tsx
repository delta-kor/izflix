import { motion } from 'framer-motion';
import { Component } from 'react';
import { NavigateFunction } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BackIcon } from '../../../icons/back.svg';
import ModalController from '../../../services/modal-controller';
import Settings from '../../../services/settings';
import Tracker from '../../../services/tracker';
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
  position: relative;
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

const UHDIncidator = styled.div`
  position: absolute;
  padding: 2px 4px;
  font-weight: bold;
  border-radius: 4px;
  background: ${Color.PRIMARY};
  transform: translate(50%, -50%);

  ${PcQuery} {
    top: 4px;
    right: 4px;
    font-size: 12px;
  }

  ${MobileQuery} {
    top: 0;
    right: 4px;
    font-size: 8px;
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
  id: string;
  data: ApiResponse.Video.Info | null;
  streamInfo: ApiResponse.Video.Stream | null;
  setQuality(quality: number): void;
  navigate: NavigateFunction;
}

class VideoInfo extends Component<Props> {
  onQualityClicked = async () => {
    const streamInfo = this.props.streamInfo;
    if (!streamInfo) return false;
    const from = streamInfo.quality;

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

    Settings.setOne('DEFAULT_VIDEO_QUALITY', Math.min(result, 1080));
    this.props.setQuality(result);

    if (result >= 1440) {
      if (!Settings.getOne('$_4K_ALERT')) {
        ModalController.fire({
          type: 'info',
          title:
            '브라우저 환경에 따라 초고화질 영상 재생이 지원되지 않을 수 있어요',
          description: '영상 재생 오류 시 화질을 조정하고 새로고침 하세요',
        });
        Settings.setOne('$_4K_ALERT', true);
      }
    }

    const to = result;
    Tracker.send('video_quality_change', {
      video_id: this.props.id,
      quality_from: from,
      quality_to: to,
    });
  };

  onBack = () => {
    this.props.navigate(-1);
    Tracker.send('video_back', {
      video_id: this.props.id,
    });
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
            {streamInfo.quality < 2160 &&
              Math.max.apply(Math, streamInfo.qualities) >= 2160 && (
                <UHDIncidator>4K 지원</UHDIncidator>
              )}
            {streamInfo.quality}p
          </QualityButton>
        )}
      </Layout>
    );
  }
}

export default withNavigate(VideoInfo);
