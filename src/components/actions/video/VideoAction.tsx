import { Component, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as DownloadIcon } from '../../../icons/download.svg';
import { ReactComponent as PipIcon } from '../../../icons/pip.svg';
import { ReactComponent as ShareIcon } from '../../../icons/share.svg';
import { ReactComponent as InfoIcon } from '../../../icons/video-info.svg';
import ModalController from '../../../services/modal-controller';
import Tracker from '../../../services/tracker';
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

const IconBase = (component: FunctionComponent) => styled(component)`
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

const DownloadIconItem = IconBase(DownloadIcon);
const PipIconItem = IconBase(PipIcon);
const ShareIconItem = IconBase(ShareIcon);
const InfoIconItem = IconBase(InfoIcon);

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
    Tracker.send('video_pip', { video_id: this.props.id });
  };

  onShareClick = () => {
    ModalController.fire({ type: 'share', id: this.props.id });
    Tracker.send('video_share', { video_id: this.props.id });
  };

  render() {
    const download = this.props.streamInfo?.url || '';

    return (
      <Layout>
        <Item onClick={this.onShareClick}>
          <ShareIconItem />
          <Content>공유</Content>
        </Item>
        <a
          target="_blank"
          href={download}
          onClick={() =>
            Tracker.send('video_download', {
              video_id: this.props.id,
            })
          }
        >
          <Item>
            <DownloadIconItem />
            <Content>다운로드</Content>
          </Item>
        </a>
        <Item onClick={this.onPipClick}>
          <PipIconItem />
          <Content>PIP</Content>
        </Item>
        <Link
          to="/info?k=highlight"
          onClick={() =>
            Tracker.send('video_info', {
              video_id: this.props.id,
            })
          }
        >
          <Item>
            <InfoIconItem />
            <Content>영상정보</Content>
          </Item>
        </Link>
      </Layout>
    );
  }
}

export default VideoAction;
