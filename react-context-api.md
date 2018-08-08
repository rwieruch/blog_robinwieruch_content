+++
title = "React's Context API explained: Provider and Consumer"
description = "React's Context API is a powerful feature for passing props down the component tree without the need to tell components in between about them. React's context creates a Provider and Consumer component that enable us to use this powerful feature ..."
date = "2018-03-31T13:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react context API", "react context API provider", "react context API consumer"]
news_keywords = ["react context API", "react context API provider", "react context API consumer"]
hashtag = "#ReactJs"
card = "img/posts/react-provider-pattern-context/banner_640.jpg"
banner = "img/posts/react-provider-pattern-context/banner.jpg"
contribute = "react-context-api.md"
headline = "React's Context API explained: Provider and Consumer"

summary = "React's Context API is a powerful feature for passing props down the component tree without the need to tell components in between about them. React's context creates a Provider and Consumer component that enable us to use this powerful feature."
+++

{{% sponsorship %}}

{{% pin_it_image "react context API" "img/posts/react-provider-pattern-context/banner.jpg" "is-src-set" %}}

Note: If you are using a React version 16.3 or above, this article might be relevant to you. It explains how to use React's new context API for passing props down the component tree. Only components who are interested can consume these props. If you are using a React version prior 16.3, head over to [this article to implement your own provider pattern in React with its old context API](https://www.robinwieruch.de/react-provider-pattern-context).

React's context API is a powerful feature. You will not often see it when using plain React, but might consider using it when your React application grows in size and depth from a component perspective. Basically, React's context API takes the clutter away of passing mandatory props, that are needed by every component, down your whole component tree. Most often components in between are not interested in these props.

But you will not only see it when using plain React. Often React's Context API can be seen in action when using an external state management library such as Redux or MobX. There, you often end up with a `Provider` component at the top of your component hierarchy that bridges your state layer (Redux/MobX/...) to your view layer (React). The `Provider` component receives the state as props and afterward, each child component has implicitly access to the managed state by Redux and MobX.

{{< highlight javascript >}}
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
{{< /highlight >}}

**But how does the Context API in React work?** This article gives you a walkthrough of using React's Context API for a simple use case in your application. Afterward, you should be able to use it on your own. In addition, you will understand how the `Provider` component, which is used for instance to bridge a state management library to React, works by using the context API.

{{% chapter_header "React's Context API" "react-context-api" %}}

Do you remember the last time when you had to pass props several components down your component tree? In plain React, you can be confronted often with this issue which is called "prop drilling".

{{< highlight javascript >}}
          +----------------+
          |                |
          |                |
          |       A        |
          |                |
          |                |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |        +       |
|       B        |    |        |Props  |
|                |    |        v       |
|                |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |        +       |
                      |        |Props  |
                      |        v       |
                      |                |
                      +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |        C       |
                      |                |
                      |                |
                      +----------------+
{{< /highlight >}}

It can happen that a couple of these props are even mandatory for each child component. Thus you would need to pass the props down to each child component. In return, this would clutter every component in between which has to pass down these props without using them oneself.

**When these props become mandatory, React's context API gives you a way out of this mess**. Instead of passing down the props explicitly down to each component, you can hide props, that are necessary for each component, in React's context and pass them implicitly down to each component. React's context traverses invisible down the component tree. If a component needs access to the context, it can consume it on demand.

{{< highlight javascript >}}
          +----------------+
          |                |
          |       A        |
          |                |
          |     Provide    |
          |     Context    |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|                |    |                |
|                |    |                |
|       B        |    |        D       |
|                |    |                |
|                |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |                |
                      |        E       |
                      |                |
                      |                |
                      +--------+-------+
                               |
                      +--------+-------+
                      |                |
                      |        C       |
                      |                |
                      |     Consume    |
                      |     Context    |
                      +----------------+
{{< /highlight >}}

**What are use cases for this approach?** For instance, your application could have a configurable colored theme. Each component should be colored depending on the configuration. The configuration is fetched once from your server, but afterward you want to make this implicitly accessible for all components. Therefore you could use React's context API to give every component access to the colored theme. You would have to provide the colored theme at the top of your component hierarchy and consume it in every component which is located somewhere below it.

**How is React's context provided and consumed?** Imagine you would have component A as root component that provides the context and component C as one of the child components that consumes the context. Somewhere in between is component D though. The application has a colored theme that can be used to style your components. Your goal is it to make the colored theme available for every component via the React context. In this case, component C should be able to consume it.

First, you have to create the context which gives you access to a Provider and Consumer component. When you create the context with React by using `createContext()`, you can pass it an initial value. In this case, the initial value is can be null, because you may have no access to the value when it has to be fetched from a server first. Otherwise, you can already give it here a proper initial value.

{{< highlight javascript >}}
import React from 'react';

const ThemeContext = React.createContext(null);

export default ThemeContext;
{{< /highlight >}}

Second, the A component would have to provide the context. It is a hardcoded `value` in this case, but it can be anything from component state or component props. The context value may change as well when the local state is changed due to a `setState()` call. Component A displays only component D yet makes the context available to all its other components below it. One of the leaf components will be component C that consumes the context eventually.

{{< highlight javascript >}}
import ThemeContext from './ThemeContext';

class A extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={'green'}>
        <D />
      </ThemeContext.Provider>
    );
  }
}
{{< /highlight >}}

Third, in your component C, below component D, you could consume the context object. Notice that component A doesn’t need to pass down anything via component D in the props so that it reaches component C.

{{< highlight javascript >}}
import ThemeContext from './ThemeContext';

class C extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {coloredTheme =>
          <div style={{ color: coloredTheme }}>
            Hello World
          </div>
        }
      </ThemeContext.Consumer>
    );
  }
}
{{< /highlight >}}

The component can derive its style by consuming the context. The Consumer component makes the passed context available by using a [render prop](https://www.robinwieruch.de/react-render-props-pattern/). As you can imagine, following this way every component that needs to be styled according to the colored theme could get the necessary information from React's context API by using the Consumer component now. You only have to use the Provider component which passes the value once somewhere above them. You can read more about [React's context in the official documentation](https://reactjs.org/docs/context.html).

{{% chapter_header "React's Context API in Higher Order Components" "react-context-api-higher-order-component" %}}

As mentioned, React's context API is often used when using state management libraries such as Redux or MobX. You will provide the state, that is managed by one of these libraries, via a Provider component. This Provider component uses React's context API to pass down the state implicitly. The store(s) can be consumed then by the components below.

**But wait! I guess, you never had to use the Consumer component from React's context API to consume the store somewhere below.** There is often a [higher-order component](https://www.robinwieruch.de/gentle-introduction-higher-order-components/) involved, coming from the bridging state management library (such as `connect` in react-redux), that provides you the state in your component. Thus you don't need to worry about the Consumer component.

What would such higher-order component, which provides React's context as props, look like? Basically the higher-order component would look like the following:

{{< highlight javascript >}}
const getTheme = Component =>
  class GetTheme extends React.Component {
    render() {
      return (
        <ThemeContext.Consumer>
          {coloredTheme =>
            <Component
              { ...this.props }
              coloredTheme={coloredTheme}
            />
          }
        </ThemeContext.Consumer>
      );
    }
  }

// usage

class App extends React.Component {
  render() {
    return (
      <div>
        <HeadlineWithTheme>Hello React</HeadlineWithTheme>
      </div>
    );
  }
}

...

function Headline(props) {
  return (
    <h1 style={{ color: props.coloredTheme }}>
      {props.children}
    </h1>
  );
}

const HeadlineWithTheme = getTheme(Headline);
{{< /highlight >}}

Now you could wrap any component into the `getTheme` higher-order component and expose it to the colored theme property that comes with the props. If you are curious about using React's context API for authentication, checkout [the complete Firebase in React Authentication tutorial](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/).

<hr class="section-divider">

A running application which uses React's context API can be found in this {{% a_blank "GitHub repository" "https://github.com/rwieruch/react-context-api" %}}. In the end, React's context API is used in complex applications to glue the state layer to your view layer. When using [Redux or MobX](https://www.robinwieruch.de/redux-mobx-confusion/), the state (store) is passed to your `Provider` component as props. The `Provider` component wraps the store into React's context and thus all child components can access the store. For instance, in Redux a higher-order component called `connect` is used to access the store again.
