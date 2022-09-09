import SearchSection from '../organisms/SearchSection';

interface Props {
  videos: IVideo[] | null;
}

const SearchTemplate: React.FC<Props> = ({ videos }) => {
  return <SearchSection videos={videos} />;
};

export default SearchTemplate;
