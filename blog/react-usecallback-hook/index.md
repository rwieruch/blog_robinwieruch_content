---
title: "How to useCallback in React"
description: "A tutorial about React's useCallback hook by example for performance optimizations in React function components ..."
date: "2020-07-06T09:52:46+02:00"
categories: ["React"]
keywords: ["react usecallback"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

React's useCallback Hook can be used to **optimize the rendering behavior** of your [React function components](/react-function-component). We will go through an example component to illustrate the problem first, and then solve it with **React's useCallback Hook**.

Keep in mind that most of the performance optimizations in React are premature. React is fast by default, so *every* performance optimization is opt-in in case something starts to feel slow.

*Note: Don't mistake React's useCallback Hook with [React's useMemo Hook](/react-usememo-hook). While useCallback is used to memoize functions, useMemo is used to memoize values.*

*Note: Don't mistake React's useCallback Hook with [React's memo API](/react-memo). While useCallback is used to memoize functions, React memo is used to wrap React components to prevent re-renderings.*

Let's take the following example of a React application which [renders a list](/react-list-component) of items and allows us to [add items](/react-add-item-to-list) and [remove items](/react-remove-item-from-list) (with [callback handlers](/react-event-handler)) from this list (here users). We are using [React's useState Hook](/react-usestate-hook) to make this list stateful:

```javascript
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [users, setUsers] = React.useState([
    { id: 'a', name: 'Robin' },
    { id: 'b', name: 'Dennis' },
  ]);

  const [text, setText] = React.useState('');

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleAddUser = ()  =>{
    setUsers(users.concat({ id: uuidv4(), name: text }));
  };

  const handleRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleAddUser}>
        Add User
      </button>

      <List list={users} onRemove={handleRemove} />
    </div>
  );
};

const List = ({ list, onRemove }) => {
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </ul>
  );
};

const ListItem = ({ item, onRemove }) => {
  return (
    <li>
      {item.name}
      <button type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  );
};

export default App;
```

Following this guide about [React memo](/react-memo) (if you don't know React memo, read the guide first and then come back), which has similar components to our example, we want to prevent the re-rendering for every component when a user uses the input field.

```javascript{2,8,19}
const App = () => {
  console.log('Render: App');

  ...
};

const List = ({ list, onRemove }) => {
  console.log('Render: List');
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </ul>
  );
};

const ListItem = ({ item, onRemove }) => {
  console.log('Render: ListItem');
  return (
    <li>
      {item.name}
      <button type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  );
};
```

Typing into the input field for adding an item to the list should only trigger a re-render for the App component, but not for its child components which don't care about this state change. Thus, normally React memo will be used to prevent the update of the child components:

```javascript{1,10,12,22}
const List = React.memo(({ list, onRemove }) => {
  console.log('Render: List');
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </ul>
  );
});

const ListItem = React.memo(({ item, onRemove }) => {
  console.log('Render: ListItem');
  return (
    <li>
      {item.name}
      <button type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  );
});
```

However, perhaps to your surprise, both function components still re-render when typing into the input field. For typing one character into the input field, you should still see the same output as before:

```text
// after typing one character into the input field

Render: App
Render: List
Render: ListItem
Render: ListItem
```

Let's have a look at the [props](/react-pass-props-to-component) that are passed to the List component. The `list` should stay intact, as long as no item is added or removed from the list, even though the App component re-renders after typing something into the input field. So the culprit is the `onRemove` callback handler.

Whenever the App component re-renders, which it does whenever someone types into the input field, the `handleRemove` handler function in the App component gets re-defined. When passing this new handler as prop (callback handler) to the List component, the List component notices it as a changed prop compared to the previous render. That's why the re-render for the List and ListItem components kicks in.

Finally we have our use case for React's useCallback Hook. We can use useCallback to **memoize a function** which means that this function gets only re-defined when its dependencies change:

```javascript{4,6-7}
const App = () => {
  ...

  const handleRemove = React.useCallback(
    (id) => setUsers(users.filter((user) => user.id !== id)),
    [users]
  );

  ...
};
```

If the stateful `users` change, due to someone adding an item or removing an item from the list, the handler function gets re-defined and the child components should re-render. However, if someone only types into the input field, the function stays isn't re-defined and stays intact. Therefore, the child components don't receive changed props and don't re-render for this case.

After all, you may be wondering why you wouldn't use React's useCallback Hook on all your functions or why React's useCallback Hook isn't the default for all functions in the first place. Internally React's useCallback Hook has to compare the dependencies from the dependency array for every re-render to decide whether it should re-define the function. Often the computation for this comparison can be more expensive than just re-defining the function.

<Divider />

In conclusion, React's useCallback Hook is used to memoize functions. It's already a small performance benefits in itself, without passing this function to another component, because this way functions aren't re-initialized for every re-render of a component. However, as you have seen, React's useCallback Hook starts to shine when using it together with React's memo API.
