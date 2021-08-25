import "tailwindcss/tailwind.css";
import React, { useEffect } from "react";

import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </>
  );
}
export default MyApp;
