import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Spaceship from '../../services/spaceship';
import { MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import ListItem from '../atoms/ListItem';

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  ${MobileQuery} {
    padding: 0 32px;
    gap: 2px;
  }

  ${PcQuery} {
    padding: 0 ${PcInnerPadding};
    gap: 4px;
  }
`;

interface Props {
  playlists: IPlaylist[];
}

const PlaylistListSection: React.FC<Props> = ({ playlists }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      {playlists.map(data => (
        <ListItem
          title={data.title}
          count={t('common.count', { count: data.count })}
          type={'image'}
          value={Spaceship.getThumbnail(data.thumbnail)}
          link={`/playlist/${data.id}`}
          key={data.id}
        />
      ))}
    </Layout>
  );
};

export default PlaylistListSection;
