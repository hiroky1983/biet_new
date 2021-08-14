import "tailwindcss/tailwind.css";
import React, { useEffect } from "react";

import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../lib/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <React.StrictMode>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </React.StrictMode>
    </>
  );
}
export default MyApp;
