import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import { getHumanDuration } from '../../../services/time';
import { Color, HideOverflow } from '../../../styles';

const Layout = styled(Link)`
  display: flex;
  column-gap: 16px;
  height: 68px;
  cursor: pointer;
  user-select: none;
`;

const Thumbnail = styled.img`
  height: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 4px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  min-width: 0;
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: ${Color.WHITE};
  ${HideOverflow};
`;

const Description = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: ${Color.GRAY};
  ${HideOverflow};
`;

const Time = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: ${Color.PRIMARY};
  ${HideOverflow};
`;

const DecoLine = styled.div`
  min-width: 4px;
  width: 4px;
  height: 100%;
  border-radius: 8px;
  background: ${Color.PRIMARY};
`;

interface Props {
  id: string;
  title: string;
  description: string;
  playtime: number;
}

export default class TimedVideoInfo extends Component<Props> {
  render() {
    return (
      <Layout to={`/${this.props.id}`}>
        <Thumbnail src={Spaceship.getThumbnail(this.props.id)} />
        <Content>
          <Metadata>
            <Title>{this.props.title}</Title>
            <Description>{this.props.description}</Description>
          </Metadata>
          <Time>{getHumanDuration(this.props.playtime)}</Time>
        </Content>
        <DecoLine />
      </Layout>
    );
  }
}
