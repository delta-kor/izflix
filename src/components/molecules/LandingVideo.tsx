import { Component } from 'react';
import styled from 'styled-components';
import {
  Color,
  HideOverflow,
  MobileQuery,
  MobileTopMargin,
  PcInnerPadding,
  PcQuery,
  PcTopMargin,
  Text,
} from '../../styles';
import Button from '../atoms/Button';
import withDevice, { WithDeviceParams } from '../tools/WithDevice';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;

  user-select: none;

  ${MobileQuery} {
    gap: 16px;
    height: 320px;
    padding: 24px 32px;
    margin: -${MobileTopMargin}px 0 0 0;
  }

  ${PcQuery} {
    gap: 24px;
    height: 562px;
    padding: 42px ${PcInnerPadding};
    margin: -${PcTopMargin}px 0 0 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    gap: 8px;
  }

  ${PcQuery} {
    gap: 12px;
  }
`;

const Title = styled.div`
  color: ${Color.WHITE};
  flex-grow: 1;

  ${HideOverflow};

  ${MobileQuery} {
    ${Text.HEADLINE_1};
  }

  ${PcQuery} {
    ${Text.EX_HEADLINE_1};
  }
`;

const Description = styled.div`
  color: ${Color.WHITE};
  flex-grow: 1;

  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_1};
  }

  ${PcQuery} {
    ${Text.EX_SUBTITLE_1};
  }
`;

const Action = styled.div`
  display: flex;
  gap: 16px;
`;

interface Props extends WithDeviceParams {}

class LandingVideo extends Component<Props, any> {
  render() {
    return (
      <Layout>
        <Content>
          <Title>하늘 위로</Title>
          <Description>EYES ON ME in SEOUL Day 3</Description>
        </Content>
        <Action>
          <Button color={Color.PRIMARY} icon={'play'} fluid={this.props.device === 'mobile'}>
            재생하기
          </Button>
          <Button
            color={Color.TRANSPARENT}
            icon={'playlist'}
            fluid={this.props.device === 'mobile'}
          >
            인기 동영상
          </Button>
        </Action>
      </Layout>
    );
  }
}

export default withDevice(LandingVideo);
