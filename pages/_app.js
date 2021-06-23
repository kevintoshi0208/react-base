import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import "core-js";
import {wrapper} from '../redux/redux';
import {PersistGate} from "redux-persist/integration/react";
import { useStore } from "react-redux";

const App = ({ Component, pageProps }) => {
  const store = useStore()
  return (
      <PersistGate persistor={store.__persistor} loading={<div>Loading...</div>}>
        <Component {...pageProps} />
      </PersistGate>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  // Keep in mind that this will be called twice on server, one for page and second for error page
  // ctx.store.dispatch({ type: "APP", payload: "was set in _app" });
  return {
    pageProps: {
      // Call page-level getInitialProps
      ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      // Some custom thing for all pages
      appProp: ctx.pathname
    }
  };
};

export default wrapper.withRedux(App);