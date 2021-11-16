---
title: "React useReducer with Middleware"
description: "Learn how to use React's useReducer Hook with a middleware (and afterware) by using a custom hook for the reducer ..."
date: "2020-12-10T07:52:46+02:00"
categories: ["React"]
keywords: ["react useReducer middleware"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 3 of 3 in this series." links={[{ prefix: "Part 1:", label: "What is a reducer in JavaScript?", url: "/javascript-reducer" }, { prefix: "Part 2:", label: "How to useReducer in React", url: "/react-usereducer-hook" }]} />

In this React Hooks tutorial, I want to show you how to use a middleware for React's useReducer Hook. This middleware would run either before or after the state transition of the reducer and enables you to opt-in features.

Before we can start, let's establish what we have as a baseline from the previous useReducer tutorial: Our React application looks like the following.

First, we have all of our items -- which serve as our initial state and which will become stateful eventually -- in a list:

```javascript
const initialTodos = [
  {
    id: 'a',
    task: 'Learn React',
    complete: false,
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    complete: false,
  },
];
```

Second, we have our [reducer function](/javascript-reducer/), which enables us to transition from one state to another state by using actions:

```javascript
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case 'UNDO_TODO':
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};
```

And last but not least, we have our React component which uses [React's useReducer Hook](/react-usereducer-hook/) from the previous React Hooks tutorial:

```javascript
const App = () => {
  const [todos, dispatch] = React.useReducer(
    todoReducer,
    initialTodos
  );

  const handleChange = (todo) => {
    dispatch({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    });
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleChange(todo)}
            />
            {todo.task}
          </label>
        </li>
      ))}
    </ul>
  );
};
```

From here, we want extend the application -- to be more specific the reducer -- with a middleware. The simplest middleware would be a logger which would output something before or after the reducer's state transition. Let's get started.

# React's useReducer Hook with Middleware

The logger middleware we want to establish for our reducer as an example could look like the following function which outputs the reducer's action -- which is in charge of transition our state from one state to another state -- to the developer's console log:

```javascript
const logger = action => {
  console.log('logger:', action);
};
```

In our usage of React's useReducer Hook, we would want to use the middleware the following way:

```javascript{5}
const App = () => {
  const [todos, dispatch] = React.useReducer(
    todoReducer,
    initialTodos,
    logger
  );

  ...
};
```

What we have right now could be pretty straightforward if React's useReducer Hook would support middleware usage natively. But it doesn't, so we need to come up with a [custom hook](/react-custom-hooks/):

```javascript{1-11,14}
const useReducerWithMiddleware = (
  reducer,
  initialState,
  middlewareFn
) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // do something with middlewareFn

  return [state, dispatch];
};

const App = () => {
  const [todos, dispatch] = useReducerWithMiddleware(
    todoReducer,
    initialTodos,
    logger
  );

  ...
};
```

With the middleware function at our hands in the custom hook, we can enhance the useReducer's dispatch function with a [higher-order function](/javascript-higher-order-function/):

```javascript{8-11,13}
const useReducerWithMiddleware = (
  reducer,
  initialState,
  middlewareFn
) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const dispatchWithMiddleware = (action) => {
    middlewareFn(action);
    dispatch(action);
  };

  return [state, dispatchWithMiddleware];
};
```

What we return from the custom hook is not the dispatch function anymore, but an extended version of it where we pass the action through the middleware before we pass it to the dispatch function.

You could check when this middleware executes, before or after the dispatch function which performs the state transition, if you would insert a logging statement in your reducer function:

```javascript{2}
const todoReducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    ...
  }
};
```

That's it for a very basic reducer middleware, however, we are lacking two crucial features: First, we are only able to use one middleware function in this custom hook. And second, the middleware always executes before the state transition with dispatch, so what if we would want to have it executing after the state transition instead. Let's tackle these limitations next.

# React's useReducer with multiple Middleware

What we maybe want to have is multiple middleware functions that we can pass to the custom hook. In the following scenario, we pass two times the same middleware function as an array:

```javascript{5}
const App = () => {
  const [todos, dispatch] = useReducerWithMiddleware(
    todoReducer,
    initialTodos,
    [logger, logger]
  );

  ...
};
```

The custom hook changes the following way to execute multiple middleware functions:

```javascript{4,9}
const useReducerWithMiddleware = (
  reducer,
  initialState,
  middlewareFns
) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const dispatchWithMiddleware = (action) => {
    middlewareFns.forEach((middlewareFn) => middlewareFn(action));
    dispatch(action);
  };

  return [state, dispatchWithMiddleware];
};
```

Because we are able to pass multiple middleware functions to our custom useReducer hook, we solved the first limitation. However, all middleware functions still execute before the state transition with the actual dispatch function. Let's tackle this last limitation.

# React's useReducer with Afterware

Let's say we have two middleware functions whereas one executes before and the other one executes after the state transition:

```javascript
const loggerBefore = (action) => {
  console.log('logger before:', action);
};

const loggerAfter = (action) => {
  console.log('logger after:', action);
};
```

Event though the logging and the name of the functions are different, the functions are doing the same thing. So we need a way to tell them when (before or after dispatch) to execute. A straigthforward way would be using two arrays that we pass to our custom hook:

```javascript{5-6}
const App = () => {
  const [todos, dispatch] = useReducerWithMiddleware(
    todoReducer,
    initialTodos,
    [loggerBefore],
    [loggerAfter]
  );

  ...
};
```

Then our custom reducer hook could act upon the middleware functions which run before as we had it before. In a naive approach, we would simply put the afterware functions after the dispatch function:

```javascript{5,14}
const useReducerWithMiddleware = (
  reducer,
  initialState,
  middlewareFns,
  afterwareFns
) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const dispatchWithMiddleware = (action) => {
    middlewareFns.forEach((middlewareFn) => middlewareFn(action));

    dispatch(action);

    afterwareFns.forEach((afterwareFn) => afterwareFn(action));
  };

  return [state, dispatchWithMiddleware];
};
```

However, this doesn't work, because dispatch updates the state asynchronously. So instead, we can wait for any state change in a [useEffect hook](/react-useeffect-hook/):

```javascript{15-17}
const useReducerWithMiddleware = (
  reducer,
  initialState,
  middlewareFns,
  afterwareFns
) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const dispatchWithMiddleware = (action) => {
    middlewareFns.forEach((middlewareFn) => middlewareFn(action));

    dispatch(action);
  };

  React.useEffect(() => {
    afterwareFns.forEach(afterwareFn);
  }, [afterwareFns]);

  return [state, dispatchWithMiddleware];
};
```

For the afterward functions, we don't have the action at our disposal anymore. We can change this by using a [ref instance variable](/react-ref/) -- which will be written before we dispatch the action and which can then be read after we dispatched the action:

```javascript{9,14,20,22,24}
const useReducerWithMiddleware = (
  reducer,
  initialState,
  middlewareFns,
  afterwareFns
) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const aRef = React.useRef();

  const dispatchWithMiddleware = (action) => {
    middlewareFns.forEach((middlewareFn) => middlewareFn(action));

    aRef.current = action;

    dispatch(action);
  };

  React.useEffect(() => {
    if (!aRef.current) return;

    afterwareFns.forEach((afterwareFn) => afterwareFn(aRef.current));

    aRef.current = null;
  }, [afterwareFns]);

  return [state, dispatchWithMiddleware];
};
```

In addition, this instance variable adds the benefit of not having the side-effect function in our useEffect hook execute on mount for the component. Instead it only executes once the action has been set.

We are done with our middleware and afterware. If you want to pass in more information to your middleware/afterware functions, you can do it like this:

```javascript{1-2,5-6,21,33,37}
const loggerBefore = (action, state) => {
  console.log('logger before:', action, state);
};

const loggerAfter = (action, state) => {
  console.log('logger after:', action, state);
};

const useReducerWithMiddleware = (
  reducer,
  initialState,
  middlewareFns,
  afterwareFns
) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const aRef = React.useRef();

  const dispatchWithMiddleware = (action) => {
    middlewareFns.forEach((middlewareFn) =>
      middlewareFn(action, state)
    );

    aRef.current = action;

    dispatch(action);
  };

  React.useEffect(() => {
    if (!aRef.current) return;

    afterwareFns.forEach((afterwareFn) =>
      afterwareFn(aRef.current, state)
    );

    aRef.current = null;
  }, [afterwareFns, state]);

  return [state, dispatchWithMiddleware];
};
```

That's it. You are now able to run functions prior and after changing the state with React's useReducer Hook by using middleware and afterware.