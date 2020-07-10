---
title: "Remove an Item from a List in React"
description: "Learn how to remove an item from a list in React with React's state. It's a common task to delete an item from an array in ..."
date: "2020-05-14T07:52:46+02:00"
categories: ["React"]
keywords: ["react remove item from list", "react delete item from array"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

It's a common task in React to remove an item from a list. Here I want to show you briefly how this works. Every time you want to modify something in React, for example a list where you want to remove an item, you have to use [React's state management](/react-state). We will be using React's useState Hook here, for the sake of keeping the first example simple, however, you can also use React's useReducer Hook, as you will see later.

We will start with a typical [list in React](/react-list-component) where we provide a [stable key attribute](/react-list-key) for each rendered list item:

```javascript
import React from 'react';

const list = [
  {
    id: 'a',
    firstname: 'Robin',
    lastname: 'Wieruch',
    year: 1988,
  },
  {
    id: 'b',
    firstname: 'Dave',
    lastname: 'Davidds',
    year: 1990,
  },
];

const App = () => {
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          <span>{item.firstname}</span>
          <span>{item.lastname}</span>
          <span>{item.year}</span>
        </li>
      ))}
    </ul>
  );
};

export default App;
```

So far, the list is just a JavaScript variable and not stateful yet. In order to modify it, in this case to delete an item from it, we need to make the list stateful with React's state and its [useState Hook](/react-usestate-hook):

```javascript{1,17}
const initialList = [
  {
    id: 'a',
    firstname: 'Robin',
    lastname: 'Wieruch',
    year: 1988,
  },
  {
    id: 'b',
    firstname: 'Dave',
    lastname: 'Davidds',
    year: 1990,
  },
];

const App = () => {
  const [list, setList] = React.useState(initialList);

  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          <span>{item.firstname}</span>
          <span>{item.lastname}</span>
          <span>{item.year}</span>
        </li>
      ))}
    </ul>
  );
};
```

Now we have a stateful list and we are able to alter it. Let's add a button with a [handler function](/react-event-handler) which deals with a click event for each item in the list. In this case, the button should be there for removing an item:

```javascript{4-6,15-17}
const App = () => {
  const [list, setList] = React.useState(initialList);

  function handleRemove() {
    // remove item
  }

  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          <span>{item.firstname}</span>
          <span>{item.lastname}</span>
          <span>{item.year}</span>
          <button type="button" onClick={handleRemove}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};
```

Since we are in a mapped list, we need to figure how to pass the specific item, or the item's identifier, which we want to delete from the list, to the handler function. The most straightforward approach to this would be using an inline handler to sneak in the item, or item identifier in this case, as a parameter:

```javascript{4-5,16}
const App = () => {
  const [list, setList] = React.useState(initialList);

  function handleRemove(id) {
    console.log(id);
    // remove item
  }

  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          <span>{item.firstname}</span>
          <span>{item.lastname}</span>
          <span>{item.year}</span>
          <button type="button" onClick={() => handleRemove(item.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};
```

The only thing missing is removing the specific item from the list whenever a click on the button happens. We will do this by modifying the current stateful list with a filter function:

```javascript{5-7}
const App = () => {
  const [list, setList] = React.useState(initialList);

  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
  }

  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          <span>{item.firstname}</span>
          <span>{item.lastname}</span>
          <span>{item.year}</span>
          <button type="button" onClick={() => handleRemove(item.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};
```

Rather than mutating the list, we keep it as [immutable data structure](/javascript-immutable) and therefore create a new list based on the old list and the filter condition. It's because the filter function doesn't modify the list but only returns a new list.

Now, when our state updater function from React's useState Hook is called, the list without the item is set as new state and the component re-renders to display only the remaining items. That's everything there is to know about removing an entry from an array in React. But there is more ...

For example, in our case everything happens in one component. What would happen if you would want to remove an item from the list from a child component? Let's continue with splitting the component into multiple components. We will need a callback handler to pass the functionality as [destructured](/javascript-destructuring-object) [props](/react-pass-props-to-component) in order to remove an item:

```javascript{10,13-19,21-30}
const App = () => {
  const [list, setList] = React.useState(initialList);

  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
  }

  return <List list={list} onRemove={handleRemove} />;
};

const List = ({ list, onRemove }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.id} item={item} onRemove={onRemove} />
    ))}
  </ul>
);

const Item = ({ item, onRemove }) => (
  <li>
    <span>{item.firstname}</span>
    <span>{item.lastname}</span>
    <span>{item.year}</span>
    <button type="button" onClick={() => onRemove(item.id)}>
      Remove
    </button>
  </li>
);
```

That's it. You are able to remove an item from a child component whereas the list is managed as state somewhere up in a parent component. If you would want to manage the list as state in the List component instead of managing it in the App component, you would have to [lift state](/react-lift-state).

Now, we will continue by exchanging React's useState with [React's useReducer Hook](/react-usereducer-hook). The reducer hook can be used in React for complex state and complex state transitions. This is not the case for our state at the moment, but it could be of interest for your particular case in the future. Let's start by defining a [reducer function](/javascript-reducer) for managing the stateful list:

```javascript
const listReducer = (state, action) => {
  switch (action.type) {
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.id);
    default:
      throw new Error();
  }
};
```

Essentially a reducer function takes a state and action as input and returns a new state based on this information as output. In addition, it has a branch for each action type. In this case, there is only one action type and thus one branch to remove an item. The actual logic to remove the item from the list moved from our handler function into this reducer now.

Next, we will exchange the component's useState hook with a useReducer hook. This hook returns the state and a dispatch function as array which we conveniently access again via [array destructuring](/javascript-destructuring-array). The dispatch function is then used in our handler function by passing an appropriate action to it:

```javascript{2-5,8}
const App = () => {
  const [list, dispatchList] = React.useReducer(
    listReducer,
    initialList
  );

  function handleRemove(id) {
    dispatchList({ type: 'REMOVE_ITEM', id });
  }

  return <List list={list} onRemove={handleRemove} />;
};
```

That's it for using useReducer instead of useState. Both state hooks are useful in React, so you should decide based on your needs whether you need a [useReducer or useState hook](/react-usereducer-vs-usestate).

Last but not least, it may not always be the case that your state is only the list. Often you will have a more complex state object and the list is only one property of this object. How would you remove an item from this list in the object then? Let's go through this example first with React's useState Hook again. Let's say next to the list there is a boolean flag to either show or hide the list with a [conditional rendering](/conditional-rendering-react):

```javascript{2-5,8,11,15-17,19}
const App = () => {
  const [listData, setListData] = React.useState({
    list: initialList,
    isShowList: true,
  });

  function handleRemove(id) {
    // this doesn't work yet
    const newList = list.filter((item) => item.id !== id);

    // this doesn't work yet
    setList(newList);
  }

  if (!listData.isShowList) {
    return null;
  }

  return <List list={listData.list} onRemove={handleRemove} />;
};
```

We start off with a complex state object which has the list as one of its properties. Wherever we want to use the list (or the boolean flag), we need to access the property from the object first. The only thing missing is fixing the handler function, because it cannot operate solely on the list anymore, but needs to take the object into account:

```javascript{8,10}
const App = () => {
  const [listData, setListData] = React.useState({
    list: initialList,
    isShowList: true,
  });

  function handleRemove(id) {
    const newList = listData.list.filter((item) => item.id !== id);

    setListData({ ...listData, list: newList });
  }

  if (!listData.isShowList) {
    return null;
  }

  return <List list={listData.list} onRemove={handleRemove} />;
};
```

Again, we access the list property from the object to filter the list based on the incoming identifier. Then, we have to update the state with the complex state object again. We could set both, the new list and the boolean flag -- which didn't change -- explicitly, but in this case we are using [JavaScript's spread operator](/javascript-spread-operator) to spread all key/value pairs from the state object into the new state object while overriding the list property with the new list. Let's apply the same technique for the example with the reducer function:

```javascript{4-7,14-17,23-25,27}
const listReducer = (state, action) => {
  switch (action.type) {
    case 'REMOVE_ITEM':
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.id),
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [listData, dispatchListData] = React.useReducer(listReducer, {
    list: initialList,
    isShowList: true,
  });

  function handleRemove(id) {
    dispatchListData({ type: 'REMOVE_ITEM', id });
  }

  if (!listData.isShowList) {
    return null;
  }

  return <List list={listData.list} onRemove={handleRemove} />;
};
```

That's it. Similar to the previous version, we are just applying all the changes to the complex state object which has the list as property rather than using the list directly as state. The removal of the item from the list stays the same.

<Divider />

All the shown examples for removing an item from a list in React can be seen in this [GitHub repository](https://github.com/the-road-to-learn-react/react-remove-item-from-list). If you have any feedback about how to delete items from lists in React, just ping me.