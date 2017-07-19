+++
title = "Redux and Redux Saga in Next.js"
description = "Basic steps to use Redux and Redux Saga as side-effect library for asynchronous actions in NextJs - a library for server-rendered React applications..."
date = "2017-06-28T13:50:46+02:00"
tags = ["Redux"]
categories = ["Redux"]
keyword = "nextjs redux saga"
news_keywords = ["nextjs redux saga"]
hashtag = "#ReactJs"
banner = "img/posts/nextjs-redux-saga/banner.jpg"
contribute = "nextjs-redux-saga.md"
headline = "Redux and Redux Saga in Next.js"

summary = "This article will show you the basic steps to use Redux and Redux Saga as side-effect library for asynchronous actions in NextJs."
+++

{{% pin_it_image "nextjs redux saga" "img/posts/nextjs-redux-saga/banner.jpg" "is-src-set" %}}

This article will show you the basic steps to use {{% a_blank "Redux Saga" "https://github.com/redux-saga/redux-saga" %}} as side-effect library for asynchronous actions in NextJs. I am no expert in server-side rendering, so maybe you as a reader have more insights that you want to share in the comments.

Recently I used {{% a_blank "Next.js" "https://github.com/zeit/next.js/" %}} for a server-rendered React.js application. It comes with its open source {{% a_blank "create-next-app" "https://open.segment.com/create-next-app" %}} project, which can be seen as pendant to {{% a_blank "create-react-app" "https://github.com/facebookincubator/create-react-app" %}} by Facebook, but only as a boilerplate for server-rendered React applications.

There are a few things that are different in a server-side rendered React application. I guess the perfect place to learn about those is {{% a_blank "Learning Next.js" "https://learnnextjs.com/" %}}. But basically in NextJs you have pages in a *pages/* directory that act as routes in your ReactJs + NextJs application.

* pages/home -> www.yourdomain/home
* pages/about -> www.yourdomain/about

However, after you have learned the basic steps in Next, you might want to introduce more aspects to your React + Next application. In my case, it were the libraries Redux, for state management beyond local state, and Redux Saga, as side-effect library for asynchronous actions.

{{% chapter_header "Redux in Next.js" "redux-nextjs" %}}

There are the few things that work differently in a server-rendered React application. The crux of the matter is that the Redux store is a singleton in your client-side application, but on the server-side the Redux store is a new instance with every request. That's what makes the Redux store setup slightly different in a NextJs application.

Fortunately, a library took already care of these circumstances: {{% a_blank "next-redux-wrapper" "https://github.com/kirill-konshin/next-redux-wrapper" %}}. So how to use it?

In {{% a_blank "react-redux" "https://github.com/reactjs/react-redux" %}} you were used to use a `Provider` component at the top of your component tree. It injects the Redux store (via the React context) as dependency to all its child components.

{{< highlight javascript >}}
<Provider store={store}>
  <MyRootComponent />
</Provider>
{{< /highlight >}}

But in a server-side rendered React application, the store instance is not a singleton. Thus, in the next-redux-wrapper, you provide the functionality to initialize the store instead of the store instance itself. That way, the server has the chance to create the Redux store every time anew with each incoming request.

{{< highlight javascript >}}
import { createStore } from 'redux';

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
};

const initializeStore = initialState => {
  return createStore(reducer, initialState);
};

// exports the functionality to initialize the store
// rather than exporting the store instance
export default initializeStore;
{{< /highlight >}}

In your *pages/* directory, you export entry points, called pages, to your Next.js application as plain components.

{{< highlight javascript >}}
const HomePage = () =>
  <div>
    That's the home page.
  </div>

export default HomePage;
{{< /highlight >}}

Now, instead of using the `Provider` component, you can use the `withRedux` higher order component to inject the store initialization functionality. If you are not familiar with React's higher order components, you can read [this introduction](https://www.robinwieruch.de/gentle-introduction-higher-order-components/).

{{< highlight javascript >}}
import withRedux from 'next-redux-wrapper';
import initializeStore from './path/to/store';

const HomePage = () =>
  <div>
    That's the home page.
  </div>

export default withRedux(initializeStore)(HomePage);
{{< /highlight >}}

Basically, in a server-side rendered React application with Next.js, you can exchange the `Provider` component from react-redux with `withRedux` from next-redux-wrapper. You can use it for every entry point in your *pages/* directory.

In your child components, you can still use the `connect` higher order component from react-redux to make your Redux store accessible with `mapStateToProps` and `mapDispatchToProps`. It works the same as before.

{{% chapter_header "Redux Saga + Next.js" "redux-saga-nextjs" %}}

Last but not least, I had the requirement to use Redux Saga for asynchronous Redux actions in my Next.js application. The basic Redux Saga middleware lookup when creating a Redux store looks similar to this:

{{< highlight javascript >}}
import createSagaMiddleware from 'redux-saga';

import rootSaga from 'path/to/combined/sagas';
import rootReducer from 'path/to/combined/reducers';

const saga = createSagaMiddleware();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(saga)
);

saga.run(rootSaga);

export default store;
{{< /highlight >}}

However, I ran into the issue that the Saga middleware ran before the store got initialized.

{{< highlight javascript >}}
Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware
{{< /highlight >}}

Therefore, the solution was that the Saga can live in the Redux store initialization too.

{{< highlight javascript >}}
import createSagaMiddleware from 'redux-saga';

import rootSaga from 'path/to/combined/sagas';
import rootReducer from 'path/to/combined/reducers';

const saga = createSagaMiddleware();

const initializeStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(saga)
  );

  saga.run(rootSaga);

  return store;
};

export default initializeStore;
{{< /highlight >}}

That's it. The Saga middleware runs only when the Redux store initialized. Since I have found no other solutions around this topic, I am keen to hear your feedback on this article.