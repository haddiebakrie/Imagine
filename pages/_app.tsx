import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useStore } from "../redux/store";
import { Fragment } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import LocalThemeProvider from "../components/layout/Theme";
import AppAlert from "../components/layout/AppAlert";

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Fragment>
      <Head>
        <title>TugaScript Image Editor</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
          charSet="utf-8"
        />
      </Head>
      <Provider store={store}>
        <LocalThemeProvider>
          <AppAlert />
          <Component {...pageProps} />
        </LocalThemeProvider>
      </Provider>
    </Fragment>
  );
}

export default MyApp;
