import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import { MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import ListItem from '../atoms/ListItem';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    padding: 0 32px;
  }

  ${PcQuery} {
    padding: 0 ${PcInnerPadding};
    gap: 2px;
  }
`;

interface Props {
  playlists: IPlaylist[];
}

const PlaylistListSection: React.FC<Props> = ({ playlists }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      {playlists.length ? (
        playlists.map(data => (
          <ListItem
            title={data.title}
            count={t('common.count', { count: data.count })}
            type={'image'}
            value={Spaceship.getThumbnail(data.thumbnail)}
            link={`/playlist/${data.id}`}
            key={data.id}
          />
        ))
      ) : (
        <Repeat count={10} element={i => <ListItem type={'placeholder'} noDescription key={i} />} />
      )}
    </Layout>
  );
};

export default PlaylistListSection;
