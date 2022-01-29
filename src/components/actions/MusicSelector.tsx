import React, { Component, MouseEvent } from 'react';
import styled from 'styled-components';
import { ReactComponent as LeftChevronIcon } from '../../icons/chevron-left.svg';
import { ReactComponent as RightChevronIcon } from '../../icons/chevron-right.svg';
import { Color } from '../../styles';
import MusicGrid from './grid/MusicGrid';

const Wrapper = styled.div``;

const Layout = styled.div`
  display: flex;
  width: 100%;
  max-width: 1416px;
  height: 48px;
  margin: 32px auto;
  padding: 0 32px;
`;

const ControlButton = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  background: ${Color.DARK_GRAY};
  border-radius: 4px;
  cursor: pointer;
  user-select: none;

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 32px;
    height: 32px;
    transform: translate(-50%, -50%);
    user-drag: none;
  }
`;

const CenterMenu = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 24px;
  flex-grow: 1;
  overflow: hidden;
`;

const ChipsWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  ::-webkit-scrollbar {
    display: none;
  }

  & > * {
    margin: 0 24px 0 0;

    :last-child {
      margin: 0;
    }
  }
`;

const Chip = styled.div<{ $active: boolean }>`
  display: flex;
  height: 48px;
  padding: 0 20px;
  background: ${({ $active }) => ($active ? Color.PRIMARY : Color.GRAY)};
  border-radius: 4px;
  transition: background 0.2s;

  justify-content: center;
  align-items: center;

  cursor: pointer;
  user-select: none;

  scroll-snap-align: start;
  flex-shrink: 0;

  & > span:nth-child(1) {
    font-weight: bold;
    font-size: 20px;
    margin: 0 16px 0 0;
  }

  & > span:nth-child(2) {
    font-weight: normal;
    font-size: 16px;
    opacity: 0.7;
  }
`;

interface Props {
  musics: IMusic[];
  selected: string | null;
  setSelected(selected: string): void;
}

interface State {
  count: number;
}

class MusicSelector extends Component<Props, State> {
  state: State = { count: 24 };

  scrollRef = React.createRef<HTMLDivElement>();
  lastScrollTime = 0;

  componentDidMount = () => {
    this.autoSelect();
  };

  componentDidUpdate = () => {
    this.autoSelect();
  };

  autoSelect = () => {
    if (!this.props.selected && this.props.musics.length) {
      const firstMusic = this.props.musics[0];
      const id = firstMusic.id;
      const count = firstMusic.count;

      this.props.setSelected(id);
      this.setState({ count });
    }
  };

  moveLeft = () => {
    const element = this.scrollRef.current!;
    const elementWidth = element.clientWidth;
    const scrollX = element.scrollLeft;
    const scrollPosition = scrollX - elementWidth * 0.4;

    let smooth = true;
    const currentTime = Date.now();

    if (Math.abs(this.lastScrollTime - currentTime) < 200) smooth = false;

    element.scrollTo({
      left: scrollPosition,
      behavior: smooth ? 'smooth' : 'auto',
    });

    this.lastScrollTime = Date.now();
  };

  moveRight = () => {
    const element = this.scrollRef.current!;
    const elementWidth = element.clientWidth;
    const scrollX = element.scrollLeft;
    const scrollPosition = scrollX + elementWidth * 0.4;

    let smooth = true;
    const currentTime = Date.now();

    if (Math.abs(this.lastScrollTime - currentTime) < 200) smooth = false;

    element.scrollTo({
      left: scrollPosition,
      behavior: smooth ? 'smooth' : 'auto',
    });

    this.lastScrollTime = Date.now();
  };

  onChipClick = (id: string, count: number) => (e: MouseEvent) => {
    let element = e.target as HTMLElement;
    if (element instanceof HTMLSpanElement) element = element.parentElement!;

    const parent = this.scrollRef.current!;

    this.props.setSelected(id);
    this.setState({ count });

    const x = element.offsetLeft;
    const left = parent.getBoundingClientRect().left;

    const position = x - left;
    const width = parent.clientWidth;

    parent.scrollTo({ left: position - width / 2, behavior: 'smooth' });
  };

  render() {
    return (
      <Wrapper>
        <Layout>
          <ControlButton onClick={this.moveLeft}>
            <LeftChevronIcon />
          </ControlButton>
          <CenterMenu>
            <ChipsWrapper ref={this.scrollRef}>
              {this.props.musics.map((music) => (
                <Chip
                  key={music.id}
                  $active={this.props.selected === music.id}
                  onClick={this.onChipClick(music.id, music.count)}
                >
                  <span>{music.title}</span>
                  <span>{music.count}</span>
                </Chip>
              ))}
            </ChipsWrapper>
          </CenterMenu>
          <ControlButton onClick={this.moveRight}>
            <RightChevronIcon />
          </ControlButton>
        </Layout>
        <MusicGrid selected={this.props.selected} count={this.state.count} />
      </Wrapper>
    );
  }
}

export default MusicSelector;
