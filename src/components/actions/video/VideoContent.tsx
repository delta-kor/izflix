import { Component } from 'react';
import styled from 'styled-components';
import DateIcon from '../../../icons/date.svg';
import { getDate } from '../../../services/time';
import { Color, MobileQuery, PcQuery } from '../../../styles';
import CategoryBreadcrumb from '../category/CategoryBreadcrumb';
import Video from './Video';
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

const Icon = styled.img`
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

const Date = styled.div`
  font-weight: normal;

  ${MobileQuery} {
    font-size: 12px;
  }

  ${PcQuery} {
    font-size: 16px;
  }
`;

interface Props {
  streamInfo: ApiResponse.Video.Stream | null;
  videoInfo: ApiResponse.Video.Info | null;
}

class VideoContent extends Component<Props> {
  render() {
    return (
      <Layout>
        <Video url={this.props.streamInfo?.url || null} />
        <VideoInfo data={this.props.videoInfo} />
        {this.props.videoInfo ? (
          <MetaWrapper>
            <DateWrapper>
              <Icon src={DateIcon} />
              <Date>{getDate(this.props.videoInfo.date)}</Date>
            </DateWrapper>
            <CategoryBreadcrumb
              path={this.props.videoInfo.path}
              compact={true}
            />
          </MetaWrapper>
        ) : (
          <MetaWrapper />
        )}
      </Layout>
    );
  }
}

export default VideoContent;
