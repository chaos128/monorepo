import Document, { Head, Html, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge"></meta>
          <meta name="robots" content="index, follow"></meta>

          <link
            rel="preload"
            as="style"
            type="text/css"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
          />
        </Head>
        <body className="min-w-[375px] lg:min-w-[1024px]">
          {/* gtm 임시 비활성화 */}
          {/* <noscript> 
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KRT9CCC"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript> */}

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
