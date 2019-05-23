+++
title = "How to Redux with React Hooks?"
description = "React's useContext and useReducer hooks can be used to mimic Redux for managing one global state container in React applications. This tutorial shows it step by step ..."
date = "2019-05-20T07:52:46+02:00"
tags = ["JavaScript"]
categories = ["JavaScript"]
keywords = ["redux react hooks", "usereducer redux"]
news_keywords = ["redux react hooks", "usereducer redux"]
hashtag = "#ReactJs"
card = "img/posts/redux-with-react-hooks/banner_640.jpg"
banner = "img/posts/redux-with-react-hooks/banner.jpg"
contribute = "redux-with-react-hooks.md"
headline = "How to Redux with React Hooks?"

summary = "React's useContext and useReducer hooks can be used to mimic Redux for managing one global state container in React applications. This tutorial shows it step by step."
+++

{{% sponsorship %}}

{{% pin_it_image "redux react hooks" "img/posts/redux-with-react-hooks/banner.jpg" "is-src-set" %}}

{{% read_before "This tutorial is part 2 of 2 in this series." "Part 1:" "React State with Hooks: useReducer, useState, useContext" "https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/" %}}

There are several React Hooks that make state management in React Components possible. Whereas the last tutorial has shown you how to use these hooks -- useState, useReducer, and useContext -- for modern state management in React, this tutorial pushes it to the next level by implementing one global state container with useReducer and useContext.

There are two caveats with useReducer why it cannot be used as **one global state** container: First, every reducer function operates on one independent state. There is not one state container. And second, every dispatch function operates only on one reducer function. There is no global dispatch function which pushes actions through every reducer. If you are interested about the details, read more about it here: [useReducer vs Redux](https://www.robinwieruch.de/redux-vs-usereducer). Keep also in mind that Redux comes with much more than the global state container like the Redux Dev Tools.

{{% chapter_header "Global Dispatch with React Hooks" "global-dispatch-usereducer" %}}

So far, we have an application that uses useReducer (and useState) to manage state and React's Context API to pass information such as the dispatch function and state down the component tree. State and state update function (dispatch) could be made available in all components by using useContext.

Since we have two useReducer functions, both dispatch functions are independent. Now we could either pass both dispatch functions down the component tree with React's Context API or implement one global dispatch function which dispatches actions to all reducer functions. It would be one universal dispatch function which calls all the independent dispatch functions given by our useReducer hooks:

{{< highlight javascript "hl_lines=5 6 7" >}}
const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);

  // Global Dispatch Function
  const dispatch = action =>
    [dispatchTodos, dispatchFilter].forEach(fn => fn(action));

  ...
};
{{< /highlight >}}

Now, instead of having a React Context for each dispatch function, let's have one universal context for our new global dispatch function:

{{< highlight javascript "hl_lines=1" >}}
const DispatchContext = createContext(null);
{{< /highlight >}}

*Note: If you continued with the application from the previous tutorial, rename all `TodoContext` simply to `DispatchContext` in the entire application.*

In our App component, we merged all dispatch functions from our reducers into one dispatch function and pass it down via our new context provider:

{{< highlight javascript "hl_lines=14 15 16 17 18" >}}
const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);

  // Global Dispatch Function
  const dispatch = action =>
    [dispatchTodos, dispatchFilter].forEach(fn => fn(action));

  const filteredTodos = todos.filter(todo => {
    ...
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <Filter />
      <TodoList todos={filteredTodos} />
      <AddTodo />
    </DispatchContext.Provider>
  );
};
{{< /highlight >}}

The global dispatch function iterates through all dispatch functions and executes everyone of them by passing the incoming action object to it. Now the dispatch function from the context can be used everywhere the same; in the TodoItem and AddTodo components, but also in the Filter component:

{{< highlight javascript "hl_lines=2 12 18" >}}
const Filter = () => {
  const dispatch = useContext(DispatchContext);

  const handleShowAll = () => {
    dispatch({ type: 'SHOW_ALL' });
  };

  ...
};

const TodoItem = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  ...
};

const AddTodo = () => {
  const dispatch = useContext(DispatchContext);

  ...
};
{{< /highlight >}}

In the end, we only need to adjust our reducers, so that they don't throw an error anymore in case of an incoming action type that isn't matching one of the cases, because it can happen that not all reducers are interested in the incoming action now:

{{< highlight javascript "hl_lines=10 39" >}}
const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return 'ALL';
    case 'SHOW_COMPLETE':
      return 'COMPLETE';
    case 'SHOW_INCOMPLETE':
      return 'INCOMPLETE';
    default:
      return state;
  }
};

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
      return state;
  }
};
{{< /highlight >}}

Now all reducers receive the incoming actions when actions are dispatched, but not all care about them. However, the dispatch function is one global function, accessible anywhere via React's context, to alter the state in different reducers. The whole source code can be seen {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/blob/7f1cf96adddd0ac28cab7aa55f24bbae8b6bc27b/src/App.js" %}} and all changes {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/commit/7f1cf96adddd0ac28cab7aa55f24bbae8b6bc27b" %}}.

{{% chapter_header "Global State with React Hooks" "global-state-usereducer" %}}

Basically we already have all our state from useReducer "globally" accessible, because it is located in our top-level component and *can* be passed down via React's Context API. In order to have *one* global state container (here object) though, we can put all our state coming from the useReducer hooks in one object:

{{< highlight javascript "hl_lines=9 10 11 12 13" >}}
const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);

  // Global Dispatch Function
  const dispatch = action =>
    [dispatchTodos, dispatchFilter].forEach(fn => fn(action));

  // Global State
  const state = {
    filter,
    todos,
  };

  ...
};
{{< /highlight >}}

At the moment, all state is passed down via [React props](https://www.robinwieruch.de/react-pass-props-to-component/). However, now it is up to you to pass it down as one unified state container via React's Context API. The whole source code can be seen {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/blob/a0b8055d6e04f1496d8bdc185cb27ccd6ad3bb8a/src/App.js" %}} and all changes {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/commit/a0b8055d6e04f1496d8bdc185cb27ccd6ad3bb8a" %}}.

{{% chapter_header "useCombinedReducers Hook" "usecombinedreducers-hook" %}}

The last two sections gave us **one global state** container. Our state is located at our top-level component, can be altered with one dispatch function from anywhere, and comes out as one state. In the last step, we want to hide everything behind one custom React hook called useCombinedReducers:

{{< highlight javascript "hl_lines=2 3 4 5" >}}
const App = () => {
  const [state, dispatch] = useCombinedReducers({
    filter: useReducer(filterReducer, 'ALL'),
    todos: useReducer(todoReducer, initialTodos),
  });

  ...
};
{{< /highlight >}}

As before, we want to have access to one global state container (`state`) and one universal dispatch function (`dispatch`). That's what our custom hook returns. As parameters our custom hook receives each returned array from our useReducer calls allocated by object keys. These keys will define our so called substates of our state container so that `const { filter, todos } = state;` will be possible later on. Also note that this custom hook looks very similar to Redux's {{% a_blank "combineReducers" "https://redux.js.org/api/combinereducers" %}} function. Now let's implement the new hook:

{{< highlight javascript "hl_lines=1 2 3 4 5 6 7 8 9" >}}
const useCombinedReducer = combinedReducers => {
  // Global State
  const state =

  // Global Dispatch Function
  const dispatch =

  return [state, dispatch];
};
{{< /highlight >}}

In the previous sections, we already have seen how to create a global state and global dispatch function. However, this time we need to work with a generic object `combinedReducers`.

{{< highlight javascript "hl_lines=3 4 5 6 9 10 11 12" >}}
const useCombinedReducer = combinedReducers => {
  // Global State
  const state = Object.keys(combinedReducers).reduce(
    (acc, key) => ({ ...acc, [key]: combinedReducers[key][0] }),
    {}
  );

  // Global Dispatch Function
  const dispatch = action =>
    Object.keys(combinedReducers)
      .map(key => combinedReducers[key][1])
      .forEach(fn => fn(action));

  return [state, dispatch];
};
{{< /highlight >}}

In case of the global state object, we iterate through all values from `combinedReducers` to retrieve from every entry the first item (state) from the array to allocate each by the key given from the outside.

In case of the global dispatch function, we iterate through all values from `combinedReducers` to retrieve from every entry the second item (dispatch function) from the array to call each dispatch function with the given action from the global dispatch function.

Basically that's it. You have one custom hook which takes in the return values from all your useReducer hooks at a top-level component of your application. The new hook returns the global state object in addition to the global dispatch function. Both can be passed down by React's Context API to be consumed from anywhere in your application. The whole source code can be seen {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/blob/3be73d00f69d927250999bdfb56c4f8988a3a88d/src/App.js" %}} and all changes {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/commit/3be73d00f69d927250999bdfb56c4f8988a3a88d" %}}.

You can find the custom hook open sourced over here: {{% a_blank "useCombinedReducers" "https://github.com/the-road-to-learn-react/use-combined-reducers" %}}. If you want to install it, just type `npm install use-combined-reducers` and then import it in your application:

{{< highlight javascript >}}
import useCombinedReducers from 'use-combined-reducers';
{{< /highlight >}}

<hr class="section-divider">

You have seen how multiple useReducer hooks can be used in a custom hook to return one state container and one universal dispatch function. By using React's Context API you can pass state and dispatch function down the component tree to make it everywhere accessible. The shown implementation comes close to Redux's global state container implementation, but it comes with its caveats as explained in the beginning of this tutorial.