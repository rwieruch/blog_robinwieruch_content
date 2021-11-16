---
title: "How to use React memo"
description: "Learn how to use React memo for performance optimizations of your React components ..."
date: "2020-06-09T08:52:46+02:00"
categories: ["React"]
keywords: ["react memo"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

React's memo API can be used to **optimize the rendering behavior** of your [React function components](/react-function-component/). We will go through an example component to illustrate the problem first, and then solve it with **React's memo API**.

Keep in mind that most of the performance optimizations in React are premature. React is fast by default, so *every* performance optimization is opt-in in case something starts to feel slow.

*Note: If your React component is still rendering with React memo, check out this guide about [React's useCallback Hook](/react-usecallback-hook/). Often a re-rendering is associated with a callback handler which changes for every render.*

*Note: Don't mistake React's memo API with [React's useMemo Hook](/react-usememo-hook/). While React memo is used to wrap React components to prevent re-renderings, useMemo is used to memoize values.*

Let's take the following example of a React application which [renders a list of user items](/react-list-component/) and allows us to [add users](/react-add-item-to-list/) to the list. We are using [React's useState Hook](/react-usestate-hook/) to make this list stateful:

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

  const handleAddUser = () => {
    setUsers(users.concat({ id: uuidv4(), name: text }));
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleAddUser}>
        Add User
      </button>

      <List list={users} />
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

If you include a `console.log` statement in the function body of the App, List, and ListItem components, you will see that these logging statements run every time someone types into the input field:

```javascript{2,8,19}
const App = () => {
  console.log('Render: App');

  ...
};

const List = ({ list }) => {
  console.log('Render: List');
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const ListItem = ({ item }) => {
  console.log('Render: ListItem');
  return <li>{item.name}</li>;
};
```

After typing into the input field, all the components re-render because the App component updates its state and all of its child components will re-render by default.

```text
// after typing one character into the input field

Render: App
Render: List
Render: ListItem
Render: ListItem
```

That's the default behavior given by React and most of the time it's fine to keep it this way as long as your application doesn't start to feel slow.

But once it starts to feel slow, such as rendering a huge list of items every time a user types into the input field, you can use React's memo API to **memoize your component's function**:

```javascript{1,10}
const List = React.memo(({ list }) => {
  console.log('Render: List');
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
});

const ListItem = ({ item }) => {
  console.log('Render: ListItem');
  return <li>{item.name}</li>;
};
```

Now when we type into the input field, only the App component re-renders because it's the only component affected by the changed state. The List component receives its memoized props from before, which haven't changed, and thus doesn't re-render at all. The ListItem follows suit without using React's memo API because the List component already prevents the re-render.

```text
// after typing one character into the input field

Render: App
```

That's React's memo function in a nutshell. It seems like we don't need to memo the ListItem component. However, once you add an new item to the list with the button, you will see the following output with the current implementation:

```text
// after adding an item to the list

Render: App
Render: List
Render: ListItem
Render: ListItem
Render: ListItem
```

By adding an item to the list, the list changes which causes the List component to update. For now that's the desired behavior because we want to render all the items (2 items) plus the new item (1 item). But perhaps it would be more efficient to render only the one new item instead of all the items:

```javascript{12,15}
const List = React.memo(({ list }) => {
  console.log('Render: List');
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
});

const ListItem = React.memo(({ item }) => {
  console.log('Render: ListItem');
  return <li>{item.name}</li>;
});
```

After trying the scenario from before, by adding an item to the list, with the new implementation with React's memo function, you should see the following output:

```text
// after adding an item to the list

Render: App
Render: List
Render: ListItem
```

Only the new item renders. All the previous items in the list remain the same and thus don't re-render. Now only the components which are affected from the state changes rerender.

You might be wondering why you wouldn't use React memo on all your components or why React memo isn't the default for all React components in the first place.

Internally React's memo function has to compare the previous props with the new props to decide whether it should re-render the component. Often the computation for this comparison can be more expensive than just re-rendering the component.

<Divider />

In conclusion, React's memo function shines when your React components become slow and you want to improve their performance. Often this happens in data heavy components, like huge lists where lots of components have to rerender once a single data point changes.