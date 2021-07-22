import type { AppProps } from "next/app";

import { ChakraProvider, Container } from "@chakra-ui/react";

import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Container maxW="100%" p={0} boxSizing="border-box">
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
