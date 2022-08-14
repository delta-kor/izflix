import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoryInnerPage from './CategoryInnerPage';
import Page from './Page';

const CategoryPage: React.FC = () => {
  const [path, setPath] = useState<IPath[]>([]);

  const InnerPage = <CategoryInnerPage setPath={setPath} />;

  return (
    <Page>
      <AnimatePresence exitBeforeEnter>
        <Routes key={window.location.pathname}>
          <Route path="" element={InnerPage} />
          <Route path=":id" element={InnerPage} />
        </Routes>
      </AnimatePresence>
    </Page>
  );
};

export default CategoryPage;
