import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Evoke from '../../filters/evoke';
import useModal from '../../hooks/useModal';
import { User } from '../../hooks/useUser';
import Icon from '../../icons/Icon';
import Transmitter from '../../services/transmitter';
import { userIdToTag } from '../../services/user';
import { Color, HideOverflow, MobileQuery, PcQuery, Placeholder, Text } from '../../styles';
import InputModal from '../modals/InputModal';
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
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.HEADLINE_1};
  }

  ${PcQuery} {
    ${Text.EX_HEADLINE_1};
  }
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

  ${MobileQuery} {
    min-width: 100px;
    ${Text.SUBTITLE_1};
  }

  ${PcQuery} {
    min-width: 124px;
    ${Text.EX_SUBTITLE_1};
  }
`;

const UserIdArrowIcon = styled(Icon)`
  flex-shrink: 0;

  ${MobileQuery} {
    width: 14px;
    height: 14px;
  }

  ${PcQuery} {
    width: 20px;
    height: 20px;
  }
`;

const EditIconWrapper = styled(SmoothBox)`
  & > .content {
    padding: 8px;
    margin: 0 -8px 0 0;

    cursor: pointer;
  }
`;

const EditIcon = styled(Icon)`
  ${MobileQuery} {
    width: 24px;
    height: 24px;
  }

  ${PcQuery} {
    width: 28px;
    height: 28px;
  }
`;

const NicknamePlaceholder = styled.div`
  ${MobileQuery} {
    width: 50%;
    ${Placeholder.HEADLINE_1};
  }

  ${PcQuery} {
    width: 30%;
    ${Placeholder.EX_HEADLINE_1};
  }
`;

const UserIdPlaceholder = styled.div`
  ${MobileQuery} {
    width: 100px;
    ${Placeholder.SUBTITLE_1};
  }

  ${PcQuery} {
    width: 124px;
    ${Placeholder.EX_SUBTITLE_1};
  }
`;

interface Props {
  user: User;
}

const ProfileInfo: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation();
  const modal = useModal();

  const userId = user.user?.id;
  const nickname = user.user?.nickname;

  const onEditClick: MouseEventHandler = () => {
    if (!user.user) return false;
    modal.openModal(InputModal, {
      content: t('profile.update_nickname'),
      value: nickname,
      placeholder: t('profile.input_nickname'),
      maxLength: 12,
      onSubmit(data) {
        onNicknameUpdate(data.nickname);
      },
    });
  };

  const onNicknameUpdate = (nickname: string) => {
    if (nickname === user.user?.nickname) return true;
    new Evoke(user.updateNickname(nickname)).then(() => {
      Transmitter.emit('popup', {
        type: 'success',
        message: t('profile.nickname_updated'),
      });
    });
  };

  return (
    <Layout>
      <Content>
        {nickname ? <Nickname>{nickname}</Nickname> : <NicknamePlaceholder />}
        <UserIdContent>
          {userId ? <UserId>{userIdToTag(userId)}</UserId> : <UserIdPlaceholder />}
          <UserIdArrowIcon type={'right'} color={Color.GRAY} />
        </UserIdContent>
      </Content>
      <EditIconWrapper hover={1.1} tap={0.9} onClick={onEditClick}>
        <EditIcon type={'edit'} color={Color.GRAY} />
      </EditIconWrapper>
    </Layout>
  );
};

export default ProfileInfo;
