import { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import { getDuration } from '../../../services/time';
import Tracker from '../../../services/tracker';
import { Color, HideOverflow, MobileQuery, PcQuery } from '../../../styles';

const Layout = styled(Link)`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;

  ${MobileQuery} {
    height: 54px;
    padding: 0 32px 0 28px;
  }

  ${PcQuery} {
    height: 72px;
    padding: 0 32px 0 28px;
  }
`;

const Thumbnail = styled(LazyLoadImage)`
  display: block;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 4px;
  z-index: 1;

  ${MobileQuery} {
    height: 36px;
    width: 36px;
  }

  ${PcQuery} {
    height: 48px;
    width: 48px;
  }
`;

const ThumbnailPlaceholder = styled.div`
  position: absolute;
  left: 28px;
  background: ${Color.DARK_GRAY};
  border-radius: 4px;
  z-index: 0;

  ${MobileQuery} {
    height: 36px;
    width: 36px;
  }

  ${PcQuery} {
    height: 48px;
    width: 48px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  flex-grow: 1;
  ${HideOverflow};

  ${MobileQuery} {
    height: 24px;
    margin: 0 20px 0 14px;
    font-size: 20px;
  }

  ${PcQuery} {
    height: 28px;
    margin: 0 32px 0 22px;
    font-size: 24px;
  }
`;

const Count = styled.div`
  flex-shrink: 0;
  font-weight: normal;
  opacity: 0.7;

  ${MobileQuery} {
    height: 16px;
    font-size: 14px;
  }

  ${PcQuery} {
    height: 24px;
    font-size: 20px;
  }
`;

interface Props {
  folderId: string;
  file: ICategoryFile;
}

class CategoryFile extends Component<Props> {
  render() {
    const file = this.props.file;

    return (
      <Layout
        to={`/${file.id}?k=category&v=${this.props.folderId}`}
        onClick={() =>
          Tracker.send('category_file_clicked', { file_id: file.id })
        }
      >
        <Thumbnail
          src={Spaceship.getThumbnail(file.id)}
          effect="opacity"
          wrapperProps={{ style: { position: 'relative', zIndex: '1' } }}
        />
        <ThumbnailPlaceholder />
        <Title>{file.title}</Title>
        <Count>{getDuration(file.duration, file.is_4k)}</Count>
      </Layout>
    );
  }
}

export default CategoryFile;
