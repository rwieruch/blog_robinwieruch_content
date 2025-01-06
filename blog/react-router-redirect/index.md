---
title: "React Router 7: Redirect"
description: "How to: Redirect in React Router 7 by using the declarative Navigate component or the programmatic useNavigate Hook ..."
date: "2025-01-06T07:52:48+02:00"
categories: ["React", "React Router 7"]
keywords: ["react router redirect", "react router 7"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A React Router tutorial which teaches you how to perform a **Redirect in React Router 7**. The code for this React Router v7 tutorial can be found over [here](https://github.com/rwieruch/examples/tree/main/react-router-redirect).

<ReadMore label="React Router 7 Introduction" link="/react-router/" />

We will start off with a minimal React project that uses React Router to navigate a user from one page to another page:

```tsx
import { Routes, Route, Link } from "react-router";

const Home = () => {
  return <h2>Home</h2>;
};

const About = () => {
  return <h2>About</h2>;
};

const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};

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

export default App;
```

In this [function component](/react-function-component/) we have matching Link and Route components from React Router for the `/` and `about/` routes. Furthermore, we have a so-called Index Route loaded with the Home component and a so-called No Match Route loaded with the NoMatch component. Both act as fallback routes. From here, we will explore **how to navigate in React Router**.

# Redirect with Navigate Component

We can perform a **declarative redirect** by using React Router's Navigate component. In the following example, whenever a user navigates to the about page, the Navigate component will perform a redirect declaratively:

```tsx{5,11,16}
import {
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router';

...

const About = () => {
  const shouldRedirect = true;

  return (
    <>
      <h2>About</h2>
      {shouldRedirect && <Navigate replace to="/" />}
    </>
  );
};
```

If we would want to manage this on a Route level, we could use this alternative solution as well:

```tsx{2,18-22}
const App = () => {
  const shouldRedirect = true;

  return (
    <>
      <h1>React Router</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route
          path="about"
          element={
            shouldRedirect ? (
              <Navigate replace to="/" />
            ) : (
              <About />
            )
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
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
```

As you can see, you can apply the declarative redirect either on route or on component level. Based on a specific condition, the redirect will happen. Let's explore next how we can perform a programmatic redirect ...

# Redirect with useNavigate Hook

In contrast to the Navigate component and its declarative redirect, we can perform a **programmatic redirect** by using React Router's useNavigate Hook:

```tsx{5,11,13,15-19}
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router';

...

const About = () => {
  const shouldRedirect = true;

  const navigate = useNavigate();

  useEffect(() => {
    if (shouldRedirect) {
      navigate('/');
    }
  });

  return (
    <>
      <h2>About</h2>
    </>
  );
};
```

Whenever the component renders, [React's useEffect Hook](/react-useeffect-hook/) runs and will perform the redirect programmatically. Initiating the redirect when the component renders without any condition is not useful at all, as you can see, but serves as a minimal example. You can head back to my [React Router tutorial](/react-router/) where a programmatic redirect is used for a actual real world use case.

<Divider />

The best practice for performing a redirect with React Router would be initiating the redirect on the server-side for SEO and performance reasons. However, there are times when you have to fall back to a client-side redirect and therefore have to use React Router's Navigation component or useNavigate Hook for a declarative or programmatic redirect.