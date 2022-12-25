import styled from 'styled-components';
import { Color, MobileQuery, PcInnerPadding, PcQuery, Text } from '../../styles';
import SmoothImage from '../atoms/SmoothImage';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    padding: 0 32px;
    gap: 28px;
  }

  ${PcQuery} {
    gap: 36px;
    max-width: 640px;
    margin: 0 32px 0 ${PcInnerPadding};
  }
`;

const Title = styled.div`
  ${Text.HEADLINE_3};
  height: unset;
  color: ${Color.WHITE};
`;

const Description = styled.div`
  ${Text.SUBTITLE_2};
  height: unset;
  color: ${Color.WHITE};
  opacity: 0.7;

  ${MobileQuery} {
    margin: -20px 0 0 0;
  }

  ${PcQuery} {
    margin: -28px 0 0 0;
  }
`;

const Image = styled(SmoothImage)`
  aspect-ratio: 962 / 1066;
  margin: -12px 0 0 0;
  border-radius: 8px;
`;

const AppTemplate: React.FC = () => {
  return (
    <Layout>
      <Title>앱을 다운로드 하세요</Title>
      <Description>웹 애플리케이션은 일반 바로가기와 다릅니다</Description>
      <Image
        src={
          'https://user-images.githubusercontent.com/48397257/209466942-c0a2e85f-7885-4a3d-9871-9e8913269b0d.png'
        }
      />
      <Image
        src={
          'https://user-images.githubusercontent.com/48397257/209466965-8a22d7f0-630a-416b-8d7b-755f545efa6a.png'
        }
      />
    </Layout>
  );
};

export default AppTemplate;
