---
title: "React Higher-Order Components (HOCs)"
description: "A comprehensive tutorial about Higher-Order Components in React. Higher-Order Components, known as HOCs, are often a difficult to understand pattern in React.js. The article gives you a gentle introduction, how to use HOCs in an elegant way, how to abstract reusable logic and how to use recompose ..."
date: "2022-04-19T07:50:46+02:00"
categories: ["React", "React Higher Order Components"]
keywords: ["react higher-order components"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

**Higher-Order Components** in React, also known as **HOCs**, are an advanced component pattern in React (next to [Render Props Components](/react-render-props/)). Higher-Order Components can be used for multiple use cases. I want to pick out one use case, the [conditional rendering](/conditional-rendering-react/) with Higher-Order Components, to give you two outcomes from this article as a learner.

* First, it should teach you about React's Higher-Order Components with the use case of conditional rendering. Keep in mind, that altering the look of a component with a Higher-Order Component, specifically in the context of conditional rendering, is only one of several use cases to use HOCs. For instance, you could use them to opt-in local state or to alter props as well.

* Second, even though you might already know HOCs, the article goes a bit further by composing Higher-Order Components in React and by applying functional programming principles. You will get to know how to use Higher-Order Components in an elegant way.

In order to learn about React Higher-Order Components, the article focuses on the use case of conditional rendering. A conditional rendering in React can be applied in multiple ways. You can use if-else statements, the ternary operator, or the logical && operator. You can read more about the different ways in another article about [conditional renderings in React](/conditional-rendering-react/).

# React Hooks vs Higher-Order Components

I have written over here [why React Hooks are superior to Higher-Order Components](/react-hooks-higher-order-components/). However, even in modern React I am an advocate of Higher-Order Components in React. While most developers say that React Hooks moved React more towards the direction of functional programming, I say it's quite the opposite. Higher-Order Components enable us to apply functional programming principles on components by embracing composition. React Hooks, in contrast, transformed pure (in the sense of functional programming) function components to stateful/side-effect burdened beasts.

Anyway, both have their right to exist. While React Hooks are the status quo for flavoring function components with implementation details (e.g. [state](/react-usereducer-vs-usestate/), [side-effects](/react-useeffect-hook/)) *from within*, React Higher-Order Components flavor function (and class components) from the outside. HOCs are the perfect shield to protect a component before the actual component executes its implementation details (e.g. React Hooks) within. We will see in the following a specific use case where this holds true.

# Higher-Order Components: Use Case

We will start with a problem where Higher-Order Components in React can be used as a solution. Let's have a list component as [function component](/react-function-component/) in React which is just there to render a list of items. The [list component](/react-list-component/) receives its data from the App component:

```javascript
import * as React from 'react';

const TODOS = [
  { id: '1', task: 'Do this', completed: true },
  { id: '2', task: 'Do that', completed: false },
];

const App = () => {
  return <TodoList data={TODOS} />;
};

const TodoList = ({ data }) => {
  return (
    <ul>
      {data.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const TodoItem = ({ item }) => {
  return (
    <li>
      {item.task} {item.completed.toString()}
    </li>
  );
};

export default App;
```

In a real world application this [data would be fetched](/react-hooks-fetch-data/) from a remote API though. The following function [mocks this data API](/react-mock-data/) for keeping the example at stake lightweight. However, just think of `fetchData()` as a blackbox function which returns data eventually:

```javascript{6-8,11}
const TODOS = [
  { id: '1', task: 'Do this', completed: true },
  { id: '2', task: 'Do that', completed: false },
];

const fetchData = () => {
  return { data: TODOS };
};

const App = () => {
  const { data } = fetchData();

  return <TodoList data={data} />;
};
```

The application renders the list with its items. But most often that's not sufficient, because you have to bother with all the edge cases. What are these edge cases I am speaking about?

First, what happens if your data is `null` before it got fetched asynchronsouly from the API? You would apply a conditional rendering to opt-out earlier from your rendering:

```javascript{2,8}
const fetchData = () => {
  return { data: null };
};

const App = () => {
  const { data } = fetchData();

  if (!data) return <div>No data loaded yet.</div>;

  return <TodoList data={data} />;
};
```

Second, what happens if your data is not `null` but empty? You would show a message in a conditional rendering to give your user feedback for an improved user experience (UX):

```javascript{2,9}
const fetchData = () => {
  return { data: [] };
};

const App = () => {
  const { data } = fetchData();

  if (!data) return <div>No data loaded yet.</div>;
  if (!data.length) return <div>Data is empty.</div>;

  return <TodoList data={data} />;
};
```

Third, since the data arrives asynchronously from your backend, you want to show a loading indicator in case the data is pending in a request. Therefore you would get one more property, such as 'isLoading', to know about the loading state:

```javascript{2,6,8}
const fetchData = () => {
  return { data: null, isLoading: true };
};

const App = () => {
  const { data, isLoading } = fetchData();

  if (isLoading) return <div>Loading data.</div>;
  if (!data) return <div>No data loaded yet.</div>;
  if (!data.length) return <div>Data is empty.</div>;

  return <TodoList data={data} />;
};
```

Okay, I don't want to make this example more complex (e.g. adding another error state), but you get the gist that a lot of edge cases can add up in a single component for just this one use case.

While this is only adding up vertically for one component to cover every single edge case, imagine the identical opt-out conditional rendering for other components which perform this data fetching. Entering Higher-Order Components, because they can be used to shield away these edge cases as reusable features.

# React's Higher Order Components

Higher-Order Components (HOC) stem from the concept of Higher-Order Functions (HOF) which is called this way whenever it takes a function as argument or returns a function with its return statement. The latter is illustrated in the next example as shorthand version using a arrow function expression in JavaScript:

```javascript
const multiply = (multiplier) => (multiplicand) =>
  multiplicand * multiplier;

const product = multiply(3)(4);

console.log(product);
// 12
```

While it's totally fine to go with the none HOF version by just taking both arguments in just one function:

```javascript{1,4}
const multiply = (multiplier, multiplicand) =>
  multiplicand * multiplier;

const product = multiply(3, 4);

console.log(product);
// 12
```

One can see how using HOFs with function composition can lead to functional programming in JavaScript:

```javascript
const multiply = (multiplier) => (multiplicand) =>
  multiplicand * multiplier;

const subtract = (minuend) => (subtrahend) =>
  subtrahend - minuend;

const result = compose(
  subtraction(2),
  multiply(4),
)(3);

console.log(result);
// 10
```

Without going into further detail about HOFs in JavaScript here, let's walk through this whole concept when speaking about HOCs in React. There we will walk through normal functions, functions that take other functions (function components) as arguments, and functions that are composed into each other as you have seen in the last code snippet.

Higher-Order Components take any [React component](/react-component-types/) as *input* component and return an *enhanced version* of it as *output* component. In our example, the goal would be to shield away specifically all the conditional rendering edge cases right in between of parent component (App) and child component (TodoList), because none of them want to be bothered by them.

```javascript
Component => EnhancedComponent
```

A blueprint for a Higher-Order Component that is just taking a component as input and returning the *same* (read: none enhanced) component as *output* looks always as follows in actual code:

```javascript
const withHigherOrderComponent = (Component) => (props) =>
  <Component {...props} />;
```

When creating a Higher-Order Component, you will always start out with this version of it. A Higher-Order Component comes always with the prefix `with` (same as a React Hook comes always with the prefix `use`). Now you could call this blueprint of a HOC on any component without changing anything business related in the application:

```javascript{1-2,11,14,24}
const withHigherOrderComponent = (Component) => (props) =>
  <Component {...props} />;

const App = () => {
  const { data, isLoading } = fetchData();

  if (isLoading) return <div>Loading data.</div>;
  if (!data) return <div>No data loaded yet.</div>;
  if (!data.length) return <div>Data is empty.</div>;

  return <TodoList data={data} />;
};

const BaseTodoList = ({ data }) => {
  return (
    <ul>
      {data.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const TodoList = withHigherOrderComponent(BaseTodoList);
```

Understanding the last code snippet is the most important piece in this tutorial. The Higher-Order Component that we have created (here: `withHigherOrderComponent`) takes a component as argument. In our case, we have used the renamed `BaseTodoList` as input component and return a new enhanced `TodoList` component from it. What we get back is essentially a wrapped function component:

```javascript
// what we get back when we are calling the HOC
(props) =>
  <Component {...props} />;
```

Basically it's just another function component which passes through all of the [React props](/react-pass-props-to-component/) without touching them. At its core, nothing happens here, the original component just gets wrapped in another (arrow) function component which does not add any more business logic to it.

So the returned component is not enhanced at all. But this is about to change. Let's make this Higher-Order Component useful by adding all the conditional renderings as enhancement:

```javascript{1-7,12,25}
const withConditionalFeedback = (Component) => (props) => {
  if (props.isLoading) return <div>Loading data.</div>;
  if (!props.data) return <div>No data loaded yet.</div>;
  if (!props.data.length) return <div>Data is empty.</div>;

  return <Component {...props} />;
};

const App = () => {
  const { data, isLoading } = fetchData();

  return <TodoList data={data} isLoading={isLoading} />;
};

const BaseTodoList = ({ data }) => {
  return (
    <ul>
      {data.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const TodoList = withConditionalFeedback(BaseTodoList);
```

The last refactoring moved all implementation logic of the conditional rendering from the App component into the Higher-Order Component. It's the perfect place, because this way the App component nor its child component are bothered with this detail.

You can imagine how this is might not be the perfect fit for React Hooks. First, usually a React Hook does not return conditional JSX. And secondly, a React Hook is not guarding a component from the outside but rather adds implementation details in the inside.

That's everything you need to know about the fundamentals of HOCs. You can start using them or take it even further by adding configuration or composition to your Higher-Order Components.

# Configuration of Higher-Order Components

If a Higher-Order Component only takes a Component but nothing else as argument, everything that's related to the implementation details is decided by the Higher-Order Component itself. However, since we have functions in JavaScript, we can pass more information as arguments from the outside to gain more control as user of this Higher-Order Component.

```javascript
const withHigherOrderComponent = (Component, configuration) =>
  (props) => <Component {...props} />;
```

Only Higher-Order Components that need this kind of extra configuration from the outside should add it though. Keeping it friendlier for the functional programming paradigm (see composition of HOCs later), we opt-in the configuration via a separate function preemptively:

```javascript
const withHigherOrderComponent = (configuration) => (Component) =>
  (props) => <Component {...props} />;
```

This way, configuring a Higher-Order Component is essentially just the addition of another wrapping function around it. But why bother about it in the first place? Let's get back to our previous use case of rendering conditional feedback to our users. At the moment, the feedback is pretty generic (e.g. "Data is empty."). By configuring the HOC from the outside, we can decide which feedback to show to our users:

```javascript{1,6-7,14-16}
const withConditionalFeedback = (dataEmptyFeedback) => (Component)
  => (props) => {
    if (props.isLoading) return <div>Loading data.</div>;
    if (!props.data) return <div>No data loaded yet.</div>;

    if (!props.data.length)
      return <div>{dataEmptyFeedback || 'Data is empty.'}</div>;

    return <Component {...props} />;
  };

...

const TodoList = withConditionalFeedback('Todos are empty.')(
  BaseTodoList
);
```

See how we are still using a generic fallback in case `dataEmptyFeedback` is not provided from the outside. Let's continue by serving the other optional feedback messages too:

```javascript{2,6,9,12,19-23}
const withConditionalFeedback =
  ({ loadingFeedback, noDataFeedback, dataEmptyFeedback }) =>
  (Component) =>
  (props) => {
    if (props.isLoading)
      return <div>{loadingFeedback || 'Loading data.'}</div>;

    if (!props.data)
      return <div>{noDataFeedback || 'No data loaded yet.'}</div>;

    if (!props.data.length)
      return <div>{dataEmptyFeedback || 'Data is empty.'}</div>;

    return <Component {...props} />;
  };

...

const TodoList = withConditionalFeedback({
  loadingFeedback: 'Loading Todos.',
  noDataFeedback: 'No Todos loaded yet.',
  dataEmptyFeedback: 'Todos are empty.',
})(BaseTodoList);
```

In order to keep all of them opt-in, we are passing one configuration object instead of multiple arguments. This way we don't have to deal with passing `null` as argument if we want to opt-in the second argument but not the first one.

After all, whenever you want to be able to configure a Higher-Order Component from the outside, wrap the HOC in another function and provide one argument as configuration object to it. Then you have to call the Higher-Order Component from the outside twice. The first time for configuring it and the second time to enhance the actual component with the implementation details.

# Composition of Higher-Order Components

What's great about Higher-Order Components is that they are just functions which allow you to split functionality into multiple functions. Take our previous Higher-Order Component (without configuration yet) as example by splitting it up into multiple Higher-Order Components:

```javascript
const withLoadingFeedback = (Component) => (props) => {
  if (props.isLoading) return <div>Loading data.</div>;
  return <Component {...props} />;
};

const withNoDataFeedback = (Component) => (props) => {
  if (!props.data) return <div>No data loaded yet.</div>;
  return <Component {...props} />;
};

const withDataEmptyFeedback = (Component) => (props) => {
  if (!props.data.length) return <div>Data is empty.</div>;
  return <Component {...props} />;
};
```

Next you can apply each Higher-Order Component individually:

```javascript
const TodoList = withLoadingFeedback(
  withNoDataFeedback(
    withDataEmptyFeedback(BaseTodoList)
  )
);
```

There are two important caveats when applying multiple HOCs onto one component:

* First, order matters. If the priority of one (e.g. `withLoadingFeedback`) is higher than the other (e.g. `withNoDataFeedback`), it should be the outer most called HOC, because you want to render the loading indicator (if `isLoading` is `true`) rather than the "No data loaded yet."-feedback.
* And second, HOCs *can* depend on each other (which makes them often a pitfall). For example, the `withDataEmptyFeedback` relies on its `withNoDataFeedback` sibling for the `!data` null check. If the latter wouldn't be there, there would be a null pointer exception for the `!props.data.length` empty check. The `withLoadingFeedback` HOC is independent though.

These are some of the commonly known pitfalls, which I describe in my [React Hooks vs Higher-Order Components](/react-hooks-higher-order-components/) article, when using (multiple) HOCs.

Anyway, calling function within function seems verbose. Since we have functions though, we can make use of functional programming principles here by composing the functions onto each other in a more readable way:

```javascript{1-5,7-11}
const compose = (...fns) =>
  fns.reduceRight((prevFn, nextFn) =>
    (...args) => nextFn(prevFn(...args)),
    value => value
  );

const TodoList = compose(
  withLoadingFeedback,
  withNoDataFeedback,
  withDataEmptyFeedback
)(BaseTodoList);
```

Essentially the `compose()` function takes all the passed arguments (must be functions) as an array of functions and applies them from right to left onto the argument of the returned function. It's worth to note that the `compose()` function comes as function with many utility libraries (e.g. Lodash) too. However, the shown implementation suffices for this use case.

Last but not least, we want to bring back the configuration of out Higher-Order Components from before. First, adapt the atomic Higher-Order Components to use a configuration again, but this time just a string rather than an object, because we want to only configure it with a feedback message (which is not optional this time):

```javascript{1-2,6-7,11-12}
const withLoadingFeedback = (feedback) => (Component) => (props) => {
  if (props.isLoading) return <div>{feedback}</div>;
  return <Component {...props} />;
};

const withNoDataFeedback = (feedback) => (Component) => (props) => {
  if (!props.data) return <div>{feedback}</div>;
  return <Component {...props} />;
};

const withDataEmptyFeedback = (feedback) => (Component) => (props) => {
  if (!props.data.length) return <div>{feedback}</div>;
  return <Component {...props} />;
};
```

And second, provide this none optional configuration when calling the higher-order functions:

```javascript{2-4}
const TodoList = compose(
  withLoadingFeedback('Loading Todos.'),
  withNoDataFeedback('No Todos loaded yet.'),
  withDataEmptyFeedback('Todos are empty.')
)(BaseTodoList);
```

You can see how the composition of functions in addition to using an extra wrapping function for the configuration enables us as developers to follow functional programming principles here. If one of the higher-order components wouldn't take a configuration, it could still be used in this composition (just by not calling it like the other ones that take a configuration).

<Divider />

Hopefully this tutorial has helped you to learn the advanced concept of Higher-Order Components in React while making a clear stance of when to use it over React Hooks. We have seen the use case for HOCs in the context of conditional rendering, however, there are many more (e.g. props/state altering, `connect` from react-redux which connects a component to the global store).

Last but not least, I hope the guide gave you inspiration on how you can apply functional programming paradigms in React with Higher-Order Components by using higher-order functions for opt-in configurations, by keeping functions pure, and by composing functions onto each other.
