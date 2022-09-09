import { useSearchParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Page from './Page';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  if (!query) return <ErrorPage data={'error.not_found'} />;

  return <Page>Search Page</Page>;
};

export default SearchPage;
