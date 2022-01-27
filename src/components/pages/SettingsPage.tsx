import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import ModalController from '../../services/modal-controller';
import Scroll from '../../services/scroll';
import Settings from '../../services/settings';
import { Color, HideOverflow, MobileQuery, PcQuery } from '../../styles';

const Page = styled(motion.div)`
  text-align: center;
`;

const Wrapper = styled.div`
  text-align: left;

  ${MobileQuery} {
    padding: 80px 0 96px 0;
  }

  ${PcQuery} {
    display: inline-block;
    padding: 96px 0 0 0;
    margin: 0 auto;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
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

const Item = styled.div`
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;

  & > * {
    margin: 0 8px 0 0;

    :last-child {
      margin: 0;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin: 0 0 6px 0;

    :last-child {
      margin: 0;
    }
  }
`;

const ItemTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const ItemDescription = styled.div`
  font-weight: normal;
  font-size: 14px;
  opacity: 0.7;
`;

const ToggleAction = styled.div<{ $active: boolean }>`
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  background: ${({ $active }) => ($active ? Color.PRIMARY : Color.BACKGROUND)};
  border: 2px solid ${({ $active }) => ($active ? Color.WHITE : Color.GRAY)};
  transition: background 0.2s, border 0.2s;
  border-radius: 100%;
  box-sizing: content-box;
`;

const ValueAction = styled.div`
  position: relative;
  flex-shrink: 0;
  font-weight: normal;
  font-size: 14px;

  ::after {
    position: absolute;
    display: block;
    content: '';
    bottom: -2px;
    left: 0;
    right: 0;
    height: 1px;
    background: ${Color.WHITE};
  }
`;

interface State {
  settings: ISettings;
}

class SettingsPage extends Component<any, State> {
  state: State = { settings: Settings.getAll() };

  componentDidMount = () => {
    Scroll.up();
  };

  componentDidUpdate = (_: any, prevState: State) => {
    if (this.state.settings !== prevState.settings) {
      Settings.setAll(this.state.settings);
    }
  };

  toggleValue = (key: keyof ISettings) => () => {
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        [key]: !prevState.settings[key],
      },
    }));
  };

  setValue = (key: keyof ISettings, value: any) => {
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        [key]: value,
      },
    }));
  };

  render() {
    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Wrapper>
          <Group>
            <GroupTitle>재생</GroupTitle>
            <Item onClick={this.toggleValue('FEATURED_VIDEO_AUTOPLAY')}>
              <Content>
                <ItemTitle>인기 동영상 미리보기 재생</ItemTitle>
                <ItemDescription>
                  미리보기 재생을 끄면 데이터 사용량을 줄일 수 있어요
                </ItemDescription>
              </Content>
              <ToggleAction
                $active={this.state.settings.FEATURED_VIDEO_AUTOPLAY}
              />
            </Item>
            <Item onClick={this.toggleValue('VIDEO_AUTOPLAY')}>
              <Content>
                <ItemTitle>동영상 자동 재생</ItemTitle>
                <ItemDescription>
                  자동 재생을 끄면 데이터 사용량을 줄일 수 있어요
                </ItemDescription>
              </Content>
              <ToggleAction $active={this.state.settings.VIDEO_AUTOPLAY} />
            </Item>
            <Item
              onClick={() =>
                ModalController.fire({
                  type: 'select',
                  title: '화질 선택',
                  content: [
                    { id: 1080, text: '1080p' },
                    { id: 720, text: '720p' },
                    { id: 540, text: '540p' },
                    { id: 360, text: '360p' },
                    { id: 240, text: '240p' },
                  ],
                  default: this.state.settings.DEFAULT_VIDEO_QUALITY,
                }).then((value) =>
                  this.setValue('DEFAULT_VIDEO_QUALITY', value)
                )
              }
            >
              <Content>
                <ItemTitle>동영상 화질 기본값</ItemTitle>
                <ItemDescription>영상 재생 시 기본 화질</ItemDescription>
              </Content>
              <ValueAction>
                {this.state.settings.DEFAULT_VIDEO_QUALITY}p
              </ValueAction>
            </Item>
          </Group>
          <Group>
            <GroupTitle>피드</GroupTitle>
            <Item onClick={this.toggleValue('DISPLAY_NEXT_VIDEO')}>
              <Content>
                <ItemTitle>다음 동영상 표시</ItemTitle>
                <ItemDescription>
                  동영상 피드에 다음 동영상 표시
                </ItemDescription>
              </Content>
              <ToggleAction $active={this.state.settings.DISPLAY_NEXT_VIDEO} />
            </Item>
            <Item
              onClick={() =>
                ModalController.fire({
                  type: 'select',
                  title: '개수 선택',
                  content: [
                    { id: 30, text: '30 개' },
                    { id: 25, text: '25 개' },
                    { id: 20, text: '20 개' },
                    { id: 10, text: '10 개' },
                    { id: 5, text: '5 개' },
                  ],
                  default: this.state.settings.VIDEO_RECOMMEND_COUNT,
                }).then((value) =>
                  this.setValue('VIDEO_RECOMMEND_COUNT', value)
                )
              }
            >
              <Content>
                <ItemTitle>추천 동영상 개수</ItemTitle>
                <ItemDescription>추천 동영상 표시 개수</ItemDescription>
              </Content>
              <ValueAction>
                {this.state.settings.VIDEO_RECOMMEND_COUNT} 개
              </ValueAction>
            </Item>
            <Item
              onClick={() =>
                ModalController.fire({
                  type: 'select',
                  title: '지점 선택',
                  content: [
                    { id: 0.2, text: '20%' },
                    { id: 0.4, text: '40%' },
                    { id: 0.5, text: '50%' },
                    { id: 0.6, text: '60%' },
                    { id: 0.8, text: '80%' },
                  ],
                  default: this.state.settings.FEATURED_VIDEO_START_POSITION,
                }).then((value) =>
                  this.setValue('FEATURED_VIDEO_START_POSITION', value)
                )
              }
            >
              <Content>
                <ItemTitle>인기 동영상 미리보기 재생 지점</ItemTitle>
                <ItemDescription>미리보기 재생 시작 지점</ItemDescription>
              </Content>
              <ValueAction>
                {this.state.settings.FEATURED_VIDEO_START_POSITION * 100}%
              </ValueAction>
            </Item>
          </Group>
        </Wrapper>
      </Page>
    );
  }
}

export default SettingsPage;
