+++
title = "React's useReducer vs Redux"
description = "Does useContext and useReducer replace Redux? Since React Hooks were released in React, developers are wondering whether they still need Redux for their React application ..."
date = "2019-05-13T07:52:46+02:00"
tags = ["JavaScript"]
categories = ["JavaScript"]
keywords = ["useReducer vs redux", "useReducer redux"]
news_keywords = ["useReducer vs redux", "useReducer redux"]
hashtag = "#ReactJs"
card = "img/posts/redux-vs-usereducer/banner_640.jpg"
banner = "img/posts/redux-vs-usereducer/banner.jpg"
contribute = "redux-vs-usereducer.md"
headline = "React's useReducer vs Redux"

summary = "Does useContext and useReducer replace Redux? Since React Hooks were released in React, developers are wondering whether they still need Redux for their React application."
+++

{{% sponsorship %}}

{{% pin_it_image "redux usereducer" "img/posts/redux-vs-usereducer/banner.jpg" "is-src-set" %}}

Since [React Hooks](https://www.robinwieruch.de/react-hooks/) have been released, [function components](https://www.robinwieruch.de/react-function-component/) can use state and side-effects. There are two hooks that are used for modern state management in React (useState and useReducer) and one hook to use [React's Context API (useContext)](https://www.robinwieruch.de/react-context-api/) to pass state or state updater functions down the component tree. Now, many people keep wondering: **Does useContext and useReducer replace Redux?** As of the time of writing this article, React Hooks don't replace Redux.

Requirements: Check out the following tutorials, if you haven't learned about [reducers in JavaScript](https://www.robinwieruch.de/javascript-reducer/) or [useReducer in React](https://www.robinwieruch.de/react-usereducer-hook/). It's good to know about the fundamentals before entering this discussion about Redux vs useReducer. Also if you want to learn more about Redux, check out this extensive [Redux tutorial](https://www.robinwieruch.de/react-redux-tutorial/).

{{% chapter_header "Global State Container and Component Co-Located State" "redux-usereducer-state" %}}

Where your state is managed is a crucial difference between Redux and useReducer. While Redux creates **one global state container** -- which hangs somewhere *above* your whole application --, useReducer creates **independent component co-located state containers** within your components. Let this fact sink for a moment before we continue extending useReducer's component co-located state management philosophy.

{{< highlight javascript >}}
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
{{< /highlight >}}

[Using useContext in combination with useReducer](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/) takes the component co-located state management on another level. Suddenly the state created by useReducer and its dispatch function can be passed to any component from any top-level component. That's also possible by only using [React props](https://www.robinwieruch.de/react-pass-props-to-component/), but [React's Context API](https://www.robinwieruch.de/react-context-api/) makes your state and dispatch function available anywhere without explicitly passing everything down the component tree.

{{< highlight javascript >}}
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
{{< /highlight >}}

However, even though we are able to lift all the useReducer state up to our most top-level component -- almost making Redux obsolete because it can be seen as global state container -- it still isn't *one global* state container. There are two ingredients missing from Redux to make it *one* and *global*.

* **One:** First, there is no native feature (yet) which {{% a_blank "combines all reducers to one ultimate reducer" "https://redux.js.org/api/combinereducers" %}}. Redux is offering this feature, but in plain React we would have to implement it ourselves. Only if we were able to combine all state containers form all useReducer hooks, we could speak of *one* state container.

* **Global:** Second, every useReducer comes with its own dispatch function. There is no native feature (yet) which combines all dispatch functions to one dispatch function. Redux provides one dispatch function that consumes *any* action dedicated for *any* reducer function. The dispatch function from useReducer, in contrast, only deals with action that are specified by the reducer function to be consumed.

While useReducer is a part of how Redux works, it isn't Redux. The useReducer function is tightly coupled to its reducer which holds also true for its dispatch function. We dispatch action objects to that reducer only. Whereas in Redux, the dispatch function sends the action object to the store which distributes it to all its combined reducer functions. You can think of Redux as one global event bus which takes any events (actions) and processes them into a new state.

{{% chapter_header "No Middleware with useReducer" "redux-usereducer-middleware" %}}

Redux comes with a rich middleware ecosystem. A simple example for a middleware in Redux is the {{% a_blank "action logger" "https://github.com/LogRocket/redux-logger" %}}: Every action that goes through Redux will be logged in your browser's developer tools. You can see how your state looks like after and before the dispatched action went through your reducers. That's only one example for a middleware in Redux though. There are plenty of them.

There is no middleware for useReducer (yet). Since it's not one global state container (see previous section), it's difficult to apply such middleware globally, but also it's not easily done to convert Redux's middleware 1:1 for useReducer in the first place. If you are using useReducer + useContext as replacement for Redux, you may miss this rich ecosystem of middleware for your React application.

{{% sub_chapter_header "No Side-Effect Middleware" "redux-usereducer-middleware-side-effect" %}}

Popular side-effect libraries in Redux are {{% a_blank "Redux Thunk" "https://github.com/reduxjs/redux-thunk" %}} and {{% a_blank "Redux Saga" "https://github.com/redux-saga/redux-saga" %}}. They are not only used for asynchronous logic (e.g. data fetching), but also for a centralized control flow of state transitions in your applications. Especially Redux Saga can be used to set up complex control flows within your state management system. It opens up another dimension of state management with Redux which are only rarely needed in common React applications.

<hr class="section-divider">

These two things are the main points which are missing to make useReducer plus other things (e.g. useContext) a full-fledged Redux implementation. Maybe we will get there, but then the best argument against it would be: Why do we want to reinvent the wheel? Anyway, please let me know in the comments how useReducer + useContext make up a valid Redux alternative for you.

Otherwise, there are a few rules of thumb to follow: If you state management doesn't need all the Redux features, use useState, useReducer and useContext. If your state management needs Redux as *one global state container with middleware*, introduce Redux to your application.

* Use useState for basic and simple/small size applications.
* Use useState + useReducer + useContext for advanced/medium size applications.
* Use useState/useReducer + Redux for complex/large size applications.

Of course there are many nuances. For instance, using [useState or useReducer](https://www.robinwieruch.de/react-usereducer-vs-usestate) comes with its own benefits. The same applies for [using Redux](https://www.robinwieruch.de/learn-react-before-using-redux/) in your React application. You may get to a point where a middleware to implement complex control flows or side-effects comes in handy or where you cannot do without {{% a_blank "Redux Dev Tools" "https://github.com/reduxjs/redux-devtools" %}} or time travel debugging. Everything comes with trade-offs, but everything has still its place in React's ecosystem.