import Page from './Page';

const CamResultPage: React.FC = () => {
  const location = useLocation();
  const game: ICampdGame = location.state?.game;

  return <Page></Page>;
};

export default CamResultPage;
