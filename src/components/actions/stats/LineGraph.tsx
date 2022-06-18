import { motion } from 'framer-motion';
import { Component } from 'react';
import styled from 'styled-components';
import { Color } from '../../../styles';

const GraphItem = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`;

const GraphKey = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GraphTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: ${Color.WHITE};
`;

const GraphValue = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: ${Color.WHITE};
  text-align: right;
`;

const GraphBody = styled.div`
  flex-grow: 1;
  height: 6px;
  border-radius: 8px;
  background: ${Color.DARK_GRAY};
`;

const GraphIndicator = styled(motion.div)`
  height: 100%;
  border-radius: 8px;
  background: ${Color.PRIMARY};
`;

interface Props {
  title: string;
  value: number;
}

export default class LineGraph extends Component<Props> {
  render() {
    const graphMotion = {
      initial: { width: 0 },
      transition: { duration: 0.2, ease: 'easeOut' },
    };

    return (
      <GraphItem>
        <GraphKey>
          <GraphTitle>{this.props.title}</GraphTitle>
          <GraphValue>{this.props.value}%</GraphValue>
        </GraphKey>
        <GraphBody>
          <GraphIndicator
            animate={{ width: `${this.props.value}%` }}
            {...graphMotion}
          />
        </GraphBody>
      </GraphItem>
    );
  }
}
