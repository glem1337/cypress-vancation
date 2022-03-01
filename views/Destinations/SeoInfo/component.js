import Head from 'next/head';

import isPresent from 'utils/isPresent';

import useContainer from './hook';

const SeoInfo = () => {
  const { seoInfo } = useContainer();

  if (!isPresent(seoInfo)) {
    return null;
  }

  const { metaDescription, metaKeywords, metaTitle } = seoInfo;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta
        name="description"
        content={metaDescription}
      />
      <meta
        name="keywords"
        content={metaKeywords}
      />
    </Head>
  );
};

export default SeoInfo;
