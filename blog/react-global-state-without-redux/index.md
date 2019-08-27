---
title: "React Global State without Redux"
description: "A tutorial to showcase how to use React global state without Redux. There are React patterns that can be used to have an application wide state in React without a state management library ..."
date: "2018-10-02T13:50:46+02:00"
categories: ["React", "JavaScript"]
keywords: ["react global state without redux", "react state management without redux", "react context API", "react prop drilling"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

The article is a short tutorial on how to achieve global state in React without Redux. Creating a global state in React is one of the first signs that you may need Redux (or another state management library such as MobX) in your application, because in React the local state is located on a component level. Hence you cannot have a real global state in React. However, by deploying the right React techniques, you can actually have a global state in React without having to use Redux. This article shows you how to do it until you really need a state management library.

# React Global State with Props

As simple as it sounds, you can have global state in React by managing your React state at your top level component. For instance, your top level component has the name App and manages the state for a list and a toggle to show/hide the list:

```javascript
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: true,
      list: ['a', 'b', 'c'],
    };
  }

  onToggleList = () => {
    this.setState(prevState => ({ toggle: !prevState.toggle }));
  };

  render() {
    return (
      <div>
        <Toggle
          toggle={this.state.toggle}
          onToggleList={this.onToggleList}
        />
        {this.state.toggle && <List list={this.state.list} />}
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
```

All state is [passed as props](https://www.robinwieruch.de/react-pass-props-to-component/) to the child components. In this simple scenario, the props are used in the immediate child components (List, Toggle). But you can imagine that the props can be passed down more than one component down the component hierarchy (Item). On the other hand, each component which is interested in updating the global state (Toggle), which is managed in the App component, receives a function from the App component to perform a state update (onToggleList). That's how the top level component, in this case the App component, can be used to manage global state in React without a third-party state management library such as Redux.

The shown example is only a simplified version of a larger application. But the basics in React, passing props and managing state, is used in larger React applications too. Thus even though a child component is more than one level away from the top level App component, it could still receive (due to props) and update state (due to function in props) from/in the App component.

# Global States with Pages in React

At some point, you will use something like React Router to distribute your application on multiple pages (URLs) with so called Page components (e.g. AccountPage, ProfilePage). It doesn't need to be called Page component, but I have seen it in various React applications used this way. The [complete Firebase in React authentication tutorial](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/) showcases such an application with React Router and multiple Page components.

When using this architecture for your application with routing, you will still have a top level component (e.g. App component) but also Page components which are consolidated within this App component.

```javascript
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: true,
      list: ['a', 'b', 'c'],
    };
  }

  onToggleList = () => {
    this.setState(prevState => ({ toggle: !prevState.toggle }));
  };

  render() {
    return (
      <Switch>
        <div>
          <Navigation />

          <Route
            exact
            path={'/list'}
            component={() => <ListPage
              list={this.state.list}
              toggle={this.state.toggle}
              onToggleList={this.onToggleList}
            />}
          />
          <Route
            exact
            path={'/account'}
            component={() => <AccountPage />}
          />
          <Route
            exact
            path={'/profile'}
            component={() => <ProfilePage />}
          />
        </div>
      </Switch>
    );
  }
}
```

The App component is useful in such an architecture, because it can still manage global state, but also manages all the top level routes (relative URL mapping to Page components) and has all other components which are displayed for every Page component (Navigation component).

In this scenario, you still have a global state in the App component but maybe also additional global sub states for each page component. Perhaps in this case, because only the ListPage component is interested in the global state from the App component, you can lift down the state management to the ListPage component.

```javascript
class ListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: true,
      list: ['a', 'b', 'c'],
    };
  }

  onToggleList = () => {
    this.setState(prevState => ({ toggle: !prevState.toggle }));
  };

  render() {
    return (
      <div>
        <Toggle
          toggle={this.state.toggle}
          onToggleList={this.onToggleList}
        />
        {this.state.toggle && <List list={this.state.list} />}
      </div>
    );
  }
}
```

This would leave the App component as a stateless component, because it hasn't to manage any state.

```javascript
const App = () =>
  <Switch>
    <div>
      <Navigation />

      <Route
        exact
        path={'/list'}
        component={() => <ListPage />}
      />
      <Route
        exact
        path={'/account'}
        component={() => <AccountPage />}
      />
      <Route
        exact
        path={'/profile'}
        component={() => <ProfilePage />}
      />
    </div>
  </Switch>
```

However, once you need global state again, which can be distributed to all Page components or update from within various Page components, you can deploy state in your App component again. Otherwise the state gets managed as semi global state in each page component on its own.

# React Global State, but there is Prop Drilling!

Prop drilling is a phenomena in React that happens when props are passed down multiple levels in a React component hierarchy and components in between are not interested in this props, so they just pass it along to the next child component. This problem can happen when using only React state as global state and your application's component hierarchy grows vertically. However, there are two techniques to prevent the prop drilling phenomena until there is really no way around a proper state management library such as Redux or MobX. You can read more about these techniques over here:

* [React Slot Pattern](https://github.com/the-road-to-learn-react/react-slot-pattern-example)
* [React's Context API](https://www.robinwieruch.de/react-context-api/)

However, while the React Slot Pattern is a great way to advance your React application, React's Context API shouldn't be exploited as sophisticated state management layer. It is only a way to pass props from a parent component to grandchild components without having to pass the props through all child components.

<Divider />

You have seen how global state can be used in React without having a state management library such as Redux or MobX in place. In smaller applications you can use a top level component for it; in larger applications you can use multiple page components. Once your applications grows vertically in size, you can deploy different techniques in React to overcome the shortcoming of the prop drilling phenomena. However, at some point your application may become too large for React alone being able to manage the global state. There are simply to many props to be passed down the component hierarchy. That's when you would opt-in a library such as Redux.

<ReadMore label="Things to learn in React before using Redux" link="https://www.robinwieruch.de/learn-react-before-using-redux/" />
