import CategorySection from '../organisms/CategorySection';

interface Props {
  setPath(path: IPath[]): void;
  category?: ApiResponse.Category.View;
}

const CategoryInnerTemplate: React.FC<Props> = ({ setPath, category }) => {
  return <CategorySection setPath={setPath} category={category} />;
};

export default CategoryInnerTemplate;
