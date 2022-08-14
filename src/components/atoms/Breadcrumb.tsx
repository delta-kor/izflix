import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import { Color, Text } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  flex-wrap: wrap;
  height: 48px;
`;

const Chip = styled(motion(Link))`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const SeperatorIcon = styled(Icon)`
  width: 20px;
  height: 20px;
`;

const Item = styled(SmoothBox)`
  color: ${Color.WHITE};
  ${Text.BODY_2};
`;

interface Props {
  path: IPath[];
  shrinked?: boolean;
}

const Breadcrumb: React.FC<Props> = ({ path, shrinked }) => {
  const motionProps = {
    exit: { opacity: 0, transition: { duration: 0.2 } },
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
  };

  const items = path.map(item => {
    const { title, id } = item;
    return (
      <Chip to={`/category/${id}`} layoutId={id} key={id} {...motionProps}>
        <Item hover={1.1} tap={0.9}>
          {title}
        </Item>
        <SeperatorIcon type={'right'} color={Color.GRAY} />
      </Chip>
    );
  });

  items.unshift(
    <Chip to={`/category/`} layoutId={'root'} key={'root'} {...motionProps}>
      <Item hover={1.1} tap={0.9}>
        전체
      </Item>
      <SeperatorIcon type={'right'} color={Color.GRAY} />
    </Chip>
  );

  return (
    <Layout>
      <AnimatePresence>{items}</AnimatePresence>
    </Layout>
  );
};

export default Breadcrumb;
