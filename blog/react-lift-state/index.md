---
title: "A React Lift State Up & Down Example"
description: "A walkthrough by example on how to lift state up and down in React. You will see two examples that illustrate the problem and solution ..."
date: "2019-05-22T07:52:46+02:00"
categories: ["React"]
keywords: ["react lift state", "react lift state up", "react lift state up example", "react lift state down", "react lifting state"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

In a scaling application, you will notice that you pass a lot of [state down to child components as props](/react-pass-props-to-component/). These props are often passed down multiple component levels. That's how state is shared vertically in your application. Yet, the other way around, you will notice that more components need to use and thus share the same state. That's how state needs to be shared horizontally across components in your component tree. These two scaling issues, sharing state vertically and horizontally, are common in local state management in React. Therefore you can lift the state up and down for keeping your local state architecture maintainable. Lifting the state prevents sharing too much or too little state in your component tree. Basically, it is a refactoring that you have to do once in a while to keep your components maintainable and focused on only consuming the state that they need to consume.

In order to experience up and down lifting of local state, the following tutorial will demonstrate it with two examples. The first example that demonstrates the lifting up of state is called: "Search a List"-example. The second example that demonstrates the lifting down of state is called "Archive in a List"-example.

# How to lift State up?

The "Search a List"-example has three components. Two sibling components, a Search component and a List component, that are used in an overarching SearchableList component. All of them are [function components](/react-function-component/).

First, the implementation of the Search component which is a [controlled component](/react-controlled-components/) due to the input field being controlled  by React:

```javascript
const Search = ({ children }) => {
  const [query, setQuery] = React.useState('');

  const handleQuery = event => {
    setQuery(event.target.value);
  };

  return (
    <div>
      {children}
      <input type="text" value={query} onChange={handleQuery} />
    </div>
  );
};
```

Second, the implementation of [List component](/react-list-components/):

```javascript
const List = ({ list }) => (
  <ul>
    {list.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);
```

Third, the SearchableList component which uses both components, the Search and List components, for [React's component composition](/react-component-composition/) and thus both components become siblings in the component tree:

```javascript
const SearchableList = ({ list }) => (
  <div>
    <Search>Search List:</Search>
    <List list={list} />
  </div>
);
```

While the Search component is a stateful function component due to React's useState hook, the List component is a stateless function component. The parent component combines the List and Search components into a stateless SearchableList component.

However, the example doesn't work. The Search component knows about the `query` that could be used to filter the list, but the List component doesn't know about it. The state from the Search component can only be passed down the component tree by using props but not up to its parent component. Therefore, you have to lift the state of the Search component up to the SearchableList component to make the `query` state accessible for the List component in order to filter the list of items eventually. In other words, you want to share the `query` state in both List component and Search component. Whereas the Search component is responsible for altering the state, the List component consumes the state to filter the list of items. The state should be managed in the SearchableList component to make it readable and writeable for both sibling components below.

In order to lift the state up, the SearchableList becomes a stateful component. On the other hand, the Search component becomes a stateless component, because it doesn't need to manage state anymore. The stateful parent component takes care about its whole state.

*Note: In other cases, the Search component might stay as a stateful component, because it still manages some other state, but it is not the case in this example.*

So first, that's the adjusted Search component:

```javascript{1,6}
const Search = ({ query, handleQuery, children }) => (
  <div>
    {children}
    <input type="text" value={query} onChange={handleQuery} />
  </div>
);
```

Second, the adjusted SearchableList component:

```javascript{2,4,5,6,8,10,15}
const SearchableList = ({ list }) => {
  const [query, setQuery] = React.useState('');

  const handleQuery = event => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <Search query={query} handleQuery={handleQuery}>
        Search List:
      </Search>
      <List list={list} />
    </div>
  );
};
```

After you have lifted the state up, the parent component takes care about the local state management. Both child components don't need to take care about it. You have lifted the state up to share the local state across the child components. Last but not least, let's use the `query` -- which is due to the state lifting available in the SearchableList component -- to filter the list for the List component:

```javascript{8,15,20,21}
const SearchableList = ({ list }) => {
  const [query, setQuery] = React.useState('');

  const handleQuery = event => {
    setQuery(event.target.value);
  };

  const filteredList = list.filter(byQuery(query));

  return (
    <div>
      <Search query={query} handleQuery={handleQuery}>
        Search List:
      </Search>
      <List list={filteredList} />
    </div>
  );
};

const byQuery = query => item =>
  !query || item.name.toLowerCase().includes(query.toLowerCase());
```

The list gets filtered by the search query before it reaches the List component. An alternative would be passing the `query` state as prop to the List component and the List component would apply the filter to the list itself.

# How to lift State down?

In the next part, let's get to the second example: the "Archive in a List"-example. It builds up on the previous example, but this time the List component has the extended functionality to archive an item in the list. Therefore, it needs to have a button to archive an item in the list identified by an unique `id` property of the item. First, the enhanced List component:

```javascript{1,6,7,8,9,10,11,12,13}
const List = ({ list, handleArchive }) => (
  <ul>
    {list.map(item => (
      <li key={item.id}>
        <span>{item.name}</span>
        <span>
          <button
            type="button"
            onClick={() => handleArchive(item.id)}
          >
            Archive
          </button>
        </span>
      </li>
    ))}
  </ul>
);
```

Second, the SearchableList component which holds the state of archived items:

```javascript{3,9,10,11,15,22,27,28}
const SearchableList = ({ list }) => {
  const [query, setQuery] = React.useState('');
  const [archivedItems, setArchivedItems] = React.useState([]);

  const handleQuery = event => {
    setQuery(event.target.value);
  };

  const handleArchive = id => {
    setArchivedItems(archivedItems => [...archivedItems, id]);
  };

  const filteredList = list
    .filter(byQuery(query))
    .filter(byArchived(archivedItems));

  return (
    <div>
      <Search query={query} handleQuery={handleQuery}>
        Search List:
      </Search>
      <List list={filteredList} handleArchive={handleArchive} />
    </div>
  );
};

const byArchived = archivedItems => item =>
  !archivedItems.includes(item.id);
```

The Search component stays untouched. As you have seen, the previous example was extended to facilitate the archiving of items in a list. Now, the List component receives all the necessary properties: an `handleArchive` callback handler and the list, filtered by `query` and `archivedItems`. It only shows items filtered by the query from the Search component and items which are not archived.

You might see already the flaw which leads to lifting the state down. The SearchableList takes care about the archiving functionality. However, it doesn't need the functionality itself. It only passes all the state and handler to the List component as props. It manages the state on behalf of the List component. No other component cares about this state: not the Search component and not the SearchableList component. In a scaling application, it would make sense to lift the state down to the List component, because only the List component cares about it and no other component has to manage it on the List component's behalf. Even though the List component becomes a stateful component afterward, it may be a step in the right direction keeping the local state maintainable in the long run. First, the enhanced stateful List component which takes care about the state:

```javascript{1,2,4,5,6,8,10,24,25}
const List = ({ list }) => {
  const [archivedItems, setArchivedItems] = React.useState([]);

  const handleArchive = id => {
    setArchivedItems(archivedItems => [...archivedItems, id]);
  };

  return (
    <ul>
      {list.filter(byArchived(archivedItems)).map(item => (
        <li key={item.id}>
          <span>{item.name}</span>
          <span>
            <button
              type="button"
              onClick={() => handleArchive(item.id)}
            >
              Archive
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
};
```

Second, the SearchableList component which only cares about the state from the previous example but not about the archived items anymore:

```javascript{8,15}
const SearchableList = ({ list }) => {
  const [query, setQuery] = React.useState('');

  const handleQuery = event => {
    setQuery(event.target.value);
  };

  const filteredList = list.filter(byQuery(query));

  return (
    <div>
      <Search query={query} handleQuery={handleQuery}>
        Search List:
      </Search>
      <List list={filteredList} />
    </div>
  );
};
```

That's how you can lift state down. It is used to keep the state only next to components that care about the state. However, note that sometimes it may be useful to have umbrella components like the SearchableList component that manages state on other component's behalf. It makes it easier to locate the important parts of your application which manage state.

<Divider />

Let's recap both approaches. In the first example, the "Search a List"-example, the state had to be lifted up to share the `query` property in two child components. The Search component had to manipulate the state by using a callback handler, but also had to use the `query` to be a controlled component regarding the input field. On the other hand, the SearchableList component had to filter the list by using the `query` property on behalf of the List component. Another solution would have been to pass down the `query` property to the List component and let the component deal with the filtering itself. After all, the state got lifted up the component tree to share it vertically across more components.

In the second example, the "Archive in a List"-example, the state could be lifted down to keep the state maintainable in the long run. The parent component shouldn't be concerned about state that isn't used by the parent component itself and isn't shared across multiple child components. Because only one child component cared about the archived items, it was a good change to lift the state down to the only component which cares about the state. After all, the state got lifted down the component tree.

Both examples have been separated and styled over [here](https://codesandbox.io/s/7g7ym) by [Richard Hess](https://twitter.com/eswat2). In conclusion, lifting state allows you to keep your local state management maintainable. **Lifting state should be used to give components access to all the state they need, but not to more state than they need.**
