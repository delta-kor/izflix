import { Component } from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  data: Partial<IMeta>;
}

class Meta extends Component<Props> {
  render() {
    const data = this.props.data;
    return (
      <Helmet>
        <title>{data.title || 'IZFLIX'}</title>
        <meta
          name="description"
          content={
            data.description ||
            '콘서트, 음악 방송 고화질 인터넷 스트리밍 & 다시보기'
          }
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.title || 'IZFLIX'} />
        <meta
          name="og:description"
          content={
            data.description ||
            '콘서트, 음악 방송 고화질 인터넷 스트리밍 & 다시보기'
          }
        />

        <link rel="canonical" href={data.url || 'https://izflix.net/'} />
        <meta property="og:url" content={data.url || 'https://izflix.net/'} />
      </Helmet>
    );
  }
}

export default Meta;
