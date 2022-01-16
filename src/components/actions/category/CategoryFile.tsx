import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spaceship from '../../../services/spaceship';
import { HideOverflow } from '../../../styles';

const Layout = styled(Link)`
  display: flex;
  width: 100%;
  height: 54px;
  padding: 0 32px;
  align-items: center;
`;

const Thumbnail = styled.img`
  display: block;
  height: 36px;
  width: 36px;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 4px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  flex-grow: 1;
  margin: 0 20px 0 14px;
  ${HideOverflow};
`;

const Count = styled.div`
  flex-shrink: 0;
  font-weight: normal;
  font-size: 14px;
  opacity: 0.7;
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
