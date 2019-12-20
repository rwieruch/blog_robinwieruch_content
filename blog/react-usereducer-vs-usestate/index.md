---
title: "useReducer vs useState in React"
description: "Comparing useState and useReducer in React, when to use them for different use cases, and their benefits in a growing React application ..."
date: "2019-04-17T07:52:46+02:00"
categories: ["React"]
keywords: ["useReducer vs useState"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Since [React Hooks](https://www.robinwieruch.de/react-hooks/) have been released, [function components](https://www.robinwieruch.de/react-function-component/) in React can use state and side-effects. There are two main hooks that are used for [modern state management in React](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/): useState and useReducer. This tutorial doesn't explain both React hooks in detail, but explains their different use case scenarios. There are many people who ask me whether to use useState or useReducer; that's why I thought getting together all my thoughts in one article is the best thing to deal with it.

# Table of Contents

<TableOfContents {...props} />

# When to use useState or useReducer?

Everyone starting out with React Hooks quickly gets to know the useState hook. It's there to update state in functional components by setting the initial state and returning the actual state and an updater function:

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

The useReducer hook also can be used to update state, but it does so in a **more sophisticated** way: it accepts a reducer function and an initial state, and it returns the actual state and a dispatch function. The dispatch function alters state in an implicit way by **mapping actions to state transitions**:

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

Each component above uses a different hook for state management; thus, they solve the same business case, but in different ways. So the question arises: When would you use one state-management solution or the other? Let's dive into it ...

# Simple vs. Complex State with Hooks

The reducer example encapsulated the `count` property into a state object, but we could have done this more simply by using `count` as the actual state. Refactoring to eliminate the state object and code `count` as a JavaScript integer primitive, we see that this use case doesn't involve managing a complex state:

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

In this case, because there is no complex state object, we may be better off using a simple useState hook. We thus can refactor our state object to a primitive.

Anyway, I would argue that **once you move past managing a primitive (i.e. a string, integer, or boolean) and instead must manage a complex object (e.g. with arrays and additional primitives), you may be better of using useReducer**. Perhaps a good rule of thumb is:

* Use useState whenever you manage a JS primitive
* Use useReducer whenever you manage an object or array

The rule of thumb suggests that, for instance, once you spot `const [state, setState] = useState({ firstname: 'Robin', lastname: 'Wieruch' })` in your code, you may be better off with useReducer instead of useState.

# Simple vs. Complex State Transitions with Hooks

If we hadn't used two different action types (`INCREASE` and `DECREASE`) in our previous state transitions, what could we have done differently? By using the optional payload that comes with every dispatched action object, we could specify how much we want to increase or decrease `count` from the outside of the reducer. This moves the state transition towards being more implicit:

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

But we didn't do that, and that's one important lesson when using reducers: Always try to be explicit with your state transitions. The latter example, with only one state transition, tries to put the entire transition logic into one block, but that's not very desireable when using a reducer. Rather, we want to be able to reason effortlessly about our state transitions. Having two separate state transitions instead of one allows us to reason about the business logic of the transitions more easily just by reading the action type's name.

**useReducer gives us more predictable state transitions than useState.** This becomes much more important when state changes are more complex and you want to have one place -- the reducer function -- to reason about them. A well designed reducer function encapsulates this logic perfectly.

Another rule of thumb: When you spot multiple `setState()` calls in succession, try to encapsulate these changes in a reducer function that dispatches a single action.

A great advantage of having all state in one object is the possibility of using the [browser's local storage](https://www.robinwieruch.de/local-storage-react/) to cache a slice of your state and then retrieve it as the initial state for useReducer whenever you restart your application.

# Multiple State Transitions operate on one State Object

Once your application grows in size, you most likely will deal with more complex state and state transitions. That's what we covered in the last two sections of this tutorial. One thing to notice, however, is that the state object didn't just grow in complexity; it also grew in terms of the number of state transitions that had to be performed.

Take, for instance, the following reducer that operates on one state object with multiple state transitions:

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

It only makes sense to keep everything in one state object (e.g. a list of todo items) while operating with multiple state transitions on that object. It would be less predictable and much less maintainable to implement the same business logic with useState.

You often will begin with useState and then refactor your state management to useReducer as the state object becomes more complex or the number of state transitions adds up over time. There are also other cases in which it makes sense to collect different properties into a single state object, even though they initially didn't seem to belong together. For instance, this [tutorial that showcases how to fetch data with useEffect, useState, and useReducer](https://www.robinwieruch.de/react-hooks-fetch-data/) groups together properties that are dependent on each other into one state object:

```javascript
const [state, dispatch] = useReducer(dataFetchReducer, {
  isLoading: false,
  isError: false,
  data: initialData,
});
```

One could argue that `isLoading` and `isError` could be managed separately in two useState hooks, but when looking at the reducer function, one can see that it's best to put them together in one state object because they conditionally dependent on each other:

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

It is not only a state object's complexity and the number of state transitions that are important, but **how properties fit together within the context of an application's business logic also must be considered when managing state efficiently**. If different parts of the logic are managed in different places of the code with useState, it quickly becomes harder to reason about the whole as a logical unit. Another important advantage is an improved developer experience: With one code block (the reducer function) managing multiple transitions of one state object, it is far easier to debug your logic if anything should go wrong.

Another great advantage of having all state transitions neatly organized into one reducer function is the **ability to export the reducer for unit tests**. This makes it simpler to reason about a state object with multiple state transitions if you need to test all transitions with only one function: `(state, action) => newState`. You can test all state transitions by providing all available action types and various matching payloads.

# Logic for State Changes

There is a difference in *where the logic for state transitions is placed when using useState or useReducer*. As we have seen in the previous useReducer examples, the logic for the state transitions is placed within the reducer function. The action provides only the minimum information required to perform a transition on the current state: `(state, action) => newState`. This is especially handy if you rely on the current state to update state.

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

Your React component is concerned with dispatching the appropriate action:

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

Now imagine performing the same state transitions with useState. In that case, there is no single entity like the reducer that centralizes all business logic for processing. Instead, all logic relevant to state ends up in separate handlers that call state updater functions from useState. This makes it more difficult to separate state logic from view logic, thereby contributing to a component's complexity. Reducers, however, are a perfect place to collect all logic that modifies state.

# Trigger of the State Change

React's component tree naturally grows along with your application. When state is simple and encapsulated (state + state trigger) in a component, as is the case with a [search input field in a controlled component](https://www.robinwieruch.de/react-controlled-components/)), useState may be a perfect fit:

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

However, sometimes you want to [manage state at a top-level but trigger the state changes](https://www.robinwieruch.de/react-global-state-without-redux/) somewhere deep down in your component tree. It's possible to pass both the updater function from useState or the dispatch function from useReducer [via props](https://www.robinwieruch.de/react-pass-props-to-component/) down the component tree; but using [React's context API](https://www.robinwieruch.de/react-context/) may be a better alternative to avoid prop drilling (passing props through each component level). In that case, having *one* dispatch function with different action types and payloads may be a better option than using *multiple* updater functions from useState that must be passed down individually. The dispatch function can be passed down *once* with React's useContext hook. A good example how this works can be seen in this [state management tutorial for React using useContext](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/).

<Divider />

The decision of whether to use useState or useReducer isn't always black and white; there are many shades of grey. I hope this article has given you a better understanding of when to use useState or useReducer. Here you can find a [GitHub repository](https://github.com/the-road-to-learn-react/react-hooks-usestate-vs-usereducer) with a few examples. The following facts summarize the main point of this article. {Disclaimer: They reflect my opinion on this topic.)

**Use useState if you have:**

* A) JavaScript primitives as state
* B) simple state transitions
* C) business logic within your component
* D) different properties that don't change in any correlated way and can be managed by multiple useState hooks
* E) state co-located to your component
* F) a small application (but the lines are blurry here)

**Use useReducer if you have:**

* A) JavaScript objects or arrays as state
* B) complex state transitions
* C) complicated business logic more suitable for a reducer function
* D) different properties tied together that should be managed in one state object
* E) the need to update state deep down in your component tree
* F) a medium-sized application (NB: the lines are blurry here)
* G) need for an easier time testing it
* H) need for a more predictable and maintainable state architecture

*Note: Check out when to use [useReducer or Redux](https://www.robinwieruch.de/redux-vs-usereducer) if you are interested in a comparison.*

If you want to go through a more comprehensive example where useState and useReducer are used together, check out this extensive walkthrough for [modern state management in React](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/). It almost mimics Redux by using [React's useContext Hook](https://www.robinwieruch.de/react-usecontext-hook) for "global" state management where it's possible to pass down the dispatch function once.
