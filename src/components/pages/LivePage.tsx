import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import Pingpong from '../../services/pingpong';

const Page = styled(motion.main)`
  text-align: center;
`;

const pingpong = new Pingpong(process.env.REACT_APP_SOCKET_BASE!);

class LivePage extends Component {
  render() {
    return (
      <Page>
        <h1>live</h1>
      </Page>
    );
  }
}

export default LivePage;
