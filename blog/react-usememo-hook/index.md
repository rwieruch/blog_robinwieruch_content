---
title: "How to useMemo in React"
description: "A tutorial about React's useMemo hook by example for performance optimizations in React function components ..."
date: "2020-07-13T10:52:46+02:00"
categories: ["React"]
keywords: ["react usememo"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

React's useMemo Hook can be used to **optimize the computation costs** of your [React function components](/react-function-component). We will got through an example component to illustrate the problem first, and then solve it with **React's useMemo Hook**.

Keep in mind that most of the performance optimizations in React are premature. React is fast by default, so *every* performance optimization is opt-in in case something starts to feel slow.

*Note: Don't mistake React's useMemo Hook with [React's memo API](/react-memo). While useMemo is used to memoize values, React memo is used to wrap React components to prevent re-renderings.*

*Note: Don't mistake React's useMemo Hook with [React's useCallback Hook](/react-usecallback-hook). While useMemo is used to memoize values, useCallback is used to memoize functions.*

Let's take the following example of a React application which [renders a list](/react-list-component) of users and allows us to filter the users by their name. The catch: The filter happens only when a user explicitly clicks a button; not already when the user types into the input field:

```javascript
import React from 'react';

const users = [
  { id: 'a', name: 'Robin' },
  { id: 'b', name: 'Dennis' },
];

const App = () => {
  const [text, setText] = React.useState('');
  const [search, setSearch] = React.useState('');

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleSearch = () => {
    setSearch(text);
  };

  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleSearch}>
        Search
      </button>

      <List list={filteredUsers} />
    </div>
  );
};

const List = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const ListItem = ({ item }) => {
  return <li>{item.name}</li>;
};

export default App;
```

Even though the `filteredUsers` don't change when someone types into the input field, because they change only when clicking the button via the `search` state, the filter's callback function runs again and again for every keystroke in the input field:

```javascript{5}
function App() {
  ...

  const filteredUsers = users.filter((user) => {
    console.log('Filter function is running ...');
    return user.name.toLowerCase().includes(search.toLowerCase());
  });

  ...
}
```

This doesn't slow down this small React application. However, if we would deal with a large set of data in this array and run the filter's callback function for every keystroke, we would maybe slow down the application. Therefore, you can use React's useMemo Hook to **memoize a functions return value(s)** and to run a function only if its dependencies (here `search`) have changed:

```javascript{4-5,10-11}
function App() {
  ...

  const filteredUsers = React.useMemo(
    () =>
      users.filter((user) => {
        console.log('Filter function is running ...');
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search]
  );

  ...
}
```

Now, this function is only executed once the `search` state changes. It doesn't run if the `text` state changes, because that's not a dependency for this filter function and thus not a dependency in the dependency array for the useMemo hook. Try it yourself: Typing something into the input field should't trigger the logging, but executing the search with a button click will trigger it.

<Divider />

After all, you may be wondering why you wouldn't use React's useMemo Hook on all your value computations or why React's useMemo Hook isn't the default for all value computations in the first place. Internally React's useMemo Hook has to compare the dependencies from the dependency array for every re-render to decide whether it should re-compute the value. Often the computation for this comparison can be more expensive than just re-computing the value. In conclusion, React's useMemo Hook is used to memoize values.
