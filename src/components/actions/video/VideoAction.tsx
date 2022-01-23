import { Component } from 'react';
import styled from 'styled-components';
import DownloadIcon from '../../../icons/download.svg';
import ShareIcon from '../../../icons/share.svg';
import SubtitleIcon from '../../../icons/subtitle.svg';
import InfoIcon from '../../../icons/video-info.svg';
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

class VideoAction extends Component {
  onSubtitleClick = () => {
    Transmitter.emit('popup', '제공되는 자막이 없어요');
  };

  render() {
    return (
      <Layout>
        <Item>
          <Icon src={ShareIcon} />
          <Content>공유</Content>
        </Item>
        <Item>
          <Icon src={DownloadIcon} />
          <Content>다운로드</Content>
        </Item>
        <Item onClick={this.onSubtitleClick}>
          <Icon src={SubtitleIcon} />
          <Content>자막</Content>
        </Item>
        <Item>
          <Icon src={InfoIcon} />
          <Content>영상정보</Content>
        </Item>
      </Layout>
    );
  }
}

export default VideoAction;
