import { Component } from 'react';
import styled from 'styled-components';
import BreakcrumbIcon from '../../../icons/breadcrumb.svg';

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 24px;
  padding: 0 32px 0 26px;
  margin: 0 0 8px 0;
  align-items: center;

  & > * {
    margin: 0 4px 0 0;

    :last-child {
      margin: 0;
    }
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Text = styled.div`
  font-weight: normal;
  font-size: 16px;
`;

interface Props {
  path: string[];
}

class CategoryBreadcrumb extends Component<Props> {
  render() {
    const icon = <Icon src={BreakcrumbIcon} />;
    const contents = [];
    contents.push(icon);

    for (const path of this.props.path) {
      contents.push(<Text>{path}</Text>);
      contents.push(icon);
    }

    return <Layout>{contents}</Layout>;
  }
}

export default CategoryBreadcrumb;
