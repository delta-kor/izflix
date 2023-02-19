import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Settings from '../../services/settings';
import { Color, MobileQuery, PcQuery } from '../../styles';
import VideoCluster from '../atoms/VideoCluster';
import VodItem from '../molecules/VodItem';
import Repeat from '../tools/Repeat';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  z-index: 1;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 520px, ${Color.BACKGROUND} 521px);

  ${MobileQuery} {
    margin: -24px 0 0 0;
  }

  ${PcQuery} {
    margin: -16px 0 0 0;
    padding: 0 0 16px 0;
  }
`;

interface Props {
  playlists: IPlaylist[];
}

const VodSection: React.FC<Props> = ({ playlists }) => {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(
    Settings.getOne('$_VOD_CLUSTER')
  );

  useEffect(() => {
    if (playlists.length && !selectedCluster) {
      if (clusters.includes('아이즈원 츄')) setSelectedCluster('아이즈원 츄');
      if (clusters.includes('IZ*ONE CHU')) setSelectedCluster('IZ*ONE CHU');
    }
  }, [playlists]);

  const handleClusterSet = (cluster: string) => {
    Settings.setOne('$_VOD_CLUSTER', cluster);
    setSelectedCluster(cluster);
  };

  const clusters = useMemo<string[]>(
    () => [
      ...new Set(playlists.filter(playlist => playlist.cluster).map(playlist => playlist.cluster!)),
    ],
    [playlists]
  );

  return (
    <Layout>
      <VideoCluster
        clusters={clusters}
        selected={selectedCluster || 'others'}
        setCluster={handleClusterSet}
      />

      {playlists.length ? (
        playlists
          .filter(
            playlist =>
              (selectedCluster === 'others' && !playlist.cluster) ||
              playlist.cluster === selectedCluster
          )
          .map(data => <VodItem data={data} key={data.id} />)
      ) : (
        <Repeat count={5} element={i => <VodItem key={i} />} />
      )}
    </Layout>
  );
};

export default VodSection;
