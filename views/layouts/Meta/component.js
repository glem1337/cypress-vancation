import Head from 'next/head';

import { FACEBOOK_APP_ID } from 'constants';

import useContainer from './hook';

const MetaComponent = () => {
  const openGraphData = useContainer();

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no maximum-scale=1.0 user-scalable=no" />
      <meta content="ie=edge" httpEquiv="x-ua-compatible" />
      <meta charSet="utf-8" />
      <meta property="og:url" content={openGraphData.openGraph.url} />
      <meta property="og:title" content={openGraphData.openGraph.title} />
      <meta property="og:type" content={openGraphData.openGraph.type} />
      <meta property="og:image" content={openGraphData.openGraph.image} />
      <meta property="og:site_name" content={openGraphData.openGraph.siteName} />
      <meta property="og:description" content={openGraphData.openGraph.description} />
      <meta property="fb:app_id" content={FACEBOOK_APP_ID} />
      <meta property="twitter:card" content={openGraphData.twitter.card} />
      <meta name="twitter:image" content={openGraphData.twitter.image} />
      <link href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css" rel="stylesheet" />
    </Head>
  );
};

export default MetaComponent;
