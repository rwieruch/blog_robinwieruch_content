---
title: "How to prevent a rerender in React"
description: "A React performance optimization tutorial which shows you React's shouldComponentUpdate lifecycle method and React's PureComponent API to prevent the rerendering of (child) components ..."
date: "2018-09-11T13:50:46+02:00"
categories: ["React"]
keywords: ["react prevent rerender", "react shouldcomponentupdate", "react purecomponent", "react performance", "react perf", "prevent a child component from rendering in react", "react prevent child rerender", "child did update"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in this series." links={[{ prefix: "Part 1a:", label: "How to setup React.js on Windows", url: "https://www.robinwieruch.de/react-js-windows-setup/" }, { prefix: "Part 1b:", label: "How to setup React.js on MacOS", url: "https://www.robinwieruch.de/react-js-macos-setup/" }]} />

In this React performance optimization tutorial, you will learn about React's shouldComponentUpdate lifecycle method and React's PureComponent API to a prevent rerender for React components. Usually React components and their child components rerender if state or props change. However, by using React's API, you can step in and make the decision when to rerender a component. You can find the finished application in this [GitHub repository](https://github.com/the-road-to-learn-react/react-prevent-rerender-component).

# React Performance Optimization Scenario

Before learning about React's API for perf optimizations, let's come up with a scenario that enables us to apply React's shouldComponentUpdate and PureComponent. In the following, you will be rendering a large list of items. After experiencing the rerendering of the list of items as performance problem, we will go through different performance optimization solutions. Your initial application will be the following:

```javascript
import React, { Component } from 'react';
import styled from 'styled-components';

const list = new Array(5000).fill(0).map((v, i) => i);

class App extends Component {
  render() {
    return (
      <div>
        {list.map(v => <Square key={v} number={v} />)}
      </div>
    );
  }
}

const Square = ({ number }) => <Item>{number * number}</Item>;

const Item = styled.div`
  margin: 10px;
`;

export default App;
```

If you have not styled-components installed yet, you can add it as library via npm with `npm install styled-components`. Otherwise, as you can see, the application generates a list of numbers once and renders them as a list of items. Each item is the square of its number which is [passed as prop](https://www.robinwieruch.de/react-pass-props-to-component/) to the Square component.

In the next step, let's add an interactive element to our application. Next to the list of squares, there should be a button to toggle the perspective of the list.

```javascript{7,8,9,11,12,13,18,19,20,30,31,32,33,34}
import React, { Component } from 'react';
import styled from 'styled-components';

const list = new Array(5000).fill(0).map((v, i) => i);

class App extends Component {
  state = {
    perspective: false,
  };

  togglePerspective = () => {
    this.setState(state => ({ perspective: !state.perspective }));
  };

  render() {
    return (
      <div>
        <Button onClick={this.togglePerspective}>
          Toggle Perspective
        </Button>

        <div>
          {list.map(v => <Square key={v} number={v} />)}
        </div>
      </div>
    );
  }
}

const Button = ({ onClick, children }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
);

const Square = ({ number }) => <Item>{number * number}</Item>;

const Item = styled.div`
  margin: 10px;
`;

export default App;
```

The local state of the App component changes when the button is clicked, but the local state itself isn't used yet. In the last step, you are using a styled component with a conditional to toggle the perspective by applying a flexbox style.

```javascript{22,24,30,31,32,33,34}
import React, { Component } from 'react';
import styled from 'styled-components';

const list = new Array(5000).fill(0).map((v, i) => i);

class App extends Component {
  state = {
    perspective: false,
  };

  togglePerspective = () => {
    this.setState(state => ({ perspective: !state.perspective }));
  };

  render() {
    return (
      <div>
        <Button onClick={this.togglePerspective}>
          Toggle Perspective
        </Button>

        <Perspective perspective={this.state.perspective}>
          {list.map(v => <Square key={v} number={v} />)}
        </Perspective>
      </div>
    );
  }
}

const Perspective = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => (props.perspective ? 'row' : 'column')};
`;

const Button = ({ onClick, children }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
);

const Square = ({ number }) => <Item>{number * number}</Item>;

const Item = styled.div`
  margin: 10px;
`;

export default App;
```

Now you should be able to toggle the perspective (rows, columns) of the list of items by clicking the button. Depending on the number of items you are generating for your list once your application starts, the toggling of the perspective takes some time, because with every state change all your components rerender. You can confirm it by adding console logs to your App component's child components and the App component itself.

```javascript{13,29,36}
...

class App extends Component {
  state = {
    perspective: false,
  };

  togglePerspective = () => {
    this.setState(state => ({ perspective: !state.perspective }));
  };

  render() {
    console.log('render App');
    return (
      <div>
        <Button onClick={this.togglePerspective}>
          Toggle Perspective
        </Button>

        <Perspective perspective={this.state.perspective}>
          {list.map(v => <Square key={v} number={v} />)}
        </Perspective>
      </div>
    );
  }
}

const Button = ({ onClick, children }) =>
  console.log('render Button') || (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );

const Square = ({ number }) =>
  console.log('render Square') || <Item>{number * number}</Item>;

...
```

As you can see by looking at the console logs after clicking the button, every child did update and rerender. This leads to a performance problem, because all Square components are rerendered too. In the next sections, we are going through a couple of solutions on how you can prevent a child component from rendering in React. It's not necessary to have a child rerender when none of its relevant props are changing. However, all Square components are rerendered even though only the perspective changes which is only used in the Perspective component.

# React's shouldComponentUpdate Method

The first solution used to prevent a component from rendering in React is called shouldComponentUpdate. It is a lifecycle method which is available on [React class components](https://www.robinwieruch.de/javascript-fundamentals-react-requirements/). Instead of having Square as a functional stateless component as before:

```javascript
const Square = ({ number }) => <Item>{number * number}</Item>;
```

You can use a class component with a componentShouldUpdate method:

```javascript
class Square extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    ...
  }

  render() {
    return <Item>{this.props.number * this.props.number}</Item>;
  }
}
```

As you can see, the shouldComponentUpdate class method has access to the next props and state before running the re-rendering of a component. That's where you can decide to prevent the re-render by returning false from this method. If you return true, the component re-renders.

```javascript{3,4,5,6,7}
class Square extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.number === nextProps.number) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return <Item>{this.props.number * this.props.number}</Item>;
  }
}
```

In this case, if the incoming `number` prop didn't change, the component should not update. Try it yourself by adding console logs again to your components. The Square component shouldn't rerender when the perspective changes. That's a huge performance boost for your React application, because all your child components don't rerender with every rerender of their parent component. Finally, it's up to you to prevent a rerender of a component.

# React's PureComponent

In the previous case, you have used shouldComponentUpdate to prevent a rerender of the child component. It can be used to prevent component renderings on a fine-grained level: You can apply equality checks for different props and state, but also use it for other kind of checks. However, imagine you are not interested in checking each incoming prop by itself, which can be error prone too, but only in preventing a rerendering when nothing relevant (props, state) has changed for the component. That's where you can use the more broad yet simpler solution for preventing the rerender: **React's PureComponent**.

```javascript{1,5}
import React, { Component, PureComponent } from 'react';

...

class Square extends PureComponent {
  render() {
    return <Item>{this.props.number * this.props.number}</Item>;
  }
}
```

React's PureComponent does a shallow compare on the component's props and state. If nothing has changed, it prevents the rerender of the component. If something has changed, it rerenders the component.

As alternative, if you want to use a functional stateless component as PureComponent instead, use recompose's pure [higher-order component](https://www.robinwieruch.de/react-higher-order-components/). You can install [recompose](https://github.com/acdlite/recompose) on the command line via npm with `npm install recompose`. Then apply its higher-order component on your initially implemented Square component:

```javascript{1,5}
import { pure } from 'recompose';

...

const Square = pure(({ number }) => <Item>{number * number}</Item>);
```

Under the hood, recompose applies React's PureComponent for you. Again I encourage you to add console logs to your components to experience the rerenders of each component.

<Divider />

This small yet powerfull React performance optimization tutorial has shown you examples for React's shouldComponentUpdate() and React's PureComponent. As you have seen, you can also use higher-order components that implement these performance optimizations for you. You can find the finished application in this [GitHub repository](https://github.com/the-road-to-learn-react/react-prevent-rerender-component).

After all, you can always use console log statements to track your component rerenders. If shouldComponentUpdate is not called, check whether the props or state have changed in the first place, because this is a major source of this lifecycle method not being called. On the other hand, you should use these performance optimizations in React carefully, because preventing accidentally a rerendering may lead to unexpected bugs. Because of its virtual DOM, React by itself is a performant library, and you can rely on this fact until something becomes a performance bottleneck in your component hierarchy. It's usually the case when rendering a large list of data. Then it's recommended to check the internal implementation for the component of an item in a list. Maybe before using shouldComponentUpdate or PureComponent, you should change the implementation of the component in the first place.
