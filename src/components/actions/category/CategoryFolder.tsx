import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FolderIcon from '../../../icons/folder.svg';
import { HideOverflow } from '../../../styles';

const Layout = styled(Link)`
  display: flex;
  width: 100%;
  height: 54px;
  padding: 0 32px;
  align-items: center;
`;

const Icon = styled.img`
  display: block;
  width: 30px;
  height: 30px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  flex-grow: 1;
  margin: 0 20px;
  ${HideOverflow};
`;

const Count = styled.div`
  font-weight: normal;
  font-size: 14px;
  opacity: 0.7;
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
