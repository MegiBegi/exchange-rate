import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

import Link from "next/link";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <div>
      <Head>
        <title>Exchange rate</title>
        <meta
          name="description"
          content="App providing info about currencies exchange rates"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>{t("example")}</p>

        <Link href="/" locale="pl">
          <a>Switch to Polish</a>
        </Link>

        <br />

        <Link href="/" locale="nb">
          <a>Switch to Norwegian</a>
        </Link>
        <br />
        <Link href="/" locale="en">
          <a>Switch to English</a>
        </Link>
      </main>
    </div>
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
