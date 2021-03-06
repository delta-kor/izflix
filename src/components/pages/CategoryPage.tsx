import { AnimatePresence, motion } from 'framer-motion';
import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Constants from '../../constants';
import Scroll from '../../services/scroll';
import { MobileQuery, PcQuery } from '../../styles';
import CategoryBreadcrumb from '../actions/category/CategoryBreadcrumb';
import CategoryMenu from '../menus/CategoryMenu';
import Meta from '../Meta';

const Page = styled(motion.main)`
  width: 100%;
  max-width: 1416px;
  margin: 0 auto;

  ${MobileQuery} {
    padding: 80px 0 72px 0;
  }

  ${PcQuery} {
    padding: 0 0 64px 0;
  }
`;

interface Props {}

interface State {
  path: IPath[];
}

class CategoryPage extends Component<Props, State> {
  state: State = { path: [] };

  componentDidMount = () => {
    const point = Constants.LANDING_VIDEO_HEIGHT_PC() - 32;
    if (Constants.IS_PC()) {
      if (Scroll.getPosition() > point) Scroll.to(point);
    }
  };

  render() {
    const Menu = (
      <CategoryMenu setPath={(path: IPath[]) => this.setState({ path })} />
    );

    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Meta
          data={{
            title: this.state.path.length
              ? `${this.state.path.slice(-1)[0].name} - IZFLIX`
              : '카테고리 - IZFLIX',
            description: '카테고리별로 콘서트를 검색하세요',
            url: 'https://izflix.net/category',
          }}
        />
        <CategoryBreadcrumb path={this.state.path} />
        <AnimatePresence exitBeforeEnter>
          <Routes key={window.location.pathname}>
            <Route path="" element={Menu} />
            <Route path=":path" element={Menu} />
          </Routes>
        </AnimatePresence>
      </Page>
    );
  }
}

export default CategoryPage;
