import { AnimatePresence, motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import Transmitter from '../../services/transmitter';
import { Color, MobileQuery, PcQuery } from '../../styles';

const Layout = styled(motion.div)`
  position: fixed;
  padding: 14px 16px;
  background: ${Color.DARK_GRAY};
  border-radius: 8px;
  z-index: 100;

  ${MobileQuery} {
    bottom: 72px;
    left: 12px;
    right: 12px;
  }

  ${PcQuery} {
    border: 2px solid ${Color.PRIMARY};
    bottom: 16px;
    left: 32px;
    right: unset;
    min-width: 30%;
  }
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
    document.addEventListener('click', this.hidePopup);
  };

  componentWillUnmount = () => {
    Transmitter.removeListener('popup', this.showPopup);
    document.removeEventListener('click', this.hidePopup);
  };

  showPopup = (message: string) => {
    this.setState({ active: true, message });

    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.hidePopup, 4000);
  };

  hidePopup = () => {
    setTimeout(() => this.setState({ active: false }), 100);
  };

  render() {
    return (
      <AnimatePresence>
        {this.state.active && (
          <Layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="popup"
          >
            <Text>{this.state.message}</Text>
          </Layout>
        )}
      </AnimatePresence>
    );
  }
}

export default Popup;
