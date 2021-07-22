import type { AppProps } from "next/app";

import { ChakraProvider, Container } from "@chakra-ui/react";

import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";

import store from "src/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Container maxW="100%" p={0} boxSizing="border-box">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
