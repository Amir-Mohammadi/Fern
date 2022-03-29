import Error from '@Components/screens/error-screen';
import HeaderContainer from '@Containers/header-container';
import { Provider } from 'mobx-react';
import App from 'next/app';
import { NextRouter, withRouter } from 'next/router';
import React from 'react';
import 'styles/globals.scss';
import LoadingContainer from '../src/containers/loading-container';
import initializeStores, { Stores } from '../src/stores/core/stores';
import { PageProps } from '../src/utils/types';

type AppProps = {
  Component: any;
  pageProps: PageProps;
  router: NextRouter;
};

export let RouterRef: NextRouter | undefined;
class MyApp extends App<AppProps> {
  async componentDidMount(): Promise<void> {
    await Stores?.headerStore.onFetchData();
  }

  mobxStore;
  constructor(props: any) {
    super(props);
    // we have to initialize the stores before rendering any component
    this.mobxStore = initializeStores(this.props.pageProps.initialMobxState);
    RouterRef = props.router;
  }

  render() {
    const { Component, pageProps } = this.props as AppProps;

    if (pageProps.error) {
      return (
        <Provider {...this.mobxStore}>
          <Error {...pageProps.error} />
        </Provider>
      );
    } else {
      return (
        <Provider {...this.mobxStore}>
          <LoadingContainer />
          <HeaderContainer />
          <Component {...pageProps} />
        </Provider>
      );
    }
  }
}

export default withRouter(MyApp);
