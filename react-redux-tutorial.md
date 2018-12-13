+++
title = "React Redux Tutorial for Beginners [2018]"
description = "A complete React Redux tutorial for beginners: Learn how to build React Redux applications from scratch by following this step by step implementation of an example application ..."
date = "2018-12-13T13:50:46+02:00"
tags = ["React", "Redux", "JavaScript"]
categories = ["React", "Redux", "JavaScript"]
keywords = ["react redux tutorial", "react redux tutorial for beginners", "react redux tutorial beginner", "react redux basic tutorial", "react redux tutorial simple", "react redux tutorial example", "react redux tutorial with example", "react redux tutorial 2018", "react redux tutorial pdf", "react redux tutorial step by step", "react redux starter kit tutorial", "react redux tutorial from scratch"]
news_keywords = ["react redux tutorial", "react redux tutorial for beginners", "react redux tutorial beginner", "react redux basic tutorial", "react redux tutorial simple", "react redux tutorial example", "react redux tutorial with example", "react redux tutorial 2018", "react redux tutorial pdf", "react redux tutorial step by step", "react redux starter kit tutorial", "react redux tutorial from scratch"]
hashtag = "#ReactJs"
card = "img/posts/react-redux-tutorial/banner_640.jpg"
banner = "img/posts/react-redux-tutorial/banner.jpg"
contribute = "react-redux-tutorial.md"
headline = "React Redux Tutorial for Beginners [2018]"

summary = "I had always trouble to reference beginners to a React Redux tutorial. There are many great tutorials and courses out there. But the best case for me would always have been to have a tutorial that I wished to have when I was learning Redux myself. That's what I try to accomplish with this pragmatic React Redux tutorial for beginners."
+++

{{% sponsorship %}}

{{% pin_it_image "react redux tutorial" "img/posts/react-redux-tutorial/banner.jpg" "is-src-set" %}}

Even though I have written a book about Redux in React, it may be too heavy on the subject for someone who wants only to try out a React Redux tutorial. That's why I extracted this chapter from my book to be read as a tutorial for beginners on my website for free to learn the basics about Redux and Redux in React. And who knows, if you want to dig deeper into the topic, you can still try out my book about Redux in React called {{% a_blank "Taming the State in React" "https://roadtoreact.com" %}} to learn more advanced techniques, best practices and enhancing libraries for Redux. Not all topics are explained greatest detail here, so I encourage you to give the book a shot afterward.

If you are a React beginner, I highly recommend you to get yourself comfortable with React in the first place. In this tutorial, we will use Redux for state management instead of React's local state management even though the latter may be a better choice for this simple application. If you are looking for something to get yourself started in React, checkout [The Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/). Grab your free PDF, EPUB, or MOBI and get started learning React first. The application we are going to build in this tutorial is similar to the application from the React book, but this time it uses Redux instead of React's local state management. It's great to see both applications in contrast though. If you want to test yourself whether you are ready for Redux or not, read up [all the things you should know about React's local state management before using Redux](https://www.robinwieruch.de/learn-react-before-using-redux/).

{{% chapter_header "Table of Contents" "toc" %}}

* [How to learn X with React Redux?](#react-redux-and-x-tutorial)
* [What is Redux?](#redux-introduction)
* [Basics in Redux without React](#redux-without-react)
  * [Action(s)](#redux-actions)
  * [Reducer(s)](#redux-reducers)
  * [Redux Store](#redux-store)
  * [Redux without React: Example](#redux-without-react)
* [The React Redux Project](#react-redux-starter-kit)
  * [Basic React Components](#react-redux-basic-components)
  * [Simple Styling for React Components](#react-components-simple-styling)
  * [Feature: Archive a Story](#react-redux-remove-item)
  * [Redux Store + Reducers](#redux-store-reducer)
  * [Redux: How to combine Reducers](#redux-combine-reducers)
  * [Redux: Actions](#redux-actions)
  * [Redux: Selectors](#redux-selectors)
  * [Redux: Re-render React](#redux-re-render-react)
  * [Redux Middleware](#redux-middleware)
  * [Redux: Action Creators](#redux-action-creators)
  * [Connect React with Redux](#connect-react-with-redux)
  * [Redux: Lift Connection](#redux-lift-connection)
  * [Redux and Data Fetching](#redux-data-fetching)
  * [Separation of API logic](#separation-api-logic)
  * [Redux: Error Handling](#redux-error-handling)
  * [Tests in Redux](#redux-tests)

{{% chapter_header "How to learn X with React Redux?" "react-redux-and-x-tutorial" %}}

Before we get started, one thing should be clear: This React Redux tutorial for beginners only involves React, Redux and a bit of Redux's ecosystem. It doesn't involve all the nitty gritty details, advanced techniques, and opinionated ways of doing things in Redux, because that's explained in-depth in my other book called Taming the State in React. Instead, it's a straight forward and hopefully simple React Redux tutorial.

There are many people looking for a tutorial with another complementary solution (Webpack, TypeScript, React Router, GraphQL) on top of React and Redux, but that's not what this tutorial is about. Learning Redux after you have learned React is the one step in a step by step learning process you may be looking for. My advice for people looking for a tutorial that includes another complementary solution on top of React and Redux:

* go through my book The Road to learn React
* afterward go through this React Redux tutorial (and maybe through the book too)
* then learn the third complementary solution (e.g. Webpack) separately
* apply your learnings for the complementary solution in this example application from this tutorial

My recommendations on how to learn these other solutions on top of React Redux:

* **React, Redux & Webpack**: In this tutorial, you will use create-react-app to setup your React application. It leaves out all the tooling (Webpack, Babel, ...) to keep you focused on Redux in React. If you want to learn how to use Webpack in React Redux applications, checkout this [React + Webpack + Babel Setup Tutorial](https://www.robinwieruch.de/minimal-react-webpack-babel-setup) instead. In that tutorial, you will set up a minimal React application with Webpack. Afterward, you should be able to transfer the source code from this React Redux tutorial to your minimal React with Webpack starter kit project. Then you have a React Redux Webpack example application up and running.

* **React, Redux & TypeScript**: In this tutorial, you will use JavaScript with a couple of features from future ECMAScript versions. You will not use TypeScript. However, you can head over to the {{% a_blank "official TypeScript website" "https://www.typescriptlang.org/" %}} to learn more about it. Build a small project with it and then apply your learning in this React Redux tutorial by refactoring your project to TypeScript. Then you have a React Redux TypeScript example application up and running.

* **React, Redux & React Router**: In this tutorial, you will only implement a couple of components. Thus there is no client-side navigation from URL to URL involved. However, at some point you may want to add navigation to your project. Then you can head over to this [React Firebase tutorial](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/) which teaches you React Router on the side. Even though the main focus lies in implementing authentication and authorization in React (with Redux) by using Firebase, you will learn about the navigation with React Router too. Afterward, you can come back to this React Redux tutorial and add React Router on top of it. Then you have a React Redux React Router example application up and running.

* **React, Redux & Firebase**: You will not use a database in this React Redux tutorial. When people ask me about persisting data in React (with Redux) applications, my initial recommendation for them is to checkout Firebase. Same as for the React Redux Router recommendation, head over to this [React with Firebase (and Redux) tutorial](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/). It will teach you how to setup Firebase in your React application, how to use it with basic React but also React and Redux, and how to implement a registration, login, and logout with React Redux and Firebase.

* **React Redux & GraphQL**: Adding GraphQL to your application, and thus a GraphQL client library (e.g. Apollo Client) to React, is another level of abstraction on top of it. If you want to learn more about GraphQL, head over to this [React GraphQL tutorial](https://www.robinwieruch.de/react-with-graphql-tutorial/). You will learn how to use GraphQL with HTTP and Apollo Client in a React application. Afterward, this [quick tutorial series](https://www.robinwieruch.de/react-redux-apollo-client-state-management-tutorial/) may be useful to learn about combining GraphQL and Redux in your React application.

As you have seen, there are many third-party solutions that you may want to use with React and Redux. My biggest advice on this: Do it step by step. With each of the referenced tutorials, you take another step. In the end, you should be able to combine any other solution, be it TypeScript or GraphQL, with React and Redux.

{{% chapter_header "What is Redux?" "redux-introduction" %}}

Redux is one of the libraries that helps you implement sophisticated state management in your application. It goes beyond the local state (e.g. React's local state) of a component. It is one of the solutions you would take in a larger application in order to tame the state. A React application is a perfect fit for Redux, yet other libraries and frameworks highly adopted its concepts as well.

**Why is Redux that popular in the JavaScript community?** In order to answer that question, I have to go a bit into the past of JavaScript applications. In the beginning, there was one library to rule them all: jQuery. It was mainly used to manipulate the DOM, to amaze with animations and to implement reusable widgets. It was the number one library in JavaScript. There was no way around it. However, the usage of jQuery skyrocketed and applications grew in size. But not in size of HTML and CSS, it was rather the size of code in JavaScript. Eventually, the code in those applications became a mess, because there was no proper architecture around it. The infamous spaghetti code became a problem in JavaScript applications.

It was about time for new solutions to emerge which would go beyond jQuery. These libraries, most of them frameworks, would bring the tools for proper architectures in frontend applications. In addition, they would bring opinionated approaches to solve problems. These solutions enabled developers to implement single page applications (SPAs).

Single page applications became popular when the first generation of frameworks and libraries, among them Angular, Ember and Backbone, were released. Suddenly, developers had frameworks to build scaling frontend applications. However, as history repeats itself, with every new technology there will be new problems. In SPAs every solution had a different approach for state management. For instance, Angular 1 used the infamous two-way data binding. It embraced a bidirectional data flow. Only after applications grew in size, the problem of state management became widely known.

During that time React was released by Facebook. It was among the second generation of SPA solutions. Compared to the first generation, it was a library that only leveraged the view layer. It came with its own state management solution though: React's local state management.

In React, the principle of the unidirectional data flow became popular. State management should be more predictable in order to reason about it. Yet, the local state management wasn't sufficient anymore eventually. React applications scaled very well, but ran into the same problems of predictable and maintainable state management when building larger applications. Even though the problems weren't as destructive as in bidirectional data flow applications (Angular 1), there was still a problem once the application got larger. That was the time when Facebook introduced the Flux architecture.

The Flux architecture is a pattern to deal with state management in scaling applications. The official website says that *"[a] unidirectional data flow is central to the Flux pattern [...]"*. The data flows only in one direction. Apart from the unidirectional data flow, the Flux architecture came with four essential components: Action, Dispatcher, Store and View. The View is basically the component tree in a modern application. For instance, React is able to implement such a View. A user can interact with the View in order to trigger an Action eventually (e.g. a click on a button). An Action would encapsulate all the necessary information to update the state in the Store(s). The Dispatcher on the way delegates the Actions to the Store(s). Then, the new state would be propagated from the Store(s) to the View to update them. The last part closes the loop of the unidirectional data flow.

The data flow goes in one direction. A View can trigger an Action, that goes through the Dispatcher and Store, and would change the View eventually when the state in the Store changed. The unidirectional data flow is enclosed in this loop. Then again, a View can trigger another Action. Since Facebook introduced the Flux architecture, the View was associated with React and its components.

You can [read more about the Flux architecture on the official website](https://facebook.github.io/flux/). There you will find a [video about its introduction at a conference](https://youtu.be/nYkdrAPrdcw?list=PLb0IAmt7-GS188xDYE-u1ShQmFFGbrk0v) too. If you are interested about the origins of Redux, I highly recommend reading and watching the material. After all, Redux became the successor library of the Flux architecture. Even though there were several solutions that implemented (partly) the Flux architecture, Redux managed to surpass them. But why did it succeed?

[Dan Abramov](https://twitter.com/dan_abramov) and [Andrew Clark](https://twitter.com/acdlite) are the creators of Redux. It was [introduced by Dan Abramov at React Europe](https://www.youtube.com/watch?v=xsSnOQynTHs) in 2015. However, the talk by Dan doesn't introduce Redux per se. Instead, the talk introduced a problem that Dan Abramov faced that led to implementing Redux. I don't want to foreclose the content of the talk, that's why I encourage you to watch the video yourself. If you are keen to learn Redux, I encourage you to dive into the problem that was solved by it.

Nevertheless, one year later, again at React Europe, Dan Abramov reflected on the journey of Redux and its success. He mentioned a few things that had made Redux successful in his opinion. First, Redux was developed to solve a problem. The problem was explained by Dan Abramov one year earlier when he introduced Redux. It was not just another library but a library that solved an actual problem. Time Traveling and Hot Reloading were the stress test for Redux. Second, the constraints of Redux were another key factor to its success. Redux managed to shield away the problem with a simple API and a thoughtful way to solve the problem of state management itself. You can [watch this talk](https://www.youtube.com/watch?v=uvAXVMwHJXU) too. I highly recommend it. Either you watch it right now or after the next section of this tutorial that introduces you to the basics of Redux.

{{% chapter_header "Basics in Redux without React" "redux-without-react" %}}

On the [official Redux website](http://redux.js.org) it says: *"Redux is a predictable state container for JavaScript apps."*. It can be used standalone or in connection with libraries, like React and Angular, to manage state in JavaScript applications.

Redux adopted a handful of constraints from the Flux architecture but not all of them. It has Actions that encapsulate information for the actual state update. It has a Store to save the state, too. However, the Store is a singleton. Thus, there are not multiple Stores like there used to be in the Flux architecture. In addition, there is no single Dispatcher. Instead, Redux uses multiple Reducers. Basically, Reducers pick up the information from Actions and "reduce" the information to a new state, along with the old state, that is stored in the Store. When state in the Store is changed, the View can act on this by subscribing to the Store.

{{< highlight javascript >}}
View -> Action -> Reducer(s) -> Store -> View
{{< /highlight >}}

So why is it called Redux? Because it combines the two words Reducer and Flux. The abstract picture of Redux should be imaginable now. The state doesn't live in the View anymore, it is only connected to the View. What does connected mean? It is connected on two ends, because it is part of the unidirectional data flow. One end is responsible to trigger an Action to which updates the state eventually and the second end is responsible to receive the state from the Store. Therefore, the View can update accordingly to state changes but can also trigger state changes. The View, in this case, would be React, but Redux can be used with any other library or standalone as well. After all, it is only a state management container.

{{% sub_chapter_header "Action(s)" "redux-actions" %}}

An action in Redux is a JavaScript object. It has a type and an optional payload. The type is often referred to as **action type**. While the type is a string literal, the payload can be anything from a string to an object.

In the beginning your playground to get to know Redux will be a Todo application. For instance, the following action in this application can be used to add a new todo item:

{{< highlight javascript >}}
{
  type: 'TODO_ADD',
  todo: { id: '0', name: 'learn redux', completed: false },
}
{{< /highlight >}}

Executing an action is called **dispatching** in Redux. You can dispatch an action to alter the state in the Redux store. You only dispatch an action when you want to change the state. The dispatching of an action can be triggered in your View. It could be as simple as a click on a HTML button. In addition, the payload in a Redux action is not mandatory. You can define actions that have only an action type. In the end, once an action is dispatched, it will go through all reducers in Redux.

{{% sub_chapter_header "Reducer(s)" "redux-reducers" %}}

A reducer is the next part in the chain of the unidirectional data flow. The view dispatches an action, an action object with action type and optional payload, which passes through **all** reducers. What's a reducer? A reducer is a pure function. It always produces the same output when the input stays the same. It has no side-effects, thus it is only an input/output operation. A reducer has two inputs: state and action. The state is always the global state object from the Redux store. The action is the dispatched action with a type and optional payload. The reducer reduces - that explains the naming - the previous state and incoming action to a new state.

{{< highlight javascript >}}
(prevState, action) => newState
{{< /highlight >}}

Apart from the functional programming principle, namely that a reducer is a pure function without side-effects, it also embraces immutable data structures. It always returns a `newState` object without mutating the incoming `prevState` object. Thus, the following reducer, where the state of the Todo application is a list of todos, is not an allowed reducer function:

{{< highlight javascript >}}
function(state, action) {
  state.push(action.todo);
  return state;
}
{{< /highlight >}}

The Array push method mutates the previous state instead of returning a new state object. The following is allowed because it keeps the previous state intact and also return the new state:

{{< highlight javascript >}}
function reducer(state, action) {
  return state.concat(action.todo);
}
{{< /highlight >}}

By using the [JavaScript built-in concat functionality](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/concat), the state and thus the list of todos is concatenated to another item. The other item is the newly added todo from the action. You might wonder: Does it embrace immutability now? Yes it does, because `concat` always returns a new array without mutating the old array. The data structure stays immutable.

**But what about the action type?** Right now, only the payload is used to produce a new state but the action type is ignored. So what can you do about the action type? Basically when an action object arrives at the reducers, the action type can be evaluated. Only when a reducer cares about the action type, it will produce a new state. Otherwise, it simply returns the previous state. In JavaScript, a switch case can help to evaluate different action types. Otherwise, it returns the previous state as default.

Imagine your Todo application would have a second action and action type that toggles a Todo to either completed or incomplete. The only information which is needed as payload is an identifier to identify the Todo in the state.

{{< highlight javascript >}}
{
  type: 'TODO_TOGGLE',
  todo: { id: '0' },
}
{{< /highlight >}}

The reducer(s) would have to act on two actions now: `TODO_ADD` and `TODO_TOGGLE`. By using a switch case statement, you can branch into different cases. If there is not such a case, you return the unchanged state by default.

{{< highlight javascript >}}
function reducer(state, action) {
  switch(action.type) {
    case 'TODO_ADD' : {
      // do something and return new state
    }
    case 'TODO_TOGGLE' : {
      // do something and return new state
    }
    default : return state;
  }
}
{{< /highlight >}}

The tutorial already discussed the `TODO_ADD` action type and its functionality. It simply concats a new todo item to the previous list of todo items. But what about the `TODO_TOGGLE` functionality?

{{< highlight javascript "hl_lines=4 7 8 9 10 11" >}}
function reducer(state, action) {
  switch(action.type) {
    case 'TODO_ADD' : {
      return state.concat(action.todo);
    }
    case 'TODO_TOGGLE' : {
      return state.map(todo =>
        todo.id === action.todo.id
          ? Object.assign({}, todo, { completed: !todo.completed })
          : todo
      );
    }
    default : return state;
  }
}
{{< /highlight >}}

In the example, the built-in JavaScript functionality `map` is used to map over the state, the list of todos, to either return the intact todo or return the toggled todo. The toggled todo is identified by its `id` property. The [JavaScript built-in functionality map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map) always returns a new array. It doesn't mutate the previous state and thus the state of todos stays immutable and can be returned as a new state.

But isn't the toggled todo mutated? No, because `Object.assign()` returns a new object without mutating the old object. `Object.assign()` merges all given objects from the former to the latter into each other. If a former object shares the same property as a latter object, the property of the latter object will be used. Thus, the `completed` property of the updated todo item will be the negated state of the old todo item.

Note that these functionalities, actions and reducer, are plain JavaScript. There is no function from the Redux library involved so far. There is no hidden library magic. It is only JavaScript with functional programming principles in mind.

There is one useful thing to know about the current reducer: It has grown in size that makes it less maintainable. In order to keep reducers tidy, the different switch case branches can be extracted as pure functions:

{{< highlight javascript "hl_lines=4 7 13 14 15 16 17 18 19 20 21 22 23" >}}
function reducer(state, action) {
  switch(action.type) {
    case 'TODO_ADD' : {
      return applyAddTodo(state, action);
    }
    case 'TODO_TOGGLE' : {
      return applyToggleTodo(state, action);
    }
    default : return state;
  }
}

function applyAddTodo(state, action) {
  return state.concat(action.todo);
}

function applyToggleTodo(state, action) {
  return state.map(todo =>
    todo.id === action.todo.id
      ? Object.assign({}, todo, { completed: !todo.completed })
      : todo
  );
}
{{< /highlight >}}

In the end, the Todo application has two actions and one reducer by now. One last part in the Redux setup is missing: the Store.

{{% sub_chapter_header "Redux Store" "redux-store" %}}

So far, the Todo application has a way to trigger state updates (action(s)) and a way to reduce the previous state and action to a new state (reducer(s)). But no one is responsible to glue these parts together.

* Where do I trigger actions?
* Who delegates the actions to the reducer?
* Where do I get the updated state to glue it to my View?

It is the Redux store. The store holds one global state object. There are no multiple stores and no multiple states. The store is only one instance in your application. In addition, it is the first library dependency you encounter when using Redux. Therefore, use the import statement to get the functionality to create the `store` object from the Redux library (after you have installed it with `npm install --save redux`).

{{< highlight javascript >}}
import { createStore } from 'redux';
{{< /highlight >}}

Now you can use it to create a store singleton instance. The `createStore` function takes one mandatory argument: a reducer. You already defined a reducer in the sections before which adds and completes todo items.

{{< highlight javascript >}}
const store = createStore(reducer);
{{< /highlight >}}

In addition, the `createStore` takes a second optional argument: the initial state. In the case of the Todo application, the reducer operates on a list of todos as state. The list of todo items should be initialized as an empty array or pre-filled array with todos. If it wasn't initialized, the reducer would fail because it would operate on an `undefined` argument.

{{< highlight javascript >}}
const store = createStore(reducer, []);
{{< /highlight >}}

Later in this tutorial, when using React with Redux, you will see another way to initialize state in Redux. Then you will use the reducer instead of the store to initialize state on a more fine-grained level.

Now you have a store instance that knows about the reducer. The Redux setup is done. However, the essential part is missing: You want to interact with the store. You want to dispatch actions to alter the state, get the state from the store and listen to updates of the state in the store.

So first, how to dispatch an action?

{{< highlight javascript >}}
store.dispatch({
  type: 'TODO_ADD',
  todo: { id: '0', name: 'learn redux', completed: false },
});
{{< /highlight >}}

Second: How to get the global state from the store?

{{< highlight javascript >}}
store.getState();
{{< /highlight >}}

And third, how to subscribe (and unsubscribe) to the store in order to listen (and unlisten) for updates?

{{< highlight javascript >}}
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

unsubscribe();
{{< /highlight >}}

That's all to it. The Redux store has only a slim API to access the state, update it and listen for updates. It is one of the essential constraints which made Redux so successful.

{{% sub_chapter_header "Redux without React: Example" "redux-without-react" %}}

You know about all the basics in Redux now. A view dispatches an action on the store, the action passes all reducers and gets reduced by reducers that care about it. The store saves the new state object. Finally, a listener updates the view with the new state.

{{< highlight javascript >}}
View -> Action -> Reducer(s) -> Store -> View
{{< /highlight >}}

Let's apply these learnings. You can either use your own project where you have Redux installed, or you can open up the following JS Bin: [Redux Playground](https://jsbin.com/zukogaj/2/edit?html,js,console). Now you are going to apply your learnings about actions, reducers, and the store from the last sections. First, you can define your reducer that deals with adding and toggling todo items:

{{< highlight javascript >}}
function reducer(state, action) {
  switch(action.type) {
    case 'TODO_ADD' : {
      return applyAddTodo(state, action);
    }
    case 'TODO_TOGGLE' : {
      return applyToggleTodo(state, action);
    }
    default : return state;
  }
}

function applyAddTodo(state, action) {
  return state.concat(action.todo);
}

function applyToggleTodo(state, action) {
  return state.map(todo =>
    todo.id === action.todo.id
      ? Object.assign({}, todo, { completed: !todo.completed })
      : todo
  );
}
{{< /highlight >}}

Second, you can initialize the Redux store that uses the reducer and an initial state. In the JS Bin, you have Redux available as global variable.

{{< highlight javascript >}}
const store = Redux.createStore(reducer, []);
{{< /highlight >}}

If you are in your own project, you might be able to import the `createStore` from the Redux library:

{{< highlight javascript >}}
import { createStore } from 'redux';

const store = createStore(reducer, []);
{{< /highlight >}}

Third, you can dispatch your first action on the store.

{{< highlight javascript >}}
store.dispatch({
  type: 'TODO_ADD',
  todo: { id: '0', name: 'learn redux', completed: false },
});
{{< /highlight >}}

That's it. You have set up all parts of Redux and interacted with it by using an action. You can retrieve the state by getting it from the store now.

{{< highlight javascript >}}
console.log(store.getState());
{{< /highlight >}}

But rather than outputting it manually, you can subscribe a callback function to the store to output the latest state after it has changed. Make sure to subscribe to the store before dispatching your actions in order to get the output.

{{< highlight javascript >}}
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
{{< /highlight >}}

Now, whenever you dispatch an action, after the state got updated, the store subscription should become active by outputting your current state. Don't forget to unsubscribe eventually to avoid memory leaks.

{{< highlight javascript >}}
unsubscribe();
{{< /highlight >}}

A finished application can be found [in this JS Bin](https://jsbin.com/kopohur/28/edit?html,js,console). Before you continue to read, you should experiment with the project. What you see in the project is plain JavaScript with a Redux store. You can come up with more actions and deal with them in your reducer. The application should make you aware that Redux is only a state container. The state can be altered by using actions. The reducer take care of the action. It uses the action and the old state to create a new state in the Redux store.

In the next tutorial, you will learn how to to connect the Redux state layer to the React view layer.

{{% chapter_header "The React Redux Project" "react-redux-starter-kit" %}}

In the following sections of this tutorial, you will be guided to build your own {{% a_blank "Hacker News" "https://news.ycombinator.com/" %}} application with React and Redux. Hacker News is a platform to share tech related news. It provides a {{% a_blank "public API" "https://hn.algolia.com/api" %}} to retrieve their data. Some of you might have read [the Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/) where you have built a Hacker News application as well. In that book, it was only basic React. Now you can experience the differences when using Redux with React in this tutorial.

You have two options to start this tutorial:

* 1) Clone the {{% a_blank "React Redux tutorial starter kit repository from GitHub" "https://github.com/rwieruch/react-redux-tutorial-starter-kit" %}}.
* 2) Follow the instructions below to get everything up and running yourself.

If you have chosen 1), clone the repository, install it, run it on the command line, check it in the browser, and jump to the next section of this tutorial. If you have chosen 2), follow the instructions below before continuing with the next section.

You are going to use create-react-app to setup your project. You can read the {{% a_blank "official documentation" "https://github.com/facebookincubator/create-react-app" %}} on how to setup a React starter project with it. After you have installed it, you start by choosing a project name for your application in the terminal (command line).

{{< highlight javascript >}}
create-react-app react-redux-tutorial
{{< /highlight >}}

After the project was created for you, you can navigate into the project folder, open your editor/IDE and start the application.

{{< highlight javascript >}}
cd react-redux-tutorial
npm start
{{< /highlight >}}

In your browser, it should show the defaults that come with create-create-app. Before you familiarize yourself too much with the folder structure, you will adapt it to your own needs first. Navigate into the *src/* folder on the command line and delete the boilerplate files that are not needed for our application.

{{< highlight javascript >}}
cd src
rm logo.svg App.js App.test.js App.css
{{< /highlight >}}

Even the App component with its files got removed, because you'll organize it in folders instead of in one top level *src/* folder. Now, from the *src/* folder, create the folders for an organized folder structure by a technical separation. It is up to you to refactor it later to a feature folder organization. You learned about both separations in The Road to learn React.

{{< highlight javascript >}}
mkdir components reducers actions selectors store sagas api constants
{{< /highlight >}}

Your folder structure should be similar to the following:

{{< highlight javascript >}}
-src/
--actions/
--api/
--components/
--constants/
--reducers/
--sagas/
--selectors/
--store/
--index.css
--index.js
{{< /highlight >}}

Navigate in the *components/* folder and create the following files for your independent components. You will create more of them on your own for this application afterward.

{{< highlight javascript >}}
cd components
touch App.js Stories.js Story.js App.css Stories.css Story.css
{{< /highlight >}}

You can continue this way and create the remaining files to end up with the following folder structure.

{{< highlight javascript >}}
-src/
--actions/
--api/
--components/
---App.js
---App.css
---Stories.js
---Stories.css
---Story.js
---Story.css
--constants/
---actionTypes.js
--reducers/
---index.js
--sagas/
---index.js
--selectors/
--store/
---index.js
--index.css
--index.js
{{< /highlight >}}

Now you have your foundation of folders and files for your React and Redux application. Except for the specific component files that you already have, everything else can be used as a blueprint, your own boilerplate project, for any application using React and Redux. But only if it is separated by technical concerns. In a growing application, you might want to separate your folders by feature. You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/d5ab6a77653ee641d339c0a6a91c8444eff3f699).

{{% chapter_header "Basic React Components" "react-redux-basic-components" %}}

In this section you will implement your plain React component architecture that only [receives all necessary props from their parent components](https://www.robinwieruch.de/react-pass-props-to-component/). These props can include callback functions that will enable interactions later on. The point is that the props don't reveal where they are coming from. They could be props themselves that are located in the parent component, state from the local state in the parent component, or even Redux state. The callback functions are just functions too. Thus the components receiving them are not aware of using class methods operating on the local state of a parent component or Redux actions to alter the global state.

In your entry point to React, the *src/index.js* file, where your React component gets rendered into the DOM, adjust the import of the App component by including the components folder in the path.

{{< highlight javascript "hl_lines=3" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
{{< /highlight >}}

In the next step, you can come up with sample data that can be used in the React components. The sample data becomes the input of the App component. At a later point in time of this tutorial, this data will get fetched from the Hacker News API and be managed with Redux instead of React's local state.

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24" >}}
...

const stories = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  }, {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

ReactDOM.render(
  <App stories={stories} />,
  document.getElementById('root')
);
{{< /highlight >}}

The three components, App, Stories and Story, are not defined yet but you have already created the files for them. Let's define them component by component.

First, the App component, in the *src/components/App.js* file, receives the sample stories from above as props and its only responsibility is to render the Stories component and to pass over the `stories` as props. Later, the App component could add other components aside from the Stories component too.

{{< highlight javascript "hl_lines=4 6 8" >}}
import React from 'react';
import './App.css';

import Stories from './Stories';

const App = ({ stories }) =>
  <div className="app">
    <Stories stories={stories} />
  </div>

export default App;
{{< /highlight >}}

Second, the Stories component in the *src/components/Stories.js* file, receives the `stories` as props and renders for each story a Story component. You may want to [default to an empty array](https://www.robinwieruch.de/react-state-array-add-update-remove/) that the Stories component doesn't crash when the list of stories is null.

{{< highlight javascript >}}
import React from 'react';
import './Stories.css';

import Story from './Story';

const Stories = ({ stories }) =>
  <div className="stories">
    {(stories || []).map(story =>
      <Story
        key={story.objectID}
        story={story}
      />
    )}
  </div>

export default Stories;
{{< /highlight >}}

Third, the Story component, in the *src/components/Story.js* file, renders a few properties of the passed `story` object. The story object gets already destructured from the props in the function signature. Furthermore, the story object gets destructured as well.

{{< highlight javascript >}}
import React from 'react';
import './Story.css';

const Story = ({ story }) => {
  const {
    title,
    url,
    author,
    num_comments,
    points,
  } = story;

  return (
    <div className="story">
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
    </div>
  );
}

export default Story;
{{< /highlight >}}

You can start your application again with `npm start` on the command line. Both sample stories should be displayed with React now. You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/f5843d2a06033cd045e6d0427993e30e289031a7).

{{% chapter_header "Simple Styling for React Components" "react-components-simple-styling" %}}

The application looks a bit dull without any styling. Therefore you can drop in some of your own styling or use the styling that's provided in this section.

First, the application would need some application wide style that can be defined in the *src/index.css* file:

{{< highlight css >}}
body {
  color: #222;
  background: #f4f4f4;
  font: 400 14px CoreSans, Arial,sans-serif;
}

a {
  color: #222;
}

a:hover {
  text-decoration: underline;
}

ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
}

input {
  padding: 10px;
  border-radius: 5px;
  outline: none;
  margin-right: 10px;
  border: 1px solid #dddddd;
}

button {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #dddddd;
  background: transparent;
  color: #808080;
  cursor: pointer;
}

button:hover {
  color: #222;
}

.button-inline {
  border-width: 0;
  background: transparent;
  color: inherit;
  text-align: inherit;
  -webkit-font-smoothing: inherit;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
}

.button-active {
  border-radius: 0;
  border-bottom: 1px solid #38BB6C;
}

*:focus {
  outline: none;
}
{{< /highlight >}}

Second, the App component defines a few CSS classes in its *src/components/App.css* file:

{{< highlight css >}}
.app {
  margin: 20px;
}

.interactions, .error {
  text-align: center;
}
{{< /highlight >}}

Third, the Stories component defines style in its *src/components/Stories.css* file:

{{< highlight css >}}
.stories {
  margin: 20px 0;
}

.stories-header {
  display: flex;
  line-height: 24px;
  font-size: 16px;
  padding: 0 10px;
  justify-content: space-between;
}

.stories-header > span {
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 5px;
}
{{< /highlight >}}

And last but not least, the Story component defines style in its *src/components/Story.css* file too:

{{< highlight css >}}
.story {
  display: flex;
  line-height: 24px;
  white-space: nowrap;
  margin: 10px 0;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #e3e3e3;
}

.story > span {
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 5px;
}
{{< /highlight >}}

When you start your application again, it seems more organized by its styling. But there is still something missing for displaying the stories properly. The columns for each story should be aligned and perhaps there should be a heading for each column.

First, you can define an object to describe the columns in the *src/components/Stories.js* file:

{{< highlight javascript "hl_lines=6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26" >}}
import React from 'react';
import './Stories.css';

import Story from './Story';

const COLUMNS = {
  title: {
    label: 'Title',
    width: '40%',
  },
  author: {
    label: 'Author',
    width: '30%',
  },
  comments: {
    label: 'Comments',
    width: '10%',
  },
  points: {
    label: 'Points',
    width: '10%',
  },
  archive: {
    width: '10%',
  },
};

const Stories = ({ stories }) =>
  ...
{{< /highlight >}}

The last column with the `archive` property name will not be used yet, but will be used in a later point in time of this tutorial. Second, you can pass this object to your Story component in the *src/components/Stories.js* file. Still the Stories component has access to the object to use it later on for its own column headings.

{{< highlight javascript "hl_lines=7" >}}
const Stories = ({ stories }) =>
  <div className="stories">
    {(stories || []).map(story =>
      <Story
        key={story.objectID}
        story={story}
        columns={COLUMNS}
      />
    )}
  </div>
{{< /highlight >}}

The Story component in the *src/components/Story.js* file can use the columns object to style each displaying property of a story. It uses inline style to define the width of each column which comes from the object.

{{< highlight javascript "hl_lines=1 7 8 9 10 11 12 13 14 15 16 17 18 19 20" >}}
const Story = ({ story, columns }) => {

  ...

  return (
    <div className="story">
      <span style={{ width: columns.title.width }}>
        <a href={url}>{title}</a>
      </span>
      <span style={{ width: columns.author.width }}>
        {author}
      </span>
      <span style={{ width: columns.comments.width }}>
        {num_comments}
      </span>
      <span style={{ width: columns.points.width }}>
        {points}
      </span>
      <span style={{ width: columns.archive.width }}>
      </span>
    </div>
  );
}
{{< /highlight >}}

Last but not least, you can use the `COLUMNS` object to give your Stories component matching header columns as well. That's why the `COLUMNS` object got defined in the Stories component in the first place. Now, rather than doing it manually, as in the Story component, you will map over the object dynamically to render the header columns. Since it is an object, you have to turn it into an array of the property names, and then access the object by its keys to retrieve its properties (width, label).

{{< highlight javascript "hl_lines=3 4 5 6 7 8 9 10 11 12" >}}
const Stories = ({ stories }) =>
  <div className="stories">
    <div className="stories-header">
      {Object.keys(COLUMNS).map(key =>
        <span
          key={key}
          style={{ width: COLUMNS[key].width }}
        >
          {COLUMNS[key].label}
        </span>
      )}
    </div>

    {(stories || []).map(story =>
      <Story
        key={story.objectID}
        story={story}
        columns={COLUMNS}
      />
    )}
  </div>
{{< /highlight >}}

You can extract the header columns as its own `StoriesHeader` component to keep your components well arranged and separated by concerns.

{{< highlight javascript "hl_lines=3 10 11 12 13 14 15 16 17 18 19 20" >}}
const Stories = ({ stories }) =>
  <div className="stories">
    <StoriesHeader columns={COLUMNS} />

    {(stories || []).map(story =>
      ...
    )}
  </div>

const StoriesHeader = ({ columns }) =>
  <div className="stories-header">
    {Object.keys(columns).map(key =>
      <span
        key={key}
        style={{ width: columns[key].width }}
      >
        {columns[key].label}
      </span>
    )}
  </div>
{{< /highlight >}}

In this section, you have applied styling for your application and components. It should be in a representable state from a developer's point of view. You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/6cb35b024abb59a2192c8ac0bb700046a700d470).

{{% chapter_header "Feature: Archive a Story" "react-redux-remove-item" %}}

Now you will add your first feature: archiving a story. Therefore you will have to introduce Redux at some point to your application to manage the state of archived stories in your application. I want to highly emphasize that it would work in basic React too. But for the sake of learning Redux, you will already use it for this feature. In this section you will not introduce Redux though.

First, an archiving function can be passed down to the Story component from your *src/index.js* file. In the beginning, it can be an empty function. The function will be replaced later when you will dispatch a Redux action.

{{< highlight javascript "hl_lines=4" >}}
...

ReactDOM.render(
  <App stories={stories} onArchive={() => {}} />,
  document.getElementById('root')
);
{{< /highlight >}}

Second, you can pass it through your App and Stories components. These components don't use the function but only pass it to the Story component. You might already notice that this could be a potential refactoring later on, because the function gets passed from the above through all components to only reach the last component. It passes the App component:

{{< highlight javascript "hl_lines=1 5" >}}
const App = ({ stories, onArchive }) =>
  <div className="app">
    <Stories
      stories={stories}
      onArchive={onArchive}
    />
  </div>
{{< /highlight >}}

And it passes the Stories component:

{{< highlight javascript "hl_lines=1 10" >}}
const Stories = ({ stories, onArchive }) =>
  <div className="stories">
    <StoriesHeader columns={COLUMNS} />

    {(stories || []).map(story =>
      <Story
        key={story.objectID}
        story={story}
        columns={COLUMNS}
        onArchive={onArchive}
      />
    )}
  </div>
{{< /highlight >}}

Finally, you can use it in your Story component in a `onClick` handler of a button. The story `objectID` will be passed in the handler to identify the story that is going to be archived.

{{< highlight javascript "hl_lines=1 8 15 16 17 18 19 20 21" >}}
const Story = ({ story, columns, onArchive }) => {
  const {
    title,
    url,
    author,
    num_comments,
    points,
    objectID,
  } = story;

  return (
    <div className="story">
      ...
      <span style={{ width: columns.archive.width }}>
        <button
          type="button"
          className="button-inline"
          onClick={() => onArchive(objectID)}
        >
          Archive
        </button>
      </span>
    </div>
  );
}
{{< /highlight >}}

A refactoring that you could already do would be to extract the button as a reusable component:

{{< highlight javascript "hl_lines=8 9 10 16 17 18 19 20 21 22 23 24 25 26 27" >}}
const Story = ({ story, columns, onArchive }) => {
  ...

  return (
    <div className="story">
      ...
      <span style={{ width: columns.archive.width }}>
        <ButtonInline onClick={() => onArchive(objectID)}>
          Archive
        </ButtonInline>
      </span>
    </div>
  );
}

const ButtonInline = ({
  onClick,
  type = 'button',
  children
}) =>
  <button
    type={type}
    className="button-inline"
    onClick={onClick}
  >
    {children}
  </button>
{{< /highlight >}}

You can make even another more abstract `Button` component in the *src/components/Story.js* file that doesn't share the `button-inline` CSS class.

{{< highlight javascript >}}
...

const ButtonInline = ({
  onClick,
  type = 'button',
  children
}) =>
  <Button
    type={type}
    className="button-inline"
    onClick={onClick}
  >
    {children}
  </Button>

const Button = ({
  onClick,
  className,
  type = 'button',
  children
}) =>
  <button
    type={type}
    className={className}
    onClick={onClick}
  >
    {children}
  </button>
{{< /highlight >}}

Both button components should be extracted to a new file called *src/components/Button.js*, but exported so that at least the `ButtonInline` component can be reused in the Story component. You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/55de13475aa9c2424b0fc00ce95dd4c5474c0473). Now, when you start your application again, the button to archive a story is there. But it doesn't work because it only receives a no-op (empty function) as property from your React entry point. Later you will introduce a Redux action that can be dispatched from this function to archive a story.

{{% chapter_header "Redux Store + Reducers" "redux-store-reducer" %}}

This section will finally introduce Redux to manage the state of the stories instead of passing them directly into to your App component from your React entry point. Let's approach it step by step. First, you have to install Redux on the command line:

{{< highlight javascript >}}
npm install --save redux
{{< /highlight >}}

Second, in the React entry point file, you can import the Redux store which is not defined in the other file yet. We will do this in a moment. Now, instead of using the sample stories, you will use the stories that are stored in the Redux store. Taken that the store only saves a list of stories as state, you can simply get all the global state of the store and assume that it is the list of stories.

{{< highlight javascript "hl_lines=4 8" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';
import './index.css';

ReactDOM.render(
  <App stories={store.getState()} onArchive={() => {}} />,
  document.getElementById('root')
);
{{< /highlight >}}

Third, you have to create your Redux store instance in a separate *src/store/index.js* file. It already takes a reducer that is not implemented yet, but which you will implement in a moment.

{{< highlight javascript >}}
import { createStore } from 'redux';
import storyReducer from '../reducers/story';

const store = createStore(
  storyReducer
);

export default store;
{{< /highlight >}}

Fourth, in your *src/reducers/* folder you can create your first reducer called `storyReducer` in a *src/reducers/story.js* file. It doesn't react to any actions yet.

{{< highlight javascript >}}
function storyReducer(state, action) {
  switch(action.type) {
    default : return state;
  }
}

export default storyReducer;
{{< /highlight >}}

Also it can have the sample stories as initial state. You have learned before how initial state in Redux can be initialized when creating the Redux store. This is another way of creating initial state on a reducer level:

{{< highlight javascript "hl_lines=1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 19" >}}
const INITIAL_STATE = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  }, {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function storyReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    default : return state;
  }
}

export default storyReducer;
{{< /highlight >}}

Your application should work when you start it. It is using the state from the Redux store that is initialized in the `storyReducer`, because it is the only reducer in your application. There are no actions yet and no action is captured in the reducer yet. Even though there was no action dispatched, you can see that the Redux store runs once through all its defined reducers to initialize its initial state from the reducers in the store. The state gets visible through the Stories and Story components, because it is passed down from the React entry point file. You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/5aafb21595541c21db778ad8825c97403e44b963).

{{% chapter_header "Redux: How to combine Reducers" "redux-combine-reducers" %}}

You have used the Redux store and a reducer to define an initial state of stories and to retrieve this state for your component tree. But there is no state manipulation happening yet. In the following sections, you are going to implement the archiving a story feature. When approaching this feature, the simplest thing to do would be to remove the story to be archived from the list of stories in the state in the `storyReducer`. But let's approach this from a different angle to have a greater impact in the long run. It could be useful to have all stories in the state in the end, but have a way to distinguish between them: stories and archived stories. Following this way, you may be able in the future to have a second React component that shows the archived stories next to the available stories.

From an implementation point of view, the `storyReducer` will stay as it is for now. But you can introduce a second reducer in a *src/reducers/archive.js* file, a `archiveReducer`, that keeps a list of references to the archived stories.

{{< highlight javascript >}}
const INITIAL_STATE = [];

function archiveReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    default : return state;
  }
}

export default archiveReducer;
{{< /highlight >}}

You will implement the action to archive a story in a moment.

First, the Redux store in its instantiation in the *src/store/index.js* file needs to get both reducers instead of only the `storyReducer`. Since the Redux store takes only one reducer, you have to combine both of your reducers to one reducer somehow. Let's pretend that the store can import the combined reducer from the entry file for the reducers, the *reducers/index.js* file, without worrying about combining the reducers.

{{< highlight javascript "hl_lines=2 5" >}}
import { createStore } from 'redux';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer
);

export default store;
{{< /highlight >}}

Next you can combine both reducers in the *src/reducers/index.js* file with Redux's helper function `combineReducers()`. Then the combined root reducer can be used by the Redux store.

{{< highlight javascript >}}
import { combineReducers } from 'redux';
import storyReducer from './story';
import archiveReducer from './archive';

const rootReducer = combineReducers({
  storyState: storyReducer,
  archiveState: archiveReducer,
});

export default rootReducer;
{{< /highlight >}}

Since your state is sliced up into two substates now, you have to adjust how you retrieve the stories from your store in the *src/index.js* file with the intermediate `storyState` now. This is a crucial step, because it shows how combined reducers slice up your state into substates.

{{< highlight javascript "hl_lines=3" >}}
ReactDOM.render(
  <App
    stories={store.getState().storyState}
    onArchive={() => {}}
  />,
  document.getElementById('root')
);
{{< /highlight >}}

The application should show up the same stories as before when you start it. You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/f6d436fdfdab19296e473fbe7243690e830c1c2b). However, there is still no state manipulation happening, because no actions are involved yet. Finally in the next part you will dispatch your first action to archive a story.

{{% chapter_header "Redux: Actions" "redux-actions" %}}

In this section, you will dispatch your first action to archive a story. The archive action needs to be captured in the new `archiveReducer` in the *src/reducers/archive.js*. file. It simply stores all archived stories by their id in a list. There is no need to duplicate the story. The initial state is an empty list, because no story is archived in the beginning. When archiving a story, all the previous ids in the state and the new archived id will be merged in a new array. The JavaScript spread operator is used here.

{{< highlight javascript "hl_lines=1 5 6 10 11 12" >}}
import { STORY_ARCHIVE } from '../constants/actionTypes';

const INITIAL_STATE = [];

const applyArchiveStory = (state, action) =>
  [ ...state, action.id ];

function archiveReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case STORY_ARCHIVE : {
      return applyArchiveStory(state, action);
    }
    default : return state;
  }
}

export default archiveReducer;
{{< /highlight >}}

The action type is already outsourced in another *src/constants/actionTypes.js* file. This way it can be reused when dispatching the action from the Redux store or when acting on the action type in another reducer.

{{< highlight javascript >}}
export const STORY_ARCHIVE = 'STORY_ARCHIVE';
{{< /highlight >}}

Last but not least, you can import the action type and use it to dispatch the action in your React entry point where you had the empty function before. Now the passed `onArchive()` function will dispatch an action when it is used.

{{< highlight javascript "hl_lines=5 11" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';
import { STORY_ARCHIVE } from './constants/actionTypes';
import './index.css';

ReactDOM.render(
  <App
    stories={store.getState().storyState}
    onArchive={id => store.dispatch({ type: STORY_ARCHIVE, id })}
  />,
  document.getElementById('root')
);
{{< /highlight >}}

You can check again your Story component which uses the action when clicking the button. The click on the button triggers the passed function and passes the `id` of the story.

You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/5ddbcc2fa8269d615763770a49e7675c5f02d173). When you start your application, it should still work, but nothing happens yet when you archive a story. That's because the archived stories are not evaluated yet. The `stories` prop that is passed from the *src/index.js* file to the App component still uses all the stories from the `storyState`.

{{% chapter_header "Redux: Selectors" "redux-selectors" %}}

You can use both substates now, `storyState` and `archiveState`, to derive the list of stories that are not archived. The deriving of those properties from the state can either happen directly when passing props from the Redux store to the components or in an intermediate layer which can be called Redux selectors.

You can create your first selector in a new *src/selectors/story.js* file that only returns the part of the stories that is not archived. The `archiveState` is the list of archived ids.

{{< highlight javascript >}}
const isNotArchived = archivedIds => story =>
  archivedIds.indexOf(story.objectID) === -1;

const getReadableStories = ({ storyState, archiveState }) =>
  storyState.filter(isNotArchived(archiveState));

export {
  getReadableStories,
};
{{< /highlight >}}

The selector makes heavily use of JavaScript ES6 arrow functions, JavaScript ES6 destructuring and a higher-order function: `isNotArchived()`. If you are not used to JavaScript ES6, don't feel intimidated by it. It is only a way to express these functions more concise. In plain JavaScript ES5 it would look like the following:

{{< highlight javascript >}}
function isNotArchived(archivedIds) {
  return function (story) {
    return archivedIds.indexOf(story.objectID) === -1;
  };
}

function getReadableStories(state) {
  return state.storyState.filter(isNotArchived(state.archiveState));
}

export {
  getReadableStories,
};
{{< /highlight >}}

Last but not least, you can use the selector to compute the not archived stories instead of retrieving the whole list of stories from the store directly in your *src/index.js* file.

{{< highlight javascript "hl_lines=5 11" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';
import { getReadableStories } from './selectors/story';
import { STORY_ARCHIVE } from './constants/actionTypes';
import './index.css';

ReactDOM.render(
  <App
    stories={getReadableStories(store.getState())}
    onArchive={id => store.dispatch({ type: STORY_ARCHIVE, id })}
  />,
  document.getElementById('root')
);
{{< /highlight >}}

Keep in mind that selectors are not mandatory in Redux. You could have defined the function to retrieve all readable stories from the Redux store in the *src/index.js* file without ever calling it a selector. It is just a way to retrieve derived state from your Redux store.

You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/5e3338d3ffff924b7a12eccb691365fd11cb5aed). When you start your application, still nothing happens when you archive a story. Even though you are using the readable stories instead of all stories now. That's because there is no re-rendering of the React View in place to update it when something in the Redux store has changed.

{{% chapter_header "Redux: Re-render React" "redux-re-render-react" %}}

On the one hand you have React as your view layer. It has everything you need to build a component hierarchy. You can compose components into each other. In addition, the component's methods make sure that you always have a hook into their lifecycle.

On the other hand you have Redux. By now, you should know how to manage state in Redux. First, you initialize everything by setting up reducer(s), actions and their optional action creators. Afterward, the (combined) reducer is used to create the Redux store. Second, you can interact with the store by dispatching actions with plain action objects or with action creators, by subscribing to the store and by getting the current state from the store.

In the end, these three interactions need to be accessed from your view layer. If you recall the unidirectional data flow in Redux, that was adapted from the Flux architecture, you will notice that you have all parts at your disposal by now.

{{< highlight javascript >}}
View -> Action -> Reducer(s) -> Store -> View
{{< /highlight >}}

In this section, you will update the View to reflect the correct state that comes from the Redux store. When an action dispatches, the state in the Redux store gets updated. However, the component tree in React doesn't update yet, because no one subscribed to the Redux store. In the first attempt, you are going to wire up Redux and React naively and re-render the whole component tree on each update in the *src/index.js* file.

{{< highlight javascript "hl_lines=3 11 13 14" >}}
...

function render() {
  ReactDOM.render(
    <App
      stories={getReadableStories(store.getState())}
      onArchive={id => store.dispatch({ type: STORY_ARCHIVE, id })}
    />,
    document.getElementById('root')
  );
}

store.subscribe(render);
render();
{{< /highlight >}}

Now the components will re-render once you archive a story, because the state in the Redux store updates and the subscription will run to render again the whole component tree. In addition, you render the component once when the application starts.

Congratulations, you dispatched your first action, selected derived properties from the state and updated your component tree by subscribing it to the Redux store. That took longer as expected, didn't it? However, now most of the Redux and React infrastructure is in place to be more efficient when introducing new features. You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/286c04354fcab639ebd60ac2430ad939ce107365).

{{% chapter_header "Redux Middleware" "redux-middleware" %}}

In this section, you will introduce your first middleware to the Redux store. In a larger application, it becomes often a problem to track state updates. Often you don't notice when an action is dispatched, because too many actions get involved and a bunch of them might get triggered implicitly. Therefore you can use the [redux-logger](https://github.com/evgenyrodionov/redux-logger) middleware in your Redux store to `console.log()` every action, the previous state and the next state, automatically to your development tools in your browser when dispatching an action.

First, you have to install the neat middleware library:

{{< highlight javascript >}}
npm install --save redux-logger
{{< /highlight >}}

Second, you can use it as middleware in your Redux store initialization in the *src/store/index.js* file. The second argument of the `createStore()` function is `undefined`, because it is usually used for the initial state of the Redux store. We have handled the initial state in the reducers, so there is no need for us to define it here.

{{< highlight javascript "hl_lines=1 2 5 9 10" >}}
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const logger = createLogger();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(logger)
);

export default store;
{{< /highlight >}}

That's it. Every time you dispatch an action now, for instance when archiving a story, you will see the logging in the developer console in your browser. You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/652e6419e2a872ba2d1dd65465006b13f0799c4f).

{{% chapter_header "Redux: Action Creators" "redux-action-creators" %}}

The action you are dispatching is a JavaScript object. However, you may don't want to define the action as JavaScript object every time. It may be easier to have a reusable function that returns this object for you and the only thing you have to do is passing the variable payload to it.

Action creators are not mandatory, but they keep your Redux architecture organized. In order to stay organized, let's define your first action creator in a *src/actions/archive.js* file. First, you have to define the action creator that takes a story id, to identify the story to be archived, in a new file.

{{< highlight javascript >}}
import { STORY_ARCHIVE } from '../constants/actionTypes';

const doArchiveStory = id => ({
  type: STORY_ARCHIVE,
  id,
});

export {
  doArchiveStory,
};
{{< /highlight >}}

Second, you can use it in your React entry point file. Instead of dispatching the action object directly, you can create an action by using its action creator. The action creator function only returns the action object instead of defining the action object inline.

{{< highlight javascript "hl_lines=6 13" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';
import { getReadableStories } from './selectors/story';
import { doArchiveStory } from './actions/archive';
import './index.css';

function render() {
  ReactDOM.render(
    <App
      stories={getReadableStories(store.getState())}
      onArchive={id => store.dispatch(doArchiveStory(id))}
    />,
    document.getElementById('root')
  );
}

...
{{< /highlight >}}

The application should operate as before when you start it. But this time you have used an action creator rather than dispatching an action object directly. You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/4cc5e995d63fd935a2e335b0a4946a1811c04202).

{{% chapter_header "Connect React with Redux" "connect-react-with-redux" %}}

In this section, you will connect React and Redux in a more sophisticated way. Even though the previous approach is pragmatic and shows a simplified version of how to wire up all these things, it is a naive approach of doing it. Why is that? In a real application you want to avoid the following bad practices:

* Re-rendering every component: You want to re-render only the components that are affected by the global state updated in the Redux store. Otherwise, you will run into performance issues in a larger application, because every component needs to render again with every action that changes the global state in Redux.

* Using the store instance directly: You want to avoid to operate directly on the Redux store instance. The store should be injected somehow into your React component tree to make it accessible for components that need to have access to the store.

* Making the store globally available: The store shouldn't be globally accessible by every component. In the previous example, only the React entry point file used it, but who prevents you from importing it directly in your Stories or Story component to dispatch an action?

Let's change this by using the {{% a_blank "react-redux" "https://github.com/reactjs/react-redux" %}} library that connects both worlds .

{{< highlight javascript >}}
npm install --save react-redux
{{< /highlight >}}

You can use the `Provider` component, which makes the Redux store available to all React components below (by using [React's context API](https://www.robinwieruch.de/react-context-api/)), in your React root file.

{{< highlight javascript "hl_lines=3 8 9 10 11 12 13" >}}
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
{{< /highlight >}}

Notice that the render method isn't used in a Redux store subscription anymore. The initial component hierarchy only renders once. No one subscribes to the Redux store and the App component isn't receiving any props anymore. Also the App component is only rendering the Stories component and doesn't pass any props anymore as well.

{{< highlight javascript "hl_lines=6 8" >}}
import React from 'react';
import './App.css';

import Stories from './Stories';

const App = () =>
  <div className="app">
    <Stories />
  </div>

export default App;
{{< /highlight >}}

But who passes the props to the Stories component then? It's the first component that needs to know about the list of stories from the Redux store, because it has to display it. The solution is to upgrade the Stories component to a so called connected component that has access to Redux state and actions by using the two arguments `mapStateToProps` and `mapDispatchToProps` in a higher-order component called `connect` from react-redux. So, instead of only exporting the plain Stories component in the *src/components/Stories.js* file:

{{< highlight javascript >}}
...

export default Stories;
{{< /highlight >}}

You can export the connected component with the `connect` [higher-order component](https://www.robinwieruch.de/gentle-introduction-higher-order-components/) that has implicit access to the Redux store by having the global state and the dispatch method from the store at its disposal:

{{< highlight javascript "hl_lines=1 2 3 7 8 9 10 11 12 13 14 15 16 17 18" >}}
import { connect } from 'react-redux';
import { doArchiveStory } from '../actions/archive';
import { getReadableStories } from '../selectors/story';

...

const mapStateToProps = state => ({
  stories: getReadableStories(state),
});

const mapDispatchToProps = dispatch => ({
  onArchive: id => dispatch(doArchiveStory(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stories);
{{< /highlight >}}

The Stories component is connected to the Redux store now. It receives the stories from the Redux store in `mapStateToProps()` and a function to archive the story by `id` that triggers the dispatching of the action in `mapDispatchToProps()`. Whereas `mapStateToProps` is used to map a part of the global state as props from the Redux store to the React component, `mapDispatchToProps` is used to pass dispatchable Redux actions as functions to your React component via props. You have passes both, `stories` and `onArchive`, in a similar way before from the React entry file.

**mapStateToProps(state, [props]) => derivedProps:** It is a function that can be passed to the `connect` HOC. If it is passed, the input component of the connect HOC will subscribe to updates from the Redux store. Thus, it means that every time the store subscription notices an update, the `mapStateToProps()` function will run. The `mapStateToProps()` function itself has two arguments in its function signature: the global state object from the provided Redux store and optionally the props from the parent component where the enhanced component is used eventually. After all, the function returns an object that is derived from the global state and optionally from the props from the parent component. The returned object will be merged into the remaining props that come as input from the parent component.

**mapDispatchToProps(dispatch, [props]):** It is a function (or object) that can be passed to the connect HOC. Whereas `mapStateToProps()` gives access to the global state, `mapDispatchToProps()` gives access to the dispatch method of the Redux store. It makes it possible to dispatch actions but passes down only plain functions that wire up the dispatching in a higher-order function. After all, it makes it possible to pass functions down to the input component of the connect HOC to alter the state. Optionally, here you can also use the incoming props to wrap those into the dispatched action.

That is a lot of knowledge to digest. Both functions, `mapStateToProps()` and `mapDispatchToProps()`, can be intimidating at the beginning. In addition, they are used in a higher-order component. However, they only give you access to the state and the dispatch method of the Redux store.

{{< highlight javascript >}}
View -> (mapDispatchToProps) -> Action -> Reducer(s) -> Store -> (mapStateToProps) -> View
{{< /highlight >}}

The application should work again, but this time with a sophisticated connection between Redux and React. You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/88072e9b62230f59ffa83a5ddd06ceda6bf75fe4).

{{% chapter_header "Redux: Lift Connection" "redux-lift-connection" %}}

It is no official term (yet), but you can lift the connection between React and Redux from component to component. For instance, you could lift the connection from the Stories component to another component. But you need the list of stories in order to display them in the Stories component. However, what about the `onArchive()` function that is not directly used in the Stories component but only in the Story component? Hence you could lift the connection partly. The `stories` would stay in the Stories component, but the `onArchive()` function could be connected to the Story component.

First, remove the `onArchive()` function for the Stories component and remove the `mapDispatchToProps()` as well. It will be used later on in the Story component.

{{< highlight javascript "hl_lines=3 8 9 10 11 12 22 23 24" >}}
...

const Stories = ({ stories }) =>
  <div className="stories">
    <StoriesHeader columns={COLUMNS} />

    {(stories || []).map(story =>
      <Story
        key={story.objectID}
        story={story}
        columns={COLUMNS}
      />
    )}
  </div>

...

const mapStateToProps = state => ({
  stories: getReadableStories(state),
});

export default connect(
  mapStateToProps
)(Stories);
{{< /highlight >}}

Now you can connect the Story component instead to receive the function that dispatches an action eventually.

{{< highlight javascript "hl_lines=1 2 6 7 8 9 10 11 12 13" >}}
import { connect } from 'react-redux';
import { doArchiveStory } from '../actions/archive';

...

const mapDispatchToProps = dispatch => ({
  onArchive: id => dispatch(doArchiveStory(id)),
});

export default connect(
  null,
  mapDispatchToProps
)(Story);
{{< /highlight >}}

Now you have two connected React components that get/set state in the Redux store. With this refactoring step in your mind, you can always lift your connections to the Redux store in your view layer depending on the needs of the components. Does the component need state from the Redux store? Does the component need to alter the state in the Redux store via dispatching an action? You are in full control of where you want to use connected components (more general also called container components) and where you want to keep your components as presentational components. You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/779d52fc85ecfbaf5a821cbbae384aac962e76a7).

{{% chapter_header "Redux and Data Fetching" "redux-data-fetching" %}}

You have only used synchronous actions so far. Yet, sometimes you want to delay an action. For instance, when fetching data from a third-party API, the data fetching can take a while because the promise needs to resolve. Once the promise resolves, you want to dispatch a delayed action to update the state in the Redux store with the fetched result. That's where **asynchronous action** libraries such as Redux Saga, Redux Thunk or Redux Observable come into play.

Implementing applications with sample data can be dull. It is way more exciting to interact with a real API - in this case the [Hacker News API](https://hn.algolia.com/api). This application will introduce Redux Saga to deal with side-effects (such as fetching data from a third-party API).

{{< highlight javascript >}}
npm install --save redux-saga
{{< /highlight >}}

First, you can introduce a root saga in your *src/sagas/index.js* file. You can see it similar to the previously implemented combined root reducer, because the Redux store expects one root saga for its creation. Basically the root saga watches all (hence the `all` function) saga activated actions by using so called effects (such as the `takeEvery()` effect).

{{< highlight javascript >}}
import { takeEvery, all } from 'redux-saga/effects';
import { STORIES_FETCH } from '../constants/actionTypes';
import { handleFetchStories } from './story';

function *watchAll() {
  yield all([
    takeEvery(STORIES_FETCH, handleFetchStories),
  ])
}

export default watchAll;
{{< /highlight >}}

Second, the root saga can be used in the Redux store middleware when initializing the saga middleware. It is used in the middleware, but also needs to be run in a separate `saga.run()` method.

{{< highlight javascript "hl_lines=3 5 8 13 16" >}}
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const logger = createLogger();
const saga = createSagaMiddleware();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(saga, logger)
);

saga.run(rootSaga);

export default store;
{{< /highlight >}}

Third, you can introduce the new action type in your *src/constants/actionTypes.js* file that activates the saga. However, you can already introduce a second action type that will later on - when the request succeeds - add the stories via your `storyReducer` to the Redux store. Basically you have one action to activate the side-effect that is handled with Redux Saga and one action that stores the result of the side-effect in the Redux store.

{{< highlight javascript "hl_lines=2 3" >}}
export const STORY_ARCHIVE = 'STORY_ARCHIVE';
export const STORIES_FETCH = 'STORIES_FETCH';
export const STORIES_ADD = 'STORIES_ADD';
{{< /highlight >}}

Fourth, you can implement the story saga in a *src/sagas/story.js* file that encapsulates the API request. It uses the native fetch API of the browser to retrieve the stories from the Hacker News API. In your `handleFetchStories()` generator function, that is used in your root saga, you can use the `yield` statement to write asynchronous code as it would be synchronous code. As long as the promise from the Hacker News request doesn't resolve (or reject), the next line of code after the `yield` state will not be evaluated. When you finally have the result from the API request, you can use the `put()` effect to dispatch another action.

{{< highlight javascript >}}
import { call, put } from 'redux-saga/effects';
import { doAddStories } from '../actions/story';

const HN_BASE_URL = 'http://hn.algolia.com/api/v1/search?query=';

const fetchStories = query =>
  fetch(HN_BASE_URL + query)
    .then(response => response.json());

function* handleFetchStories(action) {
  const { query } = action;
  const result = yield call(fetchStories, query);
  yield put(doAddStories(result.hits));
}

export {
  handleFetchStories,
};
{{< /highlight >}}

In the fifth step, you need to define both actions creators in the *src/actions/story.js* file: the first one that activates the side-effect to fetch stories by a search term and the second one that adds the fetched stories to your Redux store.

{{< highlight javascript >}}
import {
  STORIES_ADD,
  STORIES_FETCH,
} from '../constants/actionTypes';

const doAddStories = stories => ({
  type: STORIES_ADD,
  stories,
});

const doFetchStories = query => ({
  type: STORIES_FETCH,
  query,
});

export {
  doAddStories,
  doFetchStories,
};
{{< /highlight >}}

Only the second action needs to be intercepted in your `storyReducer` in your *src/reducers/story.js* file to store the stories. The first action is only used to activate the saga in your root saga. Don't forget to remove the sample stories in your reducers, because they are coming from the API now.

{{< highlight javascript "hl_lines=1 2 3 4 5 6 10 11 12" >}}
import { STORIES_ADD } from '../constants/actionTypes';

const INITIAL_STATE = [];

const applyAddStories = (state, action) =>
  action.stories;

function storyReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case STORIES_ADD : {
      return applyAddStories(state, action);
    }
    default : return state;
  }
}

export default storyReducer;
{{< /highlight >}}

Now, everything is setup from a Redux and Redux Saga perspective. As last step, one component from the React View needs to trigger the `STORIES_FETCH` action and thus activate the Redux saga. This action is intercepted in the saga, fetches the stories in a side-effect, and stores them in the Redux store with the other `STORIES_ADD` action. Therefore, in your App component, you can introduce a new `SearchStories` component.

{{< highlight javascript "hl_lines=5 9 10 11" >}}
import React from 'react';
import './App.css';

import Stories from './Stories';
import SearchStories from './SearchStories';

const App = () =>
  <div className="app">
    <div className="interactions">
      <SearchStories />
    </div>
    <Stories />
  </div>

export default App;
{{< /highlight >}}

The `SearchStories` component will be a connected component. It is the next step to implement this component in the *src/components/SearchStories.js* file. First, you start with a plain React component that has a form, input field and button.

{{< highlight javascript >}}
import React, { Component } from 'react';
import Button from './Button';

class SearchStories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.onChange}
        />
        <Button type="submit">
          Search
        </Button>
      </form>
    );
  }
}

export default SearchStories;
{{< /highlight >}}

There are two missing class methods: `onChange()` and `onSubmit()`. Let's introduce them to make the component complete.

{{< highlight javascript "hl_lines=7 8 11 12 13 14 15 16 17 18 19 20 22 23 24 25" >}}
...

class SearchStories extends Component {
  constructor(props) {
    ...

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const { query } = this.state;
    if (query) {
      this.props.onFetchStories(query)

      this.setState({ query: '' });
    }

    event.preventDefault();
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({ query: value });
  }

  render() {
    ...
  }
}

export default SearchStories;
{{< /highlight >}}

The component should work on its own now. It only receives one function from the outside via its props: `onFetchStories()`. This function will dispatch an action to activate the saga that fetches the stories from the Hacker News platform. Connect the `SearchStories` component to make the dispatch functionality available.

{{< highlight javascript "hl_lines=2 3 8 9 10 11 12 13 14 15" >}}
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doFetchStories } from '../actions/story';
import Button from './Button';

...

const mapDispatchToProps = (dispatch) => ({
  onFetchStories: query => dispatch(doFetchStories(query)),
});

export default connect(
  null,
  mapDispatchToProps
)(SearchStories);
{{< /highlight >}}

Start your application again and try to search for stories such as "React" or "Redux". It should work now. The connected component dispatches an action that activates the saga. The side-effect of the saga is the fetching process of the stories by search term from the Hacker News API. Once the request succeeds, another action gets dispatched and captured in the `storyReducer` to finally store the stories. When using Redux Saga, it is essential to wrap your head around the subject that actions can be used to activate sagas but don't need to be evaluated in a reducer. It often happens that another action which is dispatched within the saga is evaluated by the reducers.

Asynchronous actions in Redux and Redux Saga (or other libraries such as Redux Observable or Redux Thunk) open up another can of worms in Redux. The book Taming the State in React dives deeper into this topic.

You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/94efe051bd639aeedce402a33af5acb20397f9f2).

{{% chapter_header "Separation of API logic" "separation-api-logic" %}}

There is one refactoring step that you could apply. It would improve the separation between API functionalities and sagas. You extract the API call from the story saga into an own API folder. Afterward, other sagas can make use of these API requests too.

First, extract the functionality from the saga in the *src/sagas/story.js* file and instead import it.

{{< highlight javascript "hl_lines=3" >}}
import { call, put } from 'redux-saga/effects';
import { doAddStories } from '../actions/story';
import { fetchStories } from '../api/story';

function* handleFetchStories(action) {
  const { query } = action;
  const result = yield call(fetchStories, query);
  yield put(doAddStories(result.hits));
}

export {
  handleFetchStories,
};
{{< /highlight >}}

And second, use it in an own dedicated *src/api/story.js* file.

{{< highlight javascript >}}
const HN_BASE_URL = 'http://hn.algolia.com/api/v1/search?query=';

const fetchStories = query =>
  fetch(HN_BASE_URL + query)
    .then(response => response.json());

export {
  fetchStories,
};
{{< /highlight >}}

Great, you have separated the API functionality from the saga. This way you made your API functions reusable to more than one saga. You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/b6a6e59af71613471a50c9366c4c4e107e00b66f).

{{% chapter_header "Redux: Error Handling" "redux-error-handling" %}}

So far, you are making a request to the Hacker News API and display the retrieved stories in your React components. But what happens when an error occurs? Nothing will show up when you search for stories. In order to give your end-user a great user experience, you could add error handling to your application. Let's do it by introducing an action that can allocate an error state in the Redux store.

{{< highlight javascript "hl_lines=3" >}}
export const STORY_ARCHIVE = 'STORY_ARCHIVE';
export const STORIES_FETCH = 'STORIES_FETCH';
export const STORIES_FETCH_ERROR = 'STORIES_FETCH_ERROR';
export const STORIES_ADD = 'STORIES_ADD';
{{< /highlight >}}

In the second step, you would need an action creator in the *src/actions/story.js* file that keeps an error object in its payload and can be caught in a reducer later on.

{{< highlight javascript "hl_lines=4 9 10 11 12 17" >}}
import {
  STORIES_ADD,
  STORIES_FETCH,
  STORIES_FETCH_ERROR,
} from '../constants/actionTypes';

...

const doFetchErrorStories = error => ({
  type: STORIES_FETCH_ERROR,
  error,
});

export {
  doAddStories,
  doFetchStories,
  doFetchErrorStories,
};
{{< /highlight >}}

The action can be called in your story saga now. Redux Saga, because of its generators, uses try and catch statements for error handling. Every time you would get an error in your try block, you would end up in the catch block to do something with the error object. In this case, you can dispatch your new action to store the error state in your Redux store from the *src/sagas/story.js* file.

{{< highlight javascript "hl_lines=2 8 11 12 13" >}}
import { call, put } from 'redux-saga/effects';
import { doAddStories, doFetchErrorStories } from '../actions/story';
import { fetchStories } from '../api/story';

function* handleFetchStories(action) {
  const { query } = action;

  try {
    const result = yield call(fetchStories, query);
    yield put(doAddStories(result.hits));
  } catch (error) {
    yield put(doFetchErrorStories(error));
  }
}

export {
  handleFetchStories,
};
{{< /highlight >}}

Last but not least, a reducer needs to deal with the new action type. The best place to keep it would be next to the stories. The story reducer in the *src/reducers/story.js* file keeps only a list of stories so far, but you could change it to manage a complex object that holds the list of stories and an error object.

{{< highlight javascript "hl_lines=3 4 5 6 8 9 10 11" >}}
import { STORIES_ADD } from '../constants/actionTypes';

const INITIAL_STATE = {
  stories: [],
  error: null,
};

const applyAddStories = (state, action) => ({
  stories: action.stories,
  error: null,
});

function storyReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case STORIES_ADD : {
      return applyAddStories(state, action);
    }
    default : return state;
  }
}

export default storyReducer;
{{< /highlight >}}

Now you can introduce the second action type in the *src/reducers/story.js* reducer file. It would allocate the error object in the state but keeps the list of stories empty.

{{< highlight javascript "hl_lines=3 8 9 10 11 18 19 20" >}}
import {
  STORIES_ADD,
  STORIES_FETCH_ERROR,
} from '../constants/actionTypes';

...

const applyFetchErrorStories = (state, action) => ({
  stories: [],
  error: action.error,
});

function storyReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case STORIES_ADD : {
      return applyAddStories(state, action);
    }
    case STORIES_FETCH_ERROR : {
      return applyFetchErrorStories(state, action);
    }
    default : return state;
  }
}

export default storyReducer;
{{< /highlight >}}

In your story selector, you would have to change the structure of the story state. The story state isn't anymore a mere list of stories but a complex object with a list of stories and an error object. In addition, you can add a second selector in the *src/selectors/story.js* file to select the error object. It will be used later on in a component.

{{< highlight javascript "hl_lines=4 6 7 11" >}}
...

const getReadableStories = ({ storyState, archiveState }) =>
  storyState.stories.filter(isNotArchived(archiveState));

const getFetchError = ({ storyState }) =>
  storyState.error;

export {
  getReadableStories,
  getFetchError,
};
{{< /highlight >}}

Last but not least, in your component in the *src/components/Stories.js* file you can retrieve the error object in your connect higher-order component and display with React's [conditional rendering](https://www.robinwieruch.de/conditional-rendering-react/) an error message in case of an error in the state.

{{< highlight javascript "hl_lines=2 3 4 5 9 13 24" >}}
...
import {
  getReadableStories,
  getFetchError,
} from '../selectors/story';

...

const Stories = ({ stories, error }) =>
  <div className="stories">
    <StoriesHeader columns={COLUMNS} />

    { error && <p className="error">Something went wrong ...</p> }

    {(stories || []).map(story =>
      ...
    )}
  </div>

...

const mapStateToProps = state => ({
  stories: getReadableStories(state),
  error: getFetchError(state),
});

...
{{< /highlight >}}

In your browser in the developer console, you can simulate being offline. You can try it and see that an error message shows up when searching for stories. But you may have to wait a couple of seconds until the pending request fails. When you go online again and search for stories, the error message should disappear. Instead a list of stories displays again. Another way to test the error handling would be to alter the API endpoint URL to something not existent.

You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/a1f6a885357a891b5e94ade90728a1f2d3d1dbb9).

{{% chapter_header "Tests in Redux" "redux-tests" %}}

Every application in production should be tested. Therefore, the next step could be to add a couple of tests to your application. The chapter will only cover a handful of tests to demonstrate testing in Redux. You could add more of them on your own. However, the chapter will not test your view layer, because this is covered in "The Road to learn React".

Since you have set up your application with create-react-app, it already comes with [Jest](https://facebook.github.io/jest/) to test your application. You can give a filename the prefix *test* to include it in your test suite. Once you run `npm test` on the command line, all included tests will get executed. The following files were not created for you, thus you would have to create them on your own.

First, let's create a test file for the story reducer called *src/reducers/story.test.js*. As you have learned, a reducer gets a previous state and an action as input and returns a new state. It is a pure function and thus it should be simple to test because it has no side-effects.

{{< highlight javascript >}}
import storyReducer from './story';

describe('story reducer', () => {
  it('adds stories to the story state', () => {
    const stories = ['a', 'b', 'c'];

    const action = {
      type: 'STORIES_ADD',
      stories,
    };

    const previousState = { stories: [], error: null };
    const expectedNewState = { stories, error: null };

    const newState = storyReducer(previousState, action);

    expect(newState).toEqual(expectedNewState);;
  });
});
{{< /highlight >}}

Basically you created the necessary inputs for your reducer and the expected output. Then you can compare both in your expectation. It depends on your test philosophy whether you create the action again in the file or import your action creator that you already have from your application. In this case, an action was used.

In order to verify that your previous state isn't mutated when creating the new state, because Redux embraces immutable data structures, you could use a neat helper library that freezes your state.

{{< highlight javascript >}}
npm install --save-dev deep-freeze
{{< /highlight >}}

In this case, it can be used to freeze the previous state in the *src/reducers/story.test.js* file.

{{< highlight javascript "hl_lines=1 16" >}}
import deepFreeze from 'deep-freeze';
import storyReducer from './story';

describe('story reducer', () => {
  it('adds stories to the story state', () => {
    const stories = ['a', 'b', 'c'];

    const action = {
      type: 'STORIES_ADD',
      stories,
    };

    const previousState = { stories: [], error: null };
    const expectedNewState = { stories, error: null };

    deepFreeze(previousState);
    const newState = storyReducer(previousState, action);

    expect(newState).toEqual(expectedNewState);;
  });
});
{{< /highlight >}}

Now, every time you would mutate accidentally your previous state in the reducer, an error in your test would show up. It is up to you to add two more tests for the story reducer. One test could verify that an error object is set when an error occurs and another test that verifies that the error object is set to null when stories are successfully added to the state.

Second, you can add a test for your selectors in a *src/selectors/story.test.js* file. Let's demonstrate it with your story selector. Since the selector function is a pure function again, you can easily test it with an input and an expected output. You would have to define your global state and use the selector the retrieve an expected substate.

{{< highlight javascript >}}
import { getReadableStories } from './story';

describe('story selector', () => {
  it('retrieves readable stories', () => {
    const storyState = {
      error: null,
      stories: [
        { objectID: '1', title: 'foo' },
        { objectID: '2', title: 'bar' },
      ],
    };
    const archiveState = ['1'];
    const state = { storyState, archiveState }

    const expectedReadableStories = [{ objectID: '2', title: 'bar' }];
    const readableStories = getReadableStories(state);

    expect(readableStories).toEqual(expectedReadableStories);;
  });
});
{{< /highlight >}}

That's it. Your Redux state is a combination of the `storyState` and the `archiveState`. When both are defined, you already have your global state. The selector is used to retrieve a substate from the global state. Thus you would only have to check if all the readable stories that were not archived are retrieved by the selector.

Third, you can add a test for your action creators in a *src/actions/story.test.js* file. An action creator only gets a payload and returns an action object. The expected action object can be tested.

{{< highlight javascript >}}
import { doAddStories } from './story';

describe('story action', () => {
  it('adds stories', () => {
    const stories = ['a', 'b'];

    const expectedAction = {
      type: 'STORIES_ADD',
      stories,
    };
    const action = doAddStories(stories);

    expect(action).toEqual(expectedAction);;
  });
});
{{< /highlight >}}

As you can see, testing reducers, selectors and action creators always follow a similar pattern. Due to the functions being pure functions, you can focus on the input and output of these functions. In the previous examples all three test cases were strictly decoupled. However, you could also decide to import your action creator in your reducer test avoid creating a hard coded action. You can find this section of the tutorial in [the GitHub repository](https://github.com/rwieruch/react-redux-hackernews/tree/d1fcb31b7a1b1602069718941844d08c21583607).

<hr class="section-divider">

Implementing this application could go on infinitely. I would have plenty of features in my head that I would want to add to it. What about you?

The project went through all the vertical subjects Redux offers to build a sophisticated application with it. However, it only scratched various topics on the surface (connecting React and Redux with the connect higher-order component, asynchronous actions with Redux Saga, testing, immutability). If you want to dive deeper into these topics, checkout the book Taming the State in React. The following is a list about technical things you could add to your application. Some of these things may be doable without reading the book, whereas other things may not (e.g. normalization).

* Local State: So far you have only used Redux. But what about mixing local state into the application? Could you imagine a use case for it? For instance, you would be able to distinguish between readable and archived stories in your application. There could be a toggle, that is true or false in your Stories component as local state, that decides whether the component shows readable or archived stories. Depending on the toggle in your view layer, you would retrieve either readable or archived stories via selectors from your Redux store and display them.

* React Router: Similar to the previous step, using a toggle to show archived and readable stories, you could add a view layer Router to display these different stories on two routes. It could be React Router when using React as your view layer. All of this is possible, because fortunately you don't delete stories when archiving them from your Redux store, but keep a list of archived stories in a separate substate.

* Paginated Data: The response from the Hacker News API doesn't only return the list of stories. It returns a paginated list of stories with a page property. You could use the page property to fetch more stories with the same search term. The list component in React could be a [paginated list](https://www.robinwieruch.de/react-paginated-list/) or [infinite scroll list](https://www.robinwieruch.de/react-infinite-scroll/).

* Caching: You could cache the incoming data from the Hacker News API in your Redux store. It could be cached by search term. When you search for a search term twice, the Redux store could be used, when a result by search term is already in place. Otherwise a request to the Hacker News API would be made. In [the Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/) readers create a cache in React's local state. However, the same can be done in a Redux store.

* Local Storage: You already keep track of your archived stories in the Redux store. You could introduce the native local storage of the browser, as you have seen in the plain React chapters, to keep this state persistent. When a user loads the application, there could be a lookup in the local storage for archived stories. If there are archived stories, they could be rehydrated into the Redux store. When a story gets archived, it would be dehydrated into the local storage too. That way you would keep the list of archived stories in your Redux store and local storage in sync, but would add a persistent layer to it when an user closes your application and comes back later to it.

* Normalization: The data that comes from the Hacker News API could be normalized before it reaches the reducer and finally the Redux store. You could use the normalizr library that was introduced in the book. It might be not necessary yet to normalize your state, but in a growing application you would normalize your data eventually. The data would be normalized between fetching the data and sending it via an action creator to the reducers.

As you can see, there are a multitude of features you could implement or techniques you could make use of. Be curious and apply these on your own. After you come up with your own implementations, I am keen to see them. Feel free to reach out to me.

As for now, I hope the React Redux tutorial for beginners was useful for you to dip your toes into Redux with React. As mentioned, the tutorial only scratched the surface for a couple of topics, so make sure to checkout the book if you are interested in learning more about them. Otherwise, keep building applications with React and Redux. I wish you all the best with it.
