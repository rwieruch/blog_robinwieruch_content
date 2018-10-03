+++
title = "React State without Constructor"
description = "A tutorial on how to have state in React without a constructor in a class component and how to have state in React without a class at all ..."
date = "2018-10-02T13:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react state without constructor", "react state without class", "react set initial state without constructor", "react setState without constructor", "react create state without a constructor"]
news_keywords = ["react state without constructor", "react state without class", "react set initial state without constructor", "react setState without constructor", "react create state without a constructor"]
hashtag = "#ReactJs"
card = "img/posts/react-state-without-constructor/banner_640.jpg"
banner = "img/posts/react-state-without-constructor/banner.jpg"
contribute = "react-state-without-constructor.md"
headline = "React State without Constructor"

summary = "A tutorial on how to have state in React without a constructor in a class component and how to have state in React without a class at all."
+++

{{% sponsorship %}}

{{% pin_it_image "react state without constructor" "img/posts/react-state-without-constructor/banner.jpg" "is-src-set" %}}

The article is a short tutorial on how to have state in React without a constructor in a class component and how to have state in React without a class component at all. It may be a great refresher on topics such as higher-order components and render prop components in React too.

{{% chapter_header "React State without a Constructor" "react-state-without-constructor" %}}

In React, state is used in a React class component. There you can set initial state in the constructor of the class, but also access and update it with `this.state` and `this.setState`, because you have access to the class instance by using the `this` object.

{{< highlight javascript >}}
import React, { Component } from 'react';

const list = ['a', 'b', 'c'];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: true,
    };
  }

  onToggleList = () => {
    this.setState(prevState => ({
      toggle: !prevState.toggle,
    }));
  }

  render() {
    return (
      <div>
        <Toggle
          toggle={this.state.toggle}
          onToggleList={this.onToggleList}
        />
        {this.state.toggle && <List list={list} />}
      </div>
    );
  }
}

const Toggle = ({ toggle, onToggleList }) => (
  <button type="button" onClick={onToggleList}>
    {toggle ? 'Hide' : 'Show'}
  </button>
);

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item} item={item} />
    ))}
  </ul>
);

const Item = ({ item }) => <li>{item}</li>;

export default App;
{{< /highlight >}}

The question to answer: **How to set initial state in React without a constructor?** In this case, there is an initial state for the `toggle` property in the App component. By using an {{% a_blank "alternative class syntax" "https://github.com/the-road-to-learn-react/react-alternative-class-component-syntax" %}}, you can leave out the constructor and initialize the state as class field declaration. However, you don't have access to the props anymore.

{{< highlight javascript "hl_lines=4 5 6" >}}
const list = ['a', 'b', 'c'];

class App extends Component {
  state = {
    toggle: true,
  };

  onToggleList = () => {
    this.setState(prevState => ({
      toggle: !prevState.toggle,
    }));
  }

  render() {
    return (
      <div>
        <Toggle
          toggle={this.state.toggle}
          onToggleList={this.onToggleList}
        />
        {this.state.toggle && <List list={list} />}
      </div>
    );
  }
}
{{< /highlight >}}

The syntax is not widely adopted yet, because class field declaration are a new feature in JavaScript, but once they will be supported by all browsers, they may be used more widely in React to create initial state in a class component.

{{% chapter_header "React State without a Class" "react-state-without-class" %}}

However, perhaps you are not looking for using React state without a constructor but using it without a class instead. Therefore, the real question(s) may be: *How to ...*

* **set React initial state without a constructor**
* **have access to React state without a constructor**
* **have access to React setState without a constructor**

At this point in time, the answer is: You cannot. It is not possible to have state in a functional component. This may change in the future, but for now, there are only two advanced React patterns which can be used to give your functional components state in React.

* [React higher-order components](https://www.robinwieruch.de/gentle-introduction-higher-order-components/)
* [React render prop components](https://www.robinwieruch.de/react-render-props-pattern/)

{{% sub_chapter_header "React State with Higher-Order Components" "react-state-with-higher-order-components" %}}

Let's see how we can use a enhancing higher-order component to give a functional component state. If you don't know anything about higher-order components, I recommend to read the referenced article first.

Fortunately, there exists a library which gives us such a higher-order component called {{% a_blank "recompose" "https://github.com/acdlite/recompose" %}} that spares us implementing the component ourselves. You can install it in the command line with `npm install recompose`. Now, let's see how it can be used in our previous showcased App component. First, refactor the App component from a class component to a functional component.

{{< highlight javascript "hl_lines=1 13" >}}
const App = () => (
  <div>
    <Toggle
      toggle={this.state.toggle}
      onToggleList={() =>
        this.setState(prevState => ({
          toggle: !prevState.toggle,
        }))
      }
    />
    {this.state.toggle && <List list={list} />}
  </div>
);
{{< /highlight >}}

Now, the component has no access to the this object and therefore no access to this.state or this.setState. Next, use the withState higher-order component from recompose to enhance the App component:

{{< highlight javascript "hl_lines=1 2 6 18" >}}
import React from 'react';
import { withState } from 'recompose';

...

const App = withState(...)(() => (
  <div>
    <Toggle
      toggle={this.state.toggle}
      onToggleList={() =>
        this.setState(prevState => ({
          toggle: !prevState.toggle,
        }))
      }
    />
    {this.state.toggle && <List list={list} />}
  </div>
));
{{< /highlight >}}

It may be simpler to read it this way:

{{< highlight javascript "hl_lines=1 13 15" >}}
const AppBase = () => (
  <div>
    <Toggle
      toggle={this.state.toggle}
      onToggleList={() =>
        this.setState(prevState => ({
          toggle: !prevState.toggle,
        }))
      }
    />
    {this.state.toggle && <List list={list} />}
  </div>
);

const App = withState(...)(AppBase);
{{< /highlight >}}

The returned function from the withState function call is used for the component which needs to be enhanced. The arguments for the withState function call itself were left out. These are used for the configuration of 1) the  state property name, 2) the name of the state update function, and 3) the initial state. Afterward, the functional component has access to the state and the state update function in the props.

{{< highlight javascript "hl_lines=1 5 11" >}}
const AppBase = ({ toggle, onToggleList }) => (
  <div>
    <Toggle
      toggle={toggle}
      onToggleList={() => onToggleList(!toggle)}
    />
    {toggle && <List list={list} />}
  </div>
);

const App = withState('toggle', 'onToggleList', true)(AppBase);
{{< /highlight >}}

Now the functional component was made semi stateful with a higher-order component that manages the state for it. If you manage more than one property in the state, let's say the App component manages the list as well (see below), then you can use multiple withState higher-order components for it.

{{< highlight javascript "hl_lines=4 18" >}}
class App extends Component {
  state = {
    toggle: true,
    list: ['a', 'b', 'c'],
  };

  render() {
    return (
      <div>
        <Toggle
          toggle={this.state.toggle}
          onToggleList={() =>
            this.setState(prevState => ({
              toggle: !prevState.toggle,
            }))
          }
        />
        {this.state.toggle && <List list={this.state.list} />}
      </div>
    );
  }
}
{{< /highlight >}}

Now use multiple withState higher-order components, whereas the list state has no update function yet, by using recompose's compose function:

{{< highlight javascript "hl_lines=2 4 10 14 16 17" >}}
import React from 'react';
import { compose, withState } from 'recompose';

const AppBase = ({ list, toggle, onToggleList }) => (
  <div>
    <Toggle
      toggle={toggle}
      onToggleList={() => onToggleList(!toggle)}
    />
    {toggle && <List list={list} />}
  </div>
);

const App = compose(
  withState('toggle', 'onToggleList', true),
  withState('list', null, ['a', 'b', 'c']),
)(AppBase);
{{< /highlight >}}

Basically that's how recompose and higher-order components can be used to make functional components stateful. In this case, you didn't have to invent your own higher-order component for it, because recompose offers this out of the box. Maybe it would be a great exercise to implement this higher-order component yourself. Therefore, check again the referenced higher-order component article.

{{% sub_chapter_header "React State with Render Prop Components" "react-state-with-render-prop-components" %}}

The referenced article about render prop components should help you to get up to speed with this advanced React pattern. The question: How can React render props be used to make a functional component stateful? Since there is no recompose for render prop components, you have to implement a render prop for it yourself. Let's take again the App component from the previous example:

{{< highlight javascript >}}
const list = ['a', 'b', 'c'];

class App extends Component {
  state = {
    toggle: true,
  };

  render() {
    return (
      <div>
        <Toggle
          toggle={this.state.toggle}
          onToggleList={() =>
            this.setState(prevState => ({
              toggle: !prevState.toggle,
            }))
          }
        />
        {this.state.toggle && <List list={list} />}
      </div>
    );
  }
}
{{< /highlight >}}

A render prop component would have to be used in the App component to manage the state on behalf of the App component. So let's say the App component becomes a functional component again and uses a so called State render prop component:

{{< highlight javascript "hl_lines=2 3 6 7 9 11 12" >}}
const App = () => (
  <State>
    {(toggle, onToggleList) => (
      <div>
        <Toggle
          toggle={toggle}
          onToggleList={() => onToggleList(!toggle)}
        />
        {toggle && <List list={list} />}
      </div>
    )}
  </State>
);
{{< /highlight >}}

Many things have changed. In this case, the render prop uses a function as a child. This function gives access to the state (1. argument) and an update function (2. argument). The arguments can be used within the function to render the actual content and to update the state eventually. How would the State render prop component look like?

{{< highlight javascript >}}
class State extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };
  }

  onUpdateState = value => {
    this.setState({ value });
  };

  render() {
    return this.props.children(this.state.value, this.onUpdateState);
  }
}
{{< /highlight >}}

The State render prop component manages a generic state called value. The state itself and the state update function (class method) are passed to the children as a function as arguments. Therefore, both arguments become available in the App component where the State render prop component is used. If you want to pass an initial state to your render prop component, you can do so by passing a prop to it.

{{< highlight javascript "hl_lines=6 20" >}}
class State extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.initialState,
    };
  }

  onUpdateState = value => {
    this.setState({ value });
  };

  render() {
    return this.props.children(this.state.value, this.onUpdateState);
  }
}

const App = () => (
  <State initialState={true}>
    {(toggle, onToggleList) => (
      <div>
        <Toggle
          toggle={toggle}
          onToggleList={() => onToggleList(!toggle)}
        />
        {toggle && <List list={list} />}
      </div>
    )}
  </State>
);
{{< /highlight >}}

That's how values can be passed to render props component; simply by using props. Everything that's needed outside of the render prop component, in this case the state and the state update function, can be passed to the render prop function (in this case the children function).

<hr class="section-divider">

You have learned, that there is no constructor needed to set the initial state of a React component by using class field declarations in enviroments where these are supported. Moreover, you have experienced how higher-order components or render prop components can be used to make a functional component stateful. These were only two examples on using higher-order components and render prop components, so make sure to checkout the referenced articles to learn more in depth about them. Otherwise, if you want to dig deeper into render prop components for managing state, checkout this article about [building a GraphQL client yourself by using render prop components](https://www.robinwieruch.de/react-graphql-client-library).