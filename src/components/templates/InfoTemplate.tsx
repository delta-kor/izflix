import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import { Color, HideOverflow, MobileQuery, PcInnerPadding, PcQuery, Text } from '../../styles';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    padding: 0 32px;
    gap: 32px;
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
  ${MobileQuery} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px 8px;
  }

  ${PcQuery} {
    display: flex;
    align-items: center;
    gap: 32px;
  }
`;

const DevelopmentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  font-weight: 800;
  font-size: 20px;
  color: ${Color.WHITE};
`;

const DevelopmentIcon = styled(Icon)`
  width: 24px;
  height: 24px;
`;

const LicenseWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 8px;
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

  ${MobileQuery} {
    gap: 16px;
  }

  ${PcQuery} {
    gap: 24px;
  }
`;

const VersionItem = styled.a`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const VersionContent = styled.div`
  display: flex;
  gap: 10px;
`;

const VersionTitle = styled.div`
  font-weight: 800;
  color: ${Color.WHITE};

  ${MobileQuery} {
    font-size: 20px;
  }

  ${PcQuery} {
    font-size: 24px;
  }
`;

const VersionNumber = styled.div`
  font-weight: 400;
  color: ${Color.WHITE};
  opacity: 0.3;

  ${MobileQuery} {
    font-size: 20px;
  }

  ${PcQuery} {
    font-size: 24px;
  }
`;

const VersionLink = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 800;
  font-size: 16px;
  color: ${Color.WHITE};
  opacity: 0.3;
  transform: skew(0.1deg);
`;

const GithubIcon = styled(Icon)`
  width: 16px;
  height: 16px;
  opacity: 1;
`;

const Logo = styled(Icon)`
  zoom: 1.2;

  ${MobileQuery} {
    margin: 12px auto 0 auto;
    zoom: 1;
  }
`;

const NameWrapper = styled.div`
  ${MobileQuery} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px 4px;
  }

  ${PcQuery} {
    display: flex;
    align-items: center;
    gap: 32px;
  }
`;

const NameItem = styled.div`
  flex-shrink: 0;
  font-weight: 800;
  color: ${Color.WHITE};

  ${MobileQuery} {
    font-size: 16px;
  }

  ${PcQuery} {
    font-size: 18px;
  }
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
          <VersionLink>
            <GithubIcon type={'github'} color={Color.WHITE} />
            delta-kor/izflix
          </VersionLink>
        </VersionItem>
        <VersionItem href={'https://github.com/delta-kor/video-server'} target={'_blank'}>
          <VersionContent>
            <VersionTitle>IZFLIX API</VersionTitle>
            <VersionNumber>V2.0</VersionNumber>
          </VersionContent>
          <VersionLink>
            <GithubIcon type={'github'} color={Color.WHITE} />
            delta-kor/video-server
          </VersionLink>
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
          <DevelopmentItem title={'Application Development'}>
            <DevelopmentIcon type={'code'} color={Color.WHITE} />
            Son Seoyun
          </DevelopmentItem>
          <DevelopmentItem title={'Contents Management'}>
            <DevelopmentIcon type={'management'} color={Color.WHITE} />
            Kwon Hayul
          </DevelopmentItem>
          <DevelopmentItem title={'Subtitle Editor'}>
            <DevelopmentIcon type={'subtitle'} color={Color.WHITE} />
            Kim Eunseo
          </DevelopmentItem>
        </DevelopmentWrapper>
      </Group>
      <Group>
        <GroupTitle>{t('info.subtitle')}</GroupTitle>
        <NameWrapper>
          <NameItem>@ruo_xi_ss</NameItem>
          <NameItem>@YNF</NameItem>
          <NameItem>@Skell6009</NameItem>
          <NameItem>@Crensation</NameItem>
          <NameItem>@Yubseyo</NameItem>
          <NameItem>@boris</NameItem>
        </NameWrapper>
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
      <Logo type={'logo'} color={Color.WHITE} />
    </Layout>
  );
};

export default InfoTemplate;
