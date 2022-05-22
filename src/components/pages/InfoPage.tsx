import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import { ReactComponent as GithubIcon } from '../../icons/github.svg';
import Scroll from '../../services/scroll';
import { Color, HideOverflow, MobileQuery, PcQuery } from '../../styles';
import Back from '../actions/Back';
import Meta from '../Meta';
import withParams from '../tools/Params';

const Page = styled(motion.main)`
  text-align: center;
`;

const Wrapper = styled.div`
  text-align: left;

  ${MobileQuery} {
    padding: 80px 0 96px 0;
  }

  ${PcQuery} {
    display: inline-block;
    padding: 96px 0 0 0;
    margin: 0 auto;
  }
`;

const Group = styled.div<{ $highlight?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
  background: ${({ $highlight }) => ($highlight ? Color.PRIMARY : 'none')};
  transition: background 0.2s;

  ${PcQuery} {
    border-radius: 8px;
  }
`;

const GroupTitle = styled.div`
  margin: 0 0 12px 0;
  font-weight: normal;
  font-size: 14px;
  ${HideOverflow};
`;

const GithubWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin: 0 0 10px 0;

    :last-child {
      margin: 0;
    }
  }
`;

const GithubItem = styled.a`
  display: flex;
  user-select: none;
  cursor: pointer;

  & > svg {
    width: 20px;
    height: 20px;
    margin: 0 8px 0 0;
  }

  & > p {
    font-weight: normal;
    font-size: 20px;
  }
`;

const ItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px 8px;
`;

const Item = styled.a`
  font-weight: bold;
  font-size: 16px;
  ${HideOverflow};
`;

const Vercel = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7;

  & > p {
    color: ${Color.GRAY};
    font-weight: bold;
    font-size: 18px;
    margin: 0 8px 0 0;
  }

  & > svg {
    zoom: 1.2;
  }
`;

interface Props {
  query: [URLSearchParams];
}

class InfoPage extends Component<Props> {
  componentDidMount = () => {
    Scroll.up();
  };

  render() {
    const frontLibraries = [
      'framer-motion',
      'node-cache',
      'react',
      'react-copy-to-clipboard',
      'react-helmet',
      'react-lazy-load-image-component',
      'react-responsive',
      'react-router-dom',
      'react-snap',
      'styled-components',
      'typescript',
      'web-vitals',
    ];

    const backLibraries = [
      'axios',
      'express',
      'class-transformer',
      'class-validator',
      'dotenv',
      'fluent-ffmpeg',
      'mongoose',
      'node-cache',
      'ws',
    ];

    const fanchantLibraries = [
      'axios',
      'framer-motion',
      'next',
      'react',
      'react-responsive',
      'styled-components',
    ];

    const key = this.props.query[0].get('k');
    const isHighlight = key === 'highlight';

    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Meta
          data={{
            title: '정보 - IZFLIX',
            description: '웹 애플리케이션 정보',
            url: `https://izflix.net/info`,
          }}
        />
        <Wrapper>
          <Back />
          <Group>
            <GroupTitle>Repository</GroupTitle>
            <GithubWrapper>
              <GithubItem
                target="_blank"
                href="https://github.com/delta-kor/izflix"
              >
                <GithubIcon />
                <p>
                  delta-kor / <b>izflix</b>
                </p>
              </GithubItem>
              <GithubItem
                target="_blank"
                href="https://github.com/delta-kor/izflix-fanchant"
              >
                <GithubIcon />
                <p>
                  delta-kor / <b>izflix-fanchant</b>
                </p>
              </GithubItem>
              <GithubItem
                target="_blank"
                href="https://github.com/delta-kor/video-server"
              >
                <GithubIcon />
                <p>
                  delta-kor / <b>video-server</b>
                </p>
              </GithubItem>
            </GithubWrapper>
          </Group>
          {/* <Group $highlight={isHighlight}>
            <GroupTitle>Video Source</GroupTitle>
            <ItemsWrapper>
              <Item target="_blank" href="https://twitter.com/sns12kr">
                슨스 (@sns12kr)
              </Item>
              <Item target="_blank" href="https://twitter.com/Greezman5">
                Shubby (@Greezman5)
              </Item>
              <Item>Russell</Item>
              <Item>DDOLVU</Item>
              <Item>벚꽃엔딩_48</Item>
              <Item>위즈아이</Item>
              <Item>센세</Item>
            </ItemsWrapper>
          </Group> */}
          <Group>
            <GroupTitle>Open Source License (Front End)</GroupTitle>
            <ItemsWrapper>
              {frontLibraries.map((key) => (
                <Item
                  key={key}
                  target="_blank"
                  href={`https://www.npmjs.com/package/${key}`}
                >
                  {key}
                </Item>
              ))}
            </ItemsWrapper>
          </Group>
          <Group>
            <GroupTitle>Open Source License (Fanchant Client)</GroupTitle>
            <ItemsWrapper>
              {fanchantLibraries.map((key) => (
                <Item
                  key={key}
                  target="_blank"
                  href={`https://www.npmjs.com/package/${key}`}
                >
                  {key}
                </Item>
              ))}
            </ItemsWrapper>
          </Group>
          <Group>
            <GroupTitle>Open Source License (Back End)</GroupTitle>
            <ItemsWrapper>
              {backLibraries.map((key) => (
                <Item
                  key={key}
                  target="_blank"
                  href={`https://www.npmjs.com/package/${key}`}
                >
                  {key}
                </Item>
              ))}
            </ItemsWrapper>
          </Group>
          <Vercel target="_blank" href="http://lt2.kr/">
            <p>Livifyed by lt2.kr</p>
          </Vercel>
        </Wrapper>
      </Page>
    );
  }
}

export default withParams(InfoPage);
