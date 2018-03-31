+++
title = "How to use React's Provider Pattern with React's Context API"
description = "React's Provider Pattern is deployed by using React's Context API. It helps you to pass props from a parent component to deeply nested components in the component hierarchy. After having read the article, you will know how to use it yourself and how Redux and MobX are using it as well ..."
date = "2017-07-11T13:50:46+02:00"
tags = ["React", "JavaScript"]
categories = ["React", "JavaScript"]
keywords = ["react provider pattern", "react context API"]
news_keywords = ["react provider pattern", "react context API"]
hashtag = "#ReactJs"
card = "img/posts/react-provider-pattern-context/banner_640.jpg"
banner = "img/posts/react-provider-pattern-context/banner.jpg"
contribute = "react-provider-pattern-context.md"
headline = "How to use React's Provider Pattern with React's Context API"

summary = "The provider pattern in React is a powerful concept. You will not often see it when using plain React, but might consider using it when scaling your application in React. Basically it takes the clutter away of passing mandatory props, that are needed by every component, down your whole component tree."
+++

{{% pin_it_image "react provider pattern" "img/posts/react-provider-pattern-context/banner.jpg" "is-src-set" %}}

Note: If you are using a React version prior 16.3, this article might be relevant to you. It explains how to use React's old context API to build your own provider and consumer pattern. If you are using React 16.3, head over to [this article that explains the new context API](https://www.robinwieruch.de/react-context-api).

The provider pattern in React is a powerful feature. You will not often see it when using plain React, but might consider using it when your React application grows in size and depth from a component perspective. Basically, React's provider pattern takes the clutter away of passing mandatory props, that are needed by every component, down your whole component tree.

But you will not only see the pattern when using plain React. Often React's provider pattern can be seen in action when using an external state management library. In Redux or MobX, you often end up with a `Provider` component at the top of your component hierarchy that bridges your state layer (Redux/MobX/...) to your view layer (React). The `Provider` component gets the state as props and afterward, each child component has implicitly access to the managed state from the store(s).

**But how does the Provider Pattern in React work?** This article gives you a walkthrough for implementing your own provider pattern in React. In addition, you will understand how a `Provider` component in Redux or MobX works, if you have encountered these before in your application.

There are two features that you have to know about React before you can implement your own provider pattern in React: children and context.

{{% chapter_header "React's Children" "react-children" %}}

React's children are useful for composing React components into each other. It is similar to composing HTML tags into each other. You would only use React's JSX syntax to accomplish it.

{{< highlight javascript >}}
class App extends Component {
  render() {
    return (
      <Header>
        Hello React
      </Header>
    );
  }
}

function Header({ children }) {
  return <h1>{children}</h1>;
}
{{< /highlight >}}

In this case the "Hello React" text would be used as children in the Header component and thus render in the `<h1>` tag. That's a powerful way to compose React components into each other, because the children property is always accessible in the props of a component. {{% a_blank "That's why no inheritance is used in React." "https://reactjs.org/docs/composition-vs-inheritance.html" %}}

{{% chapter_header "React's Context API" "react-context-api" %}}

React's context API is not highly advertised. It is even discouraged to use it. The team behind React keeps it open if the API of the context in React changes in the future.

Nevertheless, the context in React is a powerful feature. Do you remember the last time when you had to pass props several components down your component tree? In plain React, you can be confronted often with this issue which is called "prop drilling".

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

It can happen that a couple of these props are even mandatory for each child component. Thus you would need to pass the props down to each child component. In return, this would clutter every component passing down these props.

**When these props become mandatory, React's context gives you a way out of this mess**. Instead of passing down the props explicitly down each component, you can hide props, that are necessary for each component, in the React context object and pass them implicitly down to each component. The React context object traverses invisible down the component tree. When a component needs access to the context object, it can access it.

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
                      |     Consumes   |
                      |     Context    |
                      +----------------+
{{< /highlight >}}

**What are use cases for this approach?** For instance, your application could have a configurable colored theme. Each component should be colored depending on the configuration. The configuration is fetched once from your server, but afterward you want to make this implicitly accessible for all components. Therefore you could use React's context to give every component access to the colored theme.

**How is React's context provided and consumed?** Imagine you would have component A as root component that provides the context and component C as one of the child components that consumes the context. The application has a colored theme that can be used to style your components. Thus, you want to make the colored theme available for every component via the React context.

In your A component you would provide the context. It is a hardcoded colored theme property in this case, but it can be anything from component state to component props. When the context comes from the local state, it can be even changed by using `this.setState()`. As you can see, Component A displays component D but makes the context available to all its children. In the next part, you will see how the context is made available in component C as well.

{{< highlight javascript >}}
class A extends React.Component {
  getChildContext() {
    return {
      coloredTheme: "green"
    };
  }

  render() {
    return <D />;
  }
}

A.childContextTypes = {
  coloredTheme: PropTypes.string
};
{{< /highlight >}}

In your component C, somewhere below component D, you could consume the context object. Notice that component A doesn’t need to pass down anything via component D in the props.

{{< highlight javascript >}}
class C extends React.Component {
  render() {
    return (
      <div style={{ color: this.context.coloredTheme }}>
        {this.children}
      </div>
    );
  }
}

C.contextTypes = {
  coloredTheme: PropTypes.string
};
{{< /highlight >}}

By using the colored theme property from `this.context`, the component can derive its style. As you can imagine, following this way every component that needs to be styled according to the colored theme could get the necessary information from React's context API by using the Consumer component now.

{{% chapter_header "React's Provider Pattern" "react-provider-pattern" %}}

Both functionalities of React, context and children, are necessary to implement the provider pattern in React. These were the basics. Now you are able to implement it. Basically for the provider pattern there needs to be one part in the pattern that makes the properties accessible in the context and another part where components consume the context.

Let's start with the former: a Provider component.

{{< highlight javascript >}}
class ThemeProvider extends React.Component {
  getChildContext() {
    return {
      coloredTheme: this.props.coloredTheme
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

ThemeProvider.childContextTypes = {
  coloredTheme: PropTypes.string
};
{{< /highlight >}}

The Provider component only sets the colored theme from the incoming props. In addition, it only renders its children and doesn't add anything to the JSX.

After declaring the Provider component, you can use it anywhere in your React component tree. It makes most sense to use it at the top of your component hierarchy to make the context, the colored theme, accessible to everyone.

{{< highlight javascript >}}
const coloredTheme = "green";
// hardcoded theme
// however, imagine the configuration is located somewhere else
// and would be different for every user of your application
// it would need to be fetched first
// and varies depending on the app user

ReactDOM.render(
  <ThemeProvider coloredTheme={coloredTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById('app')
);
{{< /highlight >}}

Now, every child component can consume the colored theme provided by the `ThemeProvider` component. It doesn't need to be the direct child, in this case the `App` component, but any component down the component tree.

{{< highlight javascript >}}
class App extends React.Component {
  render() {
    return (
      <div>
        <Paragraph>
          That's how you would use children in React
        </Paragraph>
      </div>
    );
  }
}

class Paragraph extends React.Component {
  render() {
    const { coloredTheme } = this.context;
    return (
      <p style={{ color: coloredTheme }}>
        {this.props.children}
      </p>
    );
  }
}

Paragraph.contextTypes = {
  coloredTheme: PropTypes.string
};
{{< /highlight >}}

A stateless functional component would have access to React's context too, but only if `contextTypes` is defined as property of the function.

{{< highlight javascript >}}
class App extends React.Component {
  render() {
    return (
      <div>
        <Headline>Hello React</Headline>

        <Paragraph>
          That's how you would use children in React
        </Paragraph>
      </div>
    );
  }
}

...

function Headline(props, context) {
  const { coloredTheme } = context;
  return (
    <h1 style={{ color: coloredTheme }}>
      {props.children}
    </h1>
  );
}

Headline.contextTypes = {
  coloredTheme: PropTypes.string
};
{{< /highlight >}}

That's basically it for the provider pattern. You have the Provider component that makes properties accessible in React's context and components that consume the context. You could start to implement the pattern yourself now.

However, there is more you could read up on this topic below.

{{% chapter_header "React's Context in Higher Order Components" "react-context-higher-order-component" %}}

As mentioned, the provider pattern is often used when using state management libraries such as Redux or MobX. You will provide the state, that is managed by one of these libraries, via a Provider component. This Provider component uses React's context to pass down the state implicitly.

However, I guess you rarely or never used `this.context` down in your component tree when using a state management library. There is often a [higher order component](https://www.robinwieruch.de/gentle-introduction-higher-order-components/), coming from the state management library (such as `connect` in react-redux), that provides you the state in your component.

What would such higher order component, which provides React's context as props, look like? Basically the higher order component would look like the following:

{{< highlight javascript >}}
const getContext = contextTypes => Component => {
  class GetContext extends React.Component {
    render() {
      return <Component { ...this.props } { ...this.context } />
    }
  }

  GetContext.contextTypes = contextTypes;

  return GetContext;
};

// usage

class App extends React.Component {
  render() {
    return (
      <div>
        <Headline>Hello React</Headline>

        <Paragraph>
          That's how you would use children in React
        </Paragraph>

        <SubHeadlineWithContext>
          Children and Context
        </SubHeadlineWithContext>
      </div>
    );
  }
}

...

function SubHeadline(props) {
  return (
    <h2 style={{ color: props.coloredTheme }}>
      {props.children}
    </h2>
  );
}

const contextTypes = {
  coloredTheme: PropTypes.string
};

const SubHeadlineWithContext = getContext(contextTypes)(SubHeadline);
{{< /highlight >}}

Now you could wrap any component into the `getContext` higher order component and expose it to the colored theme property. The property would end up in the props and not in the context object anymore.

The higher order component that is showcased is a simplified version of the `getContext` higher order component that can be found in the {{% a_blank "recompose" "https://github.com/acdlite/recompose/blob/master/docs/API.md#withcontext" %}} library. Recompose has a bunch of these useful higher order components. You should have a look into the library.

A running application can be found in this {{% a_blank "GitHub repository" "https://github.com/rwieruch/react-provider-pattern" %}}. It showcases the previous shown examples of using functional stateless components and ES6 class components consuming the context, but also the higher order component approach with `getContext`. You could have a look into the *src/* folder and the *src/index.js* and *src/App.js* files.

<hr class="section-divider">

In the end, the provider pattern explains how the state layer is glued to your view layer when using a state management library. When using [Redux or MobX](https://www.robinwieruch.de/redux-mobx-confusion/), the state (store) is passed to your `Provider` component as props. The `Provider` component wraps the store into React's context and thus all child components can access the store. For instance, in Redux a higher-order component called `connect` is used to access the store again.