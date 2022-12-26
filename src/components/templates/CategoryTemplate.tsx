import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import CategoryInnerPage from '../../pages/CategoryInnerPage';
import CategoryBreadcrumbSection from '../organisms/CategoryBreadcrumbSection';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CategoryTemplate: React.FC = () => {
  const [path, setPath] = useState<IPath[]>([]);

  const InnerPage = <CategoryInnerPage setPath={setPath} />;

  return (
    <Layout>
      <CategoryBreadcrumbSection path={path} />
      <AnimatePresence exitBeforeEnter>
        <Routes key={window.location.pathname}>
          <Route path="" element={InnerPage} />
          <Route path=":id" element={InnerPage} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

export default CategoryTemplate;
