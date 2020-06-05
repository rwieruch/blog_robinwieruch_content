---
title: "Add an Item to a List in React"
description: "Learn how to add an item to a list in React with React's state. It's a common task to add an item to an array in ..."
date: "2020-05-14T08:52:46+02:00"
categories: ["React"]
keywords: ["react add item to list", "react add item to array"]
hashtags: ["#100DaysOfCode", "#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

It's a common task in React to add an item to a list. Here I want to show you briefly how this works. Every time you want to modify something in React, for example a list where you want to add an item, you have to use [React's state management](/react-state). We will be using React's useState Hook here, for the sake of keeping the first example simple, however, you can also use React's useReducer Hook, as you will see later.

We will start with a typical [list in React](/react-list-component) where we provide a [stable key attribute](/react-list-key) for each rendered list item:

```javascript
import React from 'react';

const list = [
  {
    id: 'a',
    name: 'Robin',
  },
  {
    id: 'b',
    name: 'Dennis',
  },
];

const App = () => {
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default App;
```

So far, the list is just a JavaScript variable and not stateful yet. In order to modify it, in this case to add an item to it, we need to make the list stateful with React's state and its [useState Hook](/react-usestate-hook):

```javascript{1,13}
const initialList = [
  {
    id: 'a',
    name: 'Robin',
  },
  {
    id: 'b',
    name: 'Dennis',
  },
];

const App = () => {
  const [list, setList] = React.useState(initialList);

  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
```

Now we have a stateful list and we are able to alter it. Let's add an input field and a button, each with a [handler function](/react-event-handler), which deal with updating the input field's state and eventually adding an item to the list:

```javascript{4-6,8-10,13-19,26}
const App = () => {
  const [list, setList] = React.useState(initialList);

  function handleChange() {
    // track input field's state
  }

  function handleAdd() {
    // add item
  }

  return (
    <div>
      <div>
        <input type="text" onChange={handleChange} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

Before we can add any item, we need to track the input field's state, because without the value from the input field, we don't have any text for the item which we want to add to our list. So let's add some state management to this first:

```javascript{3,5-6,16}
const App = () => {
  const [list, setList] = React.useState(initialList);
  const [name, setName] = React.useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    // add item
  }

  return (
    <div>
      <div>
        <input type="text" value={name} onChange={handleChange} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

We have made the input field a [controlled element](/react-controlled-components), because it receives its internal value from React's state now. Next, whenever someone clicks the button, we can add the name from the input field as new item to the list:

```javascript{10-12}
const App = () => {
  const [list, setList] = React.useState(initialList);
  const [name, setName] = React.useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    const newList = list.concat({ name });

    setList(newList);
  }

  return (
    <div>
      <div>
        <input type="text" value={name} onChange={handleChange} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

We are using a [object property shorthand initialization](/javascript-object-property-shorthand) here, because the variable `name` equals the object's property `name`. Then we are just using the state updater function to pass in the new list.

Adding an item works, but only with some flaws. What's missing are two things. First, we should clean up the input field. And second, we need to define an identifier `id` property for the item too, otherwise we wouldn't have a stable key attribute for the in JSX mapped list item anymore. I am using the [uuid node package](https://www.npmjs.com/package/uuid) here, which you can install with `npm install uuid`:

```javascript{2,15,19}
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

...

const App = () => {
  const [list, setList] = React.useState(initialList);
  const [name, setName] = React.useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    const newList = list.concat({ name, id: uuidv4() });

    setList(newList);

    setName('');
  }

  return (
    <div>
      <div>
        <input type="text" value={name} onChange={handleChange} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

That's it. Rather than mutating the list, we keep it as [immutable data structure](/javascript-immutable) and therefore create a new list based on the old list and the new item. It's because the concat function doesn't modify the list but only returns a new list.

Now, when our state updater function from React's useState Hook is called, the list with the added item is set as new state and the component re-renders to display more items. That's everything there is to know about adding an entry to an array in React. But there is more ...

For example, in our case everything happens in one component. What would happen if you would want to add an item to the list from a child component? Let's continue with splitting the component into multiple components. We will need a callback handler to pass the functionality as [destructured](/javascript-destructuring-object) [props](/react-pass-props-to-component) in order to add an item:

```javascript{19-23,25,30-37,39-45}
const App = () => {
  const [list, setList] = React.useState(initialList);
  const [name, setName] = React.useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    const newList = list.concat({ name, id: uuidv4() });

    setList(newList);

    setName('');
  }

  return (
    <div>
      <AddItem
        name={name}
        onChange={handleChange}
        onAdd={handleAdd}
      />

      <List list={list} />
    </div>
  );
};

const AddItem = ({ name, onChange, onAdd }) => (
  <div>
    <input type="text" value={name} onChange={onChange} />
    <button type="button" onClick={onAdd}>
      Add
    </button>
  </div>
);

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);
```

That's it. You are able to add an item from a child component whereas the list is managed as state somewhere up in a parent component. Now, we will continue by exchanging React's useState with [React's useReducer Hook](/react-usereducer-hook). The reducer hook can be used in React for complex state and complex state transitions. This is not the case for our state at the moment, but it could be of interest for your particular case in the future. Let's start by defining a [reducer function](/javascript-reducer) for managing the stateful list:

```javascript
const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return state.concat({ name: action.name, id: action.id });
    default:
      throw new Error();
  }
};
```

Essentially a reducer function takes a state and action as input and returns a new state based on this information as output. In addition, it has a branch for each action type. In this case, there is only one action type and thus one branch to add an item. The actual logic to add the item to the list moved from our handler function into this reducer now.

Next, we will exchange the component's useState hook with a useReducer hook. This hook returns the state and a dispatch function as array which we conveniently access again via [array destructuring](/javascript-destructuring-array). The dispatch function is then used in our handler function by passing an appropriate action to it:

```javascript{2-5,13}
const App = () => {
  const [list, dispatchList] = React.useReducer(
    listReducer,
    initialList
  );
  const [name, setName] = React.useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    dispatchList({ type: 'ADD_ITEM', name, id: uuidv4() });

    setName('');
  }

  return (
    <div>
      <AddItem
        name={name}
        onChange={handleChange}
        onAdd={handleAdd}
      />

      <List list={list} />
    </div>
  );
};
```

That's it for using useReducer instead of useState. Both state hooks are useful in React, so you should decide based on your needs whether you need a [useReducer or useState hook](/react-usereducer-vs-usestate).

Last but not least, it may not always be the case that your state is only the list. Often you will have a more complex state object and the list is only one property of this object. How would you add an item to this list in the object then? Let's go through this example first with React's useState Hook again. Let's say next to the list there is a boolean flag to either show or hide the list with a [conditional rendering](/conditional-rendering-react):

```javascript{2-5,13,19,33}
const App = () => {
  const [listData, setListData] = React.useState({
    list: initialList,
    isShowList: true,
  });
  const [name, setName] = React.useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    // this doesn't work yet
    const newList = list.concat({
      name,
      id: uuidv4(),
    });

    // this doesn't work yet
    setList(newList);

    setName('');
  }

  return (
    <div>
      <AddItem
        name={name}
        onChange={handleChange}
        onAdd={handleAdd}
      />

      {listData.isShowList && <List list={listData.list} />}
    </div>
  );
};
```

We start off with a complex state object which has the list as one of its properties. Wherever we want to use the list (or the boolean flag), we need to access the property from the object first. The only thing missing is fixing the handler function, because it cannot operate solely on the list anymore, but needs to take the object into account:

```javascript{13,18}
const App = () => {
  const [listData, setListData] = React.useState({
    list: initialList,
    isShowList: true,
  });
  const [name, setName] = React.useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    const newList = listData.list.concat({
      name,
      id: uuidv4(),
    });

    setListData({ ...listData, list: newList });

    setName('');
  }

  return (
    <div>
      <AddItem
        name={name}
        onChange={handleChange}
        onAdd={handleAdd}
      />

      {listData.isShowList && <List list={listData.list} />}
    </div>
  );
};
```

Again, we access the list property from the object to concat a new item to the list based on the `name` state from the input field. Then, we have to update the state with the complex state object again. We could set both, the new list and the boolean flag -- which didn't change -- explicitly, but in this case we are using [JavaScript's spread operator](/javascript-spread-operator) to spread all key/value pairs from the state object into the new state object while overriding the list property with the new list. Let's apply the same technique for the example with the reducer function:

```javascript{4-7,14-17,25,38}
const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        list: state.list.concat({ name: action.name, id: action.id }),
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
  const [name, setName] = React.useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    dispatchListData({ type: 'ADD_ITEM', name, id: uuidv4() });

    setName('');
  }

  return (
    <div>
      <AddItem
        name={name}
        onChange={handleChange}
        onAdd={handleAdd}
      />

      <List list={listData.list} />
    </div>
  );
};
```

That's it. Similar to the previous version, we are just applying all the changes to the complex state object which has the list as property rather than using the list directly as state. The addition of the item to the list stays the same.

<Divider />

All the shown examples for adding an item to a list in React can be seen in this [GitHub repository](https://github.com/the-road-to-learn-react/react-add-item-to-list). If you have any feedback about how to add items to lists in React, just ping me.