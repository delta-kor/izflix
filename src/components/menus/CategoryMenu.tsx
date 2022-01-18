import { motion } from 'framer-motion';
import { Component } from 'react';
import { Navigate, Params } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import Transmitter from '../../services/transmitter';
import { Color, MobileQuery, PcQuery } from '../../styles';
import CategoryFile from '../actions/category/CategoryFile';
import CategoryFolder from '../actions/category/CategoryFolder';
import withParams from '../tools/Params';

const Page = styled(motion.div)`
  width: 100%;
  ${PcQuery} {
    min-height: calc(100vh - 120px - 108px);
  }
`;

const Placeholder = styled.div`
  position: relative;
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

  & > *:nth-child(1) {
    display: block;
    flex-shrink: 0;
    border-radius: 4px;
    background: ${Color.DARK_GRAY};

    ${MobileQuery} {
      height: 36px;
      width: 36px;
    }

    ${PcQuery} {
      height: 48px;
      width: 48px;
    }
  }

  & > *:nth-child(2) {
    width: 50%;
    border-radius: 4px;
    background: ${Color.DARK_GRAY};

    ${MobileQuery} {
      height: 24px;
      margin: 0 20px 0 14px;
    }

    ${PcQuery} {
      height: 28px;
      margin: 0 32px 0 22px;
    }
  }

  & > *:nth-child(3) {
    flex-grow: 1;
  }

  & > *:nth-child(4) {
    flex-shrink: 0;
    border-radius: 4px;
    background: ${Color.DARK_GRAY};

    ${MobileQuery} {
      height: 24px;
      width: 36px;
    }

    ${PcQuery} {
      height: 24px;
      width: 48px;
    }
  }
`;

interface Props {
  params: Params<string>;
  setPath(path: IPath[]): void;
}

interface State {
  folders: ICategoryFolder[];
  files: ICategoryFile[];
  error: boolean;
}

const childrenCountMap: Map<string, number> = new Map();

class CategoryMenu extends Component<Props, State> {
  state: State = { folders: [], files: [], error: false };

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
    if (!data.ok) return this.onLoadError(data.message);

    for (let folder of data.folders)
      childrenCountMap.set(folder.path, folder.children);

    this.setState({ folders: data.folders });
    this.props.setPath(data.path);
  };

  loadOneCategory = async () => {
    const path = this.props.params.path!;
    const data = await Spaceship.viewOneCategory(path);
    if (!data.ok) return this.onLoadError(data.message);

    if (data.type === 'parent') {
      this.setState({ folders: data.folders });
      for (let folder of data.folders)
        childrenCountMap.set(folder.path, folder.children);
    } else this.setState({ files: data.files });

    this.props.setPath(data.path);
  };

  onLoadError = (message?: string) => {
    Transmitter.emit('popup', message);
    this.setState({ error: true });
  };

  render() {
    const path = this.props.params.path;
    const count = !path ? 4 : childrenCountMap.get(path!) || 24;

    const placeholders = [];
    for (let i = 0; i < count; i++) {
      placeholders.push(
        <Placeholder key={i}>
          <div />
          <div />
          <div />
          <div />
        </Placeholder>
      );
    }

    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {this.state.error && <Navigate to="/category" />}
        {!this.state.folders.length && !this.state.files.length && placeholders}
        {this.state.folders.map((folder) => (
          <CategoryFolder key={folder.path} folder={folder} />
        ))}
        {this.state.files.map((file) => (
          <CategoryFile key={file.id} folderId={path!} file={file} />
        ))}
      </Page>
    );
  }
}

export default withParams(CategoryMenu);
