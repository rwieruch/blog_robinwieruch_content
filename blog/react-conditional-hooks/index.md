---
title: "Conditional Hooks in React"
description: "Is it possible to use conditional React Hooks in React components? Technically no. However, in this example I want to show you how to use a Hook ..."
date: "2021-07-18T03:55:46+02:00"
categories: ["React", "React Hooks"]
keywords: ["react conditional hooks", "react conditional hook"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Can you use conditional [React Hooks](/react-hooks/) in React components? Technically: No. However, if you know about how React Hooks work internally, you can make conditional hooks work for you. Let's take the following example where we start without any conditional hook:

```javascript
import React from 'react';

const LIST = [
  {
    id: '1',
    title: 'The Road to React',
  },
  {
    id: '2',
    title: 'The Road to GraphQL',
  },
];

const App = () => {
  const [list, setList] = React.useState([]);

  const handleFetch = () => {
    setList(LIST);
  };

  if (!list.length) {
    return (
      <div>
        <button type="button" onClick={handleFetch}>
          Fetch
        </button>
      </div>
    );
  }

  return (
    <div>
      <List list={list} />
    </div>
  );
};

const List = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
};

const Item = ({ item }) => {
  return (
    <li key={item.id}>
      <span>{item.title}</span>
    </li>
  );
};

export default App;
```

In this example, we are [conditionally rendering](/react-conditional-rendering/) a [list component](/react-list-component). When the components get rendered for the first time, only the button to "fetch" the data is rendered. Once a user clicks this button, the state with the list gets set, everything re-renders again, and the List and Item components show up.

<ReadMore label="How to fetch data in React" link="/react-hooks-fetch-data/" />

Everything works as expected. Now, we want to introduce the following **conditional hook**. It's conditionally set after the if statement, because then it can pick up the first item of the fetched list as initial state. Otherwise the list would be empty.

```javascript{18,24-25}
const App = () => {
  const [list, setList] = React.useState([]);

  const handleFetch = () => {
    setList(LIST);
  };

  if (!list.length) {
    return (
      <div>
        <button type="button" onClick={handleFetch}>
          Fetch
        </button>
      </div>
    );
  }

  const [selectedId, setSelectedId] = React.useState(list[0].id);

  return (
    <div>
      <List
        list={list}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
};
```

The return values from the conditional [useState hook](/react-usestate-hook/) are passed to the child components:

```javascript{1,8-9}
const List = ({ list, selectedId, setSelectedId }) => {
  return (
    <ul>
      {list.map((item) => (
        <Item
          key={item.id}
          item={item}
          selectedId={selectedId}
          onSelectedId={setSelectedId}
        />
      ))}
    </ul>
  );
};
```

There they will be eventually used by the [reusable Item component](/react-reusable-components/) to style the selected item and to display a button for each item to select it:

```javascript{1,2-4,6-8,11,14-16}
const Item = ({ item, selectedId, onSelectedId }) => {
  const handleSelect = () => {
    onSelectedId(item.id);
  };

  const selectedStyle = {
    fontWeight: selectedId === item.id ? 'bold' : 'normal',
  };

  return (
    <li key={item.id} style={selectedStyle}>
      <span>{item.title}</span>

      <button type="button" onClick={handleSelect}>
        Select
      </button>
    </li>
  );
};
```

<ReadMore label="How to style React components" link="/react-css-styling/" />

If you start the React application again and click the button to fetch the data, the application will break with the error: **Uncaught Error: Rendered more hooks than during the previous render.** You may will see this warning too: **Warning: React has detected a change in the order of Hooks called by App. This will lead to bugs and errors if not fixed.**

Why does this not work? Let me explain: For every React Hook in a [React function component](/react-function-component/), the component allocates the hook internally in an array. If the hook is sometimes there and sometimes not there, the component cannot find the allocated hook at the same place anymore. This breaks the whole internal implementation and that's why conditional hooks, hooks in loops, and hooks with changed order are technically not allowed.

However, let's see how we can get around this disadvantage:

```javascript{20,25,26}
const App = () => {
  const [list, setList] = React.useState([]);

  const handleFetch = () => {
    setList(LIST);
  };

  if (!list.length) {
    return (
      <div>
        <button type="button" onClick={handleFetch}>
          Fetch
        </button>
      </div>
    );
  }

  return (
    <div>
      <List list={list} />
    </div>
  );
};

const List = ({ list }) => {
  const [selectedId, setSelectedId] = React.useState(list[0].id);

  return (
    <ul>
      {list.map((item) => (
        <Item
          key={item.id}
          item={item}
          selectedId={selectedId}
          onSelectedId={setSelectedId}
        />
      ))}
    </ul>
  );
};
```

By bringing the hook down to the child component where the hook is not conditionally rendered, we don't get this error anymore. The conditional rendering of the List component happens in the App component, but the hook takes places somewhere else now. Now only if there is a fetched list, the hook for the selected state gets initialized in the List component at the same time as the component itself.

*It's worth to note that this error can be solved by using React's useEffect Hook as well.*

In conclusion, most often when rendering hooks conditionally, in a loop, or in a changed order, move the hook one level down to the child component where it has its fixed place and is computed with the component without any condition. In this example it worked for a [state hook](/react-usereducer-vs-usestate/), but the same applies for other hooks like [React's useEffect Hook](/react-useeffect-hook/).
