import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import Playtime from '../../services/playtime';
import Spaceship from '../../services/spaceship';
import { getHumanDuration } from '../../services/time';
import Transmitter from '../../services/transmitter';
import { Color, HideOverflow, MobileQuery, PcQuery } from '../../styles';
import Back from '../actions/Back';
import LineGraph from '../actions/stats/LineGraph';
import TimedVideoInfo from '../actions/stats/TimedVideoInfo';
import Meta from '../Meta';

const Page = styled(motion.main)`
  text-align: center;
`;

const Wrapper = styled.div`
  text-align: left;

  ${MobileQuery} {
    padding: 80px 0 96px 0;
  }

  ${PcQuery} {
    display: inline-block;
    padding: 96px 0 32px 0;
    min-width: 642px;
    margin: 0 auto;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 32px 24px 32px;
  transition: background 0.2s;

  ${PcQuery} {
    border-radius: 8px;
  }
`;

const GroupTitle = styled.span`
  margin: 0 0 8px 0;
  font-weight: normal;
  font-size: 14px;
  ${HideOverflow};
`;

const PlaytimeWrapper = styled.div`
  display: flex;
  column-gap: 14px;
  padding: 4px 0 0 0;
`;

const PlaytimeItem = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: ${Color.WHITE};

  &.dark {
    font-weight: 400;
    color: ${Color.GRAY};
  }
`;

const GraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 4px 0 0 0;
`;

const GraphInfo = styled.div`
  margin: 12px 0 0 0;
  text-align: center;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  color: ${Color.GRAY};
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 4px 0 0 0;
`;

const EmptyText = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: ${Color.WHITE};
  text-align: center;
`;

interface State {
  emotion: number[];
  videoRank: [IVideoInfo, number][];
}

class StatsPage extends Component<any, State> {
  state: State = {
    emotion: [0, 0, 0, 0],
    videoRank: [],
  };

  componentDidMount = () => {
    this.getEmotionData();
    this.getVideoRankData();
  };

  getEmotionData = async () => {
    const response = await Spaceship.getEmotion();
    if (!response.ok) return void Transmitter.emit('popup', response.message);

    this.setState({
      emotion: response.emotion.map(
        (item) => Math.round((item + Number.EPSILON) * 10000) / 100
      ),
    });
  };

  getVideoRankData = async () => {
    const rank = Playtime.rank(5);
    const ids = rank.map((item) => item[0]);

    if (ids.length === 0) return false;

    const rankMap = new Map();
    for (const item of rank) rankMap.set(item[0], item[1]);

    const response = await Spaceship.getVideoList(ids);
    if (!response.ok) return void Transmitter.emit('popup', response.message);

    const result: [IVideoInfo, number][] = [];

    for (const item of response.data) {
      result.push([item, rankMap.get(item.id)!]);
    }

    this.setState({ videoRank: result });
  };

  render() {
    let totalVideoRank: [IVideoInfo, number][] = [];

    if (process.env.REACT_APP_VIDEO_RANK) {
      try {
        const data = JSON.parse(process.env.REACT_APP_VIDEO_RANK);
        totalVideoRank = data;
      } catch (e) {}
    }

    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Meta
          data={{ title: '통계 - IZFLIX', url: `https://izflix.net/stats` }}
        />
        <Wrapper>
          <Back />
          {Playtime.count() > 0 ? (
            <>
              {' '}
              <Group>
                <GroupTitle>총 재생 시간</GroupTitle>
                <PlaytimeWrapper>
                  <PlaytimeItem>
                    {getHumanDuration(Playtime.total())}
                  </PlaytimeItem>
                  <PlaytimeItem className={'dark'}>
                    {Playtime.count()}개
                  </PlaytimeItem>
                </PlaytimeWrapper>
              </Group>
              <Group>
                <GroupTitle>시청 통계</GroupTitle>
                <GraphWrapper>
                  <LineGraph
                    title={'EXCITEMENT'}
                    value={this.state.emotion[0]}
                  />
                  <LineGraph
                    title={'AMUSEMENT'}
                    value={this.state.emotion[1]}
                  />
                  <LineGraph
                    title={'RELAXATION'}
                    value={this.state.emotion[2]}
                  />
                  <LineGraph title={'SADNESS'} value={this.state.emotion[3]} />
                </GraphWrapper>
                <GraphInfo>
                  예능 방송 (아이즈원 츄, 히든스쿨 등)은
                  <br />
                  시청 통계에 반영되지 않습니다
                </GraphInfo>
              </Group>
              <Group>
                <GroupTitle>많이 본 영상</GroupTitle>
                <VideoWrapper>
                  {this.state.videoRank.map((data) => (
                    <TimedVideoInfo
                      id={data[0].id}
                      title={data[0].title}
                      description={data[0].description}
                      playtime={data[1]}
                      key={data[0].id}
                    />
                  ))}
                </VideoWrapper>
              </Group>
              <Group>
                <GroupTitle>많이 본 영상 (이용자 전체)</GroupTitle>
                <VideoWrapper>
                  {totalVideoRank.map((data) => (
                    <TimedVideoInfo
                      id={data[0].id}
                      title={data[0].title}
                      description={data[0].description}
                      playtime={data[1]}
                      key={data[0].id}
                    />
                  ))}
                </VideoWrapper>
              </Group>
            </>
          ) : (
            <>
              <Group>
                <EmptyText>영상 재생 기록이 없어요</EmptyText>
              </Group>
            </>
          )}
        </Wrapper>
      </Page>
    );
  }
}

export default StatsPage;
