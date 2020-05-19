---
title: "How to update state from props in React"
description: "Learn how to initialize state from props and how to update state from props for rare edge cases where your state of a component depends on its incoming props ..."
date: "2020-05-18T07:52:46+02:00"
categories: ["React"]
keywords: ["react update state from props", "react derive state from props", "react initialize state from props", "react sync state and props"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

It doesn't happen often, but sometimes you have to update [state](/react-state) from [props](/react-pass-props-to-component) in React. In this brief walkthrough, I want to show you a use case where you would want to derive state from props and how to do it for the initial props and updated props. Keep in mind that this concept should only be used rarely though, because often there is no need to initialize state from props. You can find this project we are going to build on [GitHub](https://github.com/the-road-to-learn-react/react-derive-state-props).

# How to derive initial state from props in React

Occasionally there are use cases where you want to set state from props in a [React function component](/react-function-component): For example, the following use case shows a scenario where a parent component provides a list of users as props to a child component which renders these users as a [list](/react-list-component):

```javascript
import React from 'react';

const fakeUsers = [
  {
    id: '1',
    name: 'Robin',
  },
  {
    id: '2',
    name: 'Dennis',
  },
];

function App() {
  const [users, setUsers] = React.useState(fakeUsers);

  return (
    <div>
      <h1>Derive State from Props in React</h1>

      <List list={users} />
    </div>
  );
}

function List({ list }) {
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
}

function Item({ item }) {
  return (
    <li>
      <span>{item.name}</span>
    </li>
  );
}

export default App;
```

Now, instead of having these users directly at our disposal in the state, we are simulating an API request to get these users with a delay from a JavaScript promise. Before the promise resolves in [React's useEffect Hook](/react-useeffect-hook), we have an empty list of users in our initial state:

```javascript{14-18,21,23-31}
import React from 'react';

const fakeUsers = [
  {
    id: '1',
    name: 'Robin',
  },
  {
    id: '2',
    name: 'Dennis',
  },
];

function getFakeUsers() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(fakeUsers), 2000)
  );
}

function App() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const data = await getFakeUsers();

      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Derive State from Props in React</h1>

      <List list={users} />
    </div>
  );
}
```

So far, everything should work as expected without using any kind of derived state from props. Now comes one of the rare use cases where getting initial state from props would be useful. Imagine instead of rendering just the list of users, we would render an HTML input field for each user:

```javascript{4-5}
function Item({ item }) {
  return (
    <li>
      {item.name}
      <input type="text" value={item.name} />
    </li>
  );
}
```

Since we have an input field now, we would want to be able to update its value somehow. For example, imagine rendering this list of users and you would want to be able to update their name. At the moment, we don't have any access in state for this HTML input field's value, because it comes from our data state from above. We would have to allocate dedicated state for it, which just initializes with the value coming from the props:

```javascript{2-3,5-7,12}
function Item({ item }) {
  // derive initial state from props
  const [name, setName] = React.useState(item.name);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  return (
    <li>
      {item.name}
      <input type="text" value={name} onChange={handleNameChange} />
    </li>
  );
}
```

Now we initialize React's state from props; and whenever someone types something into the input field, this state gets updated to reflect the new value in the component (see [controlled component in React](/react-controlled-components)) without caring about new props , if the component re-renders, at all, because the initial state is only initialized once.

# How to update state from props in React

The first example has shown you how to set initial state from props. The next example shows you how to update state from props whenever the incoming props are changing. Similar to the previous scenario, don't expect this use case coming up too often in your React application. However, for some use cases it's good to know about it.

We will continue with the previous application. Imagine that each rendered user from our list renders a button with an [inline event handler](/react-event-handler) to update the user's name property with callback handler somewhere up in our App component:

```javascript{1,5,11,23-25}
function List({ list, onUpdateName }) {
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.id} item={item} onUpdateName={onUpdateName} />
      ))}
    </ul>
  );
}

function Item({ item, onUpdateName }) {
  // derive initial state from props
  const [name, setName] = React.useState(item.name);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  return (
    <li>
      {item.name}
      <input type="text" value={name} onChange={handleNameChange} />
      <button type="button" onClick={() => onUpdateName(item, name)}>
        Update
      </button>
    </li>
  );
}
```

For the sake of simplicity, we could update the specified item directly in the list -- without caring that this data comes actually from a remote data source -- with the following event handler in the App component:

```javascript{14-27,33}
function App() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const data = await getFakeUsers();

      setUsers(data);
    };

    fetchUsers();
  }, []);

  function handleUpdateName(item, name) {
    const newUsers = users.map((user) => {
      if (user.id === item.id) {
        return {
          id: user.id,
          name: name,
        };
      } else {
        return user;
      }
    });

    setUsers(newUsers);
  }

  return (
    <div>
      <h1>Derive State from Props in React</h1>

      <List list={users} onUpdateName={handleUpdateName} />
    </div>
  );
}
```

However, for the sake of completeness for making the example more realistic, we could also invoke a fake API which returns us the updated list of users with a delay:

```javascript{1-13,28-29}
function updateFakeUserName(users, id, name) {
  const updatedUsers = users.map((user) => {
    if (user.id === id) {
      return { id, name };
    } else {
      return user;
    }
  });

  return new Promise((resolve) =>
    setTimeout(() => resolve(updatedUsers), 1000)
  );
}

function App() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const data = await getFakeUsers();

      setUsers(data);
    };

    fetchUsers();
  }, []);

  async function handleUpdateName(item, name) {
    const newUsers = await updateFakeUserName(users, item.id, name);

    setUsers(newUsers);
  }

  return (
    <div>
      <h1>Derive State from Props in React</h1>

      <List list={users} onUpdateName={handleUpdateName} />
    </div>
  );
}
```

Now comes the crucial step for updating state based on props; which we haven't done yet. In the Item component we set only the initial state based on props. We are not updating the state based on props yet. However, somehow the input field needs to know about the new state after updating it somewhere above. The following small change illustrates the problem:

```javascript{3}
function Item({ item, onUpdateName }) {
  // derive initial state from props
  const [name, setName] = React.useState(item.name + '!');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  return (
    <li>
      {item.name}
      <input type="text" value={name} onChange={handleNameChange} />
      <button type="button" onClick={() => onUpdateName(item, name)}>
        Update
      </button>
    </li>
  );
}
```

The first time the Item component renders, it appends a ! on the name for the initial state of the input field. However, if you update the name of a user by writing something entirely new in the input field and by clicking the button, the new updated name of this user doesn't get the ! appended to it when the input field re-renders. We can fix this by updating the state from props:

```javascript{9-12}
function Item({ item, onUpdateName }) {
  // derive initial state from props
  const [name, setName] = React.useState(item.name + '!');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  // derive updated state from props
  React.useEffect(() => {
    setName(item.name + '!');
  }, [item]);

  return (
    <li>
      {item.name}
      <input type="text" value={name} onChange={handleNameChange} />
      <button type="button" onClick={() => onUpdateName(item, name)}>
        Update
      </button>
    </li>
  );
}
```

Every time the incoming prop item changes, the side-effect of our React's useEffect Hook runs and updates the derived state for us. We can also remove the little ! helper which has only been there to spot the bug for us:

```javascript{3,11}
function Item({ item, onUpdateName }) {
  // derive initial state from props
  const [name, setName] = React.useState(item.name);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  // derive updated state from props
  React.useEffect(() => {
    setName(item.name);
  }, [item]);

  return (
    <li>
      {item.name}
      <input type="text" value={name} onChange={handleNameChange} />
      <button type="button" onClick={() => onUpdateName(item, name)}>
        Update
      </button>
    </li>
  );
}
```

That's it. The concept of *updating a state from props* usually happens if you already have *setting initial state from props* in place. Then whenever this state gets updated due to an external source, here our request to the fake API, we may want to update this initial state from props again.

<Divider />

Now you know about initializing and updating state from props in React. Use this knowledge sparingly, because it only applies for certain cases where you need to deploy state based on props. However, mostly just using common sense props and state in React should suffice and you shouldn't worry too much about this technique.

