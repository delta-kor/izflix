import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import Scroll from '../../services/scroll';
import { HideOverflow, MobileQuery, PcQuery } from '../../styles';

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
  padding: 24px 32px;
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

class SettingsPage extends Component {
  componentDidMount = () => {
    Scroll.up();
  };

  render() {
    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Wrapper>
          <Group>
            <GroupTitle>재생</GroupTitle>
          </Group>
        </Wrapper>
      </Page>
    );
  }
}

export default SettingsPage;
