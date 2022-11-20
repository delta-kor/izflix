import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Color, HideOverflow, MobileQuery, PcInnerPadding, PcQuery, Text } from '../../styles';

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

const Group = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    gap: 12px;
  }

  ${PcQuery} {
    gap: 16px;
  }
`;

const GroupTitle = styled.span`
  transform: skew(0.1deg);
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.SUBTITLE_1};
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
  }
`;

const DevelopmentWrapper = styled.div`
  display: flex;
  align-items: center;

  ${MobileQuery} {
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px 8px;
  }

  ${PcQuery} {
    gap: 32px;
  }
`;

const DevelopmentItem = styled.div`
  flex-shrink: 0;
  font-weight: 800;
  font-size: 20px;
  color: ${Color.WHITE};
`;

const LicenseWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px 8px;
`;

const LicenseItem = styled.a`
  font-weight: 700;
  color: ${Color.WHITE};
  ${HideOverflow};

  ${MobileQuery} {
    font-size: 14px;
  }

  ${PcQuery} {
    font-size: 18px;
  }
`;

const VersionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const VersionItem = styled.a`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const VersionContent = styled.div`
  display: flex;
  gap: 10px;
`;

const VersionTitle = styled.div`
  font-weight: 800;
  font-size: 24px;
  color: ${Color.WHITE};
`;

const VersionNumber = styled.div`
  font-weight: 400;
  font-size: 24px;
  color: ${Color.WHITE};
  opacity: 0.3;
`;

const VersionLink = styled.div`
  font-weight: 800;
  font-size: 16px;
  color: ${Color.WHITE};
  opacity: 0.3;
  transform: skew(0.1deg);
`;

const InfoTemplate: React.FC = () => {
  const { t } = useTranslation();

  // prettier-ignore
  const licenses = ['framer-motion', 'i18next', 'i18next-browser-languagedetector', 'node-cache', 'path-to-regexp', 'react', 'react-ga4', 'react-helmet-async', 'react-i18next', 'react-lazy-load-image-component', 'react-modal', 'react-responsive', 'react-router-dom', 'rooks', 'styled-components', 'typescript'];

  return (
    <Layout>
      <VersionWrapper>
        <VersionItem href={'https://github.com/delta-kor/izflix'} target={'_blank'}>
          <VersionContent>
            <VersionTitle>IZFLIX</VersionTitle>
            <VersionNumber>V2.0</VersionNumber>
          </VersionContent>
          <VersionLink>delta-kor/izflix</VersionLink>
        </VersionItem>
        <VersionItem href={'https://github.com/delta-kor/video-server'} target={'_blank'}>
          <VersionContent>
            <VersionTitle>IZFLIX API</VersionTitle>
            <VersionNumber>V2.0</VersionNumber>
          </VersionContent>
          <VersionLink>delta-kor/video-server</VersionLink>
        </VersionItem>
        <VersionItem>
          <VersionContent>
            <VersionTitle>LT2 TICKET</VersionTitle>
            <VersionNumber>V1.1</VersionNumber>
          </VersionContent>
        </VersionItem>
        <VersionItem>
          <VersionContent>
            <VersionTitle>LT2 LIVE</VersionTitle>
            <VersionNumber>V1.1</VersionNumber>
          </VersionContent>
        </VersionItem>
      </VersionWrapper>
      <Group>
        <GroupTitle>{t('info.development')}</GroupTitle>
        <DevelopmentWrapper>
          <DevelopmentItem>Son Seoyun</DevelopmentItem>
          <DevelopmentItem>Kwon Hayul</DevelopmentItem>
          <DevelopmentItem>Kim Eunseo</DevelopmentItem>
        </DevelopmentWrapper>
      </Group>
      <Group>
        <GroupTitle>{t('info.license')}</GroupTitle>
        <LicenseWrapper>
          {licenses.map(license => (
            <LicenseItem
              href={`https://npmjs.com/package/${license}`}
              target={'_blank'}
              key={license}
            >
              {license}
            </LicenseItem>
          ))}
        </LicenseWrapper>
      </Group>
    </Layout>
  );
};

export default InfoTemplate;
