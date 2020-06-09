---
title: "How to use React memo"
description: "Learn how to use React memo for performance optimizations of your React components ..."
date: "2020-06-09T08:52:46+02:00"
categories: ["React"]
keywords: ["react memo"]
hashtags: ["#100DaysOfCode", "#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

React's memo API can be used to **optimize the rendering behavior** of your [React function components](/react-function-component). We will got through an example component to illustrate the problem first, and then solve it with **React's memo API**.

Keep in mind that most of the performance optimizations in React are premature. React is fast by default, so *every* performance optimization is opt-in in case something starts to feel slow.

*Note: If your React component is still rendering with React memo, check out this guide about [React's useCallback Hook](/react-usecallback-hook). Often a re-rendering is associated with a callback handler which changes for every render.*

*Note: Don't mistake React's memo API with [React's useMemo Hook](/react-usememo-hook). While React memo is used to wrap React components to prevent re-renderings, useMemo is used to memoize values.*

Let's take the following example of a React application which [renders a list](/react-list-component) of items and allows us to [add items](/react-add-item-to-list) to this list (here users). We are using [React's useState Hook](/react-usestate-hook) to make this list stateful:

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

If you include a `console.log` statement in the component's function body of the App, List, and ListItem components, you will see that these logging statements run every time someone types into the input field:

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

After typing into the input field, all components re-render because the App component updates its state and all of its child components will re-render by default.

```text
// after typing one character into the input field

Render: App
Render: List
Render: ListItem
Render: ListItem
```

That's the default behavior given by React and most of the time it's fine to keep it this way as long as your application doesn't start to feel slow.

Once it starts to feel slow, because, in contrast to our small list, maybe a huge list of items renders every time again when a user types into the input field, you can use React's memo API to **memoize your component's function**:

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

Now, when typing into the input field, only the App component re-renders again, because only this component is affected by the changed state. The List component receives its memoized props from before which haven't changed and thus doesn't re-render at all. The ListItem follows suit without using React's memo API, because the List component prevents the re-render already.

```text
// after typing one character into the input field

Render: App
```

That's React's memo function in a nutshell. It seems like we don't need to memo the ListItem component, however, once you new add an item to the list with the button, you will see the following output with the current implementation:

```text
// after adding an item to the list

Render: App
Render: List
Render: ListItem
Render: ListItem
Render: ListItem
```

After adding an item to the list, the list has changed and the List component will update. That's the desired behavior now, because we want to render all the items (2 items) plus the new item (1 item). However, perhaps it would be more sufficient to only render the one new item instead of all items:

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

Only the new item renders, all the previous items remain the same in the list and thus don't re-render at all. Now only the components which are affected from the state changes rerender.

After all, you may be wondering why you wouldn't use React memo on all your components or why React memo isn't the default for all React components in the first place. Internally React's memo function has to compare the previous props with the new props to decide whether it should re-render the component. Often the computation for this comparison can be more expensive than just re-rendering the component.

<Divider />

In conclusion, React's memo function shines when your React components become slow and you want to improve their performance. Often this happens in data heavy components, like huge lists, where lots of components have to rerender once one data point changes.