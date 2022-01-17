import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BreakcrumbIcon from '../../../icons/breadcrumb.svg';
import { MobileQuery, PcQuery } from '../../../styles';

const Layout = styled.div`
  display: flex;
  width: 100%;
  padding: 0 32px;
  margin: 0 0 4px 0;
  align-items: center;
  flex-flow: row wrap;
  line-height: 32px;
  min-height: 64px;

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
  margin: 0 4px 0 0;
  font-weight: normal;

  ${MobileQuery} {
    font-size: 16px;
  }

  ${PcQuery} {
    font-size: 20px;
  }
`;

const Block = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  path: IPath[];
}

class CategoryBreadcrumb extends Component<Props> {
  render() {
    const contents = [
      <Block key="home">
        <Text to={`/category`}>전체</Text>
        <Icon src={BreakcrumbIcon} />
      </Block>,
    ];

    let index: number = 1;
    for (const path of this.props.path) {
      contents.push(
        <Block key={path.path}>
          <Text to={`/category/${path.path}`}>{path.name}</Text>
          <Icon src={BreakcrumbIcon} />
        </Block>
      );
      index++;
    }

    return <Layout>{contents}</Layout>;
  }
}

export default CategoryBreadcrumb;
