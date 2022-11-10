---
title: "React Router 6: Authentication"
description: "You will learn how to use authentication in React Router 6 by authenticating a user by login (sign in) and logout (sign out) ..."
date: "2022-01-25T04:52:46+02:00"
categories: ["React", "React Router 6"]
keywords: ["react router authentication", "react router 6"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A React Router tutorial which teaches you how to use **Authentication in React Router 6**. The code for this React Router v6 tutorial can be found over [here](https://github.com/the-road-to-learn-react/react-router-6-examples). In order to get you started, create a new React project (e.g. [create-react-app](https://github.com/facebook/create-react-app)). Afterward, [install React Router](https://reactrouter.com/docs/en/v6/getting-started/installation#basic-installation) and read the following React Router tutorial to get yourself aligned to what follows next.

<ReadMore label="React Router 6 Introduction" link="/react-router/" />

We will start off with a minimal React project that uses React Router to navigate a user from one page to another page. In the following [function component](/react-function-component/), we have matching Link and Route components from React Router for the `home/` and `dashboard/` routes. Furthermore, we have a so-called Index Route loaded with the Home component and a so-called No Match Route loaded with the NoMatch component. Both act as fallback routes:

```javascript
import { Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <>
      <h1>React Router</h1>

      <Navigation />

      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </nav>
  );
};
```

From here, we will explore the concept of authentication with React Router. Generally speaking React Router does not handle the authentication itself, it cares about the authentication related navigation instead.

So whether you are authenticating against a [REST API](/node-express-server-rest-api/), a [GraphQL API](/graphql-apollo-server-tutorial/), or a backend-as-a-service such as [Firebase](/complete-firebase-authentication-react-tutorial/) is up to you. What matters in the end is that the authentication API returns your frontend a token (e.g. JWT) after a successful authentication and React Router will take over from there (e.g. redirecting the user after a login).

We will use a [fake API](/javascript-fake-api/) to mock the authentication to a backend. This fake API is just a function which resolves a string from a promise with a delay. However, if you have a backend which supports authentication, you can hit the backend API instead and don't need to implement the following function in your frontend:

```javascript
const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });
```

But let's start simple. In the previous example, we created two routes for a Home and a Dashboard component. These components may be implemented the following way and already indicate whether they can be accessed by a authorized user:

```javascript{4,12}
const Home = () => {
  return (
    <>
      <h2>Home (Public)</h2>
    </>
  );
};

const Dashboard = () => {
  return (
    <>
      <h2>Dashboard (Protected)</h2>
    </>
  );
};
```

While the public Home component should be accessible by everyone, the protected Dashboard component should only be accessible for authenticated users. At the moment, you can navigate to both components and we will implemented the protection of the Dashboard component by using a so-called Private Route later on.

Now we will focus on the authentication of a user first by implementing a button with a [callback handler](/react-event-handler/) to sign in a user. We are using the "Home page" here, but you can also use a dedicated "Login page" if you want to:

```javascript{1,6-8}
const Home = ({ onLogin }) => {
  return (
    <>
      <h2>Home (Public)</h2>

      <button type="button" onClick={onLogin}>
        Sign In
      </button>
    </>
  );
};
```

In a real world scenario, you would use a bunch of HTML form elements to catch a user's email/password combination and pass it up via the callback handler when a user submits the form. However, in order to keep it simple, we are using only a button here.

Next, up in the parent component, we create the actual event handler which is passed down to the Home component as callback handler via [React props](/react-pass-props-to-component/) and which is called whenever a user clicks the button in the Home component. Within the callback handler we execute the fake API which returns a token for us. Again, if you have your own backend with an authentication API, you can authenticate against the real backend instead:

```javascript{2,4-8,17-18}
const App = () => {
  const [token, setToken] = React.useState(null);

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);
  };

  return (
    <>
      <h1>React Router</h1>

      <Navigation />

      <Routes>
        <Route index element={<Home onLogin={handleLogin} />} />
        <Route path="home" element={<Home onLogin={handleLogin} />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};
```

Furthermore, we used [React's useState Hook](/react-usestate-hook/) to store the token as component state. The token itself is a representation of the authentication user. In a real world scenario, you may have a JWT token which encapsulates information (e.g. username, email) of the user.

An application with a login needs to have an equivalent logout as well. In our case, the logout will be initiated in the top-level Navigation component, but feel free to put it anywhere you want. Within the new callback handler that is passed to the Navigation component, we will only reset the token to `null` in the component's state when a users signs out from the application:

```javascript{10-12,18}
const App = () => {
  const [token, setToken] = React.useState(null);

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <>
      <h1>React Router</h1>

      <Navigation token={token} onLogout={handleLogout} />

      ...
    </>
  );
};
```

If you interact with a real backend yourself, sometimes you have to call an API for the logout too (e.g. for invalidating a session on the backend). Anyway, with the new callback handler which signs out a user, we show the user [conditionally](/conditional-rendering-react/) a button to log out whenever this user is authenticated (e.g. the token is not `null`):

```javascript{1,7-11}
const Navigation = ({ token, onLogout }) => {
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>

      {token && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};
```

Once you try your React application, you will see that the new "Sign Out" button only appears once you click the "Sign In" button on the Home page. If you click the "Sign Out" button after a sign in, the "Sign Out" button should disappear again.

Caveat: In a real world React application, in the case of an unauthenticated user, the navigation to the Dashboard page would be hidden as well. However, for the purpose of debugging all of this while implementing the authentication flow, we will show the navigation anyway.

# Authentication Context

Most likely when authenticating a user in an application, you will want to have the information about whether a user is authenticated in various components. The straightforward approach would be passing down the `token` [via props](/react-pass-props-to-component/) to all components that are interested in authentication state. However, what you will see most likely is the usage of [React Context](/react-context/) to tunnel props from a top-level to child components without using props:

```javascript{1,9,17}
const AuthContext = React.createContext(null);

const App = () => {
  const [token, setToken] = React.useState(null);

  ...

  return (
    <AuthContext.Provider value={token}>
      <h1>React Router</h1>

     <Navigation onLogout={handleLogout} />

      <Routes>
        ...
      </Routes>
    </AuthContext.Provider>
  );
};
```

After we created the context at a top-level of the application and passed the value (here: `token`) to the Context's Provider component, we can consume the context somewhere below in the application. For example, in order to display the authentication state in the Dashboard component without passing the token as prop, we could use React's useContext Hook which returns us the value from the Provider component:

```javascript{2,8}
const Dashboard = () => {
  const token = React.useContext(AuthContext);

  return (
    <>
      <h2>Dashboard (Protected)</h2>

      <div>Authenticated as {token}</div>
    </>
  );
};
```

Essentially that's it for using bare bones context in React. However, if we want to follow [best practices when using React's useContext Hook](/react-usecontext-hook/), we could abstract the context into something more self-descriptive -- which, in addition, shields away all the internal implementation details of the authentication process:

```javascript
const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(null);

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

By moving all the implementation details into a custom Provider component, the App component is not cluttered anymore with all the authentication related business logic. Instead, all the logic resides in the new Provider component:

```javascript{3,6,9,10}
const App = () => {
  return (
    <AuthProvider>
      <h1>React Router</h1>

      <Navigation />

      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
};
```

Since the `value` in the context changed from a string to an object with `token` (state), `onLogin` (event handler) and `onLogout` (event handler), we have to adapt our previously used consuming context hooks where the `token` needs to be destructured from the object:

```javascript{2}
const Dashboard = () => {
  const { token } = React.useContext(AuthContext);

  return (
    <>
      <h2>Dashboard (Protected)</h2>

      <div>Authenticated as {token}</div>
    </>
  );
};
```

To follow useContext best practices again, we can create a [custom hook](/react-custom-hook/) with a self-descriptive name:

```javascript
const useAuth = () => {
  return React.useContext(AuthContext);
};
```

Then again, we can replace the bare bones `useContext` usage with this new custom React hook. In a [larger React project](/react-folder-structure/), these kind of abstractions can help to clean up your React code:

```javascript{2}
const Dashboard = () => {
  const { token } = useAuth();

  return (
    <>
      <h2>Dashboard (Protected)</h2>

      <div>Authenticated as {token}</div>
    </>
  );
};
```

The event handlers, which have been previously defined in the App component and passed down to the components, are now defined in the custom Provider component. So instead of passing these event handlers down from the App component as callback handlers, we consume the event handlers as functions from the new context by destructuring them as well:

```javascript{1-2,18-19}
const Navigation = () => {
  const { onLogout } = useAuth();

  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>

      {token && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

const Home = () => {
  const { onLogin } = useAuth();

  return (
    <>
      <h2>Home (Public)</h2>

      <button type="button" onClick={onLogin}>
        Sign In
      </button>
    </>
  );
};
```

That's it for using a more elaborate context approach for authentication in React. We have created a custom Provider component which keeps track of the `token` state (read: authentication state). In addition, we defined all the necessary handlers (e.g. login, logout) in the new custom Provider component instead of cluttering the App component with these implementation details. Then we passed the state and the event handlers as context to all components which are interested in the authentication state and/or sign in/out users.

# React Router Redirect after Authentication

We have all business logic for the essential authentication in place and are able to consume this business logic (state + event handlers) anywhere in the React application with the help of React's context (here: the custom `useAuth` hook).

Next React Router comes finally into play, because after a successful authentication usually a user gets redirected from the login page (here: Home page) to a landing page (here: Dashboard page) whereas the latter is only accessible for authenticated users:

```javascript{5,11,19}
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
} from 'react-router-dom';

...

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = React.useState(null);

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

We handled the [redirect programmatically via React Router's useNavigate Hook](/react-router-redirect/) here. However, the explicit redirect only applied for the sign in. For the sign out in contrast, we will use an implicit redirect by creating a so-called protected route for sensitive pages (read: components) that are prohibited to be accessed from unauthenticated users.

# Protected Routes in React Router

Let's make use of protected routes (also called private routes). Therefore, we will create a new component. In the case of protecting against unauthorized users (here: unauthenticated users), the component will check whether the authentication token is present. If it is present, the component will render its children. However, if it is absent, the user gets a conditional redirect with React Router's declarative Navigate component to the login page (here: Home page):

```javascript{5,9-17}
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/home" replace />;
  }

  return children;
};
```

Next we will use this new component. In our App component, the Dashboard component should only be accessible for authenticated users. Therefore, the new ProtectedRoute component is wrapped around it:

```javascript{14,16}
const App = () => {
  return (
    <AuthProvider>
      <h1>React Router</h1>

      <Navigation />

      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
};
```

Now, when users click the button to log out, they get an implicit redirect via the new protected route, because the token is not present anymore. Furthermore, if a user is not authenticated, it's not possible for this user to visit a protected route (here: Dashboard page).

<ReadMore label="React Router 6 Private Routes" link="/react-router-private-routes/" />

Be aware: Anyway, even though the route is protected and not accessible by unauthorized users anymore, a malicious user could still modify the client-side code in the browser (e.g. removing the condition to redirect from the ProtectedRoute). Therefore, all sensitive API calls that happen on protected pages (e.g. Dashboard page) need to be secured from the server-side too.

# Remember Route for Redirect

In modern applications, you will get a redirect to your previously visited page after a log in. In other words: If you open an application at a protected route, but you are not logged in, you get a redirect to the Login page. After the login, you will get a redirect to the desired protected route.

In order to implement such smart redirect, we have to "remember" the location from where the redirect happened to the Login page. The best place to add these implementation details would be the ProtectedRoute component. There we can use **React Router's useLocation Hook** to grab the current location before redirecting the user. With the redirect, we send also the state of the current page to the redirected page:

```javascript{7,14,17}
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';

...

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  return children;
};
```

Next we can grab the state with the previous page from React Router's location again. When a login happens, we can take the previous page to redirect the user to this desired page. If this page was never set as state, we default to the Dashboard page:

```javascript{3,12,13}
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = React.useState(null);

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);

    const origin = location.state?.from?.pathname || '/dashboard';
    navigate(origin);
  };

  ...
};
```

At the moment we have only one protected page, so it's difficult to test the new smart redirect behavior. However, you could quickly add a second protected page to test it yourself:

```javascript{19-26,41,52-58}
const App = () => {
  return (
    <AuthProvider>
      <h1>React Router</h1>

      <Navigation />

      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
};

const Navigation = () => {
  const { token, onLogout } = useAuth();

  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/admin">Admin</NavLink>

      {token && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

const Admin = () => {
  return (
    <>
      <h2>Admin (Protected)</h2>
    </>
  );
};
```

When you visit the Admin page as unauthenticated user, you will get a redirect to the Home page. After a successful login, you will get a redirect back to the Admin page. The same happens when you navigate to the Dashboard as unauthenticated user: After the login you will get a redirect to the remembered Dashboard page.

<Divider />

That's it. You have created an authentication flow with React Router and a fake API. You can exchange the fake API anytime with your actual backend's API. In addition, you can conditionally hide the Link components which navigate users to protected routes in the case of the user not being authenticated. You can also create a dedicated Login page where a user gets a form presented which asks for a email/user + password combination.