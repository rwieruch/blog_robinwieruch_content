---
title: "React Router 6: Redirect"
description: "How to: Redirect in React Router 6 by using the delcarative Navigate component or the programmatic useNavigate Hook ..."
date: "2022-02-01T07:52:46+02:00"
categories: ["React", "React Router 6"]
keywords: ["react router redirect", "react router 6"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A React Router tutorial which teaches you how to perform a **Redirect in React Router 6**. The code for this React Router v6 tutorial can be found over [here](https://github.com/the-road-to-learn-react/react-router-6-examples). In order to get you started, create a new React project (e.g. [create-react-app](https://github.com/facebook/create-react-app)). Afterward, [install React Router](https://reactrouter.com/docs/en/v6/getting-started/installation#basic-installation) and read the following React Router tutorial to get yourself aligned to what follows next.

<ReadMore label="React Router 6 Introduction" link="/react-router/" />

We will start off with a minimal React project that uses React Router to navigate a user from one page to another page:

```javascript
import { Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <>
      <h1>React Router</h1>

      <nav>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};
```

In this [function component](/react-function-component/) we have matching Link and Route components from React Router for the `home/` and `about/` routes. Furthermore, we have a so-called Index Route loaded with the Home component and a so-called No Match Route loaded with the NoMatch component. Both act as fallback routes. From here, we will explore **how to navigate in React Router**.

# Redirect with Navigate Component

We can perform a **declarative redirect** by using React Router's Navigate component. In the following example, whenever a user navigates to the about page, the Navigate component will perform a redirect declaratively:

```javascript{5,11,16}
import {
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';

...

const About = () => {
  const shouldRedirect = true;

  return (
    <>
      <h2>About</h2>
      {shouldRedirect && <Navigate replace to="/home" />}
    </>
  );
};
```

If we would want to manage this on a Route level, we could use this alternative solution as well:

```javascript{2,19-23}
const App = () => {
  const shouldRedirect = true;

  return (
    <>
      <h1>React Router</h1>

      <nav>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route
          path="about"
          element={
            shouldRedirect ? (
              <Navigate replace to="/home" />
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

```javascript{5,11,13,15-19}
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';

...

const About = () => {
  const shouldRedirect = true;

  const navigate = useNavigate();

  React.useEffect(() => {
    if (shouldRedirect) {
      navigate('/home');
    }
  });

  return (
    <>
      <h2>About</h2>
    </>
  );
};
```

Whenever the component renders, [React's useEffect Hook](/react-useeffect-hook/) runs and will perform the redirect programmatically. Initiating the redirect when the component renders without any condition is not useful at all, as you can see, but serves as a minimal example. You can head back to my [React Router tutorial](/react-router/) where a programmatic redirect is used for a actual real wordl use case.

<Divider />

The best practice for performing a redirect with React Router would be initiating the redirect on the server-side for SEO and performance reasons. However, there are times when you have to fall back to a client-side redirect and therefore have to use React Router's Navigation component or useNavigate Hook for a declarative or programmatic redirect.