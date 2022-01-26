import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DownloadIcon from '../../../icons/download.svg';
import PipIcon from '../../../icons/pip.svg';
import ShareIcon from '../../../icons/share.svg';
import InfoIcon from '../../../icons/video-info.svg';
import ModalController from '../../../services/modal-controller';
import Transmitter from '../../../services/transmitter';
import { MobileQuery, PcQuery } from '../../../styles';

const Layout = styled.div`
  display: flex;
  width: 100%;
  max-width: 640px;
  padding: 0 32px;
  justify-content: space-around;

  ${MobileQuery} {
    margin: 4px auto;
  }

  ${PcQuery} {
    margin: 8px auto;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  user-select: none;
`;

const Icon = styled.img`
  ${MobileQuery} {
    width: 18px;
    height: 18px;
    margin: 0 0 8px 0;
  }

  ${PcQuery} {
    width: 24px;
    height: 24px;
    margin: 0 0 12px 0;
  }
`;

const Content = styled.div`
  font-weight: normal;

  ${MobileQuery} {
    font-size: 12px;
  }

  ${PcQuery} {
    font-size: 16px;
  }
`;

interface Props {
  id: string;
  streamInfo: ApiResponse.Video.Stream | null;
  videoInfo: ApiResponse.Video.Info | null;
}

class VideoAction extends Component<Props> {
  onPipClick = () => {
    Transmitter.emit('pip');
  };

  onShareClick = () => {
    ModalController.fire({ type: 'share', id: this.props.id });
  };

  render() {
    const download = this.props.streamInfo?.url || '';

    return (
      <Layout>
        <Item onClick={this.onShareClick}>
          <Icon src={ShareIcon} />
          <Content>공유</Content>
        </Item>
        <a target="_blank" href={download}>
          <Item>
            <Icon src={DownloadIcon} />
            <Content>다운로드</Content>
          </Item>
        </a>
        <Item onClick={this.onPipClick}>
          <Icon src={PipIcon} />
          <Content>PIP</Content>
        </Item>
        <Link to="/info?k=highlight">
          <Item>
            <Icon src={InfoIcon} />
            <Content>영상정보</Content>
          </Item>
        </Link>
      </Layout>
    );
  }
}

export default VideoAction;
