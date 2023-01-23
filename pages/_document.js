import {Head, Html, Main, NextScript} from "next/document"
import HTMLComment from "react-html-comment"
import Script from "next/script"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7093895028114761" crossorigin="anonymous"></script>
        <HTMLComment text="Global site tag (gtag.js) - Google Analytics"/>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JQM7067RRX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JQM7067RRX');
          `}
        </Script>
      </Head>
      <div>
      </div>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
