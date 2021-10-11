import "tailwindcss/tailwind.css";
import React from "react";
import Head from "next/head";

import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>biet-new</title>
        <meta
          name="Connect with people who are dating foreigners "
          content="Connect for SNS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </>
  );
}
export default MyApp;
