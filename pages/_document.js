import {Head, Html, Main, NextScript} from "next/document"
import HTMLComment from "react-html-comment"
import Script from "next/script"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <HTMLComment text="Google Tag Manager"/>
        <Script id="google-tag-manager-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P7NPZMC');
          `}
        </Script>
        <HTMLComment text="End Google Tag Manager"/>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7093895028114761" crossOrigin="anonymous"></script>

      </Head>
      <div>
      </div>
      <body>
        <HTMLComment text="Google Tag Manager (noscript)"/>
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P7NPZMC" height="0" width="0" style={{display:"none", visibility:"hidden"}}>
            </iframe>
          </noscript>
        <HTMLComment text="End Google Tag Manager (noscript)"/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
