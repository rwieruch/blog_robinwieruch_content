---
title: "React Router 7: Example"
description: "A brief React Router 7 example to get you started ..."
date: "2025-01-06T07:52:49+02:00"
categories: ["React", "React Router 7"]
keywords: ["react router example", "react router 7"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A quick React Router 7 example which should get you up and running. The code for this React Router v7 tutorial can be found over [here](https://github.com/rwieruch/examples/tree/main/react-router-example).

<ReadMore label="React Router 7 Introduction" link="/react-router/" />

The example features the matching between Routes and Links, a so-called Layout Route for encapsulating components within the same layout (see Layout component), a so-called Index Route loaded with the Home component and a so-called No Match Route loaded with a React element. Both act as fallback routes if there is no path specific (Index Route) or if the path cannot be matched to a Route (No Match Route). In addition, the example features Active Links too:

```tsx
import { Routes, Route, Outlet, NavLink, NavLinkRenderProps } from 'react-router';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Route>
    </Routes>
  );
};

const Layout = () => {
  const style = ({ isActive }: NavLinkRenderProps) => ({
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
        <NavLink to="/" style={style}>
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

From there you will plenty of material to explore more advanced concepts for React Router such as Nested Routes, Dynamic Routes, Descendant Routes, Private/Protected Routes and Authentication with React Router.