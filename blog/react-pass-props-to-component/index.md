---
title: "How to pass props to components in React"
description: "Everything you need to know about props in React. How to pass props to components, how to set default props, how to differentiate between props and state, and how to pass components or functions as props, ..."
date: "2018-07-29T13:50:46+02:00"
categories: ["React", "JavaScript"]
keywords: ["react pass props to component", "react props vs state", "react props explained", "react props example", "react props best practices"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Everyone who is new to React is confused by these so called props, because they are never mentioned in any other web framework, and rarely explained on their own. They are one of the early things you will learn in React after initially grasping React's JSX syntax. Basically props are used to pass data from component to component. In this guide, I want to explain React props in greater detail. First, it explains the *"What are props in React?" question*, followed by different props examples to see how they can be used in React.

# Table of Contents

* [What are Props in React?](#react-props)
* [React Props vs. State](#react-props-vs-state)
* [How to pass Props from child to parent Component?](#react-props-child-parent)
* [Props can be state, props, or derived properties](#react-props-state-derived-properties)
* [React Props and Code Style](#react-props-code-style)
* [React ...props syntax](#react-props-syntax-spread-rest)
* [React props with default value](#react-props-default-value)
* [React's children prop](#react-props-children)
* [How to pass Components as Props?](#react-components-as-props)
* [Children as a Function](#react-children-as-a-function)
* [React's Context API](#react-context-api)
* [How to set props to state?](#react-props-to-state)
* [React Props Pitfalls](#react-props-pitfalls)

# What are Props in React?

Normally you start out with React's JSX syntax for rendering something to the browser when learning about React. Basically JSX mixes HTML with JavaScript to get the best of both worlds.

```javascript{5,6,7,8,9,10,11}
import React, { Component } from 'react';

class App extends Component {
  render() {
    const greeting = 'Welcome to React';

    return (
      <div>
        <h1>{greeting}</h1>
      </div>
    );
  }
}

export default App;
```

Pretty soon you will split out your first React component.

```javascript{7,13,14,15,16,17,18,19}
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <Greeting />
      </div>
    );
  }
}

class Greeting extends Component {
  render() {
    const greeting = 'Welcome to React';

    return <h1>{greeting}</h1>;
  }
}

export default App;
```

A common question followed by this act: **how to pass the data as params (parameters) from one React component to another component?** That's because you don't want to have a component rendering static data, but pass dynamic data to your component instead. That's where React's props come into play. You can pass data in React by defining custom HTML attributes to which you assign your data with JSX syntax. So don't forget the curly braces.

```javascript{9,15,16,17,18,19}
import React, { Component } from 'react';

class App extends Component {
  render() {
    const greeting = 'Welcome to React';

    return (
      <div>
        <Greeting greeting={greeting} />
      </div>
    );
  }
}

class Greeting extends Component {
  render() {
    return <h1>{this.props.greeting}</h1>;
  }
}

export default App;
```

As you can see, the props are received in React's class component via the `this` instance of the class. A common question which comes up then: [Why aren't the props received in the render methods signature?](https://github.com/facebook/react/issues/1387) It would be similar to functional stateless components then. As for now, the team behind React considered it, but didn't change the API for React class components yet. Maybe it will be changed at some point.

<ReadMore label="React class components and functional stateless components" link="https://www.robinwieruch.de/javascript-fundamentals-react-requirements" />

In a functional stateless component, the props are received in the function signature as arguments:

```javascript{15}
import React, { Component } from 'react';

class App extends Component {
  render() {
    const greeting = 'Welcome to React';

    return (
      <div>
        <Greeting greeting={greeting} />
      </div>
    );
  }
}

const Greeting = props => <h1>{props.greeting}</h1>;

export default App;
```

Since you will find always the props in the function signature, which most of the time is only the container object of your data, but not the data to be used, you can [destructure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) the props early in the function signature. One would call it React props destructuring:

```javascript
const Greeting = ({ greeting }) => <h1>{greeting}</h1>;
```

As you have seen, props enable you to pass variables from one to another component down the component tree. In the previous example, it was only a string variable. But props can be anything from integers over objects to arrays. Even React components, but you will learn about this later. You can also define the props inline. In case of strings, you can pass props inside double quotes (or single quotes) too.

```javascript{7}
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <Greeting greeting="Welcome to React" />
      </div>
    );
  }
}

const Greeting = ({ greeting }) => <h1>{greeting}</h1>;

export default App;
```

But you can also pass other data structures with inline props. In case of objects, it can be confusing for React beginners, because you have two curly braces: one for the JSX and one for the object. That's especially confusing when passing a style object to a style attribute in React the first time.

```javascript{7,13}
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <Greeting greeting={{ text: 'Welcome to React' }} />
      </div>
    );
  }
}

const Greeting = ({ greeting }) => <h1>{greeting.text}</h1>;

export default App;
```

Note: It is important to note that is could lead to performance issues, because every time the component renders a new object is created again. But it can be a premature optimization as well when learning only about React.

Basically that's how props are passed to React components. As you may have noticed, props are only passed from top to bottom in React's component tree. There is no way to pass props up to a parent component. We will revisit this issue later in this article. In addition, it's important to know that React's props are read only. There is **no way in React to set props** (even though it was possible in the past). After all, props are only used to pass data from one component to another component React, but only from parent to child components down the component tree.

# React Props vs. State

Passing only props from component to component doesn't make the component interactive, because nothing is there to change the props. Props are read-only. That's the time when [React State](https://www.robinwieruch.de/react-state) comes into play which can be changed. The state is co-located to a React component.

```javascript{4,5,6,7,8,9,10,12,13,14,19,21,22,23}
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: true,
    };
  }

  toggleShow = () => {
    this.setState(state => ({ isShow: !state.isShow }));
  };

  render() {
    return (
      <div>
        {this.state.isShow ? <Greeting greeting={greeting} /> : null}

        <button onClick={this.toggleShow} type="button">
          Toggle Show
        </button>
      </div>
    );
  }
}

const Greeting = ({ greeting }) => <h1>{greeting}</h1>;

export default App;
```

In this case, the code uses a ternary operator to either show the greeting or not. You can read up [this tutorial about all the conditional renderings in React](https://www.robinwieruch.de/conditional-rendering-react/). The state makes the React components interactive. You can **read and write state**, whereas **props are read-only**. Once the state changes, the component renders again. In addition, state can be passed as props to child components too.

```javascript{21,31,32}
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: true,
    };
  }

  toggleShow = () => {
    this.setState(state => ({ isShow: !state.isShow }));
  };

  render() {
    const greeting = 'Welcome to React';

    return (
      <div>
        <Greeting greeting={greeting} isShow={this.state.isShow} />

        <button onClick={this.toggleShow} type="button">
          Toggle Show
        </button>
      </div>
    );
  }
}

const Greeting = ({ greeting, isShow }) =>
  isShow ? <h1>{greeting}</h1> : null;

export default App;
```

The child component doesn't know whether the incoming props are state or props from the parent component. The component just consumes the data as props. And the child component re-renders too once the incoming props changed.

In conclusion, every time the props or state change, the rendering mechanism of the affected component is triggered. That's how the whole component tree becomes interactive, because after all, state is passed as props to other components, and once the state in a component changes, which may be passed as props to the child components, all affected components render again.

# How to pass Props from child to parent Component?

This a common question for React beginners and the answer for it is brief: there is **no way to pass props from a child to a parent component**. Let's revisit the previous example, but this time with an additional Button component for the toggle mechanism.

```javascript{9,11,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37}
import React, { Component } from 'react';

class App extends Component {
  render() {
    const greeting = 'Welcome to React';

    return (
      <div>
        {isShow ? <Greeting greeting={greeting} /> : null}

        <Button />
      </div>
    );
  }
}

class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: true,
    };
  }

  toggleShow = () => {
    this.setState(state => ({ isShow: !state.isShow }));
  };

  render() {
    return (
      <button onClick={this.toggleShow} type="button">
        Toggle Show
      </button>
    );
  }
}

const Greeting = ({ greeting }) => <h1>{greeting}</h1>;

export default App;
```

So far, the Button component manages its own co-located state. Since the Button component manages the `isShow` property, there is no way to pass it up as props to the App component. The App component needs the `isShow` property though for the conditional rendering of the Greeting component. At the moment, the application wouldn't work this way. That's the point when you have to **lift state** up for making it accessible for other components (in this case the App component itself) as state (or as passed props for other components).

```javascript{4,5,6,7,8,9,10,11,12,13,14,21,23,29,30,31,32,33}
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: true,
    };
  }

  toggleShow = () => {
    this.setState(state => ({ isShow: !state.isShow }));
  };

  render() {
    const greeting = 'Welcome to React';

    return (
      <div>
        {this.state.isShow ? <Greeting greeting={greeting} /> : null}

        <Button onClick={this.toggleShow} />
      </div>
    );
  }
}

const Button = ({ onClick }) => (
  <button onClick={onClick} type="button">
    Toggle Show
  </button>
);

const Greeting = ({ greeting }) => <h1>{greeting}</h1>;

export default App;
```

The important ingredient is that the App component **passes down a function in the props** to the Button component now. The function is used for the click handler in the Button component. However, the Button doesn't know the business logic of the function, only that it has to trigger the function when the button gets clicked. Above in the App component, the state is changed when the passed function is called, and thus all affected components, which use the changed state or consume it as props, render again. Now you can even pass the state as props to the Greeting component.

```javascript{21,35,36}
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: true,
    };
  }

  toggleShow = () => {
    this.setState(state => ({ isShow: !state.isShow }));
  };

  render() {
    const greeting = 'Welcome to React';

    return (
      <div>
        <Greeting greeting={greeting} isShow={this.state.isShow} />

        <Button onClick={this.toggleShow} />
      </div>
    );
  }
}

const Button = ({ onClick }) => (
  <button onClick={onClick} type="button">
    Toggle Show
  </button>
);

const Greeting = ({ greeting, isShow }) =>
  isShow ? <h1>{greeting}</h1> : null;

export default App;
```

As said, there is no way passing props from a child to a parent component. But **you can always pass functions from parent to child components**, whereas the child components make use of these functions and the functions may change the state in a parent component above. Once the state has changed, the state is passed down as props again. All affected components will render again. For instance, the same pattern applies for having page components in your React application. Once you want to pass data from page to another in React, you can lift the state up to the component (usually App component) which has all page components as its child components. Then the data is managed as state in the top level component but still can be distributed to all child components.

# Props can be state, props, or derived properties

Regardless of passing props or state to a component, the component just receives the data as props. It doesn't differentiate between props or state. Everything incoming is props, everything managed by the component itself is state. However, there is one other thing apart from props and state which is sometimes mentioned: **derived props** (**derived properties**). Basically it is the same as props, but only a variation of the props before they are passed to the next component.

```javascript{5,6,7,8,12,20,24,25}
import React, { Component } from 'react';

class App extends Component {
  render() {
    const greeting = {
      subject: 'React',
      description: 'Your component library for ...',
    };

    return (
      <div>
        <Greeting greeting={greeting} />
      </div>
    );
  }
}

const Greeting = ({ greeting }) =>
  <div>
    <Title title={`Welcome to ${greeting.subject}`} />
    <Description description={greeting.description} />
  </div>

const Title = ({ title }) =>
  <h1>{title}</h1>;

const Description = ({ description }) =>
  <p>{description}</p>;

export default App;
```

In this scenario, the title in the Title component is a derived property from props plus a string interpolation in the Greeting component. This is the most basic example for it, but you can imagine how state or any other business logic could be used to change the passed props on the way down the component tree. Later you will learn about derived state too.

# React Props and Code Style

Passing lots of props down to a component can have a terrible effect on the code style:

```javascript{13}
import React, { Component } from 'react';
import logo from './logo.svg'

class App extends Component {
  render() {
    const greeting = {
      subject: 'React',
      description: 'Your component library for ...',
    };

    return (
      <div>
        <Greeting subject={greeting.subject} description={greeting.description} logo={logo} />
      </div>
    );
  }
}

const Greeting = ({ subject, description, logo }) =>
  ...
```

So how to overcome this bad code style which is hard to read and maintain? One way would be passing the props with multiple indented lines to a component. The destructuring could follow the same rules:

```javascript{14,15,16,24,25,26}
import React, { Component } from 'react';
import logo from './logo.svg'

class App extends Component {
  render() {
    const greeting = {
      subject: 'React',
      description: 'Your component library for ...',
    };

    return (
      <div>
        <Greeting
          subject={greeting.subject}
          description={greeting.description}
          logo={logo}
        />
      </div>
    );
  }
}

const Greeting = ({
  subject,
  description,
  logo,
}) =>
  ...
```

You can do all of this code formatting on your own or use a code formatter instead. [Prettier](https://github.com/prettier/prettier) is the most popular choice when it comes to opinionated code formatters. If you are interested in using Prettier, here you can read up on how to set it up on [Windows](https://www.robinwieruch.de/react-js-windows-setup/) or [MacOS](https://www.robinwieruch.de/react-js-macos-setup/) in Visual Studio Code.

# React ...props syntax

Another strategy for passing all props to a child component is the [JavaScript spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax). JavaScript's spread operator in React is a useful power feature and you can read people referring to it as the **React ...props syntax** even though it is not really a React feature but just a thing coming from JavaScript.

```javascript{10}
class App extends Component {
  render() {
    const greeting = {
      subject: 'React',
      description: 'Your component library for ...',
    };

    return (
      <div>
        <Greeting {...greeting} />
      </div>
    );
  }
}

const Greeting = ({ subject, description }) => (
  <div>
    <Title title={`Welcome to ${subject}`} />
    <Description description={description} />
  </div>
);

const Title = ({ title }) => <h1>{title}</h1>;

const Description = ({ description }) => <p>{description}</p>;
```

The props spreading can be used to spread a whole object with key value pairs down to a child component. It has the same effect as passing each value of the object by its own to the component as before. The child component gets the props the same way as before too. Another thing which builds up on top of the **prop spread** is the **prop spread with rest**.

```javascript{16,18,19}
class App extends Component {
  render() {
    const greeting = {
      subject: 'React',
      description: 'Your component library for ...',
    };

    return (
      <div>
        <Greeting {...greeting} />
      </div>
    );
  }
}

const Greeting = ({ subject, ...other }) => (
  <div>
    <Title title={`Welcome to ${subject}`} />
    <Description {...other} />
  </div>
);

const Title = ({ title }) => <h1>{title}</h1>;

const Description = ({ description }) => <p>{description}</p>;
```

As you can see, in the Greeting component the props are destructured but with a **rest assignment** which is called `other` in this case. So you have the `subject` prop but also the `other` prop which is essentially just an object with all the remaining properties (in this case only the `description`). Now you can spread the rest of the props to the Description component, because all the relevant props for the other components (here the Title component) were separated from it.

# React props with default value

In some cases you may want to pass default values as props. Historically the best approach to it was using JavaScript's logical OR operator.

```javascript{2}
const Greeting = ({ subject, description }) => {
  subject = subject || 'Earth';

  return (
    <div>
      <Title title={`Welcome to ${subject}`} />
      <Description description={description} />
    </div>
  );
};
```

You can also inline it as prop:

```javascript{3}
const Greeting = ({ subject, description }) => (
  <div>
    <Title title={`Welcome to ${subject || 'Earth'}`} />
    <Description description={description} />
  </div>
);
```

However, with JavaScript language additions there are other features you can use for it. For instance [JavaScript's default parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) for the default value of the prop:

```javascript{1}
const Greeting = ({ subject = 'Earth', description }) => (
  <div>
    <Title title={`Welcome to ${subject}`} />
    <Description description={description} />
  </div>
);
```

The latter is the most popular choice when using only JavaScript for the default value. However, in case you are using [React's PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html), it's is also possible to pass **default prop values** the React way:

```javascript{8,9,10}
const Greeting = ({ subject, description }) => (
  <div>
    <Title title={`Welcome to ${subject}`} />
    <Description description={description} />
  </div>
);

Greeting.defaultProps = {
  subject: 'Earth',
};
```

After all, my recommendation would be using JavaScript's default parameter, because everyone outside of the React world understands it as well. Moreover, often you will not have React's PropTypes in your project for making use of the PropTypes default in the first place.

# React's children prop

The children prop in React can be used for composing React components into each other. Rather than using inheritance (due to the nature of React's class components), React [embraces composition over inheritance](https://reactjs.org/docs/composition-vs-inheritance.html). That's why you can just put any string, element(s) or React component(s) in between of the opening and closing component tags.

```javascript{11,17,19}
class App extends Component {
  ...

  render() {
    const greeting = 'Welcome to React';

    return (
      <div>
        <Greeting greeting={greeting} isShow={this.state.isShow} />

        <Button onClick={this.toggleShow}>Toggle Show</Button>
      </div>
    );
  }
}

const Button = ({ onClick, children }) => (
  <button onClick={onClick} type="button">
    {children}
  </button>
);
```

In this case, only a string is put in between of the component tags. Then in the child component, you can make use of everything which is in between of the tags (string, element(s), component(s)), by using **React's children prop**. For instance, you can just render the content of the children prop like it is done in this example. In the following sections, you will see how the children prop can be used as a function too.

# How to pass Components as Props?

Before you have learned about React's children prop to pass a component as prop to another component.

```javascript
const User = ({ user }) => (
  <Profile user={user}>
    <AvatarRound user={user} />
  </Profile>
);

const Profile = ({ user, children }) => (
  <div className="profile">
    <div>{children}</div>
    <div>
      <p>{user.name}</p>
    </div>
  </div>
);

const AvatarRound = ({ user }) => (
  <img className="round" alt="avatar" src={user.avatarUrl} />
);
```

However, what if you want to **pass more than one component and place them at different positions**? Then again you don't need to use the children prop and instead you just use regular props:

```javascript
const User = ({ user }) => (
  <Profile
    user={user}
    avatar={<AvatarRound user={user} />}
    biography={<BiographyFat user={user} />}
  />
);

const Profile = ({ user, avatar, biography }) => (
  <div className="profile">
    <div>{avatar}</div>
    <div>
      <p>{user.name}</p>
      {biography}
    </div>
  </div>
);

const AvatarRound = ({ user }) => (
  <img className="round" alt="avatar" src={user.avatarUrl} />
);

const BiographyFat = ({ user }) => (
  <p className="fat">{user.biography}</p>
);
```

Often this approach is used when having a surrounding layout component which takes multiple components as content with props. Now you can exchange the Avatar or Biography components dynamically with other components such as:

```javascript
const AvatarSquare = ({ user }) => (
  <img className="square" alt="avatar" src={user.avatarUrl} />
);

const BiographyItalic = ({ user }) => (
  <p className="italic">{user.biography}</p>
);
```

Many people refer to this as **slot pattern** in React. You can find a working minimal project on [GitHub](https://github.com/the-road-to-learn-react/react-slot-pattern-example). And again, that's how composition in React shines. You don't need to touch the Profile component. Moreover, you don't need to pass props, in this case the user, multiple levels down the component tree, but rather pass it to the slotted components.

# Children as a Function

The concept of **children as a function** or **child as a function**, also called **render prop**, is one of the advanced patterns in React (next to [higher-order components](https://www.robinwieruch.de/react-higher-order-components/)). The components which implement this pattern can be called **render prop components.**

The following implementations can be difficult to follow when not having used render props in React before. Please read up this article [as introduction to render props in React](https://www.robinwieruch.de/react-render-props/) first.

First, let's start with the render prop. Basically it is a function passed as prop (usually called render, but the name can be anything). The function receives arguments (in this case the amount), but also renders JSX (in this case the components for the currency conversion).

```javascript{4,7,40}
const App = () => (
  <div>
    <h1>US Dollar to Euro:</h1>
    <Amount render={amount => <Euro amount={amount} />} />

    <h1>US Dollar to Pound:</h1>
    <Amount render={amount => <Pound amount={amount} />} />
  </div>
);

class Amount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
    };
  }

  onIncrement = () => {
    this.setState(state => ({ amount: state.amount + 1 }));
  };

  onDecrement = () => {
    this.setState(state => ({ amount: state.amount - 1 }));
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>

        <p>US Dollar: {this.state.amount}</p>

        {this.props.render(this.state.amount)}
      </div>
    );
  }
}

const Euro = ({ amount }) => <p>Euro: {amount * 0.86}</p>;

const Pound = ({ amount }) => <p>Pound: {amount * 0.76}</p>;
```

Second, refactor the whole thing from having a render prop to having the children as a function:

```javascript{4,7,40}
const App = () => (
  <div>
    <h1>US Dollar to Euro:</h1>
    <Amount>{amount => <Euro amount={amount} />}</Amount>

    <h1>US Dollar to Pound:</h1>
    <Amount>{amount => <Pound amount={amount} />}</Amount>
  </div>
);

class Amount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
    };
  }

  onIncrement = () => {
    this.setState(state => ({ amount: state.amount + 1 }));
  };

  onDecrement = () => {
    this.setState(state => ({ amount: state.amount - 1 }));
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>

        <p>US Dollar: {this.state.amount}</p>

        {this.props.children(this.state.amount)}
      </div>
    );
  }
}

const Euro = ({ amount }) => <p>Euro: {amount * 0.86}</p>;

const Pound = ({ amount }) => <p>Pound: {amount * 0.76}</p>;
```

That's essentially everything to distinguish between a render prop or a children as a function in a render prop component. The former is passed as a normal prop and the latter is passed as a children prop. You have seen before that functions can be passed as callback handlers (e.g. button click) to React components, but this time the function is passed to actually render something whereas the responsibility for *what to render* was partially moved outside of the render prop component but the props are provided by the render prop component itself.

You can find a working minimal project on [GitHub](https://github.com/the-road-to-learn-react/react-children-as-a-function-example). And again, if you had any problems following the last examples, check the referenced article, because this guide doesn't go into detail for render prop components in React.

# React's Context API

At some point, you are passing a lot of props down your component tree. Depending on the depth of the component tree, it can happen that many props are passed from a top level component to all the leaf components. Every component in between has to pass the props even though it may not be interested in the props. The problem is called **prop drilling** in React. There are a couple of solutions to overcome this "problem". You have already learned about one solution: passing components as props by using the slot pattern. Then you don't have to pass a prop through all components, but rather distribute the props at a top level to all slotted components.

Another solution is **React's Context API** which can be used to pass props implicitly down to component tree. Every component which is interested in the props passed by React's Context API can consume them. All the other components don't need to consume them and thus they will never know about the props. Moreover, the components between the top level and the leaf components don't need to know about the props as well. Checkout [React's Context API](https://www.robinwieruch.de/react-context/) if you are interested in using it.

# How to set props to state?

Previously you have got to know more about props and state in React. Sometimes there is one question which comes up for React beginners, but also for experienced React developers when implementing React components: **How to set props to state?** In case of the initial state, it is totally fine to derive it from the props. You can do it in the constructor of a class component:

```javascript{6}
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue,
    };
  }

  onChange = event => {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <label>
        Name:

        <input
          value={this.state.value}
          onChange={this.onChange}
          type="text"
        />
      </label>
    );
  }
}
```

That's a common pattern in React. But what about incoming props which are changing and should be set to the state then? You can do it by using the [getDerivedStateFromProps(props, state) lifecycle method](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops). It is invoked before the render lifecycle method for the mounting and update lifecycles of the component. By using this lifecycle method, it is possible to set the state of the component based on changing props.

However, the `getDerivedStateFromProps()` lifecycle method exists only for rare use cases. Usually one should think twice about the implementation logic of the component(s) before using this lifecycle method. This article doesn't go into detail about this topic, because there already exists an excellent article about it: [You Probably Don't Need Derived State](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html). You should definitely check it out in case you are running into an edge case where derived state is applicable. Usually there is a way around this lifecycle method and the article explains these scenarios in great detail.

# React Props Pitfalls

There are a couple of pitfalls when passing props in React. Here I want to collect a list of these things in case someone stumbles upon them:

## React props are not being passed in Components

Sometimes you run into the problem that your React props are not being passed. Personally I ran into this issue several times when I forgot to use the curly braces for the props destructuring in my functional stateless components:

```javascript{1}
const Button = (onClick, children) => (
  <button onClick={onClick} type="button">
    {children}
  </button>
);
```

In this case, the `onClick` argument is the actual props. So you have to destructure it, so the first argument of the function, for accessing the `onClick` and `children` props.

```javascript{1}
const Button = ({ onClick, children }) => (
  <button onClick={onClick} type="button">
    {children}
  </button>
);
```

Most often that's already the solution to the problem. If not, you should track down the prop from parent to child component by adding `console.log(props)` calls to your components. If you have a functional stateless component, you don't necessarily need to add an arrow function body to your component for putting the `console.log()` in between. Instead you can use this neat trick:

```javascript{2}
const Button = ({ onClick, children }) =>
  console.log(onClick, children) || (
  <button onClick={onClick} type="button">
    {children}
  </button>
);
```

The `console.log()` always evaluates to undefined (a falsey value) and thus the component is still being rendered. That's how you can easily get a logging for your props in between your input and output of your functional stateless component.

## React props key is undefined

When rendering lists in React, you have to use a key prop identifying the element in the list. React uses the key for performance reasons, but also for keeping track of the element in case your list changes (e.g. due ordering, removing, adding of items). That's why you should use a unique identifier which is associated to the rendered item.

```javascript
const List = ({ users }) => (
  <ul>
    {users.map(user => <Item key={user.id}>{user.name}</Item>)}
  </ul>
);

const Item = ({ children }) => (
  <p>{children}</p>
);
```

So far, everything is alright with this code. However, sometimes you want to get the key prop in the child component.

```javascript{7,8}
const List = ({ users }) => (
  <ul>
    {users.map(user => <Item key={user.id}>{user.name}</Item>)}
  </ul>
);

const Item = ({ key, children }) => (
  <p>{key} {children}</p>
);
```

That's not working and you will also see a warning in your developer console log: *"... key is not a prop. Trying to access it will result in undefined being returned.* In this case, you have to pass a second prop when you want to get the key from the props.

```javascript{4,11,12}
const List = ({ users }) => (
  <ul>
    {users.map(user => (
      <Item key={user.id} id={user.id}>
        {user.name}
      </Item>
    ))}
  </ul>
);

const Item = ({ id, children }) => (
  <p>{id} {children}</p>
);
```

In the end, that's the workaround to pass props (e.g. key) which are internally used by React and not passed to the child components.

## Pass props to Styled Components

Did you hear about [styled components](https://github.com/styled-components/styled-components)? They can be used for styling your components in React. Rather than thinking about cascading style sheets as for HTML styles, you only style your components. So the style becomes more co-located to your components. In fact, in the case of styled components, the style becomes a React component:

```javascript
import React, { Component } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  onChange = event => {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <Input
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
```

The input element which is used to implement the Input styled component gets the `value` and `onChange` as props automatically. But what if you want to get props in a styled component to do something with them? Then you can add a string interpolation in the template literal and get the props in the inlined function's signature:

```javascript{10,22}
import React, { Component } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: ${props => props.hasRadius ? '3px' : '0px'};
`;

class App extends Component {
  ...

  render() {
    return (
      <div>
        <Input
          value={this.state.value}
          onChange={this.onChange}
          hasRadius={true}
        />
      </div>
    );
  }
}
```

Basically that's how you pass props to styled components and how you get props in a styled component. If you haven't used styled components yet, you should give them a shot for styling your React components without thinking about CSS files.

## Pass props with React Router

React Router is another [essential React library](https://www.robinwieruch.de/react-libraries/) which is often used to complement React applications. Mapping URL routes to React components usually looks similar to this:

```javascript
const App = ({ user }) =>
  <Router>
    <Route exact path='/' component={Home} />
    <Route path='/articles' component={Article} />
    <Route path='/about' component={About} />
  </Router>
```

But how would you pass props to the child component in React Router? You can use the render prop instead of the component prop for passing props to the child component.

```javascript{5,9,13}
const App = ({ user }) =>
  <Router>
    <Route
      exact path='/'
      render={() => <Home user={user} />}
    />
    <Route
      path='/articles'
      render={() => <Article user={user} />}
    />
    <Route
      path='/about'
      render={() => <About user={user} />}
    />
  </Router>
```

Whereas the component prop would re-render the component every time when using an inline function, the render prop doesn't perform the remounting. So you can be sure that the components are kept mounted and yet you can pass props to them. In addition, you receive the React Router props in the render prop function, in case you want to do something with them, too:

```javascript{5,9,13}
const App = ({ user }) =>
  <Router>
    <Route
      exact path='/'
      render={props => <Home user={user} />}
    />
    <Route
      path='/articles'
      render={props => <Article user={user} />}
    />
    <Route
      path='/about'
      render={props => <About user={user} />}
    />
  </Router>
```

The route props include match, location, and history which are used to get the current route state from React Router within your component. So regardless of the component prop or render prop, for both you would receive the match, location, and history props in the Home, Article and About components:

```javascript{8,9,10,11}
const App = () =>
  <Router>
    <Route exact path='/' component={Home} />
    <Route path='/articles' component={Article} />
    <Route path='/about' component={About} />
  </Router>

const Home = (props) =>
  console.log(props.history) ||
  console.log(props.match) ||
  console.log(props.location) ||
  <h1>My Home Page</h1>

...
```

Often when working with React Router you are confronted with one of the following errors:

* props.location undefined
* props.history undefined
* props.match undefined

As mentioned, you only have access to these props when using the component in the Route component from React Router. Every other component doesn't have the React Router props, unless you pass them further down the component tree to these components. Another way of making the React Router props available in your component is using the `withRouter()` higher-order component from React Router.

```javascript{9,14,15}
const App = () =>
  <Router>
    <Route exact path='/' component={Home} />
    <Route path='/articles' component={Article} />
    <Route path='/about' component={About} />
  </Router>

const Home = () =>
  <TitleWithRouter />

const Title = (props) =>
  console.log(props) || <h1>My Home Page</h1>;

// without withRouter the props in the Title component would be an empty object
const TitleWithRouter = withRouter(Title);
```

Basically these are the most common pitfalls when using React Router. You should definitely try React Router once you have learned the fundamentals of React.

<Divider />

I guess the article almost covered everything about (passing) props in React. In the end, props aren't difficult. They are read-only and enable you to pass data down the component tree. Everything else which makes React interactive is mostly state. Or, as you have read, changing props which are triggering a re-render for the components as well. So I hope this article gave you a good overview about all the different usages of props in React.
