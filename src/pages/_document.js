import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
// import { randomBytes } from 'crypto'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="/favicon_32x32.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon_32x32.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon_32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      <script
  type="text/javascript"
  dangerouslySetInnerHTML={{
    __html: `
      var _segq = _segq || [];
      var _segs = _segs || {};
      (function () {
        var dc = document.createElement('script');
        dc.type = 'text/javascript';
        dc.async = true;
        dc.src = '//numbers.markavo.com/tag/aZrRke.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(dc, s);
      })();
    `,
  }}
/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
