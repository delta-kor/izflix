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
  grid-template-rows: repeat(6, 38px);
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

type ItemType = 'deactivated' | 'activated' | 'highlighted' | 'selected';

const Item = styled.div<{ $type: ItemType }>`
  height: 38px;
  font-size: 16px;
  font-weight: 700;
  line-height: 38px;
  text-align: center;

  background: ${({ $type }) =>
    $type === 'deactivated'
      ? Color.TRANSPARENT
      : $type === 'activated'
      ? Color.TRANSPARENT
      : $type === 'highlighted'
      ? Color.GRAY
      : Color.PRIMARY};
  color: ${({ $type }) => ($type === 'deactivated' ? Color.GRAY : Color.WHITE)};

  border-radius: 4px;

  transform: skew(-0.1deg);
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

  const items = [];

  const daysInCurrentMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const daysInPrevMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    0
  ).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDay();

  for (let i = 0; i < firstDay; i++) {
    items.push(
      <Item key={'prev' + i} $type={'deactivated'}>
        {daysInPrevMonth - firstDay + i + 1}
      </Item>
    );
  }

  for (let i = 0; i < daysInCurrentMonth; i++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
    const timestampKey = date.toISOString().substring(2, 10).replace(/-/g, '');
    const timestamp = timestamps.find(t => t[0] === timestampKey);

    items.push(
      <Item key={i} $type={timestamp ? 'highlighted' : 'activated'}>
        {i + 1}
      </Item>
    );
  }

  for (let i = 0; i < 6 - lastDay; i++) {
    items.push(
      <Item key={'next' + i} $type={'deactivated'}>
        {i + 1}
      </Item>
    );
  }

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
      <Content>{items}</Content>
    </Layout>
  );
};

export default Calendar;
