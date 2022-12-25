import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import { Color, MobileQuery, PcQuery, Text } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled(SmoothBox)`
  margin: -8px 0;

  & > .content {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;

    border: 2px solid ${Color.GRAY};
    background: ${Color.DARK_GRAY};
    border-radius: 8px;

    cursor: pointer;
    user-select: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 4px;
`;

const Title = styled.div`
  ${Text.SUBTITLE_1};
  color: ${Color.WHITE};
`;

const Description = styled.div`
  ${Text.SUBTITLE_2};
  height: unset;
  color: ${Color.WHITE};
  opacity: 0.7;
`;

const Action = styled.div`
  ${Text.SUBTITLE_2};
  height: unset;
  flex-shrink: 0;
  color: ${Color.PRIMARY};
  text-align: center;

  ${MobileQuery} {
    & > span {
      display: none;
    }
  }

  ${PcQuery} {
    & > br {
      display: none;
    }

    & > span {
      display: inline-block;
    }
  }
`;

const AppDownload: React.FC = () => {
  const device = useDevice();

  const scale = device === 'mobile' ? [1.03, 0.97] : [1.01, 0.99];

  return (
    <Layout hover={scale[0]} tap={scale[1]}>
      <Content>
        <Title>앱 다운로드</Title>
        <Description>앱을 이용하면 더 많은 기능을 사용할 수 있어요</Description>
      </Content>
      <Action>
        원클릭
        <br />
        <span>&nbsp;</span>
        설치
      </Action>
    </Layout>
  );
};

export default AppDownload;
