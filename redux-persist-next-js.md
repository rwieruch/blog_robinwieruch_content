+++
title = "Redux Persist with Next.js by Example"
description = "By Example: How to set up Redux Persist in Next.js to persist your Redux store's state in the React client application's local storage ..."
date = "2019-07-25T13:56:46+02:00"
tags = ["React", "JavaScript", "NextJs", "Redux"]
categories = ["React", "JavaScript", "NextJs", "Redux"]
keywords = ["redux persist nextjs"]
news_keywords = ["redux persist nextjs"]
hashtag = "#ReactJs"
card = "img/posts/redux-persist-next-js/banner_640.jpg"
banner = "img/posts/redux-persist-next-js/banner.jpg"
contribute = "redux-persist-next-js.md"
headline = "Redux Persist with Next.js"

summary = "By Example: How to set up Redux Persist in Next.js to persist your Redux store's state in the React client application's local storage."
+++

{{% sponsorship %}}

{{% pin_it_image "redux persist nextjs" "img/posts/redux-persist-next-js/banner.jpg" "is-src-set" %}}

{{% by-example %}}

The following implementation shows you how to integrate {{% a_blank "Redux Persist" "https://github.com/rt2zz/redux-persist" %}} into {{% a_blank "Next.js" "https://github.com/zeit/next.js/" %}} with a quick example. First, the installation of the library on the command line:

{{< highlight javascript >}}
npm install redux-persist
{{< /highlight >}}

Second, rather than having a straightforward function which creates our Redux store, we distinguish between server-side and client-side Redux store. In the case of the client-side Redux store creation, we add the implementation to persist our store -- by default in the local storage -- between browser sessions:

{{< highlight javascript "hl_lines=9 13 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 35 39" >}}
import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';

import rootSaga from './saga';
import rootReducer from './reducer';

export default (initialState) => {
  let store;

  const sagaMiddleware = createSagaMiddleware();

  const isClient = typeof window !== 'undefined';

  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'root',
      storage
    };

    store = createStore(
      persistReducer(persistConfig, rootReducer),
      initialState,
      applyMiddleware(sagaMiddleware)
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(sagaMiddleware)
    );
  }

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};
{{< /highlight >}}

Last but not least, in our *src/pages/_app.js* file -- which defines our Next.js root component -- we add additional code for the persistent Redux store:

{{< highlight javascript "hl_lines=5 6 19 23 25" >}}
import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import reduxStore from './store';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    );
  }
}

export default withRedux(reduxStore)(MyApp);
{{< /highlight >}}

That's it. Try it yourself by adding something to the Redux store, refreshing or reloading the browser, and checking the local storage in your browser's development tools. You should have the Redux store's state in there. In your React components {{% a_blank "connecting" "https://react-redux.js.org/api/connect" %}} to the Redux store, you can retrieve the state.