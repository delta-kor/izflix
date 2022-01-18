import { Component } from 'react';
import styled from 'styled-components';
import { HideOverflow } from '../../../styles';

const Layout = styled.div`
  display: flex;
  height: 48px;
  padding: 0 32px;
  margin: 24px 0;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  height: 24px;
  max-width: 100%;
  font-weight: 800;
  font-size: 20px;
  ${HideOverflow};
`;

const Description = styled.div`
  height: 16px;
  max-width: 100%;
  font-weight: bold;
  font-size: 14px;
  opacity: 0.7;
  ${HideOverflow};
`;

interface Props {
  data: ApiResponse.Video.Info | null;
}

class VideoInfo extends Component<Props> {
  render() {
    const data = this.props.data;
    if (!data) return <Layout></Layout>;

    return (
      <Layout>
        <Title>{data.title}</Title>
        <Description>{data.description}</Description>
      </Layout>
    );
  }
}

export default VideoInfo;
