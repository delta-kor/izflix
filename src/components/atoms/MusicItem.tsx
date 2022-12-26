import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Color, MobileQuery, PcQuery } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled(SmoothBox)<{ $color: string }>`
  & > .content {
    display: flex;
    align-items: center;

    background: ${({ $color }) => $color};
    border-radius: 8px;

    cursor: pointer;
    user-select: none;

    transition: background 0.2s;

    ${MobileQuery} {
      padding: 14px 18px;
      gap: 12px;
    }

    ${PcQuery} {
      padding: 16px 28px;
      gap: 16px;
    }
  }
`;

const Content = styled.div`
  flex-grow: 1;

  font-size: 20px;
  font-weight: 700;

  color: ${Color.WHITE};
`;

const Count = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${Color.WHITE};
  opacity: 0.7;
`;

interface Props {
  data: IMusic;
  active: boolean;
  onClick: MouseEventHandler;
}

const MusicItem: React.FC<Props> = ({ data, active, onClick }) => {
  const onLayoutClick: MouseEventHandler = e => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <Layout
      $color={active ? Color.PRIMARY : Color.DARK_GRAY}
      hover={1.03}
      tap={0.97}
      onClick={onLayoutClick}
    >
      <Content>{data.title}</Content>
      <Count>{data.videos.length}</Count>
    </Layout>
  );
};

export default MusicItem;
