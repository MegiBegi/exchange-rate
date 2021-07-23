import { FC, useEffect } from "react";

import { GetStaticProps } from "next";

import Head from "next/head";
import Link from "next/link";

import { TimeIcon } from "@chakra-ui/icons";
import {
  Flex,
  Container,
  Text,
  Icon,
  Link as UILink,
  Spinner,
} from "@chakra-ui/react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import CurrencyExchangeRateCard from "src/Currency";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  loadRates,
  selectIsRatesLoading,
  selectLastUpdatedAt,
  selectRates,
} from "src/store/ratesSlice";
import { ExchangeData } from "src/types";

const RELOAD_RATES_INTERVAL = 3000; // ms

type SSG = {
  initialData: ExchangeData;
  locale: string;
};

const Home: FC<SSG> = ({ initialData, locale }) => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();

  const rates = useAppSelector(selectRates);
  const isRatesLoading = useAppSelector(selectIsRatesLoading);
  const lastUpdatedAt = useAppSelector(selectLastUpdatedAt);

  useEffect(() => {
    const pollIntervalId = setInterval(() => {
      dispatch(loadRates());
    }, RELOAD_RATES_INTERVAL);

    return () => clearInterval(pollIntervalId);
  }, []);

  const data = rates || initialData.rates;
  const updatedAt = lastUpdatedAt || initialData.time_last_updated;

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
          <Flex m={0} mr={2} w="16px" h="16px" p={0}>
            {isRatesLoading ? (
              <Spinner size="sm" colorScheme="gray" />
            ) : (
              <Icon as={TimeIcon} m={0} />
            )}
          </Flex>

          <Text mr="1">{t("last_updated_at")}</Text>

          <Text>{new Date(updatedAt * 1000).toLocaleString(locale)}</Text>
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
            <Flex w="100%" alignItems="baseline">
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
            </Flex>

            {Object.entries(data).map(([symbol, rate]: [string, number]) => (
              <CurrencyExchangeRateCard
                key={`rate-${symbol}`}
                name={symbol}
                value={rate}
              />
            ))}
          </Flex>
        </Container>
      </main>
    </>
  );
};

const REVALIDATE_RATES_INTERVAL = 10; // s

export const getStaticProps: GetStaticProps<SSG> = async (ctx) => {
  const locale = ctx.locale || "en";
  const intlProps = await serverSideTranslations(locale, ["common"]);

  const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await res.json();

  return {
    props: {
      ...intlProps,
      locale,
      initialData: data,
    },
    revalidate: REVALIDATE_RATES_INTERVAL,
  };
};

export default Home;
