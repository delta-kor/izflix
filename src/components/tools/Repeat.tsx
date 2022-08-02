import { Component } from 'react';

interface Props {
  element: any;
  count: number;
}

class Repeat extends Component<Props, any> {
  render() {
    const { element: Element, count } = this.props;

    return Array(count)
      .fill(0)
      .map((_, i) => <Element key={i} />);
  }
}

export default Repeat;
