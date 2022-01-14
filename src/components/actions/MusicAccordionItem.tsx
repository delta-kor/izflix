import { Component } from 'react';
import styled from 'styled-components';
import getDate from '../../services/date';
import Spaceship from '../../services/spaceship';
import { HideOverflow } from '../../styles';

const Layout = styled.div`
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
  font-weight: bold;
  font-size: 14px;
  margin: 0 0 6px 0;
  ${HideOverflow};
`;

const Date = styled.div`
  font-weight: normal;
  font-size: 12px;
  opacity: 0.7;
  ${HideOverflow};
`;

const Thumbnail = styled.img`
  width: 78px;
  height: 44px;
  border-radius: 4px;
  margin: 0 0 0 8px;
`;

interface Props {
  video: IMusicVideoItem;
}

class MusicAccordionItem extends Component<Props> {
  render() {
    const video = this.props.video;

    return (
      <Layout>
        <Content>
          <Title>{video.description}</Title>
          <Date>{getDate(video.date)}</Date>
        </Content>
        <Thumbnail src={Spaceship.getThumbnail(video.id)} />
      </Layout>
    );
  }
}

export default MusicAccordionItem;
