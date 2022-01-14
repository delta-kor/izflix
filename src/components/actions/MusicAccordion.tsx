import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import AccordionIcon from '../../icons/accordion.svg';
import Spaceship from '../../services/spaceship';
import Transmitter from '../../services/transmitter';
import { Color, HideOverflow } from '../../styles';
import MusicAccordionItem from './MusicAccordionItem';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  flex-grow: 1;
  font-weight: bold;
  font-size: 20px;
  height: 24px;
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

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin: 0 0 12px 0;

    :last-child {
      margin: 0;
    }
  }
`;

interface Props {
  music?: IMusic;
}

interface State {
  expand: boolean;
  videos: IMusicVideoItem[];
}

class MusicAccordion extends Component<Props, State> {
  state: State = { expand: false, videos: [] };

  onClick = () => {
    const current = this.state.expand;
    this.setState({ expand: !current });

    if (!current) this.onExpand();
  };

  onExpand = async () => {
    await this.loadData();
  };

  loadData = async () => {
    if (!this.props.music) return false;

    const data = await Spaceship.viewOneMusic(this.props.music.id);
    if (!data.ok) return Transmitter.emit('popup', data.message);

    this.setState({ videos: data.videos });
  };

  render() {
    const music = this.props.music;
    if (music)
      return (
        <Wrapper>
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
          {this.state.expand && (
            <ItemWrapper>
              {this.state.videos.map((video) => (
                <MusicAccordionItem video={video} key={video.id} />
              ))}
            </ItemWrapper>
          )}
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
