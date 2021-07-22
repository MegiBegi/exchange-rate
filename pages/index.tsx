import { GetStaticProps } from "next";

import Head from "next/head";
import Link from "next/link";

import { Grid, Text, Card } from "@geist-ui/react";
import Clock from "@geist-ui/react-icons/clock";
import { mockedData } from "mockedData";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import CurrencyExchangeRateCard from "src/currency/Currency";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>Exchange rate</title>
        <meta
          name="description"
          content="App providing info about currencies exchange rates"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: 50,
          marginBottom: 50,
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
      </header>

      <main style={{ maxWidth: 1000, margin: "auto" }}>
        <style jsx>{`
          h1 {
            background: linear-gradient(
              90deg,
              rgba(131, 58, 180, 1) 0%,
              rgba(253, 29, 29, 1) 50%,
              rgba(252, 176, 69, 1) 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}</style>

        <Grid.Container gap={2} justify="space-between">
          <Grid xs={12}>
            <h1>{t("compare_rates")}</h1>
          </Grid>

          <Grid xs={12}>
            <Card shadow>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Clock />
                <Text style={{ marginLeft: 10 }}>{t("last_updated_at")}</Text>
              </div>

              <Text h4>{new Date().toLocaleString()}</Text>
            </Card>
          </Grid>

          {Object.entries(mockedData).map(
            ([symbol, rate]: [string, number]) => (
              <Grid xs={6} md={6} key={`currencySymbol-${symbol}`}>
                <CurrencyExchangeRateCard name={symbol} value={rate} />
              </Grid>
            )
          )}
        </Grid.Container>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const intlProps = await serverSideTranslations(ctx.locale || "en", [
    "common",
  ]);

  return {
    props: {
      ...intlProps,
    },
  };
};
