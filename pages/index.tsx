import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

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
