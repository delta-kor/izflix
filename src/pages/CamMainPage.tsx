import Meta from '../components/Meta';
import Page from './Page';

const CamMainPage: React.FC = () => {
  return (
    <Page>
      <Meta data={{ title: `CAM PD - IZFLIX`, url: 'https://izflix.net/campd' }} />
      CAMPD
    </Page>
  );
};

export default CamMainPage;
