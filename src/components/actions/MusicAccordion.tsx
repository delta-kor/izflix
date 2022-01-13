import { Component } from 'react';
import styled from 'styled-components';
import AccordionIcon from '../../icons/accordion.svg';
import { HideOverflow } from '../../styles';

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 48px;
  padding: 0 32px;
  align-items: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin: 0 12px 0 -8px;
`;

const Title = styled.div`
  flex-grow: 1;
  font-weight: bold;
  font-size: 20px;
  ${HideOverflow};
`;

const Count = styled.div`
  font-weight: normal;
  font-size: 20px;
  opacity: 0.7;
`;

interface Props {
  music: IMusic;
}

class MusicAccordion extends Component<Props> {
  render() {
    const music = this.props.music;
    return (
      <Layout>
        <Icon src={AccordionIcon} />
        <Title>{music.title}</Title>
        <Count>{music.count}</Count>
      </Layout>
    );
  }
}

export default MusicAccordion;
