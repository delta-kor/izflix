import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Color, MobileQuery, PcInnerPadding, PcQuery } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-padding-left: 32px;

  ::-webkit-scrollbar {
    display: none;
  }

  ${MobileQuery} {
    padding: 0 32px;
    gap: 12px;
  }

  ${PcQuery} {
    padding: 0 ${PcInnerPadding};
    margin: 0 0 8px 0;
    gap: 18px;
  }
`;

const ClusterItem = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;

  ${MobileQuery} {
    gap: 4px;
    height: 28px;
  }

  ${PcQuery} {
    gap: 6px;
    height: 38px;
  }
`;

const ClusterContent = styled(SmoothBox)`
  scroll-snap-align: start;

  & > .content {
    font-weight: 700;
    color: ${Color.WHITE};
    white-space: nowrap;

    ${MobileQuery} {
      font-size: 18px;
    }

    ${PcQuery} {
      font-size: 24px;
    }
  }
`;

const ClusterHandle = styled(motion.div)`
  width: 100%;
  background: ${Color.PRIMARY};
  border-radius: 12px;

  ${MobileQuery} {
    height: 3px;
  }

  ${PcQuery} {
    height: 4px;
  }
`;

const Placeholder = styled.div`
  background: ${Color.DARK_GRAY};
  border-radius: 4px;

  ${MobileQuery} {
    width: 80px;
    height: 28px;
  }

  ${PcQuery} {
    width: 100px;
    height: 38px;
  }
`;

interface Props {
  clusters: string[];
  selected: string;
  setCluster(cluster: string): void;
}

const VideoCluster: React.FC<Props> = ({ clusters, selected, setCluster }) => {
  const { t } = useTranslation();

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (cluster: string) => {
    const parent = scrollRef.current;
    if (!parent) return false;

    const element = parent.querySelector(`.video-cluster[data-cluster="${cluster}"]`);
    element?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });

    setCluster(cluster);
  };

  return (
    <Layout ref={scrollRef}>
      {!clusters.length ? (
        <>
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </>
      ) : (
        [...clusters, 'others'].map(cluster => (
          <ClusterItem
            className={'video-cluster'}
            onClick={e => handleItemClick(cluster)}
            data-cluster={cluster}
            key={cluster}
          >
            <ClusterContent hover={1.05} tap={0.95}>
              {cluster === 'others' ? t('playlist.cluster_default') : cluster}
            </ClusterContent>
            {selected === cluster && <ClusterHandle layoutId={'cluster-handle'} />}
          </ClusterItem>
        ))
      )}
    </Layout>
  );
};

export default VideoCluster;
