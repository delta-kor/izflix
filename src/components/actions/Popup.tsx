import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import Transmitter from '../../services/transmitter';
import { Color } from '../../styles';

const Layout = styled(motion.div)`
  position: fixed;
  bottom: 72px;
  left: 12px;
  right: 12px;
  padding: 14px 16px;
  border-radius: 8px;
  background: ${Color.DARK_GRAY};
  z-index: 100;
`;

const Text = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  white-space: pre-wrap;
  color: ${Color.WHITE};
`;

interface State {
  active: boolean;
  message: string;
}

class Popup extends Component<any, State> {
  state: State = { active: false, message: '' };
  timeout: any;

  componentDidMount = () => {
    Transmitter.on('popup', this.showPopup);
  };

  componentWillUnmount = () => {
    Transmitter.removeListener('popup', this.showPopup);
  };

  showPopup = (message: string) => {
    this.setState({ active: true, message });

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ active: false }), 3000);
  };

  render() {
    return (
      <Layout
        variants={{ initial: { opacity: 0 }, active: { opacity: 1 } }}
        initial="initial"
        animate={this.state.active ? 'active' : 'initial'}
      >
        <Text>{this.state.message}</Text>
      </Layout>
    );
  }
}

export default Popup;
