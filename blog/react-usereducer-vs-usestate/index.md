---
title: "useReducer vs useState in React"
description: "Comparing useState and useReducer in React, when to use them for different use cases, and their benefits in a growing React application ..."
date: "2019-04-17T07:52:46+02:00"
categories: ["JavaScript"]
keywords: ["useReducer vs useState"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Since [React Hooks](https://www.robinwieruch.de/react-hooks/) have been released, [function components](https://www.robinwieruch.de/react-function-component/) in React can use state and side-effects. There are two main hooks that are used for [modern state management in React](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/): useState and useReducer. This tutorial doesn't explain both React hooks in detail, but explains their different use case scenarios. There are many people who ask me whether to use useState or useReducer; that's why I thought getting together all my thoughts in one article is the best thing to deal with it.

# Table of Contents

* [When to use useState or useReducer?](#usestate-vs-usereducer)
* [Simple vs. Complex State with Hooks](#simple-complex-state)
* [Simple vs. Complex State Transitions with Hooks](#simple-complex-state-transitions)
* [Multiple State Transitions operate on one State Object](#multiple-state-transitions-one-state)
* [State Changes and their Logic](#logic-state-change)
* [State Changes and the Trigger](#trigger-state-change)

# When to use useState or useReducer?

Everyone starting out with React Hooks gets to know pretty soon the useState hook. It's there to update state in React function components by offering to set the initial state and returning the actual state and an updater function:

```javascript{1,4,7,11,17}
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count => count + 1);
  };

  const handleDecrease = () => {
    setCount(count => count - 1);
  };

  return (
    <div>
      <h1>Counter with useState</h1>
      <p>Count: {count}</p>

      <div>
        <button type="button" onClick={handleIncrease}>
          +
        </button>
        <button type="button" onClick={handleDecrease}>
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;
```

In contrast, the useReducer hook can be used to update state as well, but it happens in a **more sophisticated** way with a given reducer function and an initial state which returns the actual state and a dispatch function to alter the state in an implicit way by **mapping actions to state transitions**:

```javascript{1,3,4,5,6,7,8,9,10,11,12,15,18,22,28}
import React, { useReducer } from 'react';

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE':
      return { ...state, count: state.count + 1 };
    case 'DECREASE':
      return { ...state, count: state.count - 1 };
    default:
      throw new Error();
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  const handleIncrease = () => {
    dispatch({ type: 'INCREASE' });
  };

  const handleDecrease = () => {
    dispatch({ type: 'DECREASE' });
  };

  return (
    <div>
      <h1>Counter with useReducer</h1>
      <p>Count: {state.count}</p>

      <div>
        <button type="button" onClick={handleIncrease}>
          +
        </button>
        <button type="button" onClick={handleDecrease}>
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;
```

Even though both components use different React Hooks for the state management, they solve the same business case. So when would you use which state management solution? Let's dive into it ...

# Simple vs. Complex State with Hooks

The previous reducer example already encapsulated the `count` property into a state object. We could have done it simpler by using the count as the actual state. Refactoring the code to not having a state object, but only the count integer as JavaScript primitive, we can already see that the use case doesn't have a complex state to manage:

```javascript{6,8,15,28}
import React, { useReducer } from 'react';

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      throw new Error();
  }
};

const Counter = () => {
  const [count, dispatch] = useReducer(counterReducer, 0);

  const handleIncrease = () => {
    dispatch({ type: 'INCREASE' });
  };

  const handleDecrease = () => {
    dispatch({ type: 'DECREASE' });
  };

  return (
    <div>
      <h1>Counter with useReducer</h1>
      <p>Count: {count}</p>

      <div>
        <button type="button" onClick={handleIncrease}>
          +
        </button>
        <button type="button" onClick={handleDecrease}>
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;
```

The example shows that we may be better off with a simpler useState hook here, because there is no complex state object involved. We could refactor our state object to a primitive.

Anyway, I would argue **once you move past managing a primitive (e.g. string, integer, boolean) but rather a complex object (e.g. with arrays and additional primitives), you may be better of using useReducer** to manage this object. Perhaps a good rule of thumb:

* Use useState whenever you manage a JS primitive (e.g. string, boolean, integer).
* Use useReducer whenever you manage an object or array.

The rule of thumb suggests, for instance, once you spot `const [state, setState] = useState({ firstname: 'Robin', lastname: 'Wieruch' })` in your code, you may be better off with useReducer instead of useState.

# Simple vs. Complex State Transitions with Hooks

We didn't use by chance two different action types (`INCREASE` and `DECREASE`) for our previous state transitions. What could we have done differently? By using the optional payload that can be used within every dispatched action object, we could say from the outside by how much we want to increase or decrease the count; moving the state transition towards being more implicit:

```javascript{5,6,16,20}
import React, { useReducer } from 'react';

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE_OR_DECREASE_BY':
      return state + action.by;
    default:
      throw new Error();
  }
};

const Counter = () => {
  const [count, dispatch] = useReducer(counterReducer, 0);

  const handleIncrease = () => {
    dispatch({ type: 'INCREASE_OR_DECREASE_BY', by: 1 });
  };

  const handleDecrease = () => {
    dispatch({ type: 'INCREASE_OR_DECREASE_BY', by: -1 });
  };

  return (
    <div>
      <h1>Counter with useReducer</h1>
      <p>Count: {count}</p>

      <div>
        <button type="button" onClick={handleIncrease}>
          +
        </button>
        <button type="button" onClick={handleDecrease}>
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;
```

But we didn't. That's one important lesson when using reducers: Always try to be explicit with your state transitions. The latter example with only one state transitions tries to put every logic into one block, but that's not very much desired when using a reducer function. Rather we want to be able to reason effortless about our state transitions. By having two state transitions instead, as before in our code, we can always reason about it by just reading the action type's name.

**Using useReducer over useState gives us predictable state transitions.** It comes in very powerful when your state changes become more complex and you want to have one place -- the reducer function -- to reason about them. The reducer functions encapsulates this logic perfectly.

A rule of thumb may suggest: Once you spot multiple `setState()` calls in succession, try to encapsulate these things in one reducer function to dispatch only one action instead.

A great side-effect of having all state in one object is the possibility to use the [browser's local storage](https://www.robinwieruch.de/local-storage-react/) for it. That's how you could always cache a slice of your state with local storage and retrieve it as initial state for useReducer whenever you restart your application.

# Multiple State Transitions operate on one State Object

Once your application grows in size, you will most likely deal with more complex state and state transitions. That's what we went through in the last two sections of this tutorial. However, one thing to notice is that the state object didn't just grew in complexity, but also in size of operations that are performed on this object.

Take for instance the following reducer that operates on one state object with multiple state transitions:

```javascript
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    case 'ADD_TODO':
      return state.concat({
        task: action.task,
        id: action.id,
        complete: false,
      });
    default:
      throw new Error();
  }
};
```

It only makes sense to keep everything in one state object (e.g. list of todo items) while operating with multiple state transitions on it. It would be less predictable and maintainable implementing the same business logic with useState instead.

Often you will start out with useState but refactor your state management to useReducer, because the state object becomes more complex or the number of state transitions add up over time. However, there are other cases as well where it makes sense to group different properties, that don't belong together on first glance, in one state object. For instance, this [tutorial that showcases how to fetch data with useEffect, useState, and useReducer](https://www.robinwieruch.de/react-hooks-fetch-data/) groups properties that are dependent on each other together in one state object:

```javascript
const [state, dispatch] = useReducer(dataFetchReducer, {
  isLoading: false,
  isError: false,
  data: initialData,
});
```

One could argue that the `isLoading` and `isError` properties could be managed separately in two useState hooks, but when looking at the reducer function, one can see that it's best to put them together in one state object because they conditionally dependent on each other:

```javascript
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
```

After all, not only the state object complexity or the number of state transitions is important, but also **how properties fit together in context to be managed in one state object**. If everything is managed at different places with useState, it becomes harder to reason about the whole thing as one unit. Another important point is the improved developer experience: Since you have this one place with one state object and multiple transitions, it's far easier to debug your code if anything goes wrong.

A great side-effect of having all state transitions neatly in one reducer function is the **ability to export the reducer for unit tests**. It's simpler to reason about a state object with multiple state transitions if you just need to test all state transitions by having only one function: `(state, action) => newState`. You can test all state transitions by providing all available action types and various matching payloads.

# Logic for State Changes

There is a difference of *where the logic for state transitions is placed when using useState or useReducer*. As we have seen for the previous useReducer examples, the logic for the state transitions happens within the reducer function. The action only comes with the minimum information to perform the transition based on the current state: `(state, action) => newState`. This comes especially handy if you rely on the current state to update your state.

```javascript
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    case 'ADD_TODO':
      return state.concat({
        task: action.task,
        id: action.id,
        complete: false,
      });
    default:
      throw new Error();
  }
};
```

Everything your React component cares about is dispatching the action:

```javascript
import uuid from 'uuid/v4';

// Somewhere in your React components ...

const handleSubmit = event => {
  dispatch({ type: 'ADD_TODO', task, id: uuid() });
};

const handleChange = () => {
  dispatch({
    type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
    id: todo.id,
  });
};
```

Now imagine you would perform the same state transitions but with useState instead. There is no pre-defined entity like the reducer where all business logic is situated. There is no clear separation -- as far as you don't extract the logic into separate functions -- and all your state relevant logic ends up in your handlers which call the state updater functions from useState eventually. Over time, it becomes harder to separate state logic from view logic and the components grow in complexity. Reducers instead offer the perfect place for logic that alters the state.

# Trigger of the State Change

The vertical component tree in React becomes deeper once you grow your application. If the state is simple and belongs co-located (state + state trigger) to a component (e.g. [search input field which is made a controlled component](https://www.robinwieruch.de/react-controlled-components/)), using useState may be the perfect fit. The state is encapsulated within this one component:

```javascript
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState('Hello React');

  const handleChange = event => setValue(event.target.value);

  return (
    <div>
      <label>
        My Input:
        <input type="text" value={value} onChange={handleChange} />
      </label>

      <p>
        <strong>Output:</strong> {value}
      </p>
    </div>
  );
};

export default App;
```

However, sometimes you want to [manage state at a top-level but trigger the state changes](https://www.robinwieruch.de/react-global-state-without-redux/) somewhere deep down in your component tree. It's possible to pass both the updater function from useState or the dispatch function from useReducer [via props](https://www.robinwieruch.de/react-pass-props-to-component/) down the component tree, but using [React's context API](https://www.robinwieruch.de/react-context/) may be a valid alternative to avoid the prop drilling (passing props trough each component level). Then having *one* dispatch function that is used with different action types and payloads may be the better option than using *multiple* updater functions from useState that need to be passed down individually. The dispatch function can be passed down *once* with React's useContext hook. A good example how this works can be seen in this [state management tutorial for React using useContext](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/).

<Divider />

The decision whether to use useState or useReducer isn't always black and white. There are many shades of grey in between. However, I hope the article gave you a few key understandings on when to use useState or useReducer. Here you can find a [GitHub repository](https://github.com/the-road-to-learn-react/react-hooks-usestate-vs-usereducer) with a few examples. The following facts give you a summarized overview, however they only reflect my opinion on this topic:

**Use useState if:**

* A) if you manage JavaScript primitives as state
* B) if you have simple state transitions
* C) if you want to have business logic within your component
* D) if you have different properties that don't change in any correlated manner and can be managed by multiple useState hooks
* E) if your state is co-located to your component
* F) if you've got a small application (but the lines are blurry here)

**Use useReducer if:**

* A) if you manage JavaScript objects or arrays as state
* B) if you have complex state transitions
* C) if you want to move business logic into reducers
* D) if you have different properties that are tied together and should be managed in one state object
* E) if you want to update state deep down in your component tree
* F) if you've got a medium size application (but the lines are blurry here)
* G) if you want have an easier time testing it
* H) if you want a more predictable and maintainable state architecture

*Note: Check out when to use [useReducer or Redux](https://www.robinwieruch.de/redux-vs-usereducer) if you are interested in a comparison.*

If you want to go through a more comprehensive example where useState and useReducer are used together, check out this extensive walkthrough for [modern state management in React](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/). It almost mimics Redux by using [React's useContext Hook](https://www.robinwieruch.de/react-usecontext-hook) for "global" state management where it's possible to pass down the dispatch function once.
