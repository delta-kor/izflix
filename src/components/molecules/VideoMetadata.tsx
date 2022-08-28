import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../icons/Icon';
import { dateToKey, getDate } from '../../services/time';
import { Color, MobileQuery, PcQuery, Placeholder, Text } from '../../styles';
import Breadcrumb from '../atoms/Breadcrumb';
import SmoothBox from '../atoms/SmoothBox';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 32px;

  ${MobileQuery} {
    gap: 8px;
  }

  ${PcQuery} {
    gap: 12px;
  }
`;

const DateArea = styled(SmoothBox)`
  display: inline-block;

  & > .content {
    display: flex;
    align-items: center;
    gap: 8px;

    cursor: pointer;
    user-select: none;
  }
`;

const DateIcon = styled(Icon)`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`;

const DateContent = styled.div`
  color: ${Color.WHITE};
  transform: skew(0.1deg);

  ${MobileQuery} {
    ${Text.BODY_2};
  }

  ${PcQuery} {
    ${Text.BODY_1};
  }
`;

const DatePlaceholder = styled.div`
  ${MobileQuery} {
    width: 90px;
    ${Placeholder.BODY_2};
  }

  ${PcQuery} {
    width: 140px;
    ${Placeholder.BODY_1};
  }
`;

const CategoryPlaceholder = styled.div`
  height: 20px;
  border-radius: 4px;
  background: ${Color.DARK_GRAY};

  ${MobileQuery} {
    width: 80%;
  }

  ${PcQuery} {
    width: 240px;
  }
`;

interface Props {
  videoInfo?: ApiResponse.Video.Info;
}

const VideoMetadata: React.FC<Props> = ({ videoInfo }) => {
  const navigate = useNavigate();

  const date = videoInfo?.date;
  const path = videoInfo?.path;

  const onDateAreaClick = () => {
    const dateKey = date && dateToKey(new Date(date));
    navigate('/calendar', { state: { date: dateKey } });
  };

  return (
    <Layout>
      <DateArea hover={1.05} tap={0.95} onClick={onDateAreaClick}>
        <DateIcon type={'calendar'} color={Color.WHITE} />
        {date ? <DateContent>{getDate(date)}</DateContent> : <DatePlaceholder />}
      </DateArea>
      {path ? <Breadcrumb path={path} shrinked /> : <CategoryPlaceholder />}
    </Layout>
  );
};

export default VideoMetadata;
