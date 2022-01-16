import { motion } from 'framer-motion';
import { Component } from 'react';
import { Params } from 'react-router-dom';
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
}

class CategoryMenu extends Component<Props, State> {
  state: State = { folders: [], files: [] };

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
    this.setState({ folders: data.folders });
    this.props.setPath(data.path);
  };

  loadOneCategory = async () => {
    const path = this.props.params.path!;
    const data = await Spaceship.viewOneCategory(path);
    if (!data.ok) return Transmitter.emit('popup', data.message);

    if (data.type === 'parent') this.setState({ folders: data.folders });
    else this.setState({ files: data.files });
    this.props.setPath(data.path);
  };

  render() {
    const placeholders = [];
    for (let i = 0; i < 20; i++) {
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
        {!this.state.folders.length && !this.state.files.length && placeholders}
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

export default withParams(CategoryMenu);
