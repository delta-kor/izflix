import { Component } from 'react';
import styled from 'styled-components';
import SectionTitle from '../atoms/SectionTitle';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

interface Props {}

class PlaylistSection extends Component<Props, any> {
  render() {
    return (
      <Layout>
        <SectionTitle action={'전체보기'}>재생목록</SectionTitle>
      </Layout>
    );
  }
}

export default PlaylistSection;
