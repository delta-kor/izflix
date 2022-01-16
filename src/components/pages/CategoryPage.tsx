import { AnimatePresence, motion } from 'framer-motion';
import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { MobileQuery } from '../../styles';
import CategoryBreadcrumb from '../actions/category/CategoryBreadcrumb';
import CategoryMenu from '../menus/CategoryMenu';

const Page = styled(motion.div)`
  ${MobileQuery} {
    padding: 80px 0 72px 0;
  }
`;

interface Props {}

interface State {
  path: IPath[];
}

class CategoryPage extends Component<Props, State> {
  state: State = { path: [] };

  render() {
    return (
      <Page
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <CategoryBreadcrumb path={this.state.path} />
        <AnimatePresence exitBeforeEnter>
          <Routes key={window.location.pathname}>
            <Route path="" element={<CategoryMenu />} />
            <Route path=":path" element={<CategoryMenu />} />
          </Routes>
        </AnimatePresence>
      </Page>
    );
  }
}

export default CategoryPage;
