---
title: "React Router 7 Tutorial"
description: "React Router 7 tutorial: setup, hooks, nested routes, dynamic routes, programmatic navigation, active links, layout routes, index routes and more. A step by step React tutorial for beginners ..."
date: "2025-01-06T07:52:46+02:00"
categories: ["React", "React Router 7"]
keywords: ["react router tutorial", "react router 7"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A React Router tutorial which teaches you how to use **React Router 7**. The code for this React Router v7 tutorial can be found over [here](https://github.com/rwieruch/examples/tree/main/react-router). In order to get you started, create a new React project (e.g. [Vite](https://vite.dev/guide/)) starting from a basic React template. Avoid using a React Router template, which will likely already include the routing features that this tutorial will teach you how to build.

Afterward, [install React Router](https://reactrouter.com/):

```sh
npm install react-router
```

The first implementation detail will be telling our React application that we want to use React Router. Hence, import the Router component in your React project's top-level file (e.g. *index.js*) where React hooks into HTML by using the ReactDOM API:

```tsx{2,6,8}
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

From here, we will continue our implementation in the *App.tsx* file. Feel free to extract components when needed into their own folders and files by coming up with a project structure yourself or by following [this guide about a common React project structure](/react-folder-structure/).

# Routing & Navigating

First, we will implement the navigation in our App component by using React Router's Link component to facilitate **routing in React**. I don't recommend to use inline style like I do, so feel free to choose an appropriate [styling strategy and styling approach for your React project](/react-css-styling/):

```tsx{1,8,13-25}
import { Link } from "react-router";

const App = () => {
  return (
    <>
      <h1>React Router</h1>

      <Navigation />
    </>
  );
};

const Navigation = () => {
  return (
    <nav
      style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
      }}
    >
      <Link to="/home">Home</Link>
      <Link to="/users">Users</Link>
    </nav>
  );
};

export default App;
```

When you start your React application in the browser, you should be able to click both Link components which should navigate you to their respective routes. Confirm this by checking the browser's current URL when clicking these links. Next, we need to map the routes to an actual rendering by using React Router's Route component:

```tsx{1,10-13}
import { Routes, Route, Link } from 'react-router';

const App = () => {
  return (
    <>
      <h1>React Router</h1>

      <Navigation />

      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </>
  );
};
```

You can see the direct match between Link and Route component by checking their respective `to` and `path` attributes. Each Route component renders a React element when the route matches. Since we are rendering a React element here, we could pass [React props](/react-pass-props-to-component/) as well. What's missing is the declaration of the corresponding [function components](/react-function-component/):

```tsx
const Home = () => {
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Home</h2>
    </main>
  );
};

const Users = () => {
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Users</h2>
    </main>
  );
};
```

When going back to the browser, you should be able to navigate from page to page (here: from `/home` to `/users` route) while seeing the Home and Users component. Basically that's the essence of React Router: setting up Link components and matching them with Route components. Links have a many to one relationship to Routes, so that there can be multiple Links in your application linking to the same Route.

# Layout Routes

Next you see how the new Home and Users component share the same layout. As React developers, intuitively we would extract a new component with the stylings from the Home and Users component to avoid duplication. In this new component, we would use React's children prop to [compose components](/react-component-composition/) into each other.

As first step, extract the styling into its own component:

```tsx{3,5,11,13,17-19}
const Home = () => {
  return (
    <>
      <h2>Home</h2>
    </>
  );
};

const Users = () => {
  return (
    <>
      <h2>Users</h2>
    </>
  );
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }) => {
  return <main style={{ padding: '1rem 0' }}>{children}</main>;
};
```

Second, render it in the App component. By using React's children, the Layout component should render the matched enclosing child route:

```tsx{7,10}
const App = () => {
  return (
    <>
      ...

      <Routes>
        <Layout>
          <Route path="home" element={<Home />} />
          <Route path="users" element={<Users />} />
        </Layout>
      </Routes>
    </>
  );
};
```

But you will see that this is not allowed in React Router and you will get an exception saying: *Uncaught Error: `[Layout]` is not a `<Route>` component. All component children of `<Routes>` must be a `<Route>` or `<React.Fragment>`*.

A common way around this would be using the Layout component in each component individually (similar to what we had before) or in each Route component (like in the following example):

```tsx{7-8}
const App = () => {
  return (
    <>
      ...

      <Routes>
        <Route path="home" element={<Layout><Home /></Layout>} />
        <Route path="users" element={<Layout><Users /></Layout>} />
      </Routes>
    </>
  );
};
```

However, this adds unwanted redundancy to the React application. So instead of duplicating the Layout component, we will use a so-called **Layout Route**, which is not an actual route, but just a way to give each Route component's `element` in a group of Routes the same surrounding style:

```tsx{7,10}
const App = () => {
  return (
    <>
      ...

      <Routes>
        <Route element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
};
```

As you can see, it's possible to nest Route components in another Route component -- whereas the former become so-called **Nested Routes**. Now instead of using React's children in the Layout component, use React Router's Outlet component as equivalent:

```tsx{1,5,8}
import { Routes, Route, Outlet, Link } from 'react-router';

...

const Layout = () => {
  return (
    <main style={{ padding: '1rem 0' }}>
      <Outlet />
    </main>
  );
};
```

In essence, the Outlet component in the Layout component inserts the matching child route (here: Home or Users component) of the parent route (here: Layout component). After all, using a Layout Route helps you to give each Route component in a collective the same layout (e.g. style with CSS, structure with HTML).

# Active Links in React Router

From here, you could go even one step further by moving all the App component's implementation details (headline, navigation) into this new Layout component. Furthermore, we can exchange the Link with a NavLink component in order to achieve so-called **Active Links** -- which show a user the currently active route. Hence the new NavLink component gives us access to a `isActive` flag in its `style` (and `className`) props when using it with a function:

```tsx
import {
  ...
  NavLink,
} from 'react-router';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

const Layout = () => {
  const style = ({ isActive }: NavLinkRenderProps) => ({
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <>
      <h1>React Router</h1>

      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <NavLink to="/home" style={style}>Home</NavLink>
        <NavLink to="/users" style={style}>Users</NavLink>
      </nav>

      <main style={{ padding: "1rem 0" }}>
        <Outlet />
      </main>
    </>
  );
};
```

Next you may have noticed that this React application lacks a base route. While we have a `/home` and `/users` route, there is no `/` route. You will see this as warning in your browser's developer tools too: *No routes matched location "/"*.

# Index Routes

Therefore, we will create a so-called **Index Route** for the `/` route whenever a user visits it. The element for this fallback route can be a new component or any already matched route (i.e. Home should render for the route `/` and not `/home` as demonstrated in the following example):

```tsx{5}
const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};
```

Then you have to adjust the NavLink components in the Layout component to reflect the new index route:

```tsx{1}
<NavLink to="/" style={style}>Home</NavLink>
<NavLink to="/users" style={style}>Users</NavLink>
```

You can think of an Index Route as a default route when the parent route matches, but none of its child routes.

# No Match Routes

Next, in case a user navigates to a non-matching route (e.g. `/about`), we will add a so-called **No Match Route** (also called **Not Found Route**) which equals to a 404 page of a website:

```tsx{7,13-14}
const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

const NoMatch = () => {
  return (<p>There's nothing here: 404!</p>);
};
```

So far, while using the Routes component as container for a collection of Route components, other best practices for React Router were shown by using Layout Routes, Index Routes, and No Match Routes. As you have seen, it's also possible to nest Route components into a Route component. We will learn more about nesting routes in the following section. Last but not least, we can use the NavLink component over a Link component whenever we want to show its active state. Essentially that's it for the basic concepts when using React Router.

# React Router: Dynamic and Nested Routes

Next we are going to enrich the Users component with implementation details. First, we will initialize a list of items (here: `users`) in our App component. The list is just sample data, but it could be [fetched in React](/react-hooks-fetch-data/) from a remote API too. Second, we will pass the users to the Users component as props:

```tsx{2-5,11}
const App = () => {
  const users = [
    { id: '1', fullName: 'Robin Wieruch' },
    { id: '2', fullName: 'Sarah Finnley' },
  ];

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="users" element={<Users users={users} />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
```

The Users component becomes a [list component in React](/react-list-component/), because it iterates over each user and returns JSX for it. In this case, it's a bit more than a mere list, because we add a React Router's Link component to the mix. The relative path in the Link component hints to a respective dynamic (here: `/${user.id}`) yet nested (here: `/${user.id}` nested in `/users`) route:

```tsx
type User = {
  id: string;
  fullName: string;
};

type UsersProps = {
  users: User[];
};

const Users = ({ users }: UsersProps) => {
  return (
    <>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.fullName}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
```

By having this new dynamic yet nested route, we need to create a matching nested Route component for it in the App component. First, since it is a so-called **Nested Route** (or child route) of the `/users` route, we can nest it in this respective parent Route component. In addition, since it is a so-called **Dynamic Route**, it uses a dynamic route defined as `:userId` whereas a user's identifier matches dynamically (e.g. user with `id` of `'1'` would be matched to `/users/1`):

```tsx{12-14}
const App = () => {
  const users = [
    { id: '1', fullName: 'Robin Wieruch' },
    { id: '2', fullName: 'Sarah Finnley' },
  ];

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="users" element={<Users users={users} />}>
          <Route path=":userId" element={<User />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
```

Previously we have learned about nested routes when we introduced the parent Layout Route which had the `/home` and `/users` routes as its child routes. When we made this change, we had to use the Outlet component in the parent route to render the matched child route. The same happens here again, because the Users component has to render its Nested Route too:

```tsx{8}
const Users = ({ users }: UsersProps) => {
  return (
    <>
      <h2>Users</h2>

      <ul>...</ul>

      <Outlet />
    </>
  );
};
```

Next, we are going to declare the missing User component which gets nested via the Outlet in the Users component whenever a user's identifier matches in the URL. Therefore we can use React Router's `useParams` Hook to get the respective `userId` (which equals `:userId`) from the URL:

```tsx{3,8-18}
import {
  ...
  useParams,
} from 'react-router';

...

const User = () => {
  const { userId } = useParams();

  return (
    <>
      <h2>User: {userId}</h2>

      <Link to="/users">Back to Users</Link>
    </>
  );
};
```

We have seen once again how to create nested routes by nesting one Route component (or multiple Route components) in another Route component. While the former are the nested child routes, the latter is the parent route which renders the enclosing component that has to make use of the Outlet component to render the actual matched child route.

<ReadMore label="Nested Routes in Detail" link="/react-router-nested-routes/" />

We have also seen how we can create dynamic routes by using the colon in a Route's `path` prop (e.g. `:userId`). Essentially the `:userId` acts as asterisk for any identifier. In our case, we use a Link component to navigate the user to a `/users/:userId` route where `:userId` stands for the actual user's identifier. In the end, we can always get the dynamic paths (called parameters or params) from the URL by using React Router's `useParams` Hook.

# Relative Links in React Router

The newest version of React Router comes with so-called **Relative Links**. We will examine this concept by looking at the Users component and its absolute `/users/${user.id}` path which is used for the Link component. In previous versions of React Router, it was necessary to specify the *entire path*. However, in this version you can just use the *nested path* as relative path:

```tsx{9}
const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}>
              {user.fullName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
```

Since the Users component is used for the `/users` route, the Link in the Users component knows its current location and does not need to create the whole top-level part of the absolute path. Instead it knows about `/users` and just appends the `:userId` as relative path to it.

# Declarative and Programmatic Navigation

So far, we have only used declarative navigation when using the Link or NavLink component. However, on certain occasions you want to be able to navigate a user programmatically via JavaScript. We will showcase this scenario by implementing a feature where it's possible to delete a user in the User component. After the deletion, the user should be navigated away from the User component to the Users component (from `/users/:userId` to `/users`).

<ReadMore label="Lazy Loading with React Router" link="/react-router-lazy-loading/" />

We will start this implementation by creating a stateful `users` value with [React's useState Hook](/react-usestate-hook/) followed by implementing a event handler which deletes a user from the `users` by using an identifier:

```tsx{1,5-8,10-12,22}
import { useState } from "react";
...

const App = () => {
  const [users, setUsers] = useState([
    { id: '1', fullName: 'Robin Wieruch' },
    { id: '2', fullName: 'Sarah Finnley' },
  ]);

  const handleRemoveUser = (userId: string | undefined) => {
    setUsers((state) => state.filter((user) => user.id !== userId));
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="users" element={<Users users={users} />}>
          <Route
            path=":userId"
            element={<User onRemoveUser={handleRemoveUser} />}
          />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
```

After we have passed the [event handler as callback handler](/react-event-handler/) to the User component, we can use it there as inline handler to remove the specific user by identifier:

```tsx{1-3,5,12-14}
type UserProps = {
  onRemoveUser: (userId: string | undefined) => void;
};

const User = ({ onRemoveUser }) => {
  const { userId } = useParams();

  return (
    <>
      <h2>User: {userId}</h2>

      <button type="button" onClick={() => onRemoveUser(userId)}>
        Remove
      </button>

      <Link to="/users">Back to Users</Link>
    </>
  );
};
```

Once a user got deleted, we can make use of React Router's useNavigate Hook which allows us to navigate a user programmatically to another route (here: `/users`):

```tsx{4,8,18}
import { useState } from "react";
import {
  ...
  useNavigate,
} from 'react-router';

const App = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: '1', fullName: 'Robin Wieruch' },
    { id: '2', fullName: 'Sarah Finnley' },
  ]);

  const handleRemoveUser = (userId: string | undefined) => {
    setUsers((state) => state.filter((user) => user.id !== userId));

    navigate('/users');
  };

  return (...);
};
```

In this case, the delete operation happens synchronously, because the users are just a stateful value on the client-side. However, if the user would be an entity in a database, you would have to make an asynchronous request to delete it. Once this operation (read: promise) resolves, the user gets navigated away to the `/users` route. You can try this scenario yourself by setting up a [fake API in React](/react-mock-data/) without using an actual server.

# React Router: Search Params

A URL in the browser does not only consist of a path (essentially pairs of segments like `users` and separators like `/`), but also of an optional query string (in React Router called **search params**) which comes in key/value pairs after a `?` separator in the URL. For example, `/users?name=robin` would be a URL with one search params pair where the key would be `name` and the value would be `robin`. The following example shows it as implementation:

```tsx{4,10,12,14-22,28-32,36-40}
import { useState } from "react";
import {
  ...
  useSearchParams,
} from 'react-router';

...

const Users = ({ users }: UsersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('name') || '';

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;

    if (name) {
      setSearchParams({ name: event.target.value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <h2>Users</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul>
        {users
          .filter((user) =>
            user.fullName
              .toLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
          )
          .map((user) => (
            <li key={user.id}>
              <Link to={user.id}>{user.fullName}</Link>
            </li>
          ))}
      </ul>

      <Outlet />
    </>
  );
};
```

First, we are using React Router's useSearchParams Hook to read the current search params from the URL (see `get()` method on `searchParams`), but also to write search params to the URL (see `setSearchParams()` function). While we use the former to get the search param by key (here: `'name'`) to [control](/react-controlled-components/) (read: display it in) the input field, we are using the latter to set the search param by key in the URL whenever a user types into the input field. At its core, React Router's useSearchParams Hook is the same as React's useState Hook with the difference that this state is a URL state and not a local state in React. Last but not least, we are using the search param to filter the actual list of `users` to finish this feature.

<ReadMore label="React Router Search Params" link="/react-router-search-params/" />

After all, having search params in your URL gives you the benefit of sharing more specific URLs with others. If you are on an ecommerce website where you have an active search for black shoes, you may want to share the whole URL (e.g. `myecommerce.com/shoes?color=black`) instead of only the path (e.g. `myecommerce.com/shoes`). The former gives the person who opens your URL the filtered list as starting point.

<Divider />

React Router is one of the most used [third-party libraries for React](/react-libraries/). Its core feature is mapping Link components to Route components which enables developers implementing [client-side routing without making requests to a web server](/web-applications/). However, going beyond this core feature, it's a full-blown routing library which enables declarative nested routing, dynamic routing, navigation, active links yet also programmatic navigation and searching via the URL.
