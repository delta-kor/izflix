import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BreakcrumbIcon from '../../../icons/breadcrumb.svg';
import { MobileQuery, PcQuery } from '../../../styles';

const Layout = styled.div`
  display: flex;
  width: 100%;
  padding: 0 32px;
  margin: 0 0 16px 0;
  align-items: center;

  ${MobileQuery} {
    height: 28px;
  }

  ${PcQuery} {
    height: 32px;
  }

  & > * {
    margin: 0 4px 0 0;

    :last-child {
      margin: 0;
    }
  }
`;

const Icon = styled.img`
  ${MobileQuery} {
    width: 24px;
    height: 24px;
  }

  ${PcQuery} {
    width: 32px;
    height: 32px;
  }
`;

const Text = styled(Link)`
  font-weight: normal;

  ${MobileQuery} {
    font-size: 16px;
  }

  ${PcQuery} {
    font-size: 20px;
  }
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
