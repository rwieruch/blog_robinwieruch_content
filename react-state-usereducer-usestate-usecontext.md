+++
title = "React State with Hooks: useReducer, useState, useContext"
description = "An elaborate walkthrough for React state management example with useState, useReducer, and useContext which mimics Redux's state management philosophy ..."
date = "2019-04-06T07:52:46+02:00"
tags = ["JavaScript"]
categories = ["JavaScript"]
keywords = ["react state hooks", "react usereducer", "react usestate", "react usecontext"]
news_keywords = ["react state hooks", "react usereducer", "react usestate", "react usecontext"]
hashtag = "#ReactJs"
card = "img/posts/react-state-usereducer-usestate-usecontext/banner_640.jpg"
banner = "img/posts/react-state-usereducer-usestate-usecontext/banner.jpg"
contribute = "react-state-usereducer-usestate-usecontext.md"
headline = "React State with Hooks: useReducer, useState, useContext"

summary = "An elaborate walkthrough for React state management example with useState, useReducer, and useContext which mimics Redux's state management philosophy."
+++

{{% sponsorship %}}

{{% pin_it_image "react state hooks" "img/posts/react-state-usereducer-usestate-usecontext/banner.jpg" "is-src-set" %}}

If you haven't used state management excessively in [React Function Components](https://www.robinwieruch.de/react-function-component/), this tutorial may help you to get a better understanding of how [React Hooks](https://www.robinwieruch.de/react-hooks/) -- such as useState, useReducer, and useContext -- can be used in combination for impressive state management in React applications. In this tutorial, we will almost reach the point where these hooks mimic sophisticated state management libraries like [Redux](https://www.robinwieruch.de/react-redux-tutorial/) for globally managed state. Let's dive into the application which we will implement together step by step.

{{% chapter_header "Table of Contents" "toc" %}}

* [useState for simple State](#usestate-state-hook)
* [useReducer for complex State](#usereducer-reducer-hook)
* [useContext for "global" State](#usecontext-context-hook)

{{% chapter_header "useState for simple State" "usestate-state-hook" %}}

We start with a list of items -- in our scenario a list of todo items -- which are rendered in our function component with a [JavaScript Map Method for Arrays](https://www.robinwieruch.de/javascript-map-array/). Each todo item rendered as list item receives a key attribute to notify React about its place in the rendered list:

{{< highlight javascript >}}
import React from 'react';

const initalTodos = [
  {
    id: 'a',
    task: 'Learn React',
    complete: true,
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    complete: true,
  },
  {
    id: 'c',
    task: 'Learn GraphQL',
    complete: false,
  },
];

const App = () => (
  <div>
    <ul>
      {initalTodos.map(todo => (
        <li key={todo.id}>
          <label>{todo.task}</label>
        </li>
      ))}
    </ul>
  </div>
);

export default App;
{{< /highlight >}}

In order to add a new todo item to our list of todo items, we need an input field to give a new todo item a potential task property. In React, we can use the State Hook called `useState` to manage something like the value of an input field as state within the component:

{{< highlight javascript "hl_lines=1 5 6 8 9 10 12 22 24 25" >}}
import React, { useState } from 'react';

...

const App = () => {
  const [task, setTask] = useState('');

  const handleChangeInput = event => {

  };

  return (
    <div>
      <ul>
        {initalTodos.map(todo => (
          <li key={todo.id}>
            <label>{todo.task}</label>
          </li>
        ))}
      </ul>

      <input type="text" value={task} onChange={handleChangeInput} />
    </div>
  );
};
{{< /highlight >}}

We also had to give our Function Arrow Component a body with an explicit return statement to get the `useState` hook in between. Now, we can change the task state with our handler function, because we have the input's value at our disposal in React's synthetic event:

{{< highlight javascript "hl_lines=5" >}}
const App = () => {
  const [task, setTask] = useState('');

  const handleChangeInput = event => {
    setTask(event.target.value);
  };

  return (
    <div>
      <ul>
        {initalTodos.map(todo => (
          <li key={todo.id}>
            <label>{todo.task}</label>
          </li>
        ))}
      </ul>

      <input type="text" value={task} onChange={handleChangeInput} />
    </div>
  );
};
{{< /highlight >}}

Now the input field has become a controlled input field, because the value comes directly from the React managed state and the handler changes the state. We implemented our first managed state with the State Hook in React. The whole source code can be seen {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/blob/3e6e5a27561bd0e0cc99e39efb853a187ac7339e/src/App.js" %}}.

To continue, let's implement a submit button to add the new todo item to the list of items eventually:

{{< highlight javascript "hl_lines=8 9 10 11 12 13 14 15 16 28 34 35" >}}
const App = () => {
  const [task, setTask] = useState('');

  const handleChangeInput = event => {
    setTask(event.target.value);
  };

  const handleSubmit = event => {
    if (task) {
      // add new todo item
    }

    setTask('');

    event.preventDefault();
  };

  return (
    <div>
      <ul>
        {initalTodos.map(todo => (
          <li key={todo.id}>
            <label>{todo.task}</label>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleChangeInput}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};
{{< /highlight >}}

The submit handler doesn't add the new todo item yet, but it makes the input field's value empty again after submitting the new todo item. Also it prevents the default behavior of the browser, because otherwise the browser would perform a refresh after the submit button has been clicked.

In order to add the todo item to our list of todo items, we need to make the todo items managed as state within the component as well. We can use again the useState hook:

{{< highlight javascript "hl_lines=2 10" >}}
const App = () => {
  const [todos, setTodos] = useState(initalTodos);
  const [task, setTask] = useState('');

  ...

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>{todo.task}</label>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleChangeInput}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};
{{< /highlight >}}

By having the `setTodos` function at our disposal, we can add the new todo item to the list. The {{% a_blank "built-in array concat method" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat" %}} can be used for this kind of scenario. Also the {{% a_blank "shorthand property name" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer" %}} is used to allocate the task property in the object:

{{< highlight javascript "hl_lines=11" >}}
const App = () => {
  const [todos, setTodos] = useState(initalTodos);
  const [task, setTask] = useState('');

  const handleChangeInput = event => {
    setTask(event.target.value);
  };

  const handleSubmit = event => {
    if (task) {
      setTodos(todos.concat({ id: 'd', task, complete: false }));
    }

    setTask('');

    event.preventDefault();
  };

  ...
};
{{< /highlight >}}

There is one flaw in this implementation. The new todo item has always the same identifier, which shouldn't be this way for a unique identifier. That's why we can use a library to generate a unique identifier for us. First, you can install it on the command line:

{{< highlight javascript >}}
npm install uuid
{{< /highlight >}}

Second, you can use it to generate a unique identifier:

{{< highlight javascript "hl_lines=2 6 11 16 32" >}}
import React, { useState } from 'react';
import uuid from 'uuid/v4';

const initalTodos = [
  {
    id: uuid(),
    task: 'Learn React',
    complete: true,
  },
  {
    id: uuid(),
    task: 'Learn Firebase',
    complete: true,
  },
  {
    id: uuid(),
    task: 'Learn GraphQL',
    complete: false,
  },
];

const App = () => {
  const [todos, setTodos] = useState(initalTodos);
  const [task, setTask] = useState('');

  const handleChangeInput = event => {
    setTask(event.target.value);
  };

  const handleSubmit = event => {
    if (task) {
      setTodos(todos.concat({ id: uuid(), task, complete: false }));
    }

    setTask('');

    event.preventDefault();
  };

  ...
};
{{< /highlight >}}

You have implemented your second use case for managing state in React by appending an item to a list of items. Again it was possible with the useState hook. The whole source code can be seen {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/blob/37144e9ef12bb3c46ed509e26e7ab49c46cfa3d5/src/App.js" %}} and all changes {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/commit/37144e9ef12bb3c46ed509e26e7ab49c46cfa3d5" %}}.

Last but not least, let's implement a checkbox for each todo item in the list to toggle their complete flags from false to true or true to false.

{{< highlight javascript "hl_lines=5 6 7 17 18 19 20 21" >}}
const App = () => {
  const [todos, setTodos] = useState(initalTodos);
  const [task, setTask] = useState('');

  const handleChangeCheckbox = event => {

  };

  ...

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={handleChangeCheckbox}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>

      ...
    </div>
  );
};
{{< /highlight >}}

Since we need the id of the todo item in our handler function, and not the event, we use a wrapping arrow function to pass the identifier of the individual todo item to our handler:

{{< highlight javascript "hl_lines=5 20" >}}
const App = () => {
  const [todos, setTodos] = useState(initalTodos);
  ...

  const handleChangeCheckbox = id => {

  };

  ...

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleChangeCheckbox(todo.id)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>

      ...
    </div>
  );
};
{{< /highlight >}}

Last, by having the id at our disposal, we can only alter the affected todo item in our list -- by negating the complete flag -- and return every other todo item as before. [By using the map method, we return a new array made up of the changed todo item and the remaining todo items](https://www.robinwieruch.de/react-state-array-add-update-remove/):

{{< highlight javascript "hl_lines=6 7 8 9 10 11 12 13 14" >}}
const App = () => {
  const [todos, setTodos] = useState(initalTodos);
  ...

  const handleChangeCheckbox = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      })
    );
  };

  ...

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleChangeCheckbox(todo.id)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>

      ...
    </div>
  );
};
{{< /highlight >}}

That's it. The new todo items are immediately set as state for the list of todo items with the `setTodos` function. The whole source code can be seen {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/blob/8f727cebe7079a0f72d6104e63712e1026ed1806/src/App.js" %}} and all changes {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/commit/8f727cebe7079a0f72d6104e63712e1026ed1806" %}}. Congratulations, you have implemented a whole todo application with three use cases for state management with the useState hook:

* input field state for tracking task property of new todo item
* adding a todo item to list with a submit button
* checking (and unchecking) a todo item with checkboxes

{{% chapter_header "useReducer for complex State" "usereducer-reducer-hook" %}}

The useState hook is great to manage simple state. However, once you run into more complex state objects or state transitions -- which you want to keep maintainable and predictable --, the useReducer hook is a great candidate to manage them. Let's continue implementing our application with the useReducer hook by going through a simpler example first. In our next scenario, we want to add buttons to filter our list of todos for three cases:

* show all todo items
* show only complete todo items
* show only incomplete todo items

Let's see how we can implement these with three buttons:

{{< highlight javascript "hl_lines=4 5 6 8 9 10 12 13 14 20 21 22 23 24 25 26 27 28 29 30" >}}
const App = () => {
  ...

  const handleShowAll = () => {

  };

  const handleShowComplete = () => {

  };

  const handleShowIncomplete = () => {

  };

  ...

  return (
    <div>
      <div>
        <button type="button" onClick={handleShowAll}>
          Show All
        </button>
        <button type="button" onClick={handleShowComplete}>
          Show Complete
        </button>
        <button type="button" onClick={handleShowIncomplete}>
          Show Incomplete
        </button>
      </div>

      ...
    </div>
  );
};
{{< /highlight >}}

We will care later about these. Next, let's see how we can map the three cases in a reducer function:

{{< highlight javascript >}}
const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return 'ALL';
    case 'SHOW_COMPLETE':
      return 'COMPLETE';
    case 'SHOW_INCOMPLETE':
      return 'INCOMPLETE';
    default:
      throw new Error();
  }
};
{{< /highlight >}}

A reducer function always receives the current state and an action as arguments. Depending on the mandatory type of the action, it decides what task to perform in the switch case statement, and returns a new state based on the implementation details. In our case, the implementation details are straightforward:

* In case of action type `SHOW_ALL`, return `ALL` string as state.
* In case of action type `SHOW_COMPLETE`, return `COMPLETE` string as state.
* In case of action type `SHOW_INCOMPLETE`, return `INCOMPLETE` string as state.
* If none of the action types are matched, throw an error to notify us about a bad implementation.

Now we can use the reducer function in a useReducer hook. It takes the reducer function and an initial state and returns the filter state and the dispatch function to change it:

{{< highlight javascript "hl_lines=1 6" >}}
import React, { useState, useReducer } from 'react';

...

const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');

  ...
};
{{< /highlight >}}

First, the dispatch function can be used with an action object -- with an action type which is used within the reducer to evaluate the new state:

{{< highlight javascript "hl_lines=7 11 15" >}}
const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');

  ...

  const handleShowAll = () => {
    dispatchFilter({ type: 'SHOW_ALL' });
  };

  const handleShowComplete = () => {
    dispatchFilter({ type: 'SHOW_COMPLETE' });
  };

  const handleShowIncomplete = () => {
    dispatchFilter({ type: 'SHOW_INCOMPLETE' });
  };

  ...
};
{{< /highlight >}}

Second, -- after we are able to transition from state to state with the reducer function and the action with action type -- the filter state can be used to show only the matching todo items by using the {{% a_blank "built-in array filter method" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" %}}:

{{< highlight javascript "hl_lines=6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 29" >}}
const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');

  ...

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') {
      return true;
    }

    if (filter === 'COMPLETE' && todo.complete) {
      return true;
    }

    if (filter === 'INCOMPLETE' && !todo.complete) {
      return true;
    }

    return false;
  });

  ...

  return (
    <div>
      ...

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleChangeCheckbox(todo.id)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>

      ...
    </div>
  );
};
{{< /highlight >}}

The filter buttons should work now. Every time a button is clicked an action with an action type is dispatched for the reducer function. The reducer function computes then the new state. Often the current state from the reducer function's argument is used to compute the new state with the incoming action. But in this simpler example, we only transition from one JavaScript string to another string as state.

The whole source code can be seen {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/blob/08d4b7130613eef209687f5f4c270c86716f1f09/src/App.js" %}} and all changes {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/commit/08d4b7130613eef209687f5f4c270c86716f1f09" %}}.

*Note: The shown use case -- also every other use case with useReducer -- can be implemented with useState as well. However, even though this one is a simpler example for the sake of learning about it, it shows clearly how much its helps for the reasoning for the state transitions by just reading the reducer function.*

The useReducer hook is great for predictable state transitions as we have seen in the previous example. Next, we are going to see how it is a good fit for complex state objects too. Therefore, we will start to manage our todo items in a reducer hook and manipulate it with the following transitions:

* Toggle todo item to complete.
* Toggle todo item to incomplete.
* Add todo item to the list of todo items.

The reducer would look like the following:

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
    case 'ADD_TODO':
      return state.concat({
        task: action.task,
        id: uuid(),
        complete: false,
      });
    default:
      throw new Error();
  }
};
{{< /highlight >}}

The following transitions are implemented in the reducer:

* `DO_TODO`: If an action of this kind passes the reducer, the action comes with an additional payload, the todo item's `id`, to identify the todo item that should be changed to **complete** status.
* `UNDO_TODO`: If an action of this kind passes the reducer, the action comes with an additional payload, the todo item's `id`, to identify the todo item that should be changed to **incomplete** status.
* `ADD_TODO`: If an action of this kind passes the reducer, the action comes with an additional payload, the new todo item's `task`, to concat the new todo item to the current todo items in the state.

Instead of the useState hook from before, we can manage our todos with this new reducer and the initially given todo items:

{{< highlight javascript "hl_lines=2" >}}
const App = () => {
  const [todos, dispatchTodos] = useReducer(todoReducer, initalTodos);
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [task, setTask] = useState('');

  ...
};
{{< /highlight >}}

If someone toggles a todo item with the checkbox element, a new handler is used to dispatch an action with the appropriate action type depending on the todo item's complete status:

{{< highlight javascript "hl_lines=5 6 7 8 9 10 25" >}}
const App = () => {
  const [todos, dispatchTodos] = useReducer(todoReducer, initalTodos);
  ...

  const handleChangeCheckbox = todo => {
    dispatchTodos({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    });
  };

  ...

  return (
    <div>
      ...

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleChangeCheckbox(todo)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>

      ...
    </div>
  );
};
{{< /highlight >}}

If someone submits a new todo item with the button, the same handler is used but to dispatch an action with the correct action type and the name of the todo item (`task`) as payload:

{{< highlight javascript "hl_lines=7" >}}
const App = () => {
  const [todos, dispatchTodos] = useReducer(todoReducer, initalTodos);
  ...

  const handleSubmit = event => {
    if (task) {
      dispatchTodos({ type: 'ADD_TODO', task });
    }

    setTask('');

    event.preventDefault();
  };

  ...

  return (
    <div>
      ...

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleChangeInput}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};
{{< /highlight >}}

Now everything that has been managed by useState for our todo items is managed by useReducer now. The reducer describes what happens for each state transition and how this happens by moving the implementation details in there. The whole source code can be seen {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/blob/0f33780b85cddb9a48b0237fa9ca59f483659499/src/App.js" %}} and all changes {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/commit/0f33780b85cddb9a48b0237fa9ca59f483659499" %}}.

You have seen how useState and useReducer can be used for simple and complex state management whereas useReducer gives you clear state transitions -- thus improved predictability -- and a better way to manage complex objects.

{{% chapter_header "useContext for \"global\" State" "usecontext-context-hook" %}}

We can take our state management one step further. At the moment, the state is managed co-located to the component. That's because we only have one component after all. What if we would have a deep component tree? How could we dispatch state changes from anywhere?

Let's dive into [React's Context API and the useContext hook](https://www.robinwieruch.de/react-context-api/) to mimic more a Redux's philosophy by making state changes available in the whole component tree. Before we can do this, let's refactor our one component into a component tree. First, the App component renders all its child components and passes the necessary state and dispatch functions to them:

{{< highlight javascript "hl_lines=23 24 25" >}}
const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [todos, dispatchTodos] = useReducer(todoReducer, initalTodos);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') {
      return true;
    }

    if (filter === 'COMPLETE' && todo.complete) {
      return true;
    }

    if (filter === 'INCOMPLETE' && !todo.complete) {
      return true;
    }

    return false;
  });

  return (
    <div>
      <Filter dispatch={dispatchFilter} />
      <TodoList dispatch={dispatchTodos} todos={filteredTodos} />
      <AddTodo dispatch={dispatchTodos} />
    </div>
  );
};
{{< /highlight >}}

Second, the Filter component with its buttons and handlers which are using the dispatch function:

{{< highlight javascript >}}
const Filter = ({ dispatch }) => {
  const handleShowAll = () => {
    dispatch({ type: 'SHOW_ALL' });
  };

  const handleShowComplete = () => {
    dispatch({ type: 'SHOW_COMPLETE' });
  };

  const handleShowIncomplete = () => {
    dispatch({ type: 'SHOW_INCOMPLETE' });
  };

  return (
    <div>
      <button type="button" onClick={handleShowAll}>
        Show All
      </button>
      <button type="button" onClick={handleShowComplete}>
        Show Complete
      </button>
      <button type="button" onClick={handleShowIncomplete}>
        Show Incomplete
      </button>
    </div>
  );
};
{{< /highlight >}}

Third, the TodoList and TodoItem components. Since the individual TodoItem component defines its own handler, the `onChange` event handler doesn't need to pass the todo item anymore. The item is already available in the component itself:

{{< highlight javascript "hl_lines=10 22" >}}
const TodoList = ({ dispatch, todos }) => (
  <ul>
    {todos.map(todo => (
      <TodoItem key={todo.id} dispatch={dispatch} todo={todo} />
    ))}
  </ul>
);

const TodoItem = ({ dispatch, todo }) => {
  const handleChange = () =>
    dispatch({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    });

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleChange}
        />
        {todo.task}
      </label>
    </li>
  );
};
{{< /highlight >}}

Last, the AddTodo component which uses is own local state to manage the value of the input field:

{{< highlight javascript >}}
const AddTodo = ({ dispatch }) => {
  const [task, setTask] = useState('');

  const handleSubmit = event => {
    if (task) {
      dispatch({ type: 'ADD_TODO', task });
    }

    setTask('');

    event.preventDefault();
  };

  const handleChange = event => setTask(event.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={task} onChange={handleChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
};
{{< /highlight >}}

In the end, we have a component tree whereas each component receives [state as props](https://www.robinwieruch.de/react-pass-props-to-component/) and dispatch functions to alter the state. Most of the state is managed by the parent App component. That's it for the refactoring. The whole source code can be seen {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/blob/d024a244193142fed675ce43d67c71039947548c/src/App.js" %}} and all changes {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/commit/d024a244193142fed675ce43d67c71039947548c" %}}.

Now, The component tree isn't very deep and it isn't difficult to pass props down. However, in larger applications it can be a burden to pass down everything several levels. That's why React came up with the idea of the context container. Let's see how we can pass the dispatch functions down with React's Context API. First, we create the context:

{{< highlight javascript "hl_lines=1 4" >}}
import React, { useState, useReducer, createContext } from 'react';
...

const TodoContext = createContext(null);

...
{{< /highlight >}}

Second, the App can use the context's Provider method to pass implicitly a value down the component tree:

{{< highlight javascript "hl_lines=10 14" >}}
const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [todos, dispatchTodos] = useReducer(todoReducer, initalTodos);

  const filteredTodos = todos.filter(todo => {
    ...
  });

  return (
    <TodoContext.Provider value={dispatchTodos}>
      <Filter dispatch={dispatchFilter} />
      <TodoList dispatch={dispatchTodos} todos={filteredTodos} />
      <AddTodo dispatch={dispatchTodos} />
    </TodoContext.Provider>
  );
};
{{< /highlight >}}

Now, the dispatch function doesn't need to be passed down to the components anymore, because it's available in the context:

{{< highlight javascript "hl_lines=12 13" >}}
const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [todos, dispatchTodos] = useReducer(todoReducer, initalTodos);

  const filteredTodos = todos.filter(todo => {
    ...
  });

  return (
    <TodoContext.Provider value={dispatchTodos}>
      <Filter dispatch={dispatchFilter} />
      <TodoList todos={filteredTodos} />
      <AddTodo />
    </TodoContext.Provider>
  );
};
{{< /highlight >}}

The useContext hook helps us to retrieve the value from the context in the AddTodo component:

{{< highlight javascript "hl_lines=4 10 11" >}}
import React, {
  useState,
  useReducer,
  useContext,
  createContext,
} from 'react';

...

const AddTodo = () => {
  const dispatch = useContext(TodoContext);

  const [task, setTask] = useState('');

  const handleSubmit = event => {
    if (task) {
      dispatch({ type: 'ADD_TODO', task });
    }

    setTask('');

    event.preventDefault();
  };

  const handleChange = event => setTask(event.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={task} onChange={handleChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
};
{{< /highlight >}}

Also the TodoItem component makes use of it and the dispatch function doesn't need to be passed through the TodoList component anymore:

{{< highlight javascript "hl_lines=1 4 9 10" >}}
const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </ul>
);

const TodoItem = ({ todo }) => {
  const dispatch = useContext(TodoContext);

  const handleChange = () =>
    dispatch({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    });

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleChange}
        />
        {todo.task}
      </label>
    </li>
  );
};
{{< /highlight >}}

The application works again, but we are able to dispatch changes for our todo list from anywhere. The whole source code can be seen {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/blob/95806796700fc2ca5cd204dd2f4542ad6f08e7ee/src/App.js" %}} and all changes {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/commit/95806796700fc2ca5cd204dd2f4542ad6f08e7ee" %}}.

We could repeat the same approach for the dispatch function of the filter reducer, however, then we would have two provider to pass down different dispatch functions. What if we could mimic Redux even more by having one universal dispatch function?

Let's rename the context from `TodoContext` to `DispatchContext` everywhere in our application:

{{< highlight javascript "hl_lines=1" >}}
const DispatchContext = createContext(null);
{{< /highlight >}}

In our App component, we merge all dispatch functions from our reducers into one dispatch function and pass it down via our new context provider. No other component receives its dispatch function anymore by its props:

{{< highlight javascript "hl_lines=5 6 7 14 15 16 17 18" >}}
const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [todos, dispatchTodos] = useReducer(todoReducer, initalTodos);

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

{{< highlight javascript "hl_lines=1 2" >}}
const Filter = () => {
  const dispatch = useContext(DispatchContext);

  const handleShowAll = () => {
    dispatch({ type: 'SHOW_ALL' });
  };

  const handleShowComplete = () => {
    dispatch({ type: 'SHOW_COMPLETE' });
  };

  const handleShowIncomplete = () => {
    dispatch({ type: 'SHOW_INCOMPLETE' });
  };

  return (
    <div>
      <button type="button" onClick={handleShowAll}>
        Show All
      </button>
      <button type="button" onClick={handleShowComplete}>
        Show Complete
      </button>
      <button type="button" onClick={handleShowIncomplete}>
        Show Incomplete
      </button>
    </div>
  );
};
{{< /highlight >}}

In the end, we only need to adjust our reducers, so that they don't throw an error anymore in case of when the incoming action type isn't matching one of the cases, because it can happen that not all reducers are interested of the incoming action:

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
        id: uuid(),
        complete: false,
      });
    default:
      return state;
  }
};
{{< /highlight >}}

Now all reducers receive the incoming actions when actions are dispatched, but not all care about them. However, the dispatch function is one global function, accessible anywhere via React's context, to alter the state in different reducers. The whole source code can be seen {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/blob/7f1cf96adddd0ac28cab7aa55f24bbae8b6bc27b/src/App.js" %}} and all changes {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-with-redux-philosophy/commit/7f1cf96adddd0ac28cab7aa55f24bbae8b6bc27b" %}}.

<hr class="section-divider">

You have learned how modern state management is used in React with useState, useReducer and useContext. Whereas useState is used for simple state (e.g. input field), useReducer is a greater asset for complex objects and complicated state transitions. In larger applications, useContext can be used to pass down dispatch functions or one universal usable dispatch function. Also state from the reducer could be passed down this way to make it accessible anywhere.