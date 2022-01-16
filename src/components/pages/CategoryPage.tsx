import { motion } from 'framer-motion';
import { Component } from 'react';
import { Params } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import Transmitter from '../../services/transmitter';
import { MobileQuery } from '../../styles';
import CategoryBreadcrumb from '../actions/category/CategoryBreadcrumb';
import CategoryFile from '../actions/category/CategoryFile';
import CategoryFolder from '../actions/category/CategoryFolder';
import withParams from '../tools/Params';

const Page = styled(motion.div)`
  ${MobileQuery} {
    padding: 80px 0 72px 0;
  }
`;

interface Props {
  params: Params<string>;
}

interface State {
  path: IPath[];
  folders: ICategoryFolder[];
  files: ICategoryFile[];
}

class CategoryPage extends Component<Props, State> {
  state: State = { path: [], folders: [], files: [] };

  componentDidMount = () => {
    this.loadData();
  };

  loadData = () => {
    const path = this.props.params.path;
    if (!path) this.loadAllCategory();
    else this.loadOneCategory();
  };

  loadAllCategory = async () => {
    const data = await Spaceship.viewAllCategory();
    if (!data.ok) return Transmitter.emit('popup', data.message);
    this.setState({ folders: data.folders, path: data.path });
  };

  loadOneCategory = async () => {
    const path = this.props.params.path!;
    const data = await Spaceship.viewOneCategory(path);
    if (!data.ok) return Transmitter.emit('popup', data.message);

    if (data.type === 'parent')
      this.setState({ folders: data.folders, path: data.path });
    else this.setState({ files: data.files, path: data.path });
  };

  render() {
    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <CategoryBreadcrumb key="breakcrumb" path={this.state.path} />

        {this.state.folders.map((folder) => (
          <CategoryFolder key={folder.path} folder={folder} />
        ))}
        {this.state.files.map((file) => (
          <CategoryFile key={file.id} file={file} />
        ))}
      </Page>
    );
  }
}

export default withParams(CategoryPage);
