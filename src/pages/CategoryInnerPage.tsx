import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CategoryInnerTemplate from '../components/templates/CategoryInnerTemplate';
import HttpException from '../exceptions/http-exception';
import PathFinder from '../services/path-finder';
import Spaceship from '../services/spaceship';
import Page from './Page';

const Layout = styled(motion.div)``;

interface Props {
  setPath(path: IPath[]): void;
}

const CategoryInnerPage: React.FC<Props> = ({ setPath }) => {
  const params = useParams();
  const id = params.id || null;

  const [category, setCategory] = useState<ApiResponse.Category.View | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  const loadCategory = async (id: string | null) => {
    const response = await Spaceship.viewCategory(id);
    if (!response.ok) throw new HttpException(response);

    setCategory(response);
    setPath(response.path);

    for (const path of response.path) {
      PathFinder.set(path.id, path.children);
    }

    if (response.type === 'folder') {
      for (const data of response.data) {
        PathFinder.set(data.id, data.children);
      }
    }
  };

  const loadData = () => {
    loadCategory(id);
  };

  return (
    <Page noStyle>
      <CategoryInnerTemplate setPath={setPath} category={category} />
    </Page>
  );
};

export default CategoryInnerPage;
