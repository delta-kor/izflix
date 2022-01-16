import { Component } from 'react';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import { getDate } from '../../../services/time';
import { Color, HideOverflow } from '../../../styles';

const Layout = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 44px;
  padding: 0 32px;
`;

const Content = styled.div`
  display: flex;
  width: calc(100% - 78px - 8px);
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  height: 16px;
  font-weight: bold;
  font-size: 14px;
  margin: 0 0 6px 0;
  ${HideOverflow};
`;

const Date = styled.div`
  height: 14px;
  font-weight: normal;
  font-size: 12px;
  opacity: 0.7;
  ${HideOverflow};
`;

const Thumbnail = styled.img<{ $active: boolean }>`
  width: 78px;
  height: 44px;
  border-radius: 4px;
  margin: 0 0 0 8px;
  opacity: ${({ $active }) => ($active ? '1' : '0')};
  transition: opacity 0.2s;
  z-index: 1;
`;

const ThumbnailPlaceholder = styled.div`
  position: absolute;
  top: 0;
  right: 32px;
  width: 78px;
  height: 44px;
  border-radius: 4px;
  background: ${Color.BACKGROUND};
  z-index: 0;
`;

interface Props {
  video: IMusicVideoItem;
}

interface State {
  loaded: boolean;
}

class MusicAccordionItem extends Component<Props> {
  state: State = { loaded: false };

  onLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    const video = this.props.video;

    return (
      <Layout>
        <Content>
          <Title>{video.description}</Title>
          <Date>{getDate(video.date)}</Date>
        </Content>
        <Thumbnail
          onLoad={this.onLoad}
          $active={this.state.loaded}
          src={Spaceship.getThumbnail(video.id)}
          loading="lazy"
        />
        <ThumbnailPlaceholder />
      </Layout>
    );
  }
}

export default MusicAccordionItem;
