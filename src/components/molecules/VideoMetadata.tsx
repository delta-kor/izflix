import styled from 'styled-components';
import Icon from '../../icons/Icon';
import { getDate } from '../../services/time';
import { Color, MobileQuery, PcQuery, Placeholder, Text } from '../../styles';
import Breadcrumb from '../atoms/Breadcrumb';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 32px;

  ${MobileQuery} {
    gap: 8px;
  }

  ${PcQuery} {
    gap: 12px;
  }
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;
  user-select: none;
`;

const DateIcon = styled(Icon)`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`;

const DateContent = styled.div`
  color: ${Color.WHITE};
  transform: skew(-0.1deg);

  ${MobileQuery} {
    ${Text.BODY_2};
  }

  ${PcQuery} {
    ${Text.BODY_1};
  }
`;

const DatePlaceholder = styled.div`
  width: 90px;
  ${Placeholder.BODY_2};
`;

const CategoryPlaceholder = styled.div`
  width: 80%;
  height: 20px;
  border-radius: 4px;
  background: ${Color.DARK_GRAY};
`;

interface Props {
  videoInfo?: ApiResponse.Video.Info;
}

const VideoMetadata: React.FC<Props> = ({ videoInfo }) => {
  const date = videoInfo?.date;
  const path = videoInfo?.path;

  return (
    <Layout>
      <Date>
        <DateIcon type={'calendar'} color={Color.WHITE} />
        {date ? <DateContent>{getDate(date)}</DateContent> : <DatePlaceholder />}
      </Date>
      {path ? <Breadcrumb path={path} shrinked /> : <CategoryPlaceholder />}
    </Layout>
  );
};

export default VideoMetadata;
