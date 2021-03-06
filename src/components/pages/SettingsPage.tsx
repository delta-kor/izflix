import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import ModalController from '../../services/modal-controller';
import Scroll from '../../services/scroll';
import Settings from '../../services/settings';
import { Color, HideOverflow, MobileQuery, PcQuery } from '../../styles';
import Back from '../actions/Back';
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
    padding: 96px 0 0 0;
    min-width: 642px;
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
  margin: 0 0 16px 0;
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
        <Meta
          data={{ title: '?????? - IZFLIX', url: `https://izflix.net/settings` }}
        />
        <Wrapper>
          <Back />
          <Group>
            <GroupTitle>??????</GroupTitle>
            <Item onClick={this.toggleValue('FEATURED_VIDEO_AUTOPLAY')}>
              <Content>
                <ItemTitle>?????? ????????? ???????????? ??????</ItemTitle>
                <ItemDescription>
                  ???????????? ????????? ?????? ????????? ???????????? ?????? ??? ?????????
                </ItemDescription>
              </Content>
              <ToggleAction
                $active={this.state.settings.FEATURED_VIDEO_AUTOPLAY}
              />
            </Item>
            <Item onClick={this.toggleValue('VIDEO_AUTOPLAY')}>
              <Content>
                <ItemTitle>????????? ?????? ??????</ItemTitle>
                <ItemDescription>
                  ?????? ????????? ?????? ????????? ???????????? ?????? ??? ?????????
                </ItemDescription>
              </Content>
              <ToggleAction $active={this.state.settings.VIDEO_AUTOPLAY} />
            </Item>
            <Item
              onClick={() =>
                ModalController.fire({
                  type: 'select',
                  title: '?????? ??????',
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
                <ItemTitle>????????? ?????? ?????????</ItemTitle>
                <ItemDescription>????????? ?????? ??? ?????? ??????</ItemDescription>
              </Content>
              <ValueAction>
                {this.state.settings.DEFAULT_VIDEO_QUALITY}p
              </ValueAction>
            </Item>
          </Group>
          <Group>
            <GroupTitle>??????</GroupTitle>
            <Item onClick={this.toggleValue('DISPLAY_NEXT_VIDEO')}>
              <Content>
                <ItemTitle>?????? ????????? ??????</ItemTitle>
                <ItemDescription>
                  ????????? ????????? ?????? ????????? ??????
                </ItemDescription>
              </Content>
              <ToggleAction $active={this.state.settings.DISPLAY_NEXT_VIDEO} />
            </Item>
            <Item
              onClick={() =>
                ModalController.fire({
                  type: 'select',
                  title: '?????? ??????',
                  content: [
                    { id: 30, text: '30 ???' },
                    { id: 25, text: '25 ???' },
                    { id: 20, text: '20 ???' },
                    { id: 10, text: '10 ???' },
                    { id: 5, text: '5 ???' },
                  ],
                  default: this.state.settings.VIDEO_RECOMMEND_COUNT,
                }).then((value) =>
                  this.setValue('VIDEO_RECOMMEND_COUNT', value)
                )
              }
            >
              <Content>
                <ItemTitle>?????? ????????? ??????</ItemTitle>
                <ItemDescription>?????? ????????? ?????? ??????</ItemDescription>
              </Content>
              <ValueAction>
                {this.state.settings.VIDEO_RECOMMEND_COUNT} ???
              </ValueAction>
            </Item>
            <Item
              onClick={() =>
                ModalController.fire({
                  type: 'select',
                  title: '?????? ??????',
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
                <ItemTitle>?????? ????????? ???????????? ?????? ??????</ItemTitle>
                <ItemDescription>???????????? ?????? ?????? ??????</ItemDescription>
              </Content>
              <ValueAction>
                {this.state.settings.FEATURED_VIDEO_START_POSITION * 100}%
              </ValueAction>
            </Item>
            <Item onClick={this.toggleValue('NEXT_VIDEO_AUTOPLAY')}>
              <Content>
                <ItemTitle>?????? ????????? ?????? ??????</ItemTitle>
                <ItemDescription>
                  ????????? ?????? ??? ?????? ???????????? ???????????? ????????????
                </ItemDescription>
              </Content>
              <ToggleAction $active={this.state.settings.NEXT_VIDEO_AUTOPLAY} />
            </Item>
            <Item
              onClick={() =>
                ModalController.fire({
                  type: 'select',
                  title: '?????? ?????? ??????',
                  content: [
                    { id: 0, text: '??????' },
                    { id: 1, text: '1???' },
                    { id: 3, text: '3???' },
                    { id: 5, text: '5???' },
                    { id: 7, text: '7???' },
                  ],
                  default: this.state.settings.NEXT_VIDEO_AUTOPLAY_COUNTDOWN,
                }).then((value) =>
                  this.setValue('NEXT_VIDEO_AUTOPLAY_COUNTDOWN', value)
                )
              }
            >
              <Content>
                <ItemTitle>?????? ????????? ?????? ?????? ??????</ItemTitle>
                <ItemDescription>
                  ?????? ????????? ?????? ?????? ?????? ??????
                </ItemDescription>
              </Content>
              <ValueAction>
                {this.state.settings.NEXT_VIDEO_AUTOPLAY_COUNTDOWN}???
              </ValueAction>
            </Item>
            <Item onClick={this.toggleValue('NEXT_VIDEO_INSTANT_PIP')}>
              <Content>
                <ItemTitle>PIP ???????????? ?????? ????????? ?????? ??????</ItemTitle>
                <ItemDescription>
                  PIP ???????????? ????????? ?????? ??? ?????? ???????????? ?????? ????????????
                </ItemDescription>
              </Content>
              <ToggleAction
                $active={this.state.settings.NEXT_VIDEO_INSTANT_PIP}
              />
            </Item>
          </Group>
          <Group>
            <GroupTitle>??????</GroupTitle>
            <Item onClick={this.toggleValue('$_TRAFFIC_ALERT')}>
              <Content>
                <ItemTitle>????????? ?????? ??????</ItemTitle>
                <ItemDescription>?????? ????????? ????????? ?????? ??????</ItemDescription>
              </Content>
              <ToggleAction $active={!this.state.settings.$_TRAFFIC_ALERT} />
            </Item>
            <Item onClick={this.toggleValue('$_4K_ALERT')}>
              <Content>
                <ItemTitle>???????????? ?????? ??????</ItemTitle>
                <ItemDescription>
                  ???????????? ?????? ????????? ?????? ??????
                </ItemDescription>
              </Content>
              <ToggleAction $active={!this.state.settings.$_4K_ALERT} />
            </Item>
          </Group>
        </Wrapper>
      </Page>
    );
  }
}

export default SettingsPage;
