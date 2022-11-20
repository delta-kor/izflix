import { AnimatePresence, motion } from 'framer-motion';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import useDevice from '../../hooks/useDevice';
import { Color, MobileQuery, PcQuery, Text } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled(SmoothBox)`
  & > .content {
    display: flex;
    align-items: center;
    gap: 16px;

    user-select: none;
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 6px;
  min-width: 0;
`;

const Title = styled.div`
  color: ${Color.WHITE};

  ${MobileQuery} {
    ${Text.SUBTITLE_1};
    height: unset;
  }

  ${PcQuery} {
    ${Text.EX_SUBTITLE_1};
    height: unset;
  }
`;

const Description = styled.div`
  color: ${Color.WHITE};
  opacity: 0.7;

  ${MobileQuery} {
    ${Text.SUBTITLE_2};
    height: unset;
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
    height: unset;
  }
`;

const Checkbox = styled.div`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background-color: ${Color.GRAY};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Check = styled(motion.div)`
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background-color: ${Color.WHITE};
`;

interface Props {
  title: string;
  description: string;
  state: boolean | string;
  onClick?: MouseEventHandler;
}

const SettingsItem: React.FC<Props> = ({ title, description, state, onClick }) => {
  const device = useDevice();

  const scale = device === 'mobile' ? [1.05, 0.95] : [1.01, 0.99];

  return (
    <Layout hover={scale[0]} tap={scale[1]} onClick={onClick}>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
      {typeof state === 'boolean' && (
        <Checkbox>
          <AnimatePresence>
            {state && (
              <Check
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                key={'check'}
              />
            )}
          </AnimatePresence>
        </Checkbox>
      )}
    </Layout>
  );
};

export default SettingsItem;
