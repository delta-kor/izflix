import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import Icon from '../../icons/Icon';
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
  const device = useDevice();

  const motionProps = {
    exit: { opacity: 0, transition: { duration: 0.2 } },
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
  };

  const scale = device === 'mobile' ? [1.1, 0.9] : [1.05, 0.95];

  const items = path.map(item => {
    const { title, id } = item;
    return (
      <Chip
        to={`/category/${id}`}
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
        layoutId={'root' + (shrinked ? 'shrinked' : 'default')}
        key={'root'}
        {...motionProps}
      >
        <Item hover={scale[0]} tap={scale[1]}>
          전체
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
