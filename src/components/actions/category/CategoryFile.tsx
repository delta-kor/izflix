import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import { getDuration } from '../../../services/time';
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

const Thumbnail = styled.img<{ $active: boolean }>`
  display: block;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 4px;
  opacity: ${({ $active }) => ($active ? '1' : '0')};
  transition: opacity 0.2s;
  animation-delay: 0.1s;
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

interface State {
  active: boolean;
}

class CategoryFile extends Component<Props, State> {
  state: State = { active: false };

  render() {
    const file = this.props.file;

    return (
      <Layout to={`/${file.id}?k=category&v=${this.props.folderId}`}>
        <Thumbnail
          $active={this.state.active}
          onLoad={() => this.setState({ active: true })}
          src={Spaceship.getThumbnail(file.id)}
          loading="lazy"
        />
        <ThumbnailPlaceholder />
        <Title>{file.title}</Title>
        <Count>{getDuration(file.duration)}</Count>
      </Layout>
    );
  }
}

export default CategoryFile;
