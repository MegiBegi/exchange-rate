import type { AppProps } from "next/app";

import { ChakraProvider, Container } from "@chakra-ui/react";

import { appWithTranslation } from "next-i18next";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Container maxW="100%" p={0} boxSizing="border-box">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
