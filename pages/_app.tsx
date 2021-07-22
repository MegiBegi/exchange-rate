import type { AppProps } from "next/app";

import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider themeType={"light"}>
      <CssBaseline />

      <div
        style={{
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Component {...pageProps} />

        <style jsx global>{`
          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </GeistProvider>
  );
}

export default appWithTranslation(MyApp);
