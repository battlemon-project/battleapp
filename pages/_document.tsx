import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script id='googletagmanager'
          strategy={'beforeInteractive'}
          src={`https://www.googletagmanager.com/gtag/js?id=G-FXNCZP5QS7`}
        />
        <Script id='googledataLayer' strategy={'beforeInteractive'}>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-FXNCZP5QS7');
          `}
        </Script>
      </body>
    </Html>
  )
}