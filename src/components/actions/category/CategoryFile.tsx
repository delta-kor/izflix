import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import { HideOverflow, MobileQuery, PcQuery } from '../../../styles';

const Layout = styled(Link)`
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

const Thumbnail = styled.img`
  display: block;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 4px;

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
    font-size: 20px;
    margin: 0 20px 0 14px;
  }

  ${PcQuery} {
    font-size: 24px;
    margin: 0 32px 0 22px;
  }
`;

const Count = styled.div`
  flex-shrink: 0;
  font-weight: normal;
  opacity: 0.7;

  ${MobileQuery} {
    font-size: 14px;
  }

  ${PcQuery} {
    font-size: 20px;
  }
`;

interface Props {
  file: ICategoryFile;
}

class CategoryFile extends Component<Props> {
  render() {
    const file = this.props.file;

    return (
      <Layout to={`/`}>
        <Thumbnail src={Spaceship.getThumbnail(file.id)} />
        <Title>{file.title}</Title>
        <Count>{file.duration}</Count>
      </Layout>
    );
  }
}

export default CategoryFile;
