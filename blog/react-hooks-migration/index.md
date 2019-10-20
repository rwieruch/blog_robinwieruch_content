---
title: "React Hooks: Migration from Class to Function Components"
description: "React Hooks change how we will write React applications in the future. This tutorial shows how to convert from React class components to React Function components with React Hooks ..."
date: "2019-03-26T07:50:46+02:00"
categories: ["React"]
keywords: ["react hooks", "react hooks migration", "react hooks class component", "react hooks function component"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

React Hooks were introduced to React to make state and side-effects available in React Function Components. Before it was only possible to have these in React Class Components; but since [React's way of implementing Components has changed over the years](https://www.robinwieruch.de/react-component-types), we have the class component's features available with React Hooks in React Function Components now.

This tutorial shows a migration path on how to write React Class Components as React Function Components with [React Hooks](https://www.robinwieruch.de/react-hooks). Therefore we will go into examples on how to convert both state management and side-effects that are used in a Class Component to be used in a Function Component.

It isn't my intention to encourage developers to rewrite all their React Class Components to React Function Components with Hooks. Rather the tutorial should show you how to implement a Class Component as Function Component with the same features. From there, you can decide yourself to write all future components as Function Components with Hooks.

# Component State with React's useState Hook

React Class Components were the go-to solution when implementing stateful components. It's possible to allocate initial state in a constructor, write state with the given `this.setState()` method -- which often happened in a class method --, and read state with `this.state` from the component instance.

```javascript{5,6,7,11,20,25}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>Hello React ES6 Class Component!</h1>

        <input
          value={this.state.value}
          type="text"
          onChange={this.onChange}
        />

        <p>{this.state.value}</p>
      </div>
    );
  }
}
```

A Function Component is able to do the same now by using a React Hook called useState. The hook let's us allocate initial state (e.g. an empty string) and returns an array which has the state and a function to set the state. By using JavaScript Array Destructuring, we can conveniently extract the returned values from the hook in one line of code:

```javascript{2,4,10,12}
const App = () => {
  const [value, setValue] = React.useState('');

  const onChange = event => setValue(event.target.value);

  return (
    <div>
      <h1>Hello React Function Component!</h1>

      <input value={value} type="text" onChange={onChange} />

      <p>{value}</p>
    </div>
  );
};
```

By nature React Function Components are way more lightweight than React Class Components. You don't need to deal with a constructor or class methods anymore, because the React Hook for state management let's you initialize component state and the other functions can be defined inline in the Function Component (e.g. `onChange()`).

If the next React Component you are going to implement has to manage state, don't default to a React Class Component, but give React Function Components with React Hooks a shot.

# Component Side-Effects with React's useEffect Hook

Let's evolve the previous shown example for using a side-effect. First we will introduce the side-effect to our React Class Component and then show how it can be implemented in a React Function Component with Hooks. In our case, the side-effect will be demonstrated by introducing the usage of the browser's local storage to our component:

```javascript{6,10,11,12}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: localStorage.getItem('myValueInLocalStorage') || '',
    };
  }

  componentDidUpdate() {
    localStorage.setItem('myValueInLocalStorage', this.state.value);
  }

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>Hello React ES6 Class Component!</h1>

        <input
          value={this.state.value}
          type="text"
          onChange={this.onChange}
        />

        <p>{this.state.value}</p>
      </div>
    );
  }
}
```

Now, every time the component updates (e.g. when state changes), the value from the state -- initially coming from the changed value from the input field -- is stored in the browser's local storage. When the application is started again by refreshing the browser, the constructor of the component makes sure to take the initial state from the local storage.

Since this component is using the local storage, it's output from the render method is not predictable from only knowing about the [props](https://www.robinwieruch.de/react-pass-props-to-component/), because a side-effect is involved to get information from somewhere else than the input (props) of the component.

Let's see how the identical feature -- synchronizing the value from the input field with the local storage -- can be implemented with a Function Component using React's useEffect Hook:

```javascript{3,6,7,8}
const App = () => {
  const [value, setValue] = React.useState(
    localStorage.getItem('myValueInLocalStorage') || '',
  );

  React.useEffect(() => {
    localStorage.setItem('myValueInLocalStorage', value);
  }, [value]);

  const onChange = event => setValue(event.target.value);

  return (
    <div>
      <h1>Hello React Function Component!</h1>

      <input value={value} type="text" onChange={onChange} />

      <p>{value}</p>
    </div>
  );
};
```

React's useEffect Hook runs every time one of the values in the passed array (second argument) got changed. In our case, every time the value from the input field changes, we update the local storage with it. Also the value from the local storage is used initially to set the initial value for the input field.

Again, by nature the Function Component is way more lightweight, because it can use state and side-effects within its function body. Also the usage of the local storage moved closer in the function's body rather than having it in different class methods as before.

If the next React Component you are going to implement has to have side-effects -- like calling the local storage of the browser --, don't default to a React Class Component, but give React Function Components with React Hooks a shot.

# Abstraction with Custom React Hooks

All React Hooks we have seen so far are built-in Hooks provided by React. However, the ability to combine React Hooks to new custom React Hooks, that are designed to solve a problem for you or others, makes them the perfect fit for reusable component logic. In our case, we can extract all logic for the state and the side-effect with the local storage to a custom hook:

```javascript{1,2,3,4,5,6,7,8,9,10,11,14,15,16}
const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || '',
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

const App = () => {
  const [value, setValue] = useStateWithLocalStorage(
    'myValueInLocalStorage',
  );

  const onChange = event => setValue(event.target.value);

  return (
    <div>
      <h1>Hello React Function Component!</h1>

      <input value={value} type="text" onChange={onChange} />

      <p>{value}</p>
    </div>
  );
};
```

The `useStateWithLocalStorage` Hook allows us to have state management, but also to synchronize the state with the browser's local storage.  Every time the component mounts, the state from the local storage is used in case the local storage has a value stored in the first place.

Custom Hooks put reusable logic perfectly together in one function. Whereas all this logic was scattered around in the previously seen React Class Component, React Hooks put all of these pieces together and encapsulate them. It would have been possible to add the same abstraction layer with a Higher-Order Component -- demonstrated over [here](https://github.com/the-road-to-learn-react/react-component-types/blob/master/src/App.classComponentWithHoc.js) --, but the logic is still scattered around in the Higher-Order Component then.

<Divider />

Most of the demonstrated examples can be explored over [here](https://github.com/the-road-to-learn-react/react-component-types). I highly recommend to read through the different React Component Types from the project to get a better understanding on how React evolved from a historical perspective.

The tutorial has shown you how to write React Class Components as React Function Components by using Hooks for state management and side-effects. The next time you implement a component with state or a side-effect, check whether you can implement it with a React Hook in a React Function Component. React offers all the tools to do it. For instance, [fetching data with a React Hook in a Function Component](https://www.robinwieruch.de/react-hooks-fetch-data/) is a good exercise to familiarize yourself with the concept of hooks.
