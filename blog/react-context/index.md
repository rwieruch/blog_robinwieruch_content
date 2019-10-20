---
title: "React Context"
description: "React Context is a powerful feature for passing props down the component tree without the need to tell components in between about them. React Context creates a Provider and Consumer component for tunnelling React components ..."
date: "2019-10-17T13:50:46+02:00"
categories: ["React"]
keywords: ["react context"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

React Context is a powerful feature. If your React application grows in size beyond a small application, there is nothing wrong in giving it a shot. Many third-party libraries like Redux are using it under the hood anyway, so why not learning about it.

Especially if your component hierarchy grows in vertical size, it becomes tedious [passing props several React components down](https://www.robinwieruch.de/react-pass-props-to-component/) -- from a parent component to a deeply nested child component. Most often all the React components in between are not interested in these props and just pass the props to the next child component until it reaches the desired child component.

This tutorial gives you a walkthrough of using React Context for a simple use case.

# React Context: Why

Do you remember the last time when you had to pass props several components down your component tree? In React, quite often you are confronted with this problem which is called "prop drilling":

```javascript
          +----------------+
          |                |
          |        A       |
          |        |Props  |
          |        v       |
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
                      |        +       |
                      |        |Props  |
                      |        C       |
                      |                |
                      +----------------+
```

In return, this clutters every component in between which has to pass down these props without using them. React Context gives you a way out of this mess. Instead of passing down the props down through each component, you can *tunnel* props through these components implicitly with React Context. If a component needs access to the information from the context, it can *consume* it on demand, because a top-level component *provides* this information in the context.

```javascript
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
```

**What are use cases for React Context?** For instance, imagine your React application has a theme for a color set. There are various components in your application which need to know about the theme to style themselves. Thus, at your top-level component, you can make the theme accessible for all the React child components below. That's where React's Context comes into play.

```javascript
          +----------------+
          |                |
          |       A        |
          |                |
          |     Provide    |
          |       Theme    |
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
                      |       Theme    |
                      +----------------+
```

**Who provides/consumes React Context?** React component A -- our top-level component -- provides the context and React component C -- as one of the child components -- consumes the context. Somewhere in between are components D and E though. Since components D and E don't care about the information, they don't consume the context. Only component C consumes it. If component any other component below component A wants to access the context, it can consume it though.

# React Context: How

First, you have to create the React Context itself which gives you access to a Provider and Consumer component. When you create the context with React by using `createContext`, you can pass it an initial value. The initial value can be null too.

```javascript
// src/ThemeContext.js

import React from 'react';

const ThemeContext = React.createContext(null);

export default ThemeContext;
```

Second, component A would have to provide the context with the given Provider component. In this case, its `value` is given to it right away, but it can be anything from component state (e.g. [fetched data](https://www.robinwieruch.de/react-fetching-data)) to props. If the value comes from a modifiable [React State](https://www.robinwieruch.de/react-state), the value passed to the Provider component can be changed too.

```javascript
// src/ComponentA.js

import React from 'react';
import ThemeContext from './ThemeContext';

const A = () => (
  <ThemeContext.Provider value="green">
    <D />
  </ThemeContext.Provider>
);
```

Component A displays only component D, doesn't pass any props to it though, but rather makes the value `green` available to all the React components below. One of the child components will be component C that consumes the context eventually.

Third, in your component C, below component D, you could consume the context object. Notice that component A doesn’t need to pass down anything via component D in the props so that it reaches component C.

```javascript
// src/ComponentC.js

import React from 'react';
import ThemeContext from './ThemeContext';

const C = () => (
  <ThemeContext.Consumer>
    {value => (
      <p style={{ color: value }}>
        Hello World
      </p>
    )}
  </ThemeContext.Consumer>
);
```

The component can derive its style by consuming the context. The Consumer component makes the passed context available by using a [render prop](https://www.robinwieruch.de/react-render-props). As you can imagine, following this way every component that needs to be styled according to the theme could get the necessary information from React's Context by using the ThemeContext's Consumer component now. You only have to use the Provider component which passes the value once somewhere above them.

# React Context: When

When should you use React Context? Generally speaking there are two use cases when to use it:

* When your React component hierarchy grows vertically in size and you want to be able to pass props to child components without bothering components in between. We have used this use case as example throughout this whole React Context tutorial.
* When you want to have [advanced state management in React with React Hooks](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/) for passing state and state updater functions via React Context through your React application. Doing it via React Context allows you to create a shared and global state.

<Divider />

A running application which uses React's Context can be found in this [GitHub repository](https://github.com/the-road-to-learn-react/react-context-example). After all, React Context is a great way to pass props to deeply nested React components, because it doesn't bother the components in between.

<LinkCollection label="This tutorial is part 1 of 2 in this series." links={[{ prefix: "Part 2:", label: "React's useContext Hook", url: "https://www.robinwieruch.de/react-usecontext-hook" }]} />