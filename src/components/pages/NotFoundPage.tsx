import { motion } from 'framer-motion';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as NotFoundIcon } from '../../icons/not-found.svg';
import { Color, MobileQuery, PcQuery } from '../../styles';
import Meta from '../Meta';

const Page = styled(motion.div)``;

const Content = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-weight: bold;

  ${MobileQuery} {
    margin: 24px 0 0 0;
    font-size: 18px;
  }

  ${PcQuery} {
    margin: 32px 0 0 0;
    font-size: 24px;
  }
`;

const Back = styled(Link)`
  display: inline-block;
  font-weight: bold;
  background: ${Color.PRIMARY};
  border-radius: 4px;
  user-select: none;

  ${MobileQuery} {
    padding: 12px 20px;
    margin: 54px 0 0 0;
    font-size: 14px;
  }

  ${PcQuery} {
    padding: 14px 24px;
    margin: 64px 0 0 0;
    font-size: 16px;
  }
`;

class NotFoundPage extends Component {
  render() {
    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Meta
          data={{
            title: '404 Not Found - IZFLIX',
            description: '페이지를 찾을 수 없어요',
          }}
        />
        <Content>
          <Header>
            <NotFoundIcon />
            <Title>페이지를 찾을 수 없어요</Title>
          </Header>
          <Back to="/">메인화면</Back>
        </Content>
      </Page>
    );
  }
}

export default NotFoundPage;
