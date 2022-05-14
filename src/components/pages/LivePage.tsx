import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import Pingpong from '../../services/pingpong';
import LiveHeader from '../menus/LiveHeader';

const Page = styled(motion.main)`
  text-align: center;
`;

interface State {
  users: Map<string, UserInfo>;
  liveUsers: Map<string, UserInfo>;
}

class LivePage extends Component<any, State> {
  pingpong!: Pingpong;

  state: State = {
    users: new Map(),
    liveUsers: new Map(),
  };

  componentDidMount = () => {
    this.pingpong = new Pingpong(process.env.REACT_APP_SOCKET_BASE!);
    this.mountEventListeners();
  };

  mountEventListeners = () => {
    this.pingpong.on('usersync', (infos) => {
      this.addUser(...infos);
    });
    this.pingpong.on('userconnect', (...infos) => {
      this.addUser(...infos);

      const liveUsers = this.state.liveUsers;
      for (const info of infos) liveUsers.set(info.id, info);
      this.setState({ liveUsers });
    });
    this.pingpong.on('userdisconnect', (...ids) => {
      const liveUsers = this.state.liveUsers;
      for (const id of ids) liveUsers.delete(id);
      this.setState({ liveUsers });
    });
  };

  addUser = (...infos: UserInfo[]) => {
    const users = this.state.users;
    for (const info of infos) users.set(info.id, info);
    this.setState({ users });
  };

  render() {
    return (
      <Page>
        <LiveHeader liveCount={this.state.liveUsers.size} />
      </Page>
    );
  }
}

export default LivePage;
