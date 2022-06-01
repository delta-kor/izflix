import { Component } from 'react';
import styled from 'styled-components';
import { ReactComponent as LinkIcon } from '../../icons/link.svg';
import Spaceship from '../../services/spaceship';
import Tracker from '../../services/tracker';
import { Color, HideOverflow, MobileQuery, PcQuery } from '../../styles';

const Layout = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: calc(100vw - 64px);
  max-width: 720px;
  margin: 8px auto;
  background: ${Color.DARK_GRAY};
  border-radius: 6px;

  ${PcQuery} {
    padding: 16px 40px 16px 16px;
  }

  ${MobileQuery} {
    padding: 16px 36px 16px 16px;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${Color.WHITE};
  ${HideOverflow};
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: ${Color.WHITE};
  opacity: 0.7;
  ${HideOverflow};
`;

const Icon = styled(LinkIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;

  ${PcQuery} {
    width: 20px;
    height: 20px;
  }

  ${MobileQuery} {
    width: 16px;
    height: 16px;
  }
`;

const Placeholder = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: calc(100vw - 64px);
  max-width: 720px;
  margin: 8px auto;
  padding: 16px 16px;
  background: ${Color.DARK_GRAY};
  height: 74px;
  border-radius: 6px;
`;

interface State {
  ad: IAd | null;
}

class Ad extends Component<any, State> {
  state: State = {
    ad: null,
  };

  componentDidMount = async () => {
    const response = await Spaceship.getAllAds();
    const ads = response.ads;
    const ad = ads[(Math.random() * ads.length) | 0];
    this.setState({ ad });
  };

  render() {
    if (this.state.ad)
      return (
        <Layout
          href={this.state.ad.link}
          target={'_blank'}
          onClick={() => Tracker.send('ad_click', { ad_id: this.state.ad!.id })}
        >
          <Title>{this.state.ad.title}</Title>
          <Description>{this.state.ad.description}</Description>
          <Icon />
        </Layout>
      );
    else return <Placeholder />;
  }
}

export default Ad;
