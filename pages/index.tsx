import { GetStaticProps } from "next";

import Head from "next/head";
import Link from "next/link";

import { TimeIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Container,
  Text,
  Icon,
  Link as UILink,
} from "@chakra-ui/react";

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

      <Flex
        justifyContent={{ base: "center", sm: "space-between" }}
        alignItems="center"
        flexDir={{ base: "column-reverse", sm: "row" }}
        h={{ base: "unset", sm: 50 }}
        mb={{ base: 5, sm: 50 }}
        py={{ base: 5, sm: 10 }}
        px={{ base: 0, sm: 10 }}
      >
        <Flex alignItems="center" fontSize="md">
          <Icon as={TimeIcon} mr="2" />

          <Text mr="1">{t("last_updated_at")}</Text>

          <Text h4>{new Date().toLocaleString()}</Text>
        </Flex>

        <Flex fontSize="3xl">
          <Link href="/" locale="pl">
            <UILink>🇵🇱</UILink>
          </Link>

          <Link href="/" locale="nb">
            <UILink ml="2">🇳🇴</UILink>
          </Link>

          <Link href="/" locale="en">
            <UILink ml="2">🇺🇸</UILink>
          </Link>
        </Flex>
      </Flex>

      <main>
        <Container maxW="100%" px={35}>
          <Flex wrap="wrap" justifyContent="space-between">
            <Box w="100%">
              <Text
                fontSize={{ base: "3xl", md: "6xl", sm: "4xl" }}
                bg="linear-gradient(
                90deg,
                rgba(131, 58, 180, 1) 0%,
                rgba(253, 29, 29, 1) 50%,
                rgba(252, 176, 69, 1) 100%
              )"
                bgClip="text"
                fill="transparent"
                textAlign={{ base: "center", sm: "left" }}
              >
                {t("compare_rates")}
              </Text>
            </Box>

            {Object.entries(mockedData).map(
              ([symbol, rate]: [string, number]) => (
                <CurrencyExchangeRateCard
                  key={`rate-${symbol}`}
                  name={symbol}
                  value={rate}
                />
              )
            )}
          </Flex>
        </Container>
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
