import { Component } from 'react';
import styled from 'styled-components';
import AccordionIcon from '../../icons/accordion.svg';
import { Color, HideOverflow } from '../../styles';

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
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

interface Props {
  music?: IMusic;
}

class MusicAccordion extends Component<Props> {
  render() {
    const music = this.props.music;
    if (music)
      return (
        <Layout>
          <Icon src={AccordionIcon} />
          <Title>{music.title}</Title>
          <Count>{music.count}</Count>
        </Layout>
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
