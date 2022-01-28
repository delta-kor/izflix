import { AnimatePresence, motion } from 'framer-motion';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BreadcrumbIcon } from '../../../icons/breadcrumb.svg';
import { MobileQuery, PcQuery } from '../../../styles';

const Layout = styled.div`
  display: flex;
  width: 100%;
  padding: 0 32px;
  margin: 0 0 4px 0;
  align-items: center;
  flex-flow: row wrap;
  line-height: 32px;
  min-height: 64px;

  & > * {
    margin: 0 4px 0 0;

    :last-child {
      margin: 0;
    }
  }

  &[data-compact='true'] {
    ${MobileQuery} {
      padding: 0 32px;
      line-height: unset;
      min-height: 32px;
      margin: 0;
    }

    ${PcQuery} {
      padding: 0;
      margin: 0;
    }
  }
`;

const Icon = styled(BreadcrumbIcon)`
  ${MobileQuery} {
    width: 24px;
    height: 24px;
  }

  ${PcQuery} {
    width: 32px;
    height: 32px;
  }

  &[data-compact='true'] {
    ${MobileQuery} {
      width: 12px;
      height: 12px;
    }

    ${PcQuery} {
      width: 24px;
      height: 24px;
    }
  }
`;

const Text = styled(Link)`
  margin: 0 4px 0 0;
  font-weight: normal;

  ${MobileQuery} {
    font-size: 16px;
  }

  ${PcQuery} {
    font-size: 20px;
  }

  &[data-compact='true'] {
    ${MobileQuery} {
      font-size: 12px;
    }

    ${PcQuery} {
      font-size: 16px;
    }
  }
`;

const Block = styled(motion.div)`
  display: flex;
  align-items: center;
`;

interface Props {
  path: IPath[];
  compact?: boolean;
}

class CategoryBreadcrumb extends Component<Props> {
  render() {
    const isCompact = this.props.compact || false;

    const transition = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { opacity: { duration: 0.2 } },
    };

    const contents = [];

    const initialBlock = (
      <Block key="home" layoutId={`home ${isCompact}`} {...transition}>
        <Text data-compact={isCompact} to={`/category`}>
          전체
        </Text>
        <Icon data-compact={isCompact} />
      </Block>
    );
    if (!isCompact) contents.push(initialBlock);

    for (const path of this.props.path) {
      contents.push(
        <Block key={path.path} layoutId={path.path + isCompact} {...transition}>
          <Text data-compact={isCompact} to={`/category/${path.path}`}>
            {path.name}
          </Text>
          <Icon data-compact={isCompact} />
        </Block>
      );
    }

    return (
      <Layout data-compact={isCompact}>
        <AnimatePresence>{contents}</AnimatePresence>
      </Layout>
    );
  }
}

export default CategoryBreadcrumb;
