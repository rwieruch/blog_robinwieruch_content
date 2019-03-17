+++
title = "React Component Types: A complete Overview"
description = "There a various React Component Types that make it difficult for React beginners to get started with React. This tutorial goes through each React Component Type by example ..."
date = "2019-03-12T07:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react component types", "react component patterns"]
news_keywords = ["react component types", "react component patterns"]
hashtag = "#ReactJs"
card = "img/posts/react-component-types/banner_640.jpg"
banner = "img/posts/react-component-types/banner.jpg"
contribute = "react-component-types.md"
headline = "React Component Types: A complete Overview"

summary = "There a various React Component Types that make it difficult for React beginners to get started with React. This tutorial goes through each React Component Type by example."
+++

{{% sponsorship %}}

{{% pin_it_image "react firebase" "img/posts/react-component-types/banner.jpg" "is-src-set" %}}

Even though React didn't introduce a lot of breaking changes since it has been released 2013, different React Component Types emerged over time. A few of these component types and component patterns are still used nowadays -- they are the status quo of how React applications are built -- whereas several of them are only seen in older applications/tutorials.

In this guide, I want to give React beginners an historical overview of different React Components and React Patterns. The goal is to give clarity about what React Component Types developers have at their disposal, which are still used in modern React applications, and why some of them are not used anymore. In the end, you should be able to identify different React Components from legacy tutorials/applications and be able to write modern React component with confidence yourself.

{{% chapter_header "React createClass Components" "react-createclass-component" %}}

Everything started out with **React's createClass Components**. The `createClass` method provided developers with a factory method to create React class components without using a JavaScript class. It was the status quo for creating React components prior JavaScript ES6, because in JavaScript ES5 there was no class syntax available:

{{% chapter_header "Table of Contents" "toc" %}}

* [React createClass Components](react-createclass-component)
  * [React Mixins](react-mixins)
* [React Class Components](react-class-components)
  * [React Higher-Order Components](react-higher-order-components)
* [React Function Components](react-function-components)

{{< highlight javascript >}}
var App = React.createClass({
  getInitialState: function() {
    return {
      value: '',
    };
  },

  onChange: function(event) {
    this.setState({ value: event.target.value });
  },

  render: function() {
    return (
      <div>
        <h1>Hello React "createClass" Component!</h1>

        <input
          value={this.state.value}
          type="text"
          onChange={this.onChange}
        />

        <p>{this.state.value}</p>
      </div>
    );
  },
});
{{< /highlight >}}

The `createClass()` factory method receives an object which defines methods for the React component. Whereas the `getInitialState()` function is used to set an initial state for the React component, the mandatory `render()` method is there to display the output with JSX. Additional "methods" (e.g. `onChange()`) are added by passing more functions to the object.

Lifecycle methods for side-effects are available as well. For instance, in order to write every time the value from the input field to the browser's local storage, we could make use of the `componentDidUpdate()` lifecycle method by passing a function to the object with an object key named after a React lifecycle method. In addition, the value can be read from the local storage when the component receives its initial state:

{{< highlight javascript "hl_lines=4 8 9 10" >}}
var App = React.createClass({
  getInitialState: function() {
    return {
      value: localStorage.getItem('myValueInLocalStorage') || '',
    };
  },

  componentDidUpdate: function() {
    localStorage.setItem('myValueInLocalStorage', this.state.value);
  },

  onChange: function(event) {
    this.setState({ value: event.target.value });
  },

  render: function() {
    return (
      <div>
        <h1>Hello React "createClass" Component!</h1>

        <input
          value={this.state.value}
          type="text"
          onChange={this.onChange}
        />

        <p>{this.state.value}</p>
      </div>
    );
  },
});
{{< /highlight >}}

Whenever we reload/refresh the browser, the initial state from the local storage that we have typed previously into the input field should show up when the component mounts for the first time.

*Note: React's createClass method is no longer available in the React core package. If you want to try it, you have to install an additional node package: `npm install create-react-class`.*

After all, you should only use React's createClass method, if you have no JavaScript ES6 or beyond available in your project. Otherwise you should avoid using it. You can read more about {{% a_blank "React's createClass Components over here." "https://reactjs.org/docs/react-without-es6.html" %}}

{{% sub_chapter_header "React Mixins" "react-mixins" %}}

A **React Mixin** got introduced as React's first advanced pattern for reusable component logic. With a Mixin, it's possible to extract logic from a React component as standalone object. When using a Mixin in a component, all features from the Mixin are introduced to the component:

{{< highlight javascript "hl_lines=1 2 3 4 5 6 7 8 9 10 11 14 17" >}}
var localStorageMixin = {
  getInitialState: function() {
    return {
      value: localStorage.getItem('myValueInLocalStorage') || '',
    };
  },

  setLocalStorage: function(value) {
    localStorage.setItem('myValueInLocalStorage', value);
  },
};

var App = React.createClass({
  mixins: [localStorageMixin],

  componentDidUpdate: function() {
    this.setLocalStorage(this.state.value);
  },

  onChange: function(event) {
    this.setState({ value: event.target.value });
  },

  render: function() {
    return (
      <div>
        <h1>Hello React "createClass" Component with Mixin!</h1>

        <input
          value={this.state.value}
          type="text"
          onChange={this.onChange}
        />

        <p>{this.state.value}</p>
      </div>
    );
  },
});
{{< /highlight >}}

In this case, the Mixin provides the initial state of the component which is read from the local storage and extends the component with a `setLocalStorage()` method which is later used in the actual component. In order to make the Mixin more flexible, we can use a function that returns an object as well:

{{< highlight javascript "hl_lines=1 2 4 8 14" >}}
function getLocalStorageMixin(localStorageKey) {
  return {
    getInitialState: function() {
      return { value: localStorage.getItem(localStorageKey) || '' };
    },

    setLocalStorage: function(value) {
      localStorage.setItem(localStorageKey, value);
    },
  };
}

var App = React.createClass({
  mixins: [getLocalStorageMixin('myValueInLocalStorage')],

  ...
});
{{< /highlight >}}

However, Mixins are not used anymore in modern React applications, because they come with several drawbacks. {{% a_blank "You can read more about Mixins and why Mixins are dead over here." "https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html" %}}

{{% chapter_header "React Class Components" "react-class-components" %}}

**React Class Components** were introduced with JavaScript ES6, because JS classes were made available to the language. Sometimes they are called **React ES6 class components** as well. Having [at least JavaScript ES6 at your disposal](https://www.robinwieruch.de/javascript-fundamentals-react-requirements/), you no longer had to use React's createClass method. Finally classes come with JS itself:

{{< highlight javascript >}}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

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
{{< /highlight >}}

A React Component written with a JavaScript class comes with methods like the class constructor -- which is primarily used in React to set initial state or to bind methods -- and the mandatory render method to return JSX as output. All the internal React Component logic comes from the `extends React.Component` via object-oriented inheritance that is used in the class component. However, it isn't recommended to use the concept of inheritance for more than that. Instead, it's recommended to use [composition over inheritance](https://www.robinwieruch.de/react-component-composition/).

*Note: An {{% a_blank "alternative syntax" "https://github.com/the-road-to-learn-react/react-alternative-class-component-syntax" %}} can be used for a JavaScript class used for React components, for instance, to autobind methods to React components by using JavaScript ES6 arrow functions:*

{{< highlight javascript "hl_lines=10" >}}
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
{{< /highlight >}}

React class components offer several lifecycle methods for the mounting, updating, and unmounting of the component as well. In case of our local storage example from before, we can introduce it as side-effect with lifecycle methods -- to save the latest value from the input field to the local storage -- and in our constructor for setting the initial state from the local storage:

{{< highlight javascript "hl_lines=6 10 11 12" >}}
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
{{< /highlight >}}

By using `this.state`, `this.setState()`, and lifecycle methods, state management and side-effects can be used side by side in a React class component. React class components are still actively used, even though React Function Components, which are shown in this article later, are more actively used than ever in modern React applications, because they are not anymore behind React Class Components feature-wise.

{{% sub_chapter_header "React Higher-Order Components" "react-higher-order-components" %}}

React Higher-Order Components (HOCs), a popular advanced React pattern, are an alternative for React Mixins to deploy reusable logic across React components. If you haven't heard about HOCs, you can read more about them in detail in my other tutorial: [Higher-Order Components](https://www.robinwieruch.de/gentle-introduction-higher-order-components/). The shortest explanation for a Higher-Order Component is that it is a component which takes a component as input and returns the component as output but with extended functionalities. Let's revisit the example with the local storage and how the functionality can be extracted into a reusable Higher-Order Component:

{{< highlight javascript "hl_lines=1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 30 34 60" >}}
const withLocalStorage = localStorageKey => Component =>
  class WithLocalStorage extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        [localStorageKey]: localStorage.getItem(localStorageKey),
      };
    }

    setLocalStorage = value => {
      localStorage.setItem(localStorageKey, value);
    };

    render() {
      return (
        <Component
          {...this.state}
          {...this.props}
          setLocalStorage={this.setLocalStorage}
        />
      );
    }
  };

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: this.props['myValueInLocalStorage'] || '' };
  }

  componentDidUpdate() {
    this.props.setLocalStorage(this.state.value);
  }

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>
          Hello React ES6 Class Component with Higher-Order Component!
        </h1>

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

const AppWithLocalStorage = withLocalStorage('myValueInLocalStorage')(App);
{{< /highlight >}}

Another popular advanced React pattern are [React Render Prop Components](https://www.robinwieruch.de/react-render-props-pattern/), which are often used as alternative to React Higher-Order Components. This kind of abstraction isn't shown here though, but I highly recommend you to check out the linked tutorial which teaches more about them.

Both, **React's Higher-Order Components** and **React's Render Prop Components** are actively used in React applications, even though React Function Components **with React Hooks** -- shown in the next section of this tutorial -- may be the better abstraction layer for React components. However, HOCs and Render Props are used for Function Components as well.

{{% chapter_header "React Function Components" "react-function-components" %}}

**React Function Components** are the equivalent of React Class Components but expressed as functions instead of classes. In the past, it wasn't possible to use state or side-effects in Function Components -- that's why they were called **Functional Stateless Components** -- but that's not the case anymore with [React Hooks](https://www.robinwieruch.de/react-hooks/) which rebranded them to Function Components.

React Hooks bring state and side-effects to React Function Components. React comes with a variety of built-in hooks, but also the ability to create custom hooks for yourself or others. Let's see how the previous React Class Component can be used as a React Function Component:

{{< highlight javascript >}}
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
{{< /highlight >}}

The previous code only shows the Function Component with the input field. Since component state is needed to capture the state of the input field's value, we are using the built-in React useState Hook.

React Hooks were also introduced to bring side-effects to Function Components. In general, the built-in React useEffect Hook is used to execute a function every time props or state of the component are changed:

{{< highlight javascript "hl_lines=3 6 7 8" >}}
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
{{< /highlight >}}

The previous code shows a `useEffect` hook which is executed every time the value of the input field from the state changes. When the function given as side-effect to the useEffect hook gets executed, it updates the local storage's value with the recent value from the state. Also the initial state for the Function Component with the useState hook is read from the local storage.

Last but not least, we can extract both hooks as one encapsulated **Custom Hook** which makes sure to synchronize the component state with the local storage. In the end, it returns the necessary value and setter function to be used in the Function Component:

{{< highlight javascript "hl_lines=1 2 3 4 5 6 7 8 9 10 11 14 15 16" >}}
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
{{< /highlight >}}

Since it is extracted from the Function Component, it can be used for any other component to share reusable business logic. It is an abstraction and advanced pattern in React equivalent to Mixins, Higher-Order Components, and Render Prop Components. However, it may be worth to mention that React Function Components can be enhanced by React's Higher-Order Components and Render Prop Components as well.

React Function Components with Hooks and React Class Components are the status quo for writing modern React applications. However, I strongly believe that React Function Components with Hooks will replace React Class Components in the future. From there, React Class Components may be only seen in older React applications/tutorials again similar to React createClass Components and React Mixins. The same applies to Higher-Order Components and Render Prop Components, which may be replaced by React Hooks to share reusable logic.

<hr class="section-divider">

All React Components share the common sense of how to use [React Props](https://www.robinwieruch.de/react-pass-props-to-component/), because they are just used to pass information down the component tree. However, the usage of state and side-effects varies for React Class Components and React Function Components with lifecycle methods and hooks.

This guide has shown you all the different Types of React Components, how they are used, and how they are put into a historical context. All examples from the tutorial can be seen and tried out over {{% a_blank "here" "https://github.com/the-road-to-learn-react/react-component-types" %}}. In the end it's perfectly fine to use React Class Components, Function Components with Hooks, advanced concepts like Higher-Order Components and React Render Prop Components. However, it's good to know for older React applications/tutorials that there were other React Components and Patterns used in the past as well.
