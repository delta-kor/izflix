import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import GithubIcon from '../../icons/github.svg';
import VercelIcon from '../../icons/vercel.svg';
import { Color, HideOverflow, MobileQuery, PcQuery } from '../../styles';

const Page = styled(motion.div)`
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

const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  margin: 0 0 36px 0;
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

  & > img {
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

  & > img {
    width: 64px;
  }
`;

class InfoPage extends Component {
  render() {
    const frontLibraries = [
      'framer-motion',
      'node-cache',
      'react',
      'react-copy-to-clipboard',
      'react-responsive',
      'react-router-dom',
      'create-react-app',
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
      'express',
      'mongoose',
      'node-cache',
    ];

    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Wrapper>
          <Group>
            <GroupTitle>Repository</GroupTitle>
            <GithubWrapper>
              <GithubItem
                target="_blank"
                href="https://github.com/delta-kor/izflix"
              >
                <img src={GithubIcon} />
                <p>
                  delta-kor / <b>izflix</b>
                </p>
              </GithubItem>
              <GithubItem
                target="_blank"
                href="https://github.com/delta-kor/video-server"
              >
                <img src={GithubIcon} />
                <p>
                  delta-kor / <b>video-server</b>
                </p>
              </GithubItem>
            </GithubWrapper>
          </Group>
          <Group>
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
          </Group>
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
          <Vercel target="_blank" href="https://vercel.com/">
            <p>Powered By</p>
            <img src={VercelIcon} />
          </Vercel>
        </Wrapper>
      </Page>
    );
  }
}

export default InfoPage;
