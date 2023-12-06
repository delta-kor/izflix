import { useEffect, useRef } from 'react';
import Page from './Page';
import Settings from '../services/settings';
import Spaceship from '../services/spaceship';
import styled from 'styled-components';
import Icon from '../icons/Icon';
import { MobileQuery, PcQuery, PcInnerPadding, Color, Text } from '../styles';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${MobileQuery} {
    padding: 0 32px;
  }

  ${PcQuery} {
    padding: 0 ${PcInnerPadding};
  }
`;

const PageIcon = styled(Icon)`
  width: 52px;
  height: 52px;
`;

const Content = styled.div`
  color: ${Color.WHITE};

  ${MobileQuery} {
    ${Text.HEADLINE_1};
  }

  ${PcQuery} {
    ${Text.EX_HEADLINE_1};
  }
`;

const SendPage: React.FC = () => {
  useEffect(() => {
    sendToken();
  }, []);

  const sendToken = async () => {
    await Spaceship.getUser();
    const token = Settings.getOne('$_AUTH_TOKEN')!;
    const time = Date.now();
    location.href = `https://live.izflix.net/login?token=${encodeURIComponent(token)}&time=${time}`;
  };

  return (
    <Page>
      <Layout>
        <PageIcon type={'izflix'} color={Color.WHITE} />
        <Content>로그인 하는 중...</Content>
      </Layout>
    </Page>
  );
};

export default SendPage;
