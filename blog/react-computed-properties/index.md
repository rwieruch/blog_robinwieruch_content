---
title: "Computed Properties in React"
description: "There are no computed properties in React. However, deriving values from state is a common implementation in React too ..."
date: "2020-05-18T07:52:46+02:00"
categories: ["React"]
keywords: ["react computed properties"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Today I came across a question in my Newsletter regarding computed properties in React. I didn't know about the term computed properties before, because such a term doesn't really exist in React, but it exists in other frameworks like Vue.  Maybe I would call it *computed values*, *computed state*, or *derived state* (not from props though) in React. So the question was totally valid and I want to address it here.

# Computed Properties in React

Before we dive into computed properties in React, I want to show you the problem in React code which came up in the question of my Newsletter. In this minimal React application, we use a React [function component](/react-function-component) as a specialized [React list component](/react-list-component) with [React's useState Hook](/react-usestate-hook) to manage a stateful list:

```javascript
import React from 'react';

function App() {
  const [list, setList] = React.useState([
    { id: '1', name: 'Apple', count: 5 },
    { id: '2', name: 'Banana', count: 3 },
    { id: '3', name: 'Peach', count: 10 },
  ]);

  return (
    <div>
      <h1>Computed Properties in React</h1>

      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>:<span>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

The feature of this list component is that it allows us to sort properties in the list. Imagine that in a larger list component there could be multiple sortable properties. In this case, we are just using two buttons though with [event handlers](/react-event-handler) for the sorting mechanism via Lodash's sort function of these two properties:

```javascript{2,11-14,16-19,25-30}
import React from 'react';
import sortBy from 'lodash.sortby';

function App() {
  const [list, setList] = React.useState([
    { id: '1', name: 'Apple', count: 5 },
    { id: '2', name: 'Banana', count: 3 },
    { id: '3', name: 'Peach', count: 10 },
  ]);

  function handleSortName() {
    const sortedList = sortBy(list, 'name');
    setList(sortedList);
  }

  function handleSortCount() {
    const sortedList = sortBy(list, 'count');
    setList(sortedList);
  }

  return (
    <div>
      <h1>Computed Properties in React</h1>

      <button type="button" onClick={handleSortName}>
        Sort by Name
      </button>
      <button type="button" onClick={handleSortCount}>
        Sort by Count
      </button>

      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>:<span>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

And here it already presents the potential pitfall: With every sort on a button click we create a new state based on the current state. The stateful list only tells us implicitly about its sorting state, because we applied the modification directly on the list.

In terms of efficient this approach is great, because all we need to manage is just the sorted list in state. We didn't add any other state in our component. However, we would soonish get into trouble if we would want to implement more features based on the sort feature. For example, how would you implement a reverse sort which happens if a button is clicked two times in a row? Then you would need to implement a sorting state. Another example, which I want to demonstrate, would be adding more items to the list from an input field:

```javascript{3,6,24-26,28-36,42-47}
import React from 'react';
import sortBy from 'lodash.sortby';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [name, setName] = React.useState('');

  const [list, setList] = React.useState([
    { id: '1', name: 'Apple', count: 5 },
    { id: '2', name: 'Banana', count: 3 },
    { id: '3', name: 'Peach', count: 10 },
  ]);

  function handleSortName() {
    const sortedList = sortBy(list, 'name');
    setList(sortedList);
  }

  function handleSortCount() {
    const sortedList = sortBy(list, 'count');
    setList(sortedList);
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    const newItem = {
      id: uuidv4(),
      name: name,
      count: 0,
    };
    const newList = list.concat(newItem);
    setList(newList);
  }

  return (
    <div>
      <h1>Computed Properties in React</h1>

      <div>
        <input type="text" value={name} onChange={handleChange} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <button type="button" onClick={handleSortName}>
        Sort by Name
      </button>
      <button type="button" onClick={handleSortCount}>
        Sort by Count
      </button>

      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>:<span>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

After we add the item with a button click, we cannot apply any sorting state, because we don't know about it. If we would have sorted the list previously, the list would just concatenate the new item to its array but wouldn't know how to incorporate the new item in the sorted list. That's where we would need an explicit sorting state. In the next step, I will remove the last feature and refactor the previous code block for using a explicit sort state:

```javascript{11,14,18,21-22,36}
import React from 'react';
import sortBy from 'lodash.sortby';

function App() {
  const [list, setList] = React.useState([
    { id: '1', name: 'Apple', count: 5 },
    { id: '2', name: 'Banana', count: 3 },
    { id: '3', name: 'Peach', count: 10 },
  ]);

  const [sort, setSort] = React.useState('name'); // A

  function handleSortName() {
    setSort('name'); // B
  }

  function handleSortCount() {
    setSort('count'); // B
  }

  // computed property
  const sortedList = sortBy(list, sort); // C

  return (
    <div>
      <h1>Computed Properties in React</h1>

      <button type="button" onClick={handleSortName}>
        Sort by Name
      </button>
      <button type="button" onClick={handleSortCount}>
        Sort by Count
      </button>

      <ul>
        {sortedList.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>:<span>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Instead of storing the sorted list, we leave the list unchanged and just store a sort state (A). Whenever we change the sort with one of the buttons, the new sort state is stored (B). The crucial moment happens just in our component's function body where we compute `sortedList` on the fly with every component render (C).

Now we have both states in its raw form: list and sort. Everything that results from this can be called computed properties/values/state, derived properties/values/state or calculated properties/values/state. There is no extra function for this in React but only an on the fly computation in the component's function body.

Now we always know about the sort state in an explicit way. This way implementing the other feature for adding an item to the list isn't much different from the previous version anymore. However, this time we know about the sort state and thus with every re-render after adding a new item it will be sorted (C) right away:

```javascript{3,6,24-26,28-36,44-49}
import React from 'react';
import sortBy from 'lodash.sortby';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [name, setName] = React.useState('');

  const [list, setList] = React.useState([
    { id: '1', name: 'Apple', count: 5 },
    { id: '2', name: 'Banana', count: 3 },
    { id: '3', name: 'Peach', count: 10 },
  ]);

  const [sort, setSort] = React.useState('name');

  function handleSortName() {
    setSort('name');
  }

  function handleSortCount() {
    setSort('count');
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    const newItem = {
      id: uuidv4(),
      name: name,
      count: 0,
    };
    const newList = list.concat(newItem);
    setList(newList);
  }

  const sortedList = sortBy(list, sort); // C

  return (
    <div>
      <h1>Computed Properties in React</h1>

      <div>
        <input type="text" value={name} onChange={handleChange} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <button type="button" onClick={handleSortName}>
        Sort by Name
      </button>
      <button type="button" onClick={handleSortCount}>
        Sort by Count
      </button>

      <ul>
        {sortedList.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>:<span>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

If you would want to extend your component for being able to offer the reverse sort feature whenever a sort button is clicked twice, you could introduce a more complex state object for the sort feature which doesn't only keep track of the current sort, but also if this sort is reversed:

```javascript{14-17,20-21,25-26,43-45}
import React from 'react';
import sortBy from 'lodash.sortby';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [name, setName] = React.useState('');

  const [list, setList] = React.useState([
    { id: '1', name: 'Apple', count: 5 },
    { id: '2', name: 'Banana', count: 3 },
    { id: '3', name: 'Peach', count: 10 },
  ]);

  const [sort, setSort] = React.useState({
    property: 'name',
    isReverse: false,
  });

  function handleSortName() {
    const isReverse = sort.property === 'name' && !sort.isReverse;
    setSort({ property: 'name', isReverse });
  }

  function handleSortCount() {
    const isReverse = sort.property === 'count' && !sort.isReverse;
    setSort({ property: 'count', isReverse });
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleAdd() {
    const newItem = {
      id: uuidv4(),
      name: name,
      count: 0,
    };
    const newList = list.concat(newItem);
    setList(newList);
  }

  const sortedList = sort.isReverse
    ? sortBy(list, sort.property).reverse()
    : sortBy(list, sort.property);

  return (
    <div>
      <h1>Computed Properties in React</h1>

      <div>
        <input type="text" value={name} onChange={handleChange} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <button type="button" onClick={handleSortName}>
        Sort by Name
      </button>
      <button type="button" onClick={handleSortCount}>
        Sort by Count
      </button>

      <ul>
        {sortedList.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>:<span>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Again, we are just deriving values from the raw state. Now, React performance enthusiast may go up on the fence because the sorted list is calculated on every render of the component. If it really becomes the case that computations in a React's component function's body has some kind of performance impact, you can use [React's useMemo Hook](/react-usememo-hook):

```javascript{3-9}
...

const sortedList = React.useMemo(() => {
  console.log('Calculates computed properties ...');

  return sort.isReverse
    ? sortBy(list, sort.property).reverse()
    : sortBy(list, sort.property);
}, [list, sort]);

...
```

Now you should see the function being called every time you sort or you add an item to the list, but not if you are just typing into the input field. The provided function in React's useMemo Hook is memoized and is only used if one of its variables in the dependency array (here `list`, `sort`) changes.

<Divider />

The whole point about computed properties in React is about deriving values from state (or props). Think about every new state you introduce in your React components as raw state without modifications. If you want to introduce a modification of this state (e.g. a list modifies to sorted list), reach for another explicit raw state instead of storing the derived state in your state. You can find this [exmaple for computed properties on GitHub](https://github.com/the-road-to-learn-react/react-computed-properties).