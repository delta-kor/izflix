import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BreakcrumbIcon from '../../../icons/breadcrumb.svg';

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 28px;
  padding: 0 32px 0 26px;
  margin: 0 0 16px 0;
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

const Text = styled(Link)`
  font-weight: normal;
  font-size: 16px;
`;

interface Props {
  path: IPath[];
}

class CategoryBreadcrumb extends Component<Props> {
  render() {
    const contents = [
      <Text to={`/category`} key={`text 0`}>
        전체
      </Text>,
      <Icon src={BreakcrumbIcon} key={`icon 0`} />,
    ];

    let index: number = 1;
    for (const path of this.props.path) {
      contents.push(
        <Text to={`/category/${path.path}`} key={`text ${index}`}>
          {path.name}
        </Text>
      );
      contents.push(<Icon src={BreakcrumbIcon} key={`icon ${index}`} />);
      index++;
    }

    return <Layout>{contents}</Layout>;
  }
}

export default CategoryBreadcrumb;
