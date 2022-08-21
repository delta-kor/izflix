import styled from 'styled-components';
import Button from '../components/atoms/Button';
import GetConstant, { ConstantKey } from '../constants';
import Icon from '../icons/Icon';
import { Color, MobileQuery, PcInnerPadding, PcQuery, Text } from '../styles';
import Page from './Page';

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

const ErrorIcon = styled(Icon)`
  width: 48px;
  height: 48px;
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

const HomeButton = styled(Button)`
  ${MobileQuery} {
    width: 160px;
    margin: -8px 0 0 0;
  }

  ${PcQuery} {
    width: 240px;
    margin: -4px 0 0 0;
  }
`;

interface Props {
  data: ConstantKey | string;
}

const ErrorPage: React.FC<Props> = ({ data }) => {
  const message = GetConstant(data as ConstantKey) || data;
  return (
    <Page>
      <Layout>
        <ErrorIcon type={'error'} color={Color.WHITE} />
        <Content>{message}</Content>
        <HomeButton color={Color.DARK_GRAY} icon={'home'} link={'/'}>
          메인화면
        </HomeButton>
      </Layout>
    </Page>
  );
};

export default ErrorPage;
