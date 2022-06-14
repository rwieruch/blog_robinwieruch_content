---
title: "React Element vs Component"
description: "What are React Elements, Components, and Instances? A step by step explanation for a better ..."
date: "2022-06-14T07:52:46+02:00"
categories: ["React"]
keywords: ["react element component"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

React Elements, Components, and Instances are different terms in React which work closely together. This guide will walk you through all three terms and explain them step by step. We will start off with the following code snippet as example:

```javascript
const App = () => {
  return <p>Hello React</p>;
};
```

A **React component** is literally the declaration of a component as we see it in the previous code snippet. In our case, it's a [function component](/react-function-component/) but it could be any [other kind](/react-component-types/) of React component (e.g. React Class Component) too.

In the case of a function component, it is declared as a JavaScript function which returns React's JSX. While more complex JSX is a mixture of HTML and JavaScript, here we are dealing with a simple example which returns just one HTML element with an inner content.

```text
(props) => JSX
```

We can extract a component from another component and render it the following way. Rendering a component happens whenever we use this component as a **React element** with angle brackets (e.g. `<Greeting />`) in another component:

```javascript
const Greeting = ({ text }) => {
  return <p>{text}</p>;
};

const App = () => {
  return <Greeting text="Hello React" />;
};
```

We can render a component as React element multiple times too. Whenever a component gets rendered as element, we create an **instance of this component**:

```javascript{8-9}
const Greeting = ({ text }) => {
  return <p>{text}</p>;
};

const App = () => {
  return (
    <>
      <Greeting text="Hello Instance 1 of Greeting" />
      <Greeting text="Hello Instance 2 of Greeting" />
    </>
  );
};
```

While a React component is declared once, it can be used multiple times as a React element in JSX. When it is used, it becomes an instance of the component and lives in React's component tree. Essentially that's the explanation of React components, element, and instance in a nutshell. However, in order to understand everything on a deeper level, we need to understand how React displays HTML with JSX.

# React Elements in Depth

Let's take one step back and start with a simple example again:

```javascript
const App = () => {
  return <p>Hello React</p>;
};
```

Whenever a React component gets called (rendering), React calls its `React.createElement()` method internally which returns the following object:

```javascript
console.log(App());

// {
//   $$typeof: Symbol(react.element)
//   "type": "p",
//   "key": null,
//   "ref": null,
//   "props": {
//     "children": "Hello React"
//   },
//   "_owner": null,
//   "_store": {}
// }
```

Focus your attention on the `type` and `props` properties of this object: While the `type` represents the actual HTML element, the `props` are all HTML attributes (plus the inner content, read: children) which are passed to this HTML element.

When looking at the paragraph HTML element from above, you can see that no attributes are passed to it. However, React treats `children` as pseudo HTML attribute whereas `children` represents everything that's rendered between the HTML tag. This fact becomes clearer when adding an attribute to the paragraph HTML element:

```javascript{2,14}
const App = () => {
  return <p className="danger">Hello React</p>;
};

console.log(App());

// {
//   $$typeof: Symbol(react.element)
//   "type": "p",
//   "key": null,
//   "ref": null,
//   "props": {
//     "children": "Hello React",
//     "className": "danger"
//   },
//   "_owner": null,
//   "_store": {}
// }
```

Essentially React translates all HTML attributes to React props in addition to adding the inner content as `children` property.

As mentioned, React's `createElement()` method is called internally. Therefore we could use it as replacement for the returned JSX (for the sake of learning). React's createElement method takes a type, props, and children as arguments. We provide the HTML tag `'p'` as first argument, the `props` as an object with the `className` as second argument, and the `children` as third argument:

```javascript{3-7}
const App = () => {
  // return <p className="danger">Hello React</p>;
  return React.createElement(
    'p',
    { className: 'danger' },
    'Hello React'
  );
};
```

See how the method call does not reflect 1:1 the returned object where the `children` are part of the `props` object. Instead, when calling React's `createElement()` method, the children are provided separately as argument. However, since `children` are treated as props, we could also pass them in the second argument:

```javascript{5-8}
const App = () => {
  // return <p className="danger">Hello React</p>;
  return React.createElement(
    'p',
    {
      className: 'danger',
      children: 'Hello React'
    }
  );
};
```

As default `children` are used as third argument though. The following example shows how a React component, which renders a HTML tree as JSX, translates into React element(s) with React's `createElement()` method. The important lines are highlighted:

```javascript{3-6,14,18,19,22,25-28,34,37-40,44}
const App = () => {
  return (
    <div className="container">
      <p className="danger">Hello React</p>
      <p className="info">You rock, React!</p>
    </div>
  );
};

console.log(App());

// {
//   $$typeof: Symbol(react.element)
//   "type": "div",
//   "key": null,
//   "ref": null,
//   "props": {
//     "className": "container",
//     "children": [
//       {
//         $$typeof: Symbol(react.element)
//         "type": "p",
//         "key": null,
//         "ref": null,
//         "props": {
//           "className": "danger",
//           "children": "Hello React"
//         },
//         "_owner": null,
//         "_store": {}
//       },
//       {
//         $$typeof: Symbol(react.element)
//         "type": "p",
//         "key": null,
//         "ref": null,
//         "props": {
//           className: "info",
//           children: "You rock, React!"
//         },
//         "_owner": null,
//         "_store": {}
//       }
//     ]
//   },
//   "_owner": null,
//   "_store": {}
// }
```

Again internally all JSX gets translated with React's `createElement()` method. While we return one element as object, it has multiple inner elements as children in this example. This becomes more obvious when calling the method for creating the element ourselves:

```javascript{9-26}
const App = () => {
  // return (
  //   <div className="container">
  //     <p className="danger">Hello React</p>
  //     <p className="info">You rock, React!</p>
  //   </div>
  // );

  return React.createElement(
    'div',
    {
      className: 'container',
    },
    [
      React.createElement(
        'p',
        { className: 'danger' },
        'Hello React'
      ),
      React.createElement(
        'p',
        { className: 'info' },
        'You rock, React!'
      ),
    ]
  );
};
```

Working with multiple components does not change this aggregation of HTML elements. Take the following code snippet where we extracted the paragraph HTML element as standalone React component:

```javascript{1-3,8-9}
const Text = ({ className, children }) => {
  return <p className={className}>{children}</p>;
};

const App = () => {
  return (
    <div className="container">
      <Text className="danger">Hello React</Text>
      <Text className="info">You rock, React!</Text>
    </div>
  );
};
```

If you traverse through the underlying HTML elements yourself, you will notice that it didn't change from before. Only in React land we have extracted it as reusable component. So calling React's `createElement()` method would look the same as before.

As a little extra learning here, we can also mix both worlds by using the extracted component in React's `createElement()` method call as first argument:

```javascript{20,25}
const Text = ({ className, children }) => {
  return <p className={className}>{children}</p>;
};

const App = () => {
  // return (
  //   <div>
  //     <Text className="danger">Hello React</Text>
  //     <Text className="info">You rock, React!</Text>
  //   </div>
  // );

  return React.createElement(
    'div',
    {
      className: 'container',
    },
    [
      React.createElement(
        Text,
        { className: 'danger' },
        'Hello React'
      ),
      React.createElement(
        Text,
        { className: 'info' },
        'You rock, React!'
      ),
    ]
  );
};
```

To make the example complete though, we would have to replace the child component's JSX with React's `createElement()` too:

```javascript{2}
const Text = ({ className, children }) => {
  return React.createElement('p', { className }, children);
};

const App = () => {
  return React.createElement(
    'div',
    {
      className: 'container',
    },
    [
      React.createElement(
        Text,
        { className: 'danger' },
        'Hello React'
      ),
      React.createElement(
        Text,
        { className: 'info' },
        'You rock, React!'
      ),
    ]
  );
};
```

This way, we are only working the React's `createElement()` method and not JSX anymore while still being able to extract components from each other. This is absolutely not recommended though and just illustrates how React creates elements under the hood from its JSX.

What we have learned in this section is that not only `<Text />` or `<Greeting />` are React elements, but also all other HTML elements in JSX which get translated in a React `createElement()` call. Essentially under the hood **we work with React elements to render the desired JSX**. Because we want to use declarative over imperative programming in React, we use JSX as the default and not React's `createElement()` method.

# Call a React Function Component

What's the actual difference between **calling a React function component** vs using it as React element? In the previous code snippets, we have called function components for returning their output from React's `createElement()` method. How does the output differ when using it as React element instead:

```javascript
const App = () => {
  return <p>Hello React</p>;
};

console.log(App());
// {
//   $$typeof: Symbol(react.element),
//   "type": "p",
//   "key": null,
//   "ref": null,
//   "props": {
//     "children": "Hello React"
//   },
//   "_owner": null,
//   "_store": {}
// }

console.log(<App />);
// {
//   $$typeof: Symbol(react.element),
//   "key": null,
//   "ref": null,
//   "props": {},
//   "type": () => {…},
//   "_owner": null,
//   "_store": {}
// }
```

The output slightly differs. When using a React component as element instead of calling it, we get a `type` function which encloses all the function components implementation details (e.g. children, hooks). The `props` are all the other HTML attributes that are passed to the component.

```javascript{1,7}
console.log(<App className="danger" />);
// {
//   $$typeof: Symbol(react.element),
//   "key": null,
//   "ref": null,
//   "props": {
       "className": "danger"
//   },
//   "type": () => {…},
//   "_owner": null,
//   "_store": {}
// }
```

What does it mean for a real React application that the `type` becomes a function and isn't a string anymore? Let's check this out with an example which demonstrates why we shouldn't call a React function component. First, we use a components as intended by using angle brackets:

```javascript{17}
const Counter = ({ initialCount }) => {
  const [count, setCount] = React.useState(initialCount);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>

      <div>{count}</div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Counter initialCount={42} />
    </div>
  );
};
```

With our learnings from before, we would assume that calling a function component instead of using it as React element should just work out of the box. Indeed it does as we can see next:

```javascript{4}
const App = () => {
  return (
    <div>
      {Counter({ initialCount: 42 })}
    </div>
  );
};
```

But let's explore why we should not call a React function component. We will use a [conditional rendering](/conditional-rendering-react/) for the rendered child component which can be toggled with a button click:

```javascript{2,6,8}
const App = () => {
  const [isVisible, setVisible] = React.useState(true);

  return (
    <div>
      <button onClick={() => setVisible(!isVisible)}>Toggle</button>

      {isVisible ? Counter({ initialCount: 42 }) : null}
    </div>
  );
};
```

When we toggle the child component to invisible, we get an error saying: *"Uncaught Error: Rendered fewer hooks than expected."* If you have worked with React Hooks before, you may know that this should be possible though, because the hook is allocated in the child component (here: Counter), which means that if this component unmounts, because it's conditionally rendered, the hook should be removed without any errors. Only if a mounted component changes its number of hooks (here: App), it should crash.

<ReadMore label="Conditional Hooks in React" link="/react-conditional-hooks/" />

But indeed it crashes because a mounted component (here: App) changes its number of hooks. Because we are calling the child component (here: Counter) as function, React does not treat it as an actual instance of a React component. Instead it just places all implementation details (e.g. hooks) of the child component directly in its parent component. Because the implementation of the hook disappears in a mounted component (here: App) due to the conditional rendering, the React application crashes.

Essentially the current code is the same as the following, because the child component is not treated as a standalone instance of a component:

```javascript{9-20}
const App = () => {
  const [isVisible, setVisible] = React.useState(true);

  return (
    <div>
      <button onClick={() => setVisible(!isVisible)}>Toggle</button>

      {isVisible
        ? (() => {
            const [count, setCount] = React.useState(42);

            return (
              <div>
                <button onClick={() => setCount(count + 1)}>+</button>
                <button onClick={() => setCount(count - 1)}>-</button>

                <div>{count}</div>
              </div>
            );
          })()
        : null}
    </div>
  );
};
```

This violates the rules of hooks, because a React Hook cannot be used conditionally in a component.

<ReadMore label="Learn React Hooks" link="/react-hooks/" />

We can fix this error by telling React about this React component which in return is treated as an **actual instance of a component**. Then it can allocate the implementation details within this instance of the component. When the conditional rendering kicks in, the component just unmounts and with it its implementation details (e.g. hooks):

```javascript{8}
const App = () => {
  const [isVisible, setVisible] = React.useState(true);

  return (
    <div>
      <button onClick={() => setVisible(!isVisible)}>Toggle</button>

      {isVisible ? <Counter initialCount={42} /> : null}
    </div>
  );
};
```

Here you can see why instances of React components make sense. Each instance allocates its own implementation details without leaking it to other components. Therefore we are using React elements instead of calling a function component in JSX. In conclusion, a function that returns JSX might not be a component. It depends on how it is used.

# React Elements vs Components

Let's summarize React Elements and Components: While a React Component is the one time declaration of a component, it can be used once or multiple times as React Element in JSX. In JSX it can be used with angle brackets, however, under the hood React's `createElement` method kicks in to create React elements as JavaScript object for each HTML element.

```javascript{2,7,10,15-16,27-29}
const Text = ({ children }) => {
  console.log('I am calling as an instance of Text');

  return <p>{children}</p>;
};

console.log('I am a component', Text);

const App = () => {
  console.log('I am calling as an instance of App');

  const paragraphOne = <p>You rock, React!</p>;
  const paragraphTwo = <Text>Bye!</Text>;

  console.log('I am an element:', paragraphOne);
  console.log('I am an element too:', paragraphTwo);

  return (
    <div>
      <p>Hello React</p>
      {paragraphOne}
      {paragraphTwo}
    </div>
  );
};

console.log('I am a component', App);
console.log('I am an element', <App />);
console.log('I am an element', <p>too</p>);
```
