/* eslint-disable react/no-danger */
import React from 'react';
import Document, { Head, Main, NextScript, Html } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" prefix="og: http://ogp.me/ns#">
        <Head>
          {this.props.styleTags}
          <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5CCQH65');` }}
          />
        </Head>
        <body>
          <noscript dangerouslySetInnerHTML={{ __html: `iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5CCQH65"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>` }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
