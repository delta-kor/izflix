import { Component } from 'react';
import styled from 'styled-components';
import { Color, MobileQuery, PcQuery } from '../../styles';
import ListButton from '../atoms/ListButton';
import VerticalButton from '../atoms/VerticalButton';
import withDevice, { WithDeviceParams } from '../tools/WithDevice';
import withNavigate, { WithNavigateParams } from '../tools/WithNavigate';

const Layout = styled.div`
  display: flex;

  ${MobileQuery} {
    justify-content: space-between;
    gap: 12px;
    padding: 0 32px;
  }

  ${PcQuery} {
    flex-direction: column;
    gap: 12px;
    margin: 46px 0 0 0;
  }
`;

class ShortcutSection extends Component<WithNavigateParams & WithDeviceParams, any> {
  onItemClick = (path: string) => {
    this.props.navigate(path);
  };

  render() {
    const device = this.props.device;

    const ButtonElement = device === 'mobile' ? VerticalButton : ListButton;

    return (
      <Layout>
        <ButtonElement
          icon={'music'}
          color={Color.DARK_GRAY}
          onClick={() => this.onItemClick('/music')}
        >
          노래
        </ButtonElement>
        <ButtonElement
          icon={'category'}
          color={Color.DARK_GRAY}
          onClick={() => this.onItemClick('/category')}
        >
          카테고리
        </ButtonElement>
        <ButtonElement
          icon={'calendar'}
          color={Color.DARK_GRAY}
          onClick={() => this.onItemClick('/calendar')}
        >
          달력
        </ButtonElement>
      </Layout>
    );
  }
}

export default withNavigate(withDevice(ShortcutSection));
