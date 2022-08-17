import { useState } from 'react';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import { getMonth } from '../../services/time';
import { Color, Text } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
`;

const HandleIconWrapper = styled(SmoothBox)`
  flex-shrink: 0;

  & > .content {
    position: relative;
    width: 32px;
    height: 32px;
  }
`;

const HandleIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
`;

const HandleTitle = styled.div`
  flex-grow: 1;
  color: ${Color.WHITE};
  text-align: center;
  ${Text.HEADLINE_1};
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

interface Props {
  timestamps: CalendarTimestamp[];
}

const Calendar: React.FC<Props> = ({ timestamps }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date('2021-03-01'));

  const onHandleIconClick = (type: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (type === 'next') newMonth.setMonth(newMonth.getMonth() + 1);
    else newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const handleIconWrapperMotionProps = { hover: 1.1, tap: 0.9 };

  return (
    <Layout>
      <Handle>
        <HandleIconWrapper
          onClick={() => onHandleIconClick('prev')}
          {...handleIconWrapperMotionProps}
        >
          <HandleIcon type={'left'} color={Color.GRAY} />
        </HandleIconWrapper>
        <HandleTitle>{getMonth(currentMonth)}</HandleTitle>
        <HandleIconWrapper
          onClick={() => onHandleIconClick('next')}
          {...handleIconWrapperMotionProps}
        >
          <HandleIcon type={'right'} color={Color.GRAY} />
        </HandleIconWrapper>
      </Handle>
    </Layout>
  );
};

export default Calendar;
