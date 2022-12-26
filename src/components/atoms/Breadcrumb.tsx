import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import Icon from '../../icons/Icon';
import Tracker from '../../services/tracker';
import { Color, MobileQuery, PcQuery, Text } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled.div<{ $shrinked: boolean }>`
  display: flex;
  gap: 4px;
  align-items: center;
  flex-wrap: wrap;
  min-height: ${({ $shrinked }) => ($shrinked ? 'auto' : '44px')};

  zoom: ${({ $shrinked }) => ($shrinked ? 0.9 : 1)};
`;

const Chip = styled(motion(Link))`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const SeperatorIcon = styled(Icon)`
  ${MobileQuery} {
    width: 20px;
    height: 20px;
  }

  ${PcQuery} {
    width: 24px;
    height: 24px;
  }
`;

const Item = styled(SmoothBox)`
  & > .content {
    color: ${Color.WHITE};
    transform: skew(0.1deg);

    ${MobileQuery} {
      ${Text.BODY_2};
    }

    ${PcQuery} {
      ${Text.BODY_1};
    }
  }
`;

interface Props {
  path: IPath[];
  shrinked?: boolean;
}

const Breadcrumb: React.FC<Props> = ({ path, shrinked }) => {
  const { t } = useTranslation();
  const device = useDevice();

  const motionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const scale = device === 'mobile' ? [1.1, 0.9] : [1.05, 0.95];

  const items = path.map(item => {
    const { title, id } = item;
    return (
      <Chip
        to={`/category/${id}`}
        onClick={() => {
          const from = path.slice(-1)[0].id;
          const to = id;
          if (from === to) return false;
          Tracker.send('breadcrumb_clicked', { item_path: to, item_from: from });
        }}
        layoutId={id + (shrinked ? 'shrinked' : 'default')}
        key={id}
        {...motionProps}
      >
        <Item hover={scale[0]} tap={scale[1]}>
          {title}
        </Item>
        <SeperatorIcon type={'right'} color={Color.GRAY} />
      </Chip>
    );
  });

  !shrinked &&
    items.unshift(
      <Chip
        to={`/category/`}
        onClick={() =>
          Tracker.send('breadcrumb_clicked', { item_path: 'root', item_from: path.slice(-1)[0].id })
        }
        layoutId={'root' + (shrinked ? 'shrinked' : 'default')}
        key={'root'}
        {...motionProps}
      >
        <Item hover={scale[0]} tap={scale[1]}>
          {t('category.root')}
        </Item>
        <SeperatorIcon type={'right'} color={Color.GRAY} />
      </Chip>
    );

  return (
    <Layout $shrinked={!!shrinked}>
      <AnimateSharedLayout>
        <AnimatePresence>{items}</AnimatePresence>
      </AnimateSharedLayout>
    </Layout>
  );
};

export default Breadcrumb;
