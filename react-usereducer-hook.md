+++
title = "How to useReducer in React?"
description = "A tutorial about the React's useReducer hook by example for state management in React function components. It uses a reducer function to map action types to state transitions ..."
date = "2019-04-28T03:52:46+02:00"
tags = ["JavaScript"]
categories = ["JavaScript"]
keywords = ["react usereducer"]
news_keywords = ["react usereducer"]
hashtag = "#ReactJs"
card = "img/posts/react-usereducer-hook/banner_640.jpg"
banner = "img/posts/react-usereducer-hook/banner.jpg"
contribute = "react-usereducer-hook.md"
headline = "How to useReducer in React?"

summary = "A tutorial about the React's useReducer hook by example for state management in React function components. It uses a reducer function to map action types to state transitions."
+++

{{% sponsorship %}}

{{% pin_it_image "react usereducer hook" "img/posts/react-usereducer-hook/banner.jpg" "is-src-set" %}}

{{% read_before "This tutorial is part 2 of 2 in this series." "Part 1:" "What is a reducer in JavaScript?" "https://www.robinwieruch.de/javascript-reducer/" %}}

Since [React Hooks](https://www.robinwieruch.de/react-hooks/) have been released, [function components](https://www.robinwieruch.de/react-function-component/) can use state and side-effects. There are two hooks that are used for modern state management in React: useState and useReducer. This tutorial goes step by step through a useReducer example in React for getting you started with this React Hook for state management.

{{% chapter_header "Reducer in React" "react-reducer" %}}

If you haven't heard about reducers as concept or as implementation in JavaScript, you should read more about them over here: [Reducers in JavaScript](https://www.robinwieruch.de/javascript-reducer/). This tutorial builds up on this knowledge, so be prepared what's coming. The following function is a reducer function for managing state transitions for a list of items:

{{< highlight javascript >}}
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
    default:
      return state;
  }
};
{{< /highlight >}}

There are two types of actions for an equivalent of two state transitions. They are used to toggle the `complete` boolean to true or false of a todo item. As additional payload an identifier is needed which coming from the incoming action's payload.

The state which is managed in this reducer is an array of items:

{{< highlight javascript >}}
const todos = [
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
{{< /highlight >}}

In code, the reducer function could be used the following way with an initial state and action:

{{< highlight javascript >}}
const todos = [
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

const action = {
  type: 'DO_TODO',
  id: 'a',
};

const newTodos = todoReducer(todos, action);

console.log(newTodos);
// [
//   {
//     id: 'a',
//     task: 'Learn React',
//     complete: true,
//   },
//   {
//     id: 'b',
//     task: 'Learn Firebase',
//     complete: false,
//   },
// ]
{{< /highlight >}}

So far, everything demonstrated here is not related to React. If you have any difficulties to understand the reducer concept, please revisit the referenced tutorial from the beginning for Reducers in JavaScript. Now, let's dive into React's useReducer hook to integrate reducers in React step by step.

{{% chapter_header "React's useReducer Hook" "react-usereducer-hook" %}}

The useReducer hook is used for complex state and state transitions. It takes a reducer function and an initial state as input and returns the current state and a dispatch function as output with {{% a_blank "array destrcuturing" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" %}}:

{{< highlight javascript "hl_lines=37" >}}
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
    default:
      return state;
  }
};

const [todos, dispatch] = useReducer(todoReducer, initialTodos);
{{< /highlight >}}

The dispatch function can be used to send an action to the reducer which would implicitly change the current state:

{{< highlight javascript >}}
const [todos, dispatch] = React.useReducer(todoReducer, initialTodos);

dispatch({ type: 'DO_TODO', id: 'a' });
{{< /highlight >}}

The previous example wouldn't work without being executed in a React component, but it demonstrates how the state can be changed by dispatching an action. Let's see how this would look like in a React component. We will start with a [React component rendering a list of items](https://www.robinwieruch.de/react-list-components/). Each item has a checkbox as [controlled component](https://www.robinwieruch.de/react-controlled-components/):

{{< highlight javascript >}}
import React from 'react';

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

const App = () => {
  const handleChange = () => {};

  return (
    <ul>
      {initialTodos.map(todo => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={handleChange}
            />
            {todo.task}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default App;
{{< /highlight >}}

It's not possible to change the state of an item with the handler function yet. However, before we can do so, we need to make the list of items stateful by using them as initial state for our useReducer hook with the previously defined reducer function:

{{< highlight javascript "hl_lines=5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 29 30 31 32 38" >}}
import React from 'react';

const initialTodos = [...];

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
    default:
      return state;
  }
};

const App = () => {
  const [todos, dispatch] = React.useReducer(
    todoReducer,
    initialTodos
  );

  const handleChange = () => {};

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          ...
        </li>
      ))}
    </ul>
  );
};

export default App;
{{< /highlight >}}

Now we can use the handler to dispatch an action for our reducer function. Since we need the `id` as identifier of an todo item in order to toggle its `complete` flag, we can pass the item within the handler function by using a encapsulating arrow function:

{{< highlight javascript "hl_lines=7 8 9 19" >}}
const App = () => {
  const [todos, dispatch] = React.useReducer(
    todoReducer,
    initialTodos
  );

  const handleChange = todo => {
    dispatch({ type: 'DO_TODO', id: todo.id });
  };

  return (
    <ul>
      {todos.map(todo => (
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
{{< /highlight >}}

This implementation works only one way though: Todo items can be completed, but the operation cannot be reversed by using our reducer's second state transition. Let's implement this behavior in our handler by checking whether a todo item is completed or not:

{{< highlight javascript "hl_lines=9" >}}
const App = () => {
  const [todos, dispatch] = React.useReducer(
    todoReducer,
    initialTodos
  );

  const handleChange = todo => {
    dispatch({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    });
  };

  return (
    <ul>
      {todos.map(todo => (
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
{{< /highlight >}}

Depending on the state of our todo item, the correct action is dispatched for our reducer function. Afterward, the React component is rendered again but using the new state from the useReducer hook. The demonstrated useReducer example can be found in this {{% a_blank "GitHub repository" "https://github.com/the-road-to-learn-react/react-usereducer-hook" %}}.

<hr class="section-divider">

React's useReducer hook is a powerful way to manage state in React. It can be used [with useState and useContext](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/) for modern state management in React. Also, it is often used [in favor of useState](https://www.robinwieruch.de/react-usereducer-vs-usestate/) for complex state and state transitions. After all, the useReducer hook hits the sweet spot for middle sized applications that don't need [Redux for React](https://www.robinwieruch.de/react-redux-tutorial/) yet.