import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { GAID, GTAGM } from "../lib/constants";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Script id="google-noscript" strategy="afterInteractive">
          {`
            <!-- Google Tag Manager (noscript) -->
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTAGM}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            <!-- End Google Tag Manager (noscript) -->
          `}
        </Script>{" "}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
