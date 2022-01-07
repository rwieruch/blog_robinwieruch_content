---
title: "How to React Router with Webpack 6"
description: "Learn how to use React Router in a Webpack powered JavaScript application ..."
date: "2020-10-30T11:55:46+02:00"
categories: ["React", "Webpack", "React Router"]
keywords: ["webpack react router"]
hashtags: ["#Webpack"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

If you happen to have a custom Webpack setup, you may be wondering how to set up React Router with Webpack. Let's say we have the following minimal React application using React Router:

```javascript
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

const Home = () => <div>Home</div>;

const About = () => <div>About</div>;

const App = () => (
  <Router>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </Router>
);

export default App;
```

If you open your React application and navigate between both paths, everything should be fine. However, if you navigate via the browser's URL bar to /about, you will get something like **Cannot GET /about**. That's because Webpack doesn't know what to serve on this path, because Webpack only knows about the root path / for your application. In order to serve your React application on every path, you need to tell Webpack and its configuration that it should fallback for every path to your entry point:

```javascript{6}
...

module.exports = {
  ...
  devServer: {
    historyApiFallback: true,
  },
};
```

Now you should be able to navigate via the browser's URL bar to /about. I hope this helps anyone who stumbles across this issue.