import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HttpException from '../../exceptions/http-exception';
import Evoke from '../../filters/evoke';
import useModal from '../../hooks/useModal';
import Icon from '../../icons/Icon';
import Spaceship from '../../services/spaceship';
import Transmitter from '../../services/transmitter';
import { Color, HideOverflow, MobileQuery, PcQuery, Placeholder, Text } from '../../styles';
import Button from '../atoms/Button';
import SmoothBox from '../atoms/SmoothBox';
import SmoothImage from '../atoms/SmoothImage';
import { Pc } from '../tools/MediaQuery';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 0 4px 0;

  ${PcQuery} {
    position: fixed;
    width: 326px;

    z-index: 1;
  }
`;

const Thumbnail = styled(SmoothImage)`
  width: 100%;
  margin: 0 0 8px 0;
  aspect-ratio: 16 / 9;

  border-radius: 8px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
`;

const TitleContent = styled.div`
  color: ${Color.WHITE};
  ${HideOverflow};

  ${MobileQuery} {
    ${Text.HEADLINE_3};
    height: unset;
  }

  ${PcQuery} {
    ${Text.HEADLINE_1};
    height: unset;
  }
`;

const IconWrapper = styled(SmoothBox)`
  flex-shrink: 0;

  & > .content {
    cursor: pointer;

    ${MobileQuery} {
      width: 22px;
      height: 22px;
    }

    ${PcQuery} {
      width: 24px;
      height: 24px;
    }
  }
`;

const IconContent = styled(Icon)`
  ${MobileQuery} {
    width: 22px;
    height: 22px;
  }

  ${PcQuery} {
    width: 24px;
    height: 24px;
  }
`;

const Description = styled.div`
  margin: 0 0 8px 0;

  color: ${Color.WHITE};
  opacity: 0.7;

  ${MobileQuery} {
    ${Text.BODY_3};
    line-height: 16px;
    height: unset;
  }

  ${PcQuery} {
    ${Text.SUBTITLE_1};
    font-weight: 400;
    height: unset;
  }
`;

const TitlePlaceholder = styled.div`
  width: 70%;

  ${MobileQuery} {
    ${Placeholder.HEADLINE_3};
  }

  ${PcQuery} {
    ${Placeholder.HEADLINE_1};
  }
`;

const DescriptionPlaceholder = styled.div`
  width: 100%;
  margin: 0 0 8px 0;

  & > div {
    width: 100%;

    ${MobileQuery} {
      ${Placeholder.BODY_3};
      height: 10px;
      margin: 3px 0;
    }

    ${PcQuery} {
      ${Placeholder.SUBTITLE_1};
      height: 14px;
      margin: 3px 0;
    }
  }
`;

interface Props {
  data?: IPlaylist;
  access: boolean;
}

const PlaylistInfo: React.FC<Props> = ({ data, access }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const modal = useModal();

  const [title, setTitle] = useState<string | undefined>(data && data.title);

  useEffect(() => {
    setTitle(data && data.title);
  }, [data]);

  const thumbnail = data && Spaceship.getThumbnail(data.thumbnail);
  const description = data && data.description;
  const link = data && data.video[0] && `/${data.video[0].id}`;
  const linkState = data && { key: 'playlist', value: data && data.id };

  const renameUserPlaylist = async (id: string, title: string) => {
    const response = await Spaceship.renameUserPlaylist(id, title);
    if (!response.ok) throw new HttpException(response);
    return response;
  };

  const deleteUserPlaylist = async (id: string) => {
    const response = await Spaceship.deleteUserPlaylist(id);
    if (!response.ok) throw new HttpException(response);
    return response;
  };

  const handleEditClick = () => {
    if (!data) return false;

    modal({
      type: 'input',
      content: t('playlist.enter_title'),
      value: title,
      placeholder: t('playlist.enter_title'),
      maxLength: 50,
    }).then(result => {
      if (result.type !== 'input') return false;

      Transmitter.emit('popup', { type: 'loading', message: t('playlist.title_renaming') });
      new Evoke(renameUserPlaylist(data.id, result.value)).then(result => {
        if (!result.playlist) return false;
        setTitle(result.playlist.title);

        Transmitter.emit('popup', { type: 'success', message: t('playlist.title_renamed') });
      });
    });
  };

  const handleShareClick = () => {
    if (!data) return false;

    const url = `https://izflix.net/playlist/${data.id}`;

    if (navigator.share) {
      navigator.share({
        title: `IZFLIX - ${data.title} (${data.description})`,
        url,
      });
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => Transmitter.emit('popup', { type: 'success', message: t('video.url_copied') }))
        .catch(() =>
          Transmitter.emit('popup', { type: 'error', message: t('video.url_copy_failed') })
        );
    }
  };

  const handleDeleteClick = () => {
    if (!data) return false;

    modal({ type: 'text', content: t('playlist.deletion_confirm') }).then(result => {
      if (result.type !== 'ok') return false;

      Transmitter.emit('popup', { type: 'loading', message: t('playlist.deleting') });
      new Evoke(deleteUserPlaylist(data.id)).then(() => {
        Transmitter.emit('popup', { type: 'success', message: t('playlist.deleted') });
        navigate('/playlist');
      });
    });
  };

  return (
    <Layout>
      <Pc>
        <Thumbnail src={thumbnail} />
      </Pc>
      {title ? (
        <Title>
          <TitleContent>{title}</TitleContent>
          {access && (
            <>
              <IconWrapper hover={1.1} tap={0.9} onClick={handleEditClick}>
                <IconContent type={'edit'} color={Color.GRAY} />
              </IconWrapper>
              <IconWrapper hover={1.1} tap={0.9} onClick={handleShareClick}>
                <IconContent type={'share'} color={Color.GRAY} />
              </IconWrapper>
              <IconWrapper hover={1.1} tap={0.9} onClick={handleDeleteClick}>
                <IconContent type={'delete'} color={Color.GRAY} />
              </IconWrapper>
            </>
          )}
        </Title>
      ) : (
        <TitlePlaceholder />
      )}
      {description ? (
        <Description>{description}</Description>
      ) : (
        <DescriptionPlaceholder>
          <div />
        </DescriptionPlaceholder>
      )}
      <Button color={Color.PRIMARY} icon={'play'} fluid scale={0.95} link={link} state={linkState}>
        {t('playlist.play')}
      </Button>
    </Layout>
  );
};

export default PlaylistInfo;
