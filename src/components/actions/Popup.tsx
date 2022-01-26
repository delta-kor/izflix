import { AnimatePresence, motion } from 'framer-motion';
import React, { Component, ReactElement } from 'react';
import styled from 'styled-components';
import Transmitter from '../../services/transmitter';
import { Color, MobileQuery, PcQuery } from '../../styles';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 1000;

  ${MobileQuery} {
    bottom: 84px;
    left: 12px;
    right: 12px;
  }

  ${PcQuery} {
    bottom: 16px;
    left: 32px;
    right: unset;
    min-width: 30%;
  }
`;

const Layout = styled(motion.div)`
  width: 100%;
  padding: 14px 16px;
  background: ${Color.DARK_GRAY};
  border-radius: 8px;
  border: 2px solid ${Color.PRIMARY};
  user-select: none;
  cursor: pointer;

  ${PcQuery} {
    margin: 12px 0 0 0;
  }

  ${MobileQuery} {
    margin: 8px 0 0 0;
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
  contents: Map<string, string>;
}

class Popup extends Component<any, State> {
  state: State = { contents: new Map() };

  componentDidMount = () => {
    Transmitter.on('popup', this.showPopup);
  };

  componentWillUnmount = () => {
    Transmitter.removeListener('popup', this.showPopup);
  };

  showPopup = (message: string) => {
    const id = message;
    const contents = this.state.contents.set(id, message);
    this.setState({ contents });
    setTimeout(() => this.hidePopup(id), 4000);

    const old = Array.from(contents.keys()).slice(
      0,
      Math.max(contents.size - 3, 0)
    );
    old.forEach(this.hidePopup);
  };

  hidePopup = (id: string) => {
    this.state.contents.delete(id);
    this.setState({ contents: this.state.contents });
  };

  render() {
    const animation = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { opacity: { delay: 0.1 } },
    };

    const contents: ReactElement[] = [];
    this.state.contents.forEach((message, key) => {
      contents.push(
        <Layout
          key={key}
          layoutId={key.toString()}
          onClick={() => this.hidePopup(key)}
          {...animation}
        >
          <Text>{message}</Text>
        </Layout>
      );
    });

    return (
      <Wrapper>
        <AnimatePresence>{contents}</AnimatePresence>
      </Wrapper>
    );
  }
}

export default Popup;
