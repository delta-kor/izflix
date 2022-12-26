import { Component } from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  data: Partial<IMeta>;
}

class Meta extends Component<Props, any> {
  render() {
    const data = this.props.data;
    return (
      <Helmet>
        <meta property="og:type" content="website" />

        <title>{data.title || 'IZFLIX'}</title>
        <meta property="og:title" content={data.title || 'IZFLIX'} />

        <meta
          name="description"
          content={data.description || 'Concerts, Music shows HD streaming & Replay'}
        />
        <meta
          property="og:description"
          content={data.description || 'Concerts, Music shows HD streaming & Replay'}
        />

        <meta property="og:image" content={data.image || '/og.png'} />
        <meta name="twitter:image" content={data.image || '/og.png'} />
        <meta name="twitter:card" content={data.image ? 'summary_large_image' : 'summary'} />

        <link rel="canonical" href={data.url || 'https://izflix.net/'} />
        <meta property="og:url" content={data.url || 'https://izflix.net/'} />
      </Helmet>
    );
  }
}

export default Meta;
