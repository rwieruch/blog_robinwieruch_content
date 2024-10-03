---
title: "Types of React Components [2024]"
description: "There are many types of React Components that make it difficult for React beginners. This tutorial goes through each React Component Type by example ..."
date: "2024-09-30T07:50:46+02:00"
categories: ["React"]
keywords: ["react component types", "types of react components"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Since React's release in 2013, various component types have emerged. Some are still essential to modern React applications, while others are mostly found in older projects (deprecated). This guide provides beginners with an overview of modern components and patterns, explaining which are still relevant and why some are no longer used. By the end, you'll be able to identify legacy and  modern React components and patterns.

# Table of Contents

<TableOfContents {...props} />

# React createClass

React initially relied on **createClass** (deprecated) for defining components as a factory function to create React Class Components without needing a JavaScript class. This approach was the standard for building React components before the introduction of JavaScript ES6 in 2015, because JavaScript ES5 lacked the native class syntax:

```tsx
import createClass from "create-react-class";

const CreateClassComponent = createClass({
  getInitialState: function () {
    return {
      text: "",
    };
  },

  handleChangeText: function (event) {
    this.setState({ text: event.target.value });
  },

  render: function () {
    return (
      <div>
        <p>Text: {this.state.text}</p>

        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChangeText}
        />
      </div>
    );
  },
});

export default CreateClassComponent;
```

In this example, React's `createClass()` factory method takes an object that defines the methods for a React component. The `getInitialState()` function is used to initialize the component's state, while the required `render()` method handles displaying the output using JSX. Additional methods, such as `incrementCounter()`, can be added to the object to serve as event handlers for the component.

Lifecycle methods for side-effects were available as well. For instance, in order to write every time the `text` value from the state to the browser's local storage, we could make use of the `componentDidUpdate()` lifecycle method. In addition, the value can be read from the local storage when the component receives its initial state:

```tsx{6,10-12}
import createClass from "create-react-class";

const CreateClassComponent = createClass({
  getInitialState: function () {
    return {
      text: localStorage.getItem("text") || "",
    };
  },

  componentDidUpdate: function () {
    localStorage.setItem("text", this.state.text);
  },

  handleChangeText: function (event) {
    this.setState({ text: event.target.value });
  },

  render: function () {
    return (
      <div>
        <p>Text: {this.state.text}</p>

        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChangeText}
        />
      </div>
    );
  },
});

export default CreateClassComponent;
```

React's createClass method is no longer available in the React core package. If you want to try it, you have to install an additional node package called [create-react-class](https://www.npmjs.com/package/create-react-class).

# React Mixins (Pattern)

**React Mixins** (deprecated) got introduced as React's first pattern for reusable component logic. With a Mixin in React, it was possible to extract logic from a React component as a standalone object. When using a Mixin in a component, all features from the Mixin are introduced to the component:

```tsx{3-13,16}
import createClass from "create-react-class";

const LocalStorageMixin = {
  getInitialState: function () {
    return {
      text: localStorage.getItem("text") || "",
    };
  },

  componentDidUpdate: function () {
    localStorage.setItem("text", this.state.text);
  },
};

const CreateClassWithMixinComponent = createClass({
  mixins: [LocalStorageMixin],

  handleChangeText: function (event) {
    this.setState({ text: event.target.value });
  },

  render: function () {
    return (
      <div>
        <p>Text: {this.state.text}</p>

        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChangeText}
        />
      </div>
    );
  },
});

export default CreateClassWithMixinComponent;
```

The `LocalStorageMixin` encapsulates the logic for managing the `text` state within the local storage, initializing the `text` in `getInitialState` and updating it in `componentDidUpdate`. By adding the Mixin to the `mixins` array, the component can reuse this shared functionality without duplicating code.

However, Mixins in React are not used anymore, because they came with several [drawbacks](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html) and were only used in createClass components.

# React Class Components

**React Class Components** (not recommended) were introduced in version 0.13, which was released in March 2015. Prior to this, developers used the createClass function to define components, but eventually React deprecated createClass in version 15.5 (April 2017) and recommended using Class Components instead.

Class Components were introduced as a way to utilize native JavaScript classes (due to the ES6 release in 2015), because JS classes were made available to the language:

```tsx
import React from "react";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
    };

    this.handleChangeText = this.handleChangeText.bind(this);
  }

  handleChangeText(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <div>
        <p>Text: {this.state.text}</p>

        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChangeText}
        />
      </div>
    );
  }
}

export default ClassComponent;
```

A React Component written with a JavaScript class comes with methods like the class constructor -- which is primarily used in React to set initial state or to bind methods -- and the mandatory render method to return JSX as output.

All the internal React Component logic comes from the object-oriented inheritance. But note that it was never recommended to use inheritance for more than that. Instead, it has been always recommended to use composition over inheritance.

<ReadMore label="Composition in React" link="/react-component-composition/" />

An alternative syntax for JavaScript classes used in React components allows for autobinding methods through the use of ES6 arrow functions:

```tsx{11-12,15}
import React from "react";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
    };

    // not needed if using arrow function for handleChangeText
    // this.handleChangeText = this.handleChangeText.bind(this);
  }

  handleChangeText = (event) => {
    this.setState({ text: event.target.value });
  };

  render() {
    return (
      <div>
        <p>Text: {this.state.text}</p>

        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChangeText}
        />
      </div>
    );
  }
}

export default ClassComponent;
```

React Class Components offer several lifecycle methods for the mounting, updating, and unmounting of the component as well. In case of our local storage example from before, we can introduce it as side-effect with lifecycle methods too:

```tsx{8,14-16}
import React from "react";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: localStorage.getItem("text") || "",
    };

    this.handleChangeText = this.handleChangeText.bind(this);
  }

  componentDidUpdate() {
    localStorage.setItem("text", this.state.text);
  }

  handleChangeText(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <div>
        <p>Text: {this.state.text}</p>

        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChangeText}
        />
      </div>
    );
  }
}

export default ClassComponent;
```

With the release of React Hooks in version 16.8 (February 2019), Function Components with Hooks became the industry standard, effectively rendering React Class Components somewhat obsolete. Before this, Class Components and Function Components coexisted, as Function Components lacked the ability to manage state or handle side effects without the use of Hooks.

# React Higher-Order Components (Pattern)

React Higher-Order Components (HOCs) (not recommended anymore) have been a popular advanced React pattern for reusable logic across React components.

<ReadMore label="Learn more about React Higher-Order Components" link="/react-higher-order-components/" />

The shortest explanation for a **Higher-Order Component** is that it is a component which takes a component as input and returns the component as output with extended functionalities. Let's revisit the example with the extracted local storage functionality:

```tsx{3-31,37,41-42,49}
import React from "react";

const withLocalStorage = (storageKey) => (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        value: localStorage.getItem(storageKey) || "",
      };
    }

    componentDidUpdate() {
      localStorage.setItem(storageKey, this.state.value);
    }

    onChangeValue = (event) => {
      this.setState({ value: event.target.value });
    };

    render() {
      return (
        <Component
          value={this.state.value}
          onChangeValue={this.onChangeValue}
          {...this.props}
        />
      );
    }
  };
};

class ClassComponent extends React.Component {
  render() {
    return (
      <div>
        <p>Text: {this.props.value}</p>

        <input
          type="text"
          value={this.props.value}
          onChange={this.props.onChangeValue}
        />
      </div>
    );
  }
}

export default withLocalStorage("text")(ClassComponent);
```

Another popular advanced React pattern are **React Render Prop Components**, which are often used as alternative to React Higher-Order Components. It's worth noting that HOCs and Render Prop Components can be used for both Class Components (as seen above) and Function Components (see below).

<ReadMore label="Learn more about React Render Prop Components" link="/react-render-props/" />

Both React's Higher-Order Components and React's Render Prop Components are not much used in modern React applications anymore. These days React Function Components with React Hooks are the norm for sharing logic across components.

# React Function Components

React Function Components (FC) (sometimes called **Functional Components**) are used as replacement for React Class Components. They are expressed as functions instead of classes. In the past, it wasn't possible to use state or side-effects in FCs, that's why they were also called **Functional Stateless Components**, but that's not the case anymore with React Hooks which re-branded them to Function Components.

<ReadMore label="Learn more about React Function Components" link="/react-function-component/" />

<ReadMore label="Learn more about React Hooks" link="/react-hooks/" />

**React Hooks** brought state and side-effects to **Function Components** which make them these days the *industry standard for modern React applications*. React comes with a variety of built-in hooks, but also the ability to create custom hooks. Let's see how the previous React Class Component can be used as a React Function Component:

```tsx
import { useState } from "react";

const FunctionComponent = () => {
  const [text, setText] = useState("");

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <p>Text: {text}</p>

      <input type="text" value={text} onChange={handleChangeText} />
    </div>
  );
};

export default FunctionComponent;
```

The previous code shows the Function Component with React's built-in [useState Hook](/react-usestate-hook/) for managing state. But React Hooks were also introduced to bring side-effects to Function Components. The following code shows [React's useEffect Hook](/react-useeffect-hook/) which is executed every time the value of the state changes:

```tsx{1,4,6-8}
import { useEffect, useState } from "react";

const FunctionComponent = () => {
  const [text, setText] = useState(localStorage.getItem("text") || "");

  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <p>Text: {text}</p>

      <input type="text" value={text} onChange={handleChangeText} />
    </div>
  );
};

export default FunctionComponent;
```

Last but not least, we can extract both hooks as one encapsulated Custom Hook which makes sure to synchronize the component state with the local storage. In the end, it returns the necessary value and setter function to be used in the Function Component:

```tsx{3-11,14}
import { useEffect, useState } from "react";

const useLocalStorage = (storageKey) => {
  const [value, setValue] = useState(localStorage.getItem(storageKey) || "");

  useEffect(() => {
    localStorage.setItem(storageKey, value);
  }, [storageKey, value]);

  return [value, setValue];
};

const FunctionComponent = () => {
  const [text, setText] = useLocalStorage("text");

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <p>Text: {text}</p>

      <input type="text" value={text} onChange={handleChangeText} />
    </div>
  );
};

export default FunctionComponent;
```

Since it is extracted from the Function Component, it can be reused for any other component to share reusable business logic. It's an abstraction and advanced pattern in React equivalent to Mixins, Higher-Order Components, and Render Prop Components.

<ReadMore label="Learn more about React Custom Hooks" link="/react-custom-hook/" />

While Mixins were only used for createClass components, Higher-Order Components and Render Prop Components are used for both Class and Function Components. But the recommended way to share logic across components is to use Custom Hooks.

# React Server Components

React's most recent addition (2023) are React Server Components (RSC) which allow developers to execute components on the server. Main benefits: only HTML is sent to the client and the component is allowed to access server-side resources.

Because Server Components execute on the server, it's not possible to show a one to one comparison with the previous examples, because they serve a different use case. The example below shows how a Server Component can fetch data from a server-side resource (i.e. database) before sending the JSX as rendered HTML to the client:

```tsx{1-2}
const ReactServerComponent = async () => {
  const posts = await db.query("SELECT * FROM posts");

  return (
    <div>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReactServerComponent;
```

With the emergence of Server Components, React also introduced the term **Client Components** which are the traditional React Components that run on the client-side with JavaScript, so essentially everything that you have seen before in this guide.

Server Components, in contrast to Client Components, cannot use React Hooks or any JavaScript (e.g. attaching [event handlers](/react-event-handler/)), because they run on the server.

<ReadMore label="Learn full-stack development with Next.js" link="https://www.road-to-next.com/" />

React itself only provides the underlying specification and building blocks for Server Components, but it relies on a React framework (e.g. Next.js) to implement them.

# Async Components

Currently, Async Components are only supported for Server Components, but they are expected to be supported for Client Components in the future. If a component is marked as async, it can perform asynchronous operations (e.g. fetching data).

You saw this behavior in the previous Server Component example, where the component fetched data from a database before sending the rendered JSX as HTML to the client. This does not work in a Client Component because it would block the component's rendering on the client-side.

At the moment, you can only pass a JavaScript Promise to a Client Component:

```tsx
import { Suspense } from "react";

const ReactServerComponent = () => {
  const postsPromise = db.query("SELECT * FROM posts");

  return (
    <div>
      <Suspense>
        <ReactClientComponent promisedPosts={postsPromise} />
      </Suspense>
    </div>
  );
};
```

And resolve it with React's use API in the Client Component:

```tsx
"use client";

import { use } from "react";

const ReactClientComponent = ({ promisedPosts }) => {
  const posts = use(promisedPosts);

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export { ReactClientComponent };
```

In the future, it's likely that React will support async components for Client Components, enabling you to fetch data within a Client Component before rendering it.

<Divider />

All React Components share the common sense of how to use [React Props](/react-pass-props-to-component/), because they are just used to pass information down the component tree. However, the usage of state and side-effects varies for Class Components and Function Components.

This guide has shown you all the different Types of React Components, how they are used, and how they are put into a historical context. Here you can find [all the examples](https://github.com/rwieruch/examples/tree/main/react-component-types).

