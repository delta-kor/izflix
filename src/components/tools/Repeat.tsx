import { Component } from 'react';

interface Props {
  count: number;
}

class Repeat extends Component<Props, any> {
  render() {
    const count = this.props.count;
    const children = this.props.children as (i: number) => void;

    return Array(count)
      .fill(0)
      .map((_, i) => children(i));
  }
}

export default Repeat;
