import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FolderIcon from '../../../icons/folder.svg';
import { HideOverflow, MobileQuery, PcQuery } from '../../../styles';

const Layout = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;

  ${MobileQuery} {
    height: 54px;
    padding: 0 32px 0 28px;
  }

  ${PcQuery} {
    height: 72px;
    padding: 0 32px 0 28px;
  }
`;

const Icon = styled.img`
  display: block;
  flex-shrink: 0;

  ${MobileQuery} {
    height: 30px;
    width: 30px;
  }

  ${PcQuery} {
    height: 36px;
    width: 36px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  flex-grow: 1;
  ${HideOverflow};

  ${MobileQuery} {
    font-size: 20px;
    margin: 0 20px;
  }

  ${PcQuery} {
    font-size: 24px;
    margin: 0 32px;
  }
`;

const Count = styled.div`
  flex-shrink: 0;
  font-weight: normal;
  opacity: 0.7;

  ${MobileQuery} {
    font-size: 14px;
  }

  ${PcQuery} {
    font-size: 20px;
  }
`;

interface Props {
  folder: ICategoryFolder;
}

class CategoryFolder extends Component<Props> {
  render() {
    const folder = this.props.folder;

    return (
      <Layout to={`/category/${folder.path}`}>
        <Icon src={FolderIcon} />
        <Title>{folder.title}</Title>
        <Count>{folder.count} 개</Count>
      </Layout>
    );
  }
}

export default CategoryFolder;
