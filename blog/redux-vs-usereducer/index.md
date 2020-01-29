---
title: "React's useReducer vs Redux"
description: "Does useContext and useReducer replace Redux? Since React Hooks were released in React, developers are wondering whether they still need Redux for their React application ..."
date: "2019-05-13T07:52:46+02:00"
categories: ["React"]
keywords: ["useReducer vs redux", "useReducer redux"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Since [React Hooks](/react-hooks/) have been released, [function components](/react-function-component/) can use state and side-effects. There are two hooks that are used for [modern state management in React (useState and useReducer)](/react-state) and one hook called [useContext](/react-usecontext-hook) to use [React's Context API](/react-context/) to pass state or state updater functions down the component tree. Now, many people keep wondering: **Does useContext and useReducer replace Redux?** As of the time of writing this article, React Hooks don't replace Redux.

Requirements: Check out the following tutorials, if you haven't learned about [reducers in JavaScript](/javascript-reducer/) or [useReducer in React](/react-usereducer-hook/). It's good to know about the fundamentals before entering this discussion about Redux vs useReducer. Also if you want to learn more about Redux, check out this extensive [Redux tutorial](/react-redux-tutorial/).

# Global State Container and Component Co-Located State

Where your state is managed is a crucial difference between Redux and useReducer. While Redux creates **one global state container** -- which hangs somewhere *above* your whole application --, useReducer creates a **independent component co-located state container** within your component. Let this fact sink for a moment before we continue extending useReducer's component co-located state management philosophy.

```javascript
          +----------------+              +----------------+
          |  Component A   |              |                |
          |                |              |                |
          |                |              |      Redux     |
          +----------------+              |                |
          | connect Redux  |<-------------|                |
          +--------+-------+              +--------+-------+
                   |                               |
         +---------+-----------+                   |
         |                     |                   |
         |                     |                   |
+--------+-------+    +--------+-------+           |
|  Component B   |    |  Component C   |           |
|                |    |                |           |
|                |    |                |           |
+----------------+    +----------------+           |
|    useReducer  |    | connect Redux  |<----------+
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |  Component D   |
                      |                |
                      |                |
                      +----------------+
                      |    useReducer  |
                      +----------------+
```

[Using useContext in combination with useReducer](/react-state-usereducer-usestate-usecontext/) takes the component co-located state management on another level. Suddenly the state container created by useReducer and its dispatch function can be passed to any component from any top-level component. It can be also the most top-level component to make the state "global". It's also possible to pass things down only by using [React props](/react-pass-props-to-component/), but [React's Context API](/react-context/) makes your state and dispatch function available anywhere without explicitly passing everything down the component tree.

```javascript
          +----------------+
          |  Component A   |
          +----------------+
          |    useReducer  |
          |    useReducer  |
          |    <Provide /> |
          +--------+-------+
                   |
         +---------+-----------+
         |                     |
         |                     |
+--------+-------+    +--------+-------+
|  Component B   |    |  Component C   |
|                |    |                |
|                |    |                |
+----------------+    +----------------+
|    <Consume /> |    |                |
+----------------+    +--------+-------+
                               |
                      +--------+-------+
                      |  Component D   |
                      |                |
                      |                |
                      +----------------+
                      |    <Consume /> |
                      +----------------+
```

However, even though we are able to lift all the useReducer state up to our most top-level component -- almost making Redux obsolete because it can be seen as global state container -- it still isn't *one global* state container. There are two ingredients missing from Redux to make it *one* and *global*.

* **One:** First, there is no native feature (yet) which [combines all reducers to one ultimate reducer](https://redux.js.org/api/combinereducers). Redux is offering this feature, but in plain React we would have to implement it ourselves. Only if we were able to combine all state containers form all useReducer hooks, we could speak of *one* state container.

* **Global:** Second, every useReducer comes with its own dispatch function. There is no native feature (yet) which combines all dispatch functions to one dispatch function. Redux provides one dispatch function that consumes *any* action dedicated for *any* reducer function. The dispatch function from useReducer, in contrast, only deals with action that are specified by the reducer function to be consumed.

While useReducer with its reducer is a part of how Redux works, it isn't Redux. The useReducer function is tightly coupled to its reducer which holds also true for its dispatch function. We dispatch action objects to that reducer only. Whereas in Redux, the dispatch function sends the action object to the store which distributes it to all its combined reducer functions. You can think of Redux as one global event bus which takes any events (actions) and processes them into a new state based on the action's payload and the previous state.

# No Middleware with useReducer

Redux comes with a rich middleware ecosystem. A simple example for a middleware in Redux is the [action logger](https://github.com/LogRocket/redux-logger): Every action that goes through Redux will be logged in your browser's developer tools. You can see how your state looks like after and before the dispatched action went through your reducers. That's only one example for a middleware in Redux though. There are plenty of them.

There is no middleware for useReducer (yet). Since it's not one global state container (see previous section), it's difficult to apply such middleware globally, but also it's not easily done to convert Redux's middleware 1:1 for useReducer in the first place. If you are using useReducer + useContext as replacement for Redux, you may miss this rich ecosystem of middleware for your React application.

## No Side-Effect Middleware

Popular side-effect libraries in Redux are [Redux Thunk](https://github.com/reduxjs/redux-thunk) and [Redux Saga](https://github.com/redux-saga/redux-saga). They are not only used for asynchronous logic (e.g. data fetching), but also for a centralized control flow of state transitions in your applications. Especially Redux Saga can be used to set up complex control flows within your state management system. It opens up another dimension of state management with Redux which are only rarely needed in day-to-day React applications.

<Divider />

These two things are the main points which are missing to make useReducer plus other things (e.g. useContext) a full-fledged Redux implementation. Maybe we will get there, but then the best argument against it would be: Why do we want to reinvent the wheel? Anyway, please let me know in the comments how useReducer + useContext make up a valid Redux alternative for you.

I guess there are a few rules of thumb to follow: If you state management doesn't need all the Redux features, use useState, useReducer and useContext. If your state management needs Redux as *one global state container with middleware*, introduce Redux to your application to handle state logic in complex and large applications.

* Use useState for basic and simple/small size applications.
* Use useState + useReducer + useContext for advanced/medium size applications.
* Use useState/useReducer + Redux for complex/large size applications.

Of course there are many nuances. For instance, using [useState or useReducer](/react-usereducer-vs-usestate) comes with its own benefits. The same applies for [using Redux](/learn-react-before-using-redux/) in your React application. You may get to a point where a middleware to implement complex control flows or side-effects comes in handy or where you cannot do without [Redux Dev Tools](https://github.com/reduxjs/redux-devtools) or time travel debugging. Everything comes with trade-offs, but everything has still its place in React's ecosystem.
