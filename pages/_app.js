import React from 'react';
import App from 'next/app';
import { ReactReduxContext } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import cookies from 'next-cookies';
import Router from 'next/router';
import SimpleReactLightbox from 'simple-react-lightbox';
import { PersistGate } from 'redux-persist/integration/react';

import { AUTH_ROUTES } from 'constants/routes';
import wrapper from 'state/store';
import { mountInterceptors } from 'lib/httpClient';
import Meta from 'views/layouts/Meta';
import ModalRoot from 'views/ModalRoot';
import FlashMessagesRoot from 'views/FlashMessagesRoot';
import { setPages } from 'state/app/actions';
import { prevPageSelector } from 'state/app/selectors';
import { userLoginSuccess } from 'state/concepts/session/actions';
import BreakpointDetector from 'views/shared/BreakpointDetector';

import 'assets/styles/application.less';

class Application extends App {
  prevPage = null;

  currentPage = null;

  static contextType = ReactReduxContext;

  static getInitialProps = async ({ Component, ctx }) => {
    const { store } = ctx;
    const isServer = Boolean(ctx.req);

    // preparing axios instance
    if (isServer) {
      mountInterceptors(ctx);
    }

    // storing (currentPage, prevPage) data in state
    const { currentPage, prevPage } = cookies(ctx);
    const prevPageSelect = prevPageSelector(store.getState());

    if (currentPage && prevPage && !prevPageSelect) {
      store.dispatch(setPages({ prevPage, currentPage, isServer: true }));
    }

    // storing current user's data in state
    const {
      currentUser: userInStore,
    } = store.getState().session;
    const { currentUser } = cookies(ctx);

    if (currentUser && !userInStore) {
      store.dispatch(userLoginSuccess(currentUser));
    }

    // run getInitialProps for page and layout components
    const layoutInitialProps = Component.Layout?.getInitialProps
      ? await Component.Layout.getInitialProps(ctx)
      : {};

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    // wait for all logics to finish when doing SSR
    if (isServer) { await store.logicMiddleware.whenComplete(); }

    return { pageProps, layoutInitialProps };
  };

  routeChangeStart = url => {
    this.currentPage = url;

    let isAuthRoute = false;
    for (let i = 0; i < AUTH_ROUTES.length; i += 1) {
      const route = AUTH_ROUTES[i];

      const regex = new RegExp(route, 'g');
      if (regex.test(Router.asPath)) {
        isAuthRoute = true;
        break;
      }
    }

    if (!isAuthRoute) {
      this.prevPage = Router.asPath;
    }
  }

  routeChangeError = () => {
    this.currentPage = null;
    this.prevPage = null;
  }

  routeChangeComplete = () => {
    const { store } = this.context;

    if (this.currentPage && this.prevPage) {
      store.dispatch(
        setPages({
          currentPage: this.currentPage,
          prevPage: this.prevPage,
        }),
      );
    }
  }

  componentDidMount() {
    const { store } = this.context;
    mountInterceptors({ store });

    this.currentPage = Router.asPath;

    Router.events.on('routeChangeStart', this.routeChangeStart);
    Router.events.on('routeChangeError', this.routeChangeError);
    Router.events.on('routeChangeComplete', this.routeChangeComplete);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.routeChangeComplete);
    Router.events.off('routeChangeError', this.routeChangeError);
    Router.events.off('routeChangeComplete', this.routeChangeComplete);
  }

  render = () => {
    const { Component, pageProps, layoutInitialProps } = this.props;
    const Layout = Component.Layout || React.Fragment;

    const { store } = this.context;

    return (
      <>
        <Meta />
        <PersistGate persistor={store.persistor} loading={null}>
          <IntlProvider>
            <SimpleReactLightbox>
              <Layout {...layoutInitialProps} {...Component.layoutProps}>
                <BreakpointDetector />
                <Component {...pageProps} />
              </Layout>
            </SimpleReactLightbox>
            <ModalRoot />
            <FlashMessagesRoot />
          </IntlProvider>
        </PersistGate>
      </>
    );
  };
}

export default wrapper.withRedux(Application);
