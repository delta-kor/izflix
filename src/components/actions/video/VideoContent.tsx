import { Component } from 'react';
import styled from 'styled-components';
import { ReactComponent as DateIcon } from '../../../icons/date.svg';
import { getDate } from '../../../services/time';
import { Color, MobileQuery, PcQuery } from '../../../styles';
import CategoryBreadcrumb from '../category/CategoryBreadcrumb';
import Video from './Video';
import VideoAction from './VideoAction';
import VideoInfo from './VideoInfo';

const Layout = styled.div`
  border-bottom: 1px solid ${Color.GRAY};

  ${MobileQuery} {
    padding: 0 0 12px 0;
  }
`;

const MetaWrapper = styled.div`
  ${MobileQuery} {
    height: 50px;
    opacity: 0.7;
  }

  ${PcQuery} {
    display: flex;
    height: 64px;
  }
`;

const MetaPlaceholder = styled.div`
  ${MobileQuery} {
    height: 50px;
    padding: 0 32px;
  }

  ${PcQuery} {
    display: flex;
    height: 64px;
    align-items: center;
    justify-content: space-between;
  }

  & > *:nth-child(1) {
    border-radius: 4px;
    background: ${Color.DARK_GRAY};

    ${MobileQuery} {
      height: 16px;
      width: 120px;
    }

    ${PcQuery} {
      width: 180px;
      height: 20px;
      order: 2;
    }
  }

  & > *:nth-child(2) {
    border-radius: 4px;
    background: ${Color.DARK_GRAY};

    ${MobileQuery} {
      height: 16px;
      width: 80%;
      margin: 10px 0 0 0;
    }

    ${PcQuery} {
      width: 50%;
      height: 20px;
    }
  }
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;

  ${MobileQuery} {
    padding: 0 32px;
    margin: 0 0 4px 0;
  }

  ${PcQuery} {
    width: 100%;
    order: 2;
    justify-content: right;
  }
`;

const Icon = styled(DateIcon)`
  ${MobileQuery} {
    width: 14px;
    height: 14px;
    margin: 0 8px 0 0;
  }

  ${PcQuery} {
    width: 18px;
    height: 18px;
    margin: 0 12px 0 0;
  }
`;

const Date = styled.time`
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
  setQuality(quality: number): void;
  nextVideo: IVideoItem | null;
}

class VideoContent extends Component<Props> {
  render() {
    return (
      <Layout>
        <Video
          id={this.props.id}
          url={this.props.streamInfo?.url || null}
          nextVideo={this.props.nextVideo}
        />
        <VideoInfo
          id={this.props.id}
          data={this.props.videoInfo}
          streamInfo={this.props.streamInfo}
          setQuality={this.props.setQuality}
        />
        {this.props.videoInfo ? (
          <MetaWrapper>
            <DateWrapper>
              <Icon />
              <Date>{getDate(this.props.videoInfo.date)}</Date>
            </DateWrapper>
            <CategoryBreadcrumb
              path={this.props.videoInfo.path}
              compact={true}
            />
          </MetaWrapper>
        ) : (
          <MetaPlaceholder>
            <div />
            <div />
          </MetaPlaceholder>
        )}
        <VideoAction
          id={this.props.id}
          streamInfo={this.props.streamInfo}
          videoInfo={this.props.videoInfo}
        />
      </Layout>
    );
  }
}

export default VideoContent;
