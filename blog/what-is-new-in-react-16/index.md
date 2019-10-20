---
date: "2017-10-05T13:50:46+02:00"
title: "What's new in React 16?"
description: "All React 16 changes in one article. It tells you about the new return types with fragments and strings, portals in React, componentDidCatch and error boundaries for a robust error handling in React, setState with returning null and custom DOM attributes in React.js ..."
categories: ["React"]
keywords: ["react 16"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
author: ""
contribute: ""
---

<Sponsorship />

There is a high likelihood that there are already a multitude of articles about the new React.js 16 release. But for learning about the changes of the library myself, I wanted to read up all the new React 16 features and improvements too. I thought it would be useful if I would share briefly what I have learned along the way. In the next days, I hope to find the time to update my articles and books accordingly to the React 16 changes.

React 16, to many people known as project Fiber, [was a whole rewrite of the React library](https://code.facebook.com/posts/1716776591680069/react-16-a-look-inside-an-api-compatible-rewrite-of-our-frontend-ui-library/). That's a huge undertaking if you consider that the library didn't change its legacy external API at all. Only internal implementations were changed. [People already migrated to it and it just worked for them with improved results.](https://news.ycombinator.com/item?id=15339983) If you don't have any errors or warnings in your applications showing up, it should just work for you as well.

One of the greatest news for the React community was the announcement about [the relicensing of the React library under the MIT license](https://code.facebook.com/posts/300798627056246/relicensing-react-jest-flow-and-immutable-js/). It affected not only React, but also Jest, Flow and ImmutableJs. A couple of days later, [GraphQL and Relay followed the new licensing model](https://medium.com/@leeb/relicensing-the-graphql-specification-e7d07a52301b). Now [there shouldn't be any concerns left](https://medium.com/@raulk/if-youre-a-startup-you-should-not-use-react-reflecting-on-the-bsd-patents-license-b049d4a67dd2) to use and [learn React](https://roadtoreact.com/).

Apart from these [huge improvements for React's performance](https://facebook.github.io/react/blog/2017/09/26/react-v16.0.html), including [server-side rendering](https://hackernoon.com/whats-new-with-server-side-rendering-in-react-16-9b0d78585d67) and package size, and the relicensing, there are a couple of new features for us React developers. The article intents to summarize these briefly for you.

# Table of Contents

<TableOfContents {...props} />

# Less DOM Nodes, because of Fragments and Strings

React 16 supports new render return types. Now you are able to return fragments and strings. What are fragments in React? Before you had to wrap sibling elements into one group of elements by wrapping them into one parent element in order to return them in a component:

```javascript
const CurrySoup = () =>
  <ul>
    <li key="a">2 tablespoons vegetable oil</li>,
    <li key="b">2 large onions, finely chopped</li>,
    <li key="c">3 garlic cloves, finely chopped</li>,
    <li key="d">2 tablespoons curry powder or paste</li>,
    <li key="e">500ml vegetable stock</li>,
  </ul>
```

Now you can return a list of elements instead of wrapping them into one parent element:

```javascript
const CurrySoup = () =>
  [
    <li key="a">2 tablespoons vegetable oil</li>,
    <li key="b">2 large onions, finely chopped</li>,
    <li key="c">3 garlic cloves, finely chopped</li>,
    <li key="d">2 tablespoons curry powder or paste</li>,
    <li key="e">500ml vegetable stock</li>,
  ]
```

Still you would have to use the [key attribute](https://reactjs.org/docs/lists-and-keys.html) to make it easier for React to identify your elements in a list of elements. Although the maintainers behind React already [discuss to remove the keys for static content](https://github.com/facebook/jsx/issues/84). By returning those fragments, it becomes simple to place a group of elements next to each other without the need to add intermediate parent elements:

```javascript
const CurrySoup = () =>
  [
    <li key="a">2 tablespoons vegetable oil</li>,
    <li key="b">2 large onions, finely chopped</li>,
    <li key="c">3 garlic cloves, finely chopped</li>,
    <li key="d">2 tablespoons curry powder or paste</li>,
    <li key="e">500ml vegetable stock</li>,
  ]

const Chicken = () =>
  [
    <li key="f">1 chicken, about 1.5kg, jointed into 6 pieces</li>,
  ]

const ChickenCurrySoup = () =>
  [
    <Chicken key="chicken" />,
    <CurrySoup key="curry-soup" />,
  ]

const CookBook = () =>
  [
    <ul key="recipe-curry-soup">
      <CurrySoup />
    </ul>,
    <ul key="recipe-chicken-curry-soup">
      <ChickenCurrySoup />
    </ul>,
  ]
```

The other new return type is the string. Now it is valid to return a string value in a component without wrapping it into a span or div tag.

```javascript
const Greeting = ({ username }) =>
  `Hello ${username}`
```

Both new return types reduce the size of intermediate DOM nodes we were used to use before.

# There are Portals in React!

React 16 has [portals](https://reactjs.org/docs/portals.html) now. They are a way to render elements outside of the component where the portal is created. The portal only needs to know about a DOM node in your application where it should render the given elements.

```javascript{2,8,9,10,11}
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        {ReactDOM.createPortal(
          <Modal />,
          document.getElementById('modal')
        )}

        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
```

In your application, you would only need a DOM element with the id attribute "modal". Afterward, the Modal component would be rendered outside of the App component. Portals give you a hook into the outside HTML.

What are the use cases for Portals? One pain point prior React 16 was it to render modals. Often a modal was deeply nested in the component tree, because it was opened and closed in one of these components, even though, from a hierarchical DOM node point of view, the modal should be at a top level of your component tree. Because of this constraint, developers often had to apply CSS styles to make the modal float above the remaining application even though it was deeply nested in the component tree. Thus portals came along in React 16 to enable developers to render elements, in this case a modal, somewhere else, in this case up at a top layer component level. Still, it would be possible to control the model from a deeply nested component by passing the proper props to it and by opening and closing it.

# React's new Error Boundaries

There is a new lifecycle method in React: [componentDidCatch](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html). It allows you to perform error handling for your React components. In the lifecycle method you get access to the info and error object: `componentDidCatch(error, info)`.

Let's see it in action. Imagine a component that shows and updates your user account:

```javascript
const updateUsername = username =>
  ({
    user: {
      username,
    },
  });

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: 'Robin',
      }
    };
  }

  render() {
    const { username } = this.state.user;

    return (
      <div>
        <input
          type="text"
          onChange={event => this.setState(updateUsername(event.target.value))}
          value={username}
        />

        <p>Username: {username}</p>
      </div>
    );
  }
}
```

What happens when you would reset the user object? Consider a case where you would want to update your user object in your backend by doing an [API request](https://www.robinwieruch.de/react-fetching-data/) but by accident you set the whole user object to null in the local state of your React component. You can simulate it by using a button that resets your user object in React's local state to null.

```javascript{30,31,32,33}
const updateUsername = username =>
  ({
    user: {
      username,
    },
  });

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: 'Robin',
      }
    };
  }

  render() {
    const { username } = this.state.user;

    return (
      <div>
        <input
          type="text"
          onChange={event => this.setState(updateUsername(event.target.value))}
          value={username}
        />

        <button
          type="button"
          onClick={() => this.setState({ user: null })}
        >Reset User</button>

        <p>Username: {username}</p>
      </div>
    );
  }
}
```

You would get an error message saying: *"Cannot read property 'username' of null"*. The whole application crashes because the `username` property is destructured from the `user` object. By using `componentDidCatch` you can prevent it and display a proper error message when an error is caught in your render method. You can use the `componentDidCatch` lifecycle method directly in your Account component. However, a nicer way to keep it reusable and maintainable in your application would be to introduce a so called error boundary.

```javascript
class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    return this.state.error
      ? <h1>Uuuups, something went wrong.</h1>
      : this.props.children;
  }
}
```

That way, you can use it for your Account component but for every other component too:

```javascript
const App = () =>
  <div>
    <MyErrorBoundary>
      <Account />
    </MyErrorBoundary>
  </div>
```

When you reset your user object by accident now, the error message should be visible instead of the Account component and instead of crashing your whole application. By using error boundaries, you can keep your component error handling in React at strategic places. Don't clutter your whole component tree with error boundaries, but place them at important places where it would make sense to replace a component or a subset of components with an error message.

When you are in development mode, the error boundary is only visible for a couple of seconds. Afterward, you will see the real error for developing purposes. In production mode, it will keep showing the rendered output of the error boundary though. In order to mimic a production build with create-react-app, you can install [pushstate-server](https://github.com/scottcorgan/pushstate-server) on the command line, build your application and serve it with pushstate-server on localhost:9000:

```javascript
npm install -g pushstate-server
npm run build
pushstate-server build
```

There is one more important fact for error handling in React components. The new lifecycle method `componentDidCatch` gives you a great way to send your error reports to your favorite error tracking API. Personally, I use [Sentry](https://sentry.io/) to push all my occurring errors to one centralized service.

# Return null in React's setState

There are two ways in React's local state to update the state with `this.setState`. The first way of doing it is using an object:

```javascript
const { counter } = this.state;
this.setState({ counter: counter + 1 });
```

Due to `this.setState` being [executed asynchronously](https://www.robinwieruch.de/learn-react-before-using-redux/), you would want to update your local state with the second way by using a function instead of an object:

```javascript
this.setState(prevState => ({
  counter: prevState.counter + 1
}));
```

Now you wouldn't run into any stale state in between when computing your new state. But that's not the change for React 16. In React 16, you can return null in your `this.setState` function to prevent updates. Before you had to check a condition outside of your `this.setState` block:

```javascript
if (this.state.isFoo) {
  this.setState(prevState => ({
    counter: prevState.counter + 1
  }));
}
```

Now you can return null instead of an object:

```javascript
this.setState(prevState => {
  return prevState.isFoo
    ? { counter: prevState.counter + 1 }
    : null;
});
```

That way, you operate again on the current state at the time of the execution, because `this.setState` is executed asynchronously. If your condition depends on the current state, it can become important to have access to it in `this.setState` and to be able to abort the update.

# Custom DOM attributes

Unrecognized HTML and SVG attributes are not longer ignored by React. Instead you are allowed to give your DOM nodes any attributes now. Still you should camelCase your attributes to follow React's conventions of using attributes in HTML. My open question for this would be now: [Am I able to use the deprecated webkitallowfullscreen and mozallowfullscreen attributes in React for my Vimeo component now?](https://github.com/facebook/react/issues/7848#issuecomment-270536693) Yes, I can! I only need to specify "true" explicitly for those attributes.

```javascript
const VideoPlayer = ({ id }) => {
  return (
    <iframe
      src={`https://player.vimeo.com/video/${id}`}
      allowFullScreen="true"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
    />
  )
}
```

<Divider />

I [upgraded](https://github.com/rwieruch/favesound-redux) [my](https://github.com/rwieruch/favesound-mobx) [projects](https://github.com/rwieruch/react-express-stripe) to React 16 already. You should try the same. It is effortless if you didn't had any warnings before. In my projects, I only [had to adjust the Enzyme setup to React 16](https://github.com/rwieruch/the-road-to-learn-react/issues/73) by using [enzyme-adapter-react-16](https://github.com/airbnb/enzyme/tree/master/packages/enzyme-adapter-react-16). Thanks to all React contributors for your efforts to improve the library yet keeping it with a backward compatibility.
