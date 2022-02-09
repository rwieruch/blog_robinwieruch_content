---
title: "React Router 6: Descendant Routes"
description: "How to: Descendant Routes in React Router 6. A step by step example on Descendant Routes with React Router ..."
date: "2022-02-09T07:52:46+02:00"
categories: ["React", "React Router 6"]
keywords: ["react router descendant routes", "react router 6"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

A React tutorial which teaches you how to use **Descendant Routes with React Router 6**. The code for this React Router v6 tutorial can be found over [here](https://github.com/the-road-to-learn-react/react-router-6-examples).

<LinkCollection label="This tutorial is part 3 of 3 in the series." links={[{ prefix: "Part 1:", label: "React Router", url: "/react-router/" }, { prefix: "Part 2:", label: "Nested Routes with React Router", url: "/react-router-nested-routes/" }]} />

The previous tutorial of Nested Routes has shown you how to replace a part of a component depending on the URL with the help of the Outlet component. This way, in the last example, we rendered a User component within a Users component. While the Users component listed all users, the User component displayed the details of the matched user.

However, sometimes you do not want to nest the routes, but rather want to introduce a switch between them. For example, contrary to the previous example, you may want to show *either* a list of users (e.g. UserList component) or the details of a user (e.g. UserItem component), but never both on the same route. However, both routes should operate under the umbrella `/users` route. A straightforward way to accomplish this would be adding both as standalone routes in the App component:

```javascript{20-21}
const App = () => {
  const users = [
    { id: '1', firstName: 'Robin', lastName: 'Wieruch' },
    { id: '2', firstName: 'Sarah', lastName: 'Finnley' },
  ];

  return (
    <>
      <h1>React Router</h1>

      <nav>
        <Link to="/home">Home</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="users" element={<UserList users={users} />} />
          <Route path="users/:userId" element={<UserItem  />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};
```

For the sake of completeness, these could be the UserList and UserItem components which are used to link back and forth between both components:

```javascript
const UserList = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <h3>User List</h3>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}>
              {user.firstName} {user.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const UserItem = () => {
  const { userId } = useParams();

  return (
    <>
      <h2>Users</h2>
      <h3>User Item: {userId}</h3>

      <Link to="/users">Back to Users</Link>
    </>
  );
};
```

This works. There is a switch between UserList and UserItem component. Only either of them is showing up, but not both as we had before in the previous example for Nested Routes. However, by just looking at the App component and its defined Route components, you may be intrigued to search for a more elegant solution for both `/users` routes.

Both routes share one specific domain (here: user) and maybe shouldn't show up this way in the top-level App component which should only define top-level routes (e.g. `/users`, but not `/users/:userId`) as best practice. And there is a more elegant solution to it called **Descendant Routes**.

Descendant Routes are routes that are not defined in the top-level collection of Route components, but somewhere down the component tree. We will explore this concept by adapting the App component from before to the following version:

```javascript{12}
const App = () => {
  const users = [
    { id: '1', firstName: 'Robin', lastName: 'Wieruch' },
    { id: '2', firstName: 'Sarah', lastName: 'Finnley' },
  ];

  return (
    <>
      <h1>React Router</h1>

      <nav>
        <Link to="/home">Home</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="users/*" element={<Users users={users} />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};
```

As you can see, there is only one top-level users related route now. What's new is the trailing asterisk (`*`) which indicates that this Route and its component (here: Users component) render descendant routes. Let's check the new Users component:

```javascript
const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>

      <Routes>
        <Route index element={<UserList users={users} />} />
        <Route path=":userId" element={<UserItem users={users} />} />
      </Routes>

      <Outlet />
    </>
  );
};
```

The Users component is an umbrella component for the user domain and renders two Descendant Routes and an Outlet component. While one of the descendant routes is an Index Route (matching just `/users`), the other route is a Dynamic Route (matching `/users/:userId`). Depending on the matching route, either the UserList or UserItem component renders in the Outlet.

After all, by using Descendant Routes, you gain the ability to group routes into more fine-grained domains. In addition, you also stay flexible where you define your set of Routes components if it's not at the top-level App component. As you have seen in this example, Descendant Routes can be used nicely for switching between multiple routes in a specific domain.

<Divider />

If you happen to use React Router for your React application, Nested Routes can boost your user experience tremendously by giving your users access to very specific parts of your applications while sharing these parts as URLs. In addition, Descendant Routes can be used to define routes not only in a top-level React component, but also deeply nested in your hierarchy of React components while being able to group them under specific domains.