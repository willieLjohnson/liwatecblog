import { Html, Head, Main, NextScript } from "next/document";
import { GAID } from "../lib/constants";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GAID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
          }}
        />
      </body>
    </Html>
  );
}
