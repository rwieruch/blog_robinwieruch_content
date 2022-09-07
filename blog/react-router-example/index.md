---
title: "React Router 6: Example"
description: "A brief React Router 6 example to get you started ..."
date: "2022-02-03T08:52:46+02:00"
categories: ["React", "React Router 6"]
keywords: ["react router example", "react router 6"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A quick React Router 6 example which should get you up and running. The code for this React Router v6 tutorial can be found over [here](https://github.com/the-road-to-learn-react/react-router-6-examples). In order to get you started, create a new React project (e.g. [create-react-app](https://github.com/facebook/create-react-app)). Afterward, [install React Router](https://reactrouter.com/docs/en/v6/getting-started/installation#basic-installation) and read the following React Router tutorial to get yourself aligned to what follows next.

The example features the matching between Routes and Links, a so-called Layout Route for encapsulating components within the same layout (see Layout component), a so-called Index Route loaded with the Home component and a so-called No Match Route loaded with a React element. Both act as fallback routes if there is no path specific (Index Route) or if the path cannot be matched to a Route (No Match Route). In addition, the example features Active Links too:

```javascript
import * as React from 'react';
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Route>
    </Routes>
  );
};

const Layout = () => {
  const style = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <>
      <h1>React Router</h1>

      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <NavLink to="/home" style={style}>
          Home
        </NavLink>
        <NavLink to="/about" style={style}>
          About
        </NavLink>
      </nav>

      <main style={{ padding: '1rem 0' }}>
        <Outlet />
      </main>
    </>
  );
};

const Home = () => {
  return (
    <>
      <h2>Home</h2>
    </>
  );
};

const About = () => {
  return (
    <>
      <h2>About</h2>
    </>
  );
};

export default App;
```

If you are looking for a more in-depth tutorial to learn about all the concepts of React Router v6, check out the following one:

<ReadMore label="React Router 6 Introduction" link="/react-router/" />

From there you will plenty of material to explore more advanced concepts for React Router such as Nested Routes, Dynamic Routes, Descendant Routes, Private/Protected Routes and Authentication with React Router.