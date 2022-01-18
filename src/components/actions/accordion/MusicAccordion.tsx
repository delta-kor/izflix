import { AnimatePresence, motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import AccordionIcon from '../../../icons/accordion.svg';
import Spaceship from '../../../services/spaceship';
import Transmitter from '../../../services/transmitter';
import { Color, Ease, HideOverflow } from '../../../styles';
import MusicAccordionCarousel from './MusicAccordionCarousel';

const Wrapper = styled(motion.div)<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${({ $active }) =>
    $active ? Color.DARK_GRAY : Color.BACKGROUND};
  transition: background 0.2s;
`;

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  padding: 0 32px;
  align-items: center;
  user-select: none;
  cursor: pointer;
`;

const Icon = styled(motion.img)`
  width: 24px;
  height: 24px;
  margin: 0 12px 0 -6px;
`;

const Title = styled.div`
  height: 24px;
  padding: 0 4px 0 0;
  flex-grow: 1;
  font-weight: bold;
  font-size: 20px;
  ${HideOverflow};
`;

const Count = styled.div`
  font-weight: normal;
  font-size: 20px;
  height: 24px;
  opacity: 0.7;
`;

const PlaceholderTitle = styled.div`
  width: 40%;
  height: 24px;
  background: ${Color.DARK_GRAY};
  border-radius: 4px;
`;

const PlaceholderCount = styled.div`
  position: absolute;
  right: 32px;
  width: 24px;
  height: 24px;
  background: ${Color.DARK_GRAY};
  border-radius: 4px;
`;

const ItemWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: auto;
`;

interface Props {
  music?: IMusic;
  expand?: boolean;
  setExpand?: (expand: boolean) => void;
}

interface State {
  expand: boolean;
  videos: IMusicVideoItem[];
}

class MusicAccordion extends Component<Props, State> {
  state: State = { expand: false, videos: [] };

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.expand !== this.props.expand) {
      if (this.props.expand) {
        this.expand();
      } else {
        this.shrink();
      }
    }
  };

  onClick = () => {
    const current = this.state.expand;
    this.props.setExpand && this.props.setExpand(!current);
  };

  expand = () => {
    this.setState({ expand: true });
    this.loadData();
  };

  shrink = () => {
    this.setState({ expand: false });
  };

  loadData = async () => {
    if (!this.props.music) return false;

    const data = await Spaceship.viewOneMusic(this.props.music.id);
    if (!data.ok) return Transmitter.emit('popup', data.message);

    const videos = data.videos.sort((a, b) => a.date - b.date);

    this.setState({ videos });
  };

  render() {
    const music = this.props.music;
    if (music)
      return (
        <Wrapper $active={this.state.expand}>
          <Layout onClick={this.onClick}>
            <Icon
              src={AccordionIcon}
              variants={{
                initial: { transform: 'rotate(0deg)' },
                expand: { transform: 'rotate(180deg)' },
              }}
              initial="initial"
              animate={this.state.expand ? 'expand' : 'initial'}
            />
            <Title>{music.title}</Title>
            <Count>{music.count}</Count>
          </Layout>
          <AnimatePresence>
            {this.state.expand && (
              <ItemWrapper
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.2, ease: Ease }}
              >
                <MusicAccordionCarousel
                  musicId={this.props.music?.id}
                  videos={this.state.videos}
                  count={music.count}
                />
              </ItemWrapper>
            )}
          </AnimatePresence>
        </Wrapper>
      );
    else
      return (
        <Layout>
          <Icon src={AccordionIcon} />
          <PlaceholderTitle />
          <PlaceholderCount />
        </Layout>
      );
  }
}

export default MusicAccordion;
