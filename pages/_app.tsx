import { Button, GeistProvider, CssBaseline } from "@geist-ui/react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { useState } from "react";
import Link from "next/link";

type theme = "dark" | "light";

function MyApp({ Component, pageProps }: AppProps) {
  const [themeType, setThemeType] = useState<theme>("dark");
  const switchThemes = () => {
    setThemeType((last: theme) => (last === "dark" ? "light" : "dark"));
  };

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: 50,
          padding: "10px 20px",
          fontSize: 30,
        }}
      >
        <Link href="/" locale="pl">
          <a>🇵🇱</a>
        </Link>
        <Link href="/" locale="nb">
          <a style={{ marginLeft: 10 }}>🇳🇴</a>
        </Link>
        <Link href="/" locale="en">
          <a style={{ marginLeft: 10 }}>🇺🇸</a>
        </Link>

        <Button
          size="medium"
          auto
          onClick={switchThemes}
          style={{ marginLeft: 10 }}
        >
          {themeType === "dark" ? "🌙" : "🌞"}
        </Button>
      </div>

      <Component {...pageProps} />
    </GeistProvider>
  );
}
export default appWithTranslation(MyApp);
