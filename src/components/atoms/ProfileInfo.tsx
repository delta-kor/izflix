import styled from 'styled-components';
import Icon from '../../icons/Icon';
import { userIdToTag } from '../../services/user';
import { Color, HideOverflow, Placeholder, Text } from '../../styles';
import SmoothBox from './SmoothBox';

const Layout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 6px;
  min-width: 0;
`;

const Nickname = styled.div`
  color: ${Color.WHITE};
  ${Text.HEADLINE_1};
  ${HideOverflow};
`;

const UserIdContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;

  cursor: pointer;
  user-select: none;
`;

const UserId = styled.div`
  color: ${Color.GRAY};
  min-width: 100px;
  ${Text.SUBTITLE_1};
`;

const UserIdArrowIcon = styled(Icon)`
  flex-shrink: 0;
  width: 14px;
  height: 14px;
`;

const EditIconWrapper = styled(SmoothBox)`
  & > .content {
    padding: 8px;
    margin: 0 -8px 0 0;

    cursor: pointer;
  }
`;

const EditIcon = styled(Icon)`
  width: 24px;
  height: 24px;
`;

const NicknamePlaceholder = styled.div`
  width: 30%;
  ${Placeholder.HEADLINE_1};
`;

const UserIdPlaceholder = styled.div`
  width: 100px;
  ${Placeholder.SUBTITLE_1};
`;

interface Props {
  data?: IUser;
}

const ProfileInfo: React.FC<Props> = ({ data }) => {
  const userId = data?.id;
  const nickname = data?.nickname;

  return (
    <Layout>
      <Content>
        {nickname ? <Nickname>{nickname}</Nickname> : <NicknamePlaceholder />}
        <UserIdContent>
          {userId ? <UserId>{userIdToTag(userId)}</UserId> : <UserIdPlaceholder />}
          <UserIdArrowIcon type={'right'} color={Color.GRAY} />
        </UserIdContent>
      </Content>
      <EditIconWrapper hover={1.1} tap={0.9}>
        <EditIcon type={'edit'} color={Color.GRAY} />
      </EditIconWrapper>
    </Layout>
  );
};

export default ProfileInfo;
