---
title: "Reasons to learn Redux as a JavaScript Developer"
description: "Redux greatly shaped how we develop modern JavaScript applications nowadays. Here I want to give a walkthrough on all the mindset changes we went through as JavaScript developers ..."
date: "2019-09-21T07:52:46+02:00"
categories: ["JavaScript", "Redux", "React"]
keywords: ["javascript redux", "react redux"]
hashtags: ["#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Redux has been with us for a while now. What has gone public 2015 -- [demonstrated by Dan Abramov](https://www.youtube.com/watch?v=xsSnOQynTHs) in his infamous talk about time travel -- suddenly turned into many JavaScript developer's day to day business. Especially React developers were hit hard by this phenomenon, because it gave everyone a clear path on how to deal with state management.

One year later, Dan Abramov gave a recap on [what made Redux successful](https://www.youtube.com/watch?v=uvAXVMwHJXU) in the first place. Both talks are super insightful on how a problem can be solved with a piece of technology and what makes this technological lasting after all. Lots of JavaScript libraries come and go. But Redux managed to stay with us.

However, I believe there is more than *just* one successful library. Redux is a whole mindset shift for many people in the JavaScript community, who literally grew up with *only* web development, but never heard about function composition or immutability before. Whether Redux stays with us for a few more years or makes place for other state management libraries, it leaves a great legacy on how we develop modern web applications.

# Everything has a clear Purpose

If someone would ask me for one short representation of Redux, it would be:

```javascript
State => View
```

If it needs more explanation, I would extend it into:

```javascript
Action => Reducer(s) => Store => View
```

If there is more context needed, one could extend it into a repeating loop:

```javascript
Action => Reducer(s) => Store => View => User Interaction => Action ...
```

That's all of Redux (State) in context of a library like React (View). Every part in the chain has its task. Everything is clearly separated from each other and serves a purpose for the greater goal: state management.

However, too many people associate Redux tightly with React. Once they start learning React, they go all-in by combining [React with Redux from the start](/learn-react-before-using-redux/) which demotivates lots of developers with its complexity. However, Redux in a nutshell isn't that complex, if just considering Redux, because after all, it's just a state container (object) which holds state; with an API that enables one

* to manipulate the state
* to receive the state
* to listen to state changes

Let's recap all parts of Redux briefly in JS. This is a [Redux Reducer](/javascript-reducer/) that acts on two Redux Actions which has no dependencies on the Redux library at all:

```javascript
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
      ? { ...todo, completed: !todo.completed }
      : todo
  );
}
```

The Redux store which knows about the Redux Reducer:

```javascript
import { createStore } from 'redux';

const store = createStore(reducer, []);
```

Then, the Redux Store offers a small API surface to interact with it -- e.g. dispatching a Redux Action:

```javascript
store.dispatch({
  type: 'TODO_ADD',
  todo: { id: '0', name: 'learn redux', completed: false },
});
```

Finally, in JavaScript, you can listen to changes with the Redux Store:

```javascript
store.subscribe(() => {
  console.log(store.getState());
});
```

That's Redux in a nutshell with all its fragments: Action, Reducer, Store. There is no React and no View yet. The View could be considered as the `console.log`. If you didn't learn Redux yet, feel free to check out this long read [React + Redux tutorial](/react-redux-tutorial) which teaches Redux before it integrates into React.

Redux's Actions, Reducers, Store have all their mandatory place in the Redux toolchain. If there needs to be syntax sugar on top, one can add Action Creators and Selectors. All you need to get started is the [redux](https://github.com/reduxjs/redux) library to create the Redux Store. Everything else is just JavaScript. Also there is nothing to see about a library like React yet. It's clearly separated with its own library -- [react-redux](https://github.com/reduxjs/react-redux) -- and ecosystem.

I believe Redux has taught us a great deal about separating things into atomic parts. Within the library -- with its Actions, Reducers and Store -- everything has its purpose and clear API, but also outside of the library with all the bindings for different frameworks like React and Angular. It gave everyone contributing to the ecosystem the master plan on how things should be done with clear constraints and a simple API.

# Immutability

Immutability wasn't a huge deal in the JavaScript landscape before Redux. Performing mutations on variables was everyone's usual business. However, with the introduction of the modern frontend frameworks and scaling web applications, many people felt the pain of passing around mutable information. Changing a variable at one place meant unforeseen side-effects at another place in your application.

In Redux everything in the state container *should* be treated as immutable data structure -- which isn't enforced though. If you are adding an entry to an array, with Redux one got used to JavaScript functions which treat your data structures as immutable:

```javascript
// do
const newState = state.concat(action.todo);

// don't
state.push(action.todo);
```

There are various array and object functions which return new arrays/objects -- keeping them immutable -- instead of mutating them. Also recent language additions helped a lot to facilitate this new mindset:

```javascript
const toggledTodo = { ...todo, completed: !todo.completed };
```

People started to think about these nuances regarding immutable data structures in JavaScript -- which had superior benefits for the overall JavaScript development experience. No more leaking variables which were mutated at various places in one's application.

# Pure Functions

Almost identical to immutability, pure functions weren't discussed as heavily before Redux got introduced in the JavaScript ecosystem. It was more of a *suggestion* that functions should be pure, but never been taken super serious by web developers.

```javascript
// action creator returning an action

function addTodo(todo) {
  return {
    type: 'TODO_ADD',
    todo,
  };
}

const action = addTodo({
  id: '0',
  name: 'learn redux',
  completed: false
});

store.dispatch(action);
```

With Redux the mindset shifted and people started to avoid having side-effects in their functions, to please the Redux philosophy, but also to ensure better testability and to avoid unforeseen breaches of their functions in the long run.

```javascript
(Input) => Output
```

A Redux Action is just an operator on the present state whereas a Redux Reducer takes this action to modify the state from one representation to the next representation. There is no remote API call or other task in between. It always follows one function signature:

```javascript
(Current State, Action) => New State
```

That's the secret which made Redux Reducers and in general the Redux state management highly predictable. One action leads to a new state based on the action's information and the current state. The Redux store is only the container for this state.

# Thinking in Functions

With Redux gaining popularity, functions were considered more first-class citizens in JavaScript than ever. Not only the concept of pure functions got passed from developer to developer, but also other concepts like higher-order functions and function composition gained popularity.

```javascript
function toggleTodo(action) {
  return function(todo) {
    return todo.id === action.todo.id
      ? { ...todo, completed: !todo.completed }
      : todo;
  };
}

function applyToggleTodo(state, action) {
  return state.map(toggleTodo(action));
}
```

All of these concepts contributed to the fact that JavaScript developers got more and more introduced to the paradigm of functional programming. Obviously these concepts didn't originate with Redux, but they were taken into the eyesight of many developers who only started to learn JavaScript or who had *only* used JavaScript in their career so far.

# JavaScript ES6

It was just a timing coincidence that JavaScript ES6 got introduced the same time when Redux gained traction. JavaScript ES6 brought developers new features that just played into Redux's hands. For instance, functions could be expressed with arrow functions instead of bulky function statements and bodies:

```javascript
const toggleTodo = action => todo =>
  todo.id === action.todo.id
    ? { ...todo, completed: !todo.completed }
    : todo;

const applyToggleTodo = (state, action) =>
  state.map(toggleTodo(action));
```

JavaScript ES6 made many expression more concise. Creating a new object out of another object with keeping the data structure immutable could be achieved with JavaScript's new spread operator:

```javascript
const toggledTodo = {
  ...todo,
  completed: !todo.completed,
};
```

It was just a wonderful addition to JavaScript which made many libraries like Redux, but also [React](/javascript-fundamentals-react-requirements/), flourish.

# Unidirectional Data Flow

Redux already adds lots of predictability to modern state management by just taking apart all the fragments -- that are mandatory to perform state changes -- and by giving them clear purposes and APIs.

```javascript
Action => Reducer(s) => Store
```

However, another great factor was the unidirectional data flow which got primarily introduced in React and its preceding state management libraries (see Flux), but was embraced by Redux for a predictable state management flow as well.

```javascript
View => Interaction => Action => Reducer(s) => Store => Updated View
```

There is a clear unidirectional data flow. One can see who is responsible:

* Who starts the chain of state manipulation (e.g. user interaction).
* Who manipulates the state (reducer) with which information (action, current state).
* Who is affected by the state manipulation (e.g. UI re-render).

```javascript
1) Interaction in View =>
2) State Manipulation =>
3) Updated View =>
1) Interaction in View =>
...
```

Learning about information flow is considered a great asset for every developer. There are no unpredictable side-effects in between with a clear architecture -- due to pure functions and immutable data structures -- and there are no bi/multi directional data flows which are difficult to follow -- which has been a topic before where other frameworks failed. Everything moves towards one direction and ultimately results in a predictable state management loop.

# Thinking in Events, not Setters

Often people mistake Redux as a simple setter/getter concept. The UI dispatches an action; which goes through a reducer; which ultimately sets a new state in the Redux store. The subscribed UI receives an update from the Redux store and re-renders based on the new state.

```javascript
// that's not Redux

store.setState({
  id: '0',
  name: 'learn redux',
  completed: false
});
````

However, that's not giving Redux the full credit for what it is, because it is a sophisticated event-driven concept (see Event Sourcing or CQRS). It has reducers in between which decide for themselves whether they are affected by an incoming action or not. It moves the perspective from

* explicit to implicit state manipulation
* setters to events
* one-purpose reducers to multi-purpose reducers
* narrow minded reducers to open minded reducers

Especially the last two facts should be considered by ever developer to make use of Redux's full potential, because suddenly reducers operate on a higher abstraction level than common setters and act on the same actions as other reducers in your application:

```javascript{5,17}
import { createStore, combineReducers } from 'redux';

function todoReducer(state, action) {
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

function statisticReducer(state, action) {
  switch(action.type) {
    case 'TODO_ADD' : {
      return applyCalculateTodos(state, action);
    }
    default : return state;
  }
}

const rootReducer = combineReducers({
  todos: todoReducer,
  statistics: statisticReducer,
});

const store = createStore(rootReducer, []);
```

*Note: Keeping in mind that the given example is not perfect here, because any sorts of statistics computed based on the todo entities could be calculated on the fly by having all todos available from the state and calculating their statistics with the right selector just in time.*

Redux gives a great demonstration of event driven systems for any web developer who hasn't seen one before. Just by looking at how actions, reducers and the store work together, it gives people lots of insights how event-driven systems in other applications are doing there thing.

# Domain-Driven Design

Domain-driven design (DDD) isn't a thing in Redux itself, and may be a bit far fetched here arguably, but once you get beyond a small-sized application, every developer or team of developers has to think about how to split up state/reducers into their domains when using Redux.

You may end up with reducers for (A) various entities (e.g. todos, users) that are fetched from a [remote API](/what-is-an-api-javascript), (B) filters (e.g. show all incomplete todos, show all active users) and (C) statistics (e.g. calculate the number of completed todos by active users).

```javascript
import { createStore, combineReducers } from 'redux';

...

const rootReducer = combineReducers({
  todos: todoReducer, // (A)
  users: userReducer, // (A)
  filter: filterReducer, // (B)
  statistics: statisticReducer, // (C)
});

const store = createStore(rootReducer, []);
```

Whether people think about domain-driven design when they see this kind of domain clustering doesn't matter, but what matters is that they unconsciously start to think in domains and how to encapsulate them in their places with clear APIs to the outside.

Even though it may not be domain-driven design how it's taught in the books, it opens up a developer's mind for these kind of concepts which are mainly showing up in other programming languages.

# Innovative Ecosystem

Once you started to use Redux, you are likely to meet selectors and actions creators too:

```javascript
Action Creator => Action => Reducer(s) => Store => Selector => View
```

These are only two more concepts for Redux to give every part of it a more distinct role in the whole toolchain. Whereas a Action Creator creates an action object, a Selector selects only a slice of your state to make it available to your UI:

```javascript
// action creator

function addTodo(todo) {
  return {
    type: 'TODO_ADD',
    todo,
  };
}

// selector

function getCompletedTodos(state) {
  return state.filter(todo => todo.completed);
}
```

Beyond these concepts you will most likely meet other popular libraries from the Redux ecosystem such as Redux Saga or Redux Observables -- which both handle side-effects in Redux as middleware. Each of them introduces a new concept to Redux, which are not heavily used at all in JavaScript: [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) and [observables](https://rxjs-dev.firebaseapp.com/guide/observable).

```javascript
// Redux Saga

function* fetchUser(action) {
  try {
    const user = yield call(Api.fetchUser, action.payload.userId);
  yield put({ type: 'USER_FETCH_SUCCEEDED', user: user });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* userWatcher() {
  yield takeEvery('USER_FETCH_REQUESTED', fetchUser);
}
```

That's another aspect which made Redux successful: its ecosystem. The concept of Redux is just the core, but its API design and simplicity of just using JavaScript left other developers lots of opportunities to opt-in into its world. This led to library authors exploring new concepts, such as generators or observables, and bringing them to the attention of more developers.

```javascript
// Redux Observable

const pingEpic = action$ => action$.pipe(
  filter(action => action.type === 'PING'),
  delay(1000),
  mapTo({ type: 'PONG' })
);

dispatch({ type: 'PING' });
```

Redux with its ecosystem broadened the horizon for many JavaScript developers; giving them the tools for exploring what's possible with their programming language of choice. Also other state management library authors draw inspiration from everything that's going on in Redux's ecosystem making it the perfect blueprint for a flourishing ecosystem.

# KISS

It's a common theme: Learning Redux is overwhelming when starting out with everything at once. There are ...

* actions
* reducers
* Redux store
* connecting it to React
* combining reducers
* middleware
* action creators
* selectors
* generators/observables

However, all of this depends on how newcomers to Redux structure their learning experience. When you resume this article to the very beginning, one can see that Redux is only the following in its core:

```javascript
Action => Reducer(s) => Store
```
That's all to it. Redux is *Keep it simple, stupid*. There is no hidden magic, 99% of it is pure JavaScript expressed in actions and reducers. Only the Redux store API offers a small surface area for ...

```javascript
// dispatching actions
store.dispatch(myAction);

// subscribing to state updates
store.subscribe(() => {
  // do something, e.g. re-render UI
});

// getting the state
store.getState();
```

There isn't more to Redux. KISS should be applied to learning Redux as well. Start with its core concepts, not worrying about selectors, sagas and React. Then move forward from there once you feel comfortable. Don't throw too much stuff on top if you feels it's too much of a burden.

After all, KISS is an important lesson for everyone who has used Redux. If one decides to create their own library, then KISS. If one decides to build a React component, then KISS. If one decides to open up an API, then KISS. After all, this is what made Redux popular. It solved only one problem, but it solved it amazingly good.

# Don't Brag; Be Humble

Everyone who follows the creators and team behind Redux can see them being super humble. There exists a blog post by Dan Abramov suggesting that [you may not need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) for your application. All these people behind the library are great role models for the JavaScript community.

I think on a non-technical level, everyone can learn something from these personality traits. Give helpful advice when someone asks you. Don't brag about your stuff. Consider opinions by other people. Don't throw your favorite framework in another person's face. We are all just human beings, so let's support each other in order to develop amazing things in JavaScript!

# Redux makes one a better JavaScript Developer

Taken all the previous points into account, I believe Redux makes everyone a better JavaScript developer. People start to think in functions, in higher-order functions or composable functions or concise functions, consider immutable data structures, pure functions, and domains in their application, and stay on the shoulders of giants when contributing to the ecosystem by following their role models. Maybe the no bragging and humble attitude rubs off to the one or other person as well :-) Overall, it makes everyone a better developer.

I believe Redux's legacy was greatly influenced through timing. There were many people out there who *"only"* knew JavaScript as their programming language, maybe started just recently with it as their first language, and never got introduced to broader programming concepts and techniques like immutability, functional programming, domain-driven design or generators. With Redux at their hands, they learned a great deal about all these things. Even though Redux may go away in the future, I would recommend to everyone who is new to JavaScript to learn it just for the sake of all the benefits that are coming with learning it.