import React from 'react';
import App from "next/app";
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import "core-js";
import {wrapper} from '../redux/redux';

class MyApp extends App {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({Component, ctx}) {
    const pageProps = Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {};
    return {pageProps};
  }

  render() {
    const {
      Component,
      pageProps,
      store
    } = this.props;

    return (
        <PersistGate
            persistor={store.__persistor}
        >
          <Component {...pageProps} />
        </PersistGate>
    );
  }
}

export default wrapper.withRedux(App);
