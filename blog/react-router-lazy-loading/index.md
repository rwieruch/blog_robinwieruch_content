---
title: "React Router 6 Lazy Loading"
description: "How to: React Router 6 Lazy Loading: code-splitting at route level helps you lazy-load just the things that are needed by the user, which dramatically improves the performance ..."
date: "2022-04-20T07:52:46+02:00"
categories: ["React", "React Router 6"]
keywords: ["react router lazy loading", "react router lazy loading", "react router 6"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A React Router tutorial which teaches you how to use **Lazy Loading with React Router 6**. The code for this React Router v6 tutorial can be found over [here](https://github.com/the-road-to-learn-react/react-router-6-examples). In order to get you started, create a new React project (e.g. [create-react-app](https://github.com/facebook/create-react-app)). Afterward, [install React Router](https://reactrouter.com/docs/en/v6/getting-started/installation#basic-installation) and read the following React Router tutorial to get yourself aligned to what follows next.

<ReadMore label="React Router 6 Introduction" link="/react-router/" />

Lazy Loading on route level with React Router is a powerful feature. Usually a client-side rendered React applications comes as one bundle from a web server. However, when enabling lazy loading, the bundle is split into smaller bundles. When a user visits a specific part of the application, only this part lazy loads on demand. The term for this optimization is called Code Splitting and improves the performance when a user navigates through a larger React application.

In the following we will recreate this scenario with React Router. To illustrate how this works and how you can implement lazy loading on route level when using React Router for introducing code splitting in React yourself, we will start off with the following example:

```javascript
import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

const App = () => {
  return (
    <>
      <h1>React Router</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};

export default App;
```

In this [function component](/react-function-component/) we have matching Link and Route components from React Router for the `home/` and `about/` routes. Furthermore, we have a so-called No Match Route loaded with the NoMatch component which acts as fallback route. From here, we will explore the concept of Lazy Loading.

# Lazy Loading in React Router

Both, Home and About component, are imported from another folder/file. They are not doing much for the sake of keeping this example small. For instance, the Home component could look like the following:

```javascript
const Home = () => {
  return (
    <>
      <h2>Home</h2>
    </>
  );
};

export default Home;
```

Lazy loading a component in React is not difficult, because React offers a top-level API for it called **React.lazy**. Because we already import both page components from another file, we can just use React's `lazy()` method as wrapper here:

```javascript{4-5,16,18,24,26}
import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));

const App = () => {
  return (
    <>
      ...

      <Routes>
        <Route
          index
          element={
            <React.Suspense fallback={<>...</>}>
              <Home />
            </React.Suspense>
          }
        />
        <Route
          path="about"
          element={
            <React.Suspense fallback={<>...</>}>
              <About />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};
```

You may have noticed that we are using React Suspense here to offer a fallback React element when the component is lazy loaded from the server. At this point, it's worth to note that lazy loading is nothing React Router specific but rather React specific, because we as developers choose to apply React.lazy method on a page component which enables lazy loading on a route level. However, any component can be lazy loaded this way.

<ReadMore label="React Folder/File Structure" link="/react-folder-structure/" />

If both page components would be named exports instead of default exports, lazy loading with only using React.lazy becomes cumbersome. Instead I want to show you a popular lazy loading library for React called [@loadable/component](https://github.com/gregberge/loadable-components). After installing it, you can use it this way:

```javascript{3,5-6,14-15}
import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import loadable from '@loadable/component';

const Home = loadable(() => import('./pages/Home'));
const About = loadable(() => import('./pages/About'));

const App = () => {
  return (
    <>
      ...

      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};
```

See how this library applies React Suspense by default. Furthermore, if your page components happen to be named exports, you can lazy load them the following way:

```javascript
const Home = loadable(() => import('./pages/Home'), {
  resolveComponent: (components) => components.Home,
});

const About = loadable(() => import('./pages/About'), {
  resolveComponent: (components) => components.About,
});
```

That's it. We have introduced lazy loading on a route level by using React's lazy function. Furthermore, we introduced an opt-in library that helped for the sake of convenience. After all, using cope splitting on a route level improves the performance for larger React applications, because your users do not have to download the whole application. Instead, only one the root plus one page is loaded. When a user navigates to another page, this page is lazy loaded.