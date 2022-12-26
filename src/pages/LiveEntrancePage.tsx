import Meta from '../components/Meta';
import LiveEntranceTemplate from '../components/templates/LiveEntranceTemplate';
import Page from './Page';

const LiveEntrancePage: React.FC = () => {
  return (
    <Page>
      <Meta data={{ title: `LIVE - IZFLIX`, url: 'https://izflix.net/live' }} />
      <LiveEntranceTemplate />
    </Page>
  );
};

export default LiveEntrancePage;
