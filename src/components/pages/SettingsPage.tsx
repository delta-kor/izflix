import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
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

const GroupTitle = styled.div`
  margin: 0 0 6px 0;
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
          </Group>
        </Wrapper>
      </Page>
    );
  }
}

export default SettingsPage;
