import { AppProps } from "next/app";
import "../styles/index.css";
import { Analytics } from "@vercel/analytics/react";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { GAID } from "../lib/constants";
import Script from "next/script";
import Head from "next/head";
library.add(fab, faCog);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GAID}`}
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GAID}');
      `}
        </Script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
