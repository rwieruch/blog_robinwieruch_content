+++
title = "How to useState in React?"
description = "A tutorial about the React's useState hook by example for state management in React function components ..."
date = "2019-05-30T03:52:46+02:00"
tags = ["JavaScript"]
categories = ["JavaScript"]
keywords = ["react usestate"]
news_keywords = ["react usestate"]
hashtag = "#ReactJs"
card = "img/posts/react-usestate-hook/banner_640.jpg"
banner = "img/posts/react-usestate-hook/banner.jpg"
contribute = "react-usestate-hook.md"
headline = "How to useState in React?"

summary = "A tutorial about the React's useState hook by example for state management in React function components."
+++

{{% sponsorship %}}

{{% pin_it_image "react usestate hook" "img/posts/react-usestate-hook/banner.jpg" "is-src-set" %}}

Since [React Hooks](https://www.robinwieruch.de/react-hooks/) have been released, [function components](https://www.robinwieruch.de/react-function-component/) can use state and side-effects. There are two hooks that are used for modern state management in React: useState and useReducer. This tutorial goes step by step through a useState example in React for getting you started with this React Hook for state management.

{{% chapter_header "Simple State in React" "react-simple-state" %}}

In the past, state couldn't be used in function components. Hence they called them functional stateless components. However, with the release of React Hooks, state can be deployed in this kind of components too and thus they got rebranded by the React community to function components. A straightforward example on how to use state in a function component with the useState hook is demonstrated in the following example:

{{< highlight javascript >}}
const App = () => {
  const [count, setCount] = React.useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    setCount(count - 1);
  };

  return (
    <div>
      Count: {count}
      <hr />
      <div>
        <button type="button" onClick={handleIncrease}>
          Increase
        </button>
        <button type="button" onClick={handleDecrease}>
          Decrease
        </button>
      </div>
    </div>
  );
};
{{< /highlight >}}

The useState function takes as argument a value for the initial state. In this case, the count starts out with 0. In addition, the hook returns an array of two values: `count` and `setCount`. It's up to you to name the two values, because they are {{% a_blank "destructured from the returned array" "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" %}} where renaming is allowed.

The first value, in this case `count`, represents the current state. The second value, in this case `setCount`, is a function to update the state with anything that's passed to this function when calling it. This function is also called state update function. Every time this function is called, React re-renders the component to render the recent state.

You can also read this [article, if you want to know how state management has changed from class components to function components](https://www.robinwieruch.de/react-hooks-migration/) in case you are dealing with class components as well.

That's everything you need to know to get started with simple state management in React. If you are interested about React's useState caveats for growing React applications, continue to read.

{{% chapter_header "Complex State in React" "react-complex-state" %}}

So far, the example has only shown useState with a JavaScript primitive. That's where useState shines. It can be used for integers, booleans, strings and also arrays. However, once you plan to manage more complex state with objects or more complex arrays, you should check out [React's useReducer hook](https://www.robinwieruch.de/react-usereducer-hook). There are various scenarios where useReducer outperforms useState:

* complex state containers
* complex state transitions
* conditional state updates

It also helps to avoid multiple successive state updates by using only useState. You should definitely check it out if you want to manage more complex state in React.

{{% chapter_header "Asynchronous State in React" "react-state" %}}

What happens if you are dependent on actual state to update the state? Let's illustrate this case with an example where we are delaying the state update with a {{% a_blank "JavaScript built-in setTimeout" "https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout" %}} function:

{{< highlight javascript "hl_lines=5 9" >}}
const App = () => {
  const [count, setCount] = React.useState(0);

  const handleIncrease = () => {
    setTimeout(() => setCount(count + 1), 1000);
  };

  const handleDecrease = () => {
    setTimeout(() => setCount(count - 1), 1000);
  };

  return (
    <div>
      Count: {count}
      <hr />
      <div>
        <button type="button" onClick={handleIncrease}>
          Increase
        </button>
        <button type="button" onClick={handleDecrease}>
          Decrease
        </button>
      </div>
    </div>
  );
};
{{< /highlight >}}

Every time you click on one of the buttons, the state update function is called with a delay of one second. That works for a single click. However, try to click one of the buttons multiple times in a row. The state update function will always operate on the same state (here: `count`) within this one second. In order to fix this problem, you can pass a function to the state update function from useState:

{{< highlight javascript "hl_lines=7 11" >}}
import React from 'react';

const App = () => {
  const [count, setCount] = React.useState(0);

  const handleIncrease = () => {
    setTimeout(() => setCount(state => state + 1), 1000);
  };

  const handleDecrease = () => {
    setTimeout(() => setCount(state => state - 1), 1000);
  };

  return (
    <div>
      Count: {count}
      <hr />
      <div>
        <button type="button" onClick={handleIncrease}>
          Increase
        </button>
        <button type="button" onClick={handleDecrease}>
          Decrease
        </button>
      </div>
    </div>
  );
};

export default App;
{{< /highlight  >}}

The function offers you the state at the time of executing the function. This way, you never operate on any stale state. Therefore a good rule of thumb may be: Always use a function in useState's update function if your state update depends on your previous state.

<hr class="section-divider">

React's useState is the go-to hook to manage state. It can be used [with useReducer and useContext](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/) for modern state management in React. [Compared to useReducer, it is the more lightweight approach to manage state.](https://www.robinwieruch.de/react-usereducer-vs-usestate/).
