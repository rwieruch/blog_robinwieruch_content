+++
title = "Redux or MobX: An attempt to dissolve the Confusion"
description = "Using Redux or MobX in your React application? The article shows you all the differences between both state management libraries that can be used in React. It gives you guidance to learn MobX vs Redux in React.js applications, their strengths and weaknesses and when to use them ..."
date = "2017-03-28T13:50:46+02:00"
tags = ["React", "MobX", "JavaScript"]
categories = ["React", "MobX", "JavaScript"]
keywords = ["redux mobx", "redux or mobx", "redux vs mobx", "redux alternative"]
news_keywords = ["redux mobx", "redux", "mobx"]
hashtag = "#ReactJs"
card = "img/posts/redux-mobx-confusion/banner_640.jpg"
banner = "img/posts/redux-mobx-confusion/banner.jpg"
contribute = "redux-mobx-confusion.md"
headline = "Redux or MobX: An attempt to dissolve the Confusion"

summary = "Everyone wants to have state management in an application. But what problem does it solve for us? Most people start with a small application and already introduce a state management library. Everyone is speaking about it, aren't they? But most applications don't need ambitious state management from the beginning. It is even more dangerous, because most people are never going to experience which problems libraries like Redux or MobX solve."
+++

{{% sponsorship %}}

{{% pin_it_image "redux mobx" "img/posts/redux-mobx-confusion/banner.jpg" "is-src-set" %}}

I used {{% a_blank "Redux" "https://github.com/reactjs/redux" %}} excessively the last years, but spent the recent time with {{% a_blank "MobX" "https://github.com/mobxjs/mobx" %}} as state management alternative. It seems that Redux alternatives evolve naturally into confusion in the community. People are {{% a_blank "uncertain" "https://www.reddit.com/r/reactjs/comments/4npzq5/confused_redux_or_mobx/" %}} which solution to pick. **The issue isn't necessarily Redux vs MobX**. Whenever there exists an alternative, people are curious what's the best way to solve their problem. I am writing these lines to dissolve the confusion around both state management solutions Redux and MobX.

Often the article references [React as view layer library](https://www.robinwieruch.de/essential-react-libraries-framework/) for the usage of state management libraries such as MobX and Redux. Yet you can often substitute React with other solutions such as Angular or Vue.

In the beginning of 2016 I wrote a {{% a_blank "fairly big application in React + Redux" "https://github.com/rwieruch/favesound-redux" %}}. After I discovered MobX as alternative, I took the time to {{% a_blank "refactor the application from Redux to MobX" "https://github.com/rwieruch/favesound-mobx/pull/1" %}}. I feel pretty comfortable in using both and in explaining their approaches.

What is this article going to be about? First, I want to revisit shortly the problem a state management library is solving for us. After all, you would be doing fine by just using `this.setState()` and `this.state` in React or a variation of it in another view layer library or SPA framework. Second, I will continue to give you an overview of both solutions by showing the consistencies and differences. Third, I want to give newcomers to the React ecosystem a roadmap to {{% a_blank "learn state management in React" "https://roadtoreact.com/course-details?courseId=TAMING_THE_STATE" %}}. Spoiler alert: [Begin with React's local state before you dive into MobX or Redux](https://www.robinwieruch.de/learn-react-before-using-redux/). Last but not least, if you already have an application running with MobX or Redux, I want to give you more insights in refactoring from one to another state management library.

{{% chapter_header "Table of Contents" "toc" %}}

* [What problem do we solve?](#motivation)
* [What's the difference between Redux and MobX?](#difference)
* [The Learning Curve in React State Management](#learningCurve)
* [Another state management solution?](#anotherSolution)
* [Final Thoughts](#finalThoughts)
* [Fact Sheet](#factSheet)
* [Key Takeaways](#keyTakeaways)
* [More Resources](#resources)

{{% chapter_header "What problem do we solve?" "motivation" %}}

Everyone wants to have state management in an application. But what problem does it solve for us? Most people start with a small application and already introduce a state management library. Everyone is speaking about it, aren't they? Redux! MobX! But most applications {{% a_blank "don't need ambitious state management" "https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367" %}} from the beginning. It is even more dangerous, because most **people are never going to experience which problems libraries like Redux or MobX solve**.

Nowadays, the status quo is to build a frontend application with components. Components have internal state. For instance, in React such a local state is handled with `this.state` and `this.setState()`. In a growing application, the state management can become chaotic with local state, because:

* a component needs to share state with another component
* a component needs to mutate the state of another component

At some point, it gets more difficult to reason about the application state. It becomes a messy web of state objects and state mutations across your component hierarchy. Most of the time, the state objects and state mutations are not necessarily bound to one component. They reach through your component tree and you have to {{% a_blank "lift state up and down" "https://facebook.github.io/react/docs/lifting-state-up.html" %}}.

The solution therefore is to introduce a state management library like MobX or Redux. It gives you tools to save your state somewhere, to change your state and to receive state updates. You have one place to find your state, one place to change it and one place to get updates from. It follows the principle of a single source of truth. It makes it easier to reason about your state and state changes, because they get decoupled from your components.

State management libraries like Redux and MobX often have utility add-ons, like for React they have {{% a_blank "react-redux" "https://github.com/reactjs/react-redux" %}} and {{% a_blank "mobx-react" "https://github.com/mobxjs/mobx-react" %}}, to give your components access to the state. Often these components are called **container components** or, to be more specific, **connected components**. From anywhere in your component hierarchy you can access and alter the state by upgrading your component to a connected component.

{{% chapter_header "What's the difference between Redux and MobX?" "difference" %}}

Before we dive into the differences, I want to give you the consitencies between MobX and Redux.

Both libraries are used to manage state in JavaScript applications. They are not necessarily coupled to a library like React. They are used in other libraries like AngularJs and VueJs too. But they integrate well with the {{% a_blank "philosophy of React" "https://www.robinwieruch.de/reasons-why-i-moved-from-angular-to-react/" %}}.

If you choose one of the state management solutions, you will not experience a vendor lock-in. You can change to another state management solution any time. You can go from MobX to Redux or from Redux to MobX. I will demonstrate you later on how this works.

Redux by {{% a_blank "Dan Abramov" "https://twitter.com/dan_abramov" %}} and {{% a_blank "Andrew Clark" "https://twitter.com/acdlite" %}} is a derivation of the {{% a_blank "flux architecture" "https://facebook.github.io/flux/docs/in-depth-overview.html" %}}. In contrast to flux, it uses a single store over multiple stores to save state. In addition, instead of a dispatcher it uses pure functions to alter the state. If you are not familiar with flux and you are new to state management, don't bother with the last paragraph.

Redux is influenced by **functional programming (FP) principles**. FP can be done in JavaScript, but a lot of people come from an object-oriented background, like Java, and have difficulties to adopt functional programming principles in the first place. That adds up later on why MobX might be easier to learn as a beginner.

Since Redux embraces functional programming, it uses **pure functions**. A function gets an input, returns an output and does not have other dependencies but pure functions. A pure function produces always the same output with the same input and doesn't have any side-effects.

{{< highlight javascript >}}
(state, action) => newState
{{< /highlight >}}

Your Redux **state is immutable**. Instead of mutating your state, you always return a new state. You don't perform state mutations or depend on object references.

{{< highlight javascript >}}
// don't do this in Redux, because it mutates the array
function addAuthor(state, action) {
  return state.authors.push(action.author);
}

// stay immutable and always return a new object
function addAuthor(state, action) {
  return [ ...state.authors, action.author ];
}
{{< /highlight >}}

Last but not least, in idiomatic Redux, your **state is normalized** like in a database. The entities only **reference each other by id**. That's a best practice. Even though not everyone is doing it like that, you can use a library like {{% a_blank "normalizr" "https://github.com/paularmstrong/normalizr" %}} to achieve such a normalized state. Normalized state enables you to keep a **flat state** and to keep entities as **single source of truth**.

{{< highlight javascript >}}
{
  post: {
    id: 'a',
    authorId: 'b',
    ...
  },
  author: {
    id: 'b',
    postIds: ['a', ...],
    ...
  }
}
{{< /highlight >}}

In comparison, MobX by {{% a_blank "Michel Weststrate" "https://twitter.com/mweststrate" %}} is influenced by **object-oriented programming**, but also by **reactive programming**. It wraps your state into observables. Thus you have all the capabilities of Observable in your state. The data can have plain setters and getters, but the observable makes it possible to retrieve updates once the data changed.

In Mobx your **state is mutable**. Thus you mutate the state directly:

{{< highlight javascript >}}
function addAuthor(author) {
  this.authors.push(author);
}
{{< /highlight >}}

Additionally the entities stay in a **(deeply) nested data structure in relation to each other**. You don't normalize your state. The **state stays denormalized and nested**.

{{< highlight javascript >}}
{
  post: {
    id: 'a',
    ...
    author: {
      id: 'b',
      ...
    }
  }
}
{{< /highlight >}}

### One Store vs Multiple Stores

In Redux you keep all your state in **one global store** or **one global state**. The one state object is your single source of truth. Multiple reducers, on the other hand, allow it to alter the immutable state.

In contrast, MobX uses **multiple stores**. Similar to Redux reducers, you can apply a divide and conquer by technical layers, domain etc. You might want to store your domain entities in separate stores yet also have control over the view state in on of your stores. After all, you collocate state that makes the most sense in your application.

Technically you can have multiple stores in Redux too. Nobody forces you to use only one store. But that's not the advertised use case of Redux. It would go against best practices to use multiple stores. In Redux you want to have one store that reacts via its reducers to global events.

### What does the implementation look like?

In Redux it would need the following lines of code to add a new user to the global state. You can see how we make use of the {{% a_blank "object spread operator" "https://github.com/sebmarkbage/ecmascript-rest-spread" %}} to return a new state object. You could also use `Object.assign()` to have immutable objects in JavaScript ES5.

{{< highlight javascript >}}
const initialState = {
  users: [
    {
      name: 'Dan'
    },
    {
      name: 'Michel'
    }
  ]
};

// reducer
function users(state = initialState, action) {
  switch (action.type) {
  case 'USER_ADD':
    return { ...state, users: [ ...state.users, action.user ] };
  default:
    return state;
  }
}

// action
{ type: 'USER_ADD', user: user };
{{< /highlight >}}

You would have to `dispatch({ type: 'USER_ADD', user: user });` to add a new user to the global state.

In MobX a store would only **manage a substate** (like a reducer in Redux manages a substate) but you are able to **mutate the state directly**. The `@observable` annotation makes it possible to observe state changes.

{{< highlight javascript >}}
class UserStore {
  @observable users = [
    {
      name: 'Dan'
    },
    {
      name: 'Michel'
    }
  ];
}
{{< /highlight >}}

Now it is possible to call `userStore.users.push(user);` on a store instance. It is a best practice though to keep your state mutations more explicit with actions.

{{< highlight javascript "hl_lines=11 12 13" >}}
class UserStore {
  @observable users = [
    {
      name: 'Dan'
    },
    {
      name: 'Michel'
    }
  ];

  @action addUser = (user) => {
    this.users.push(user);
  }
}
{{< /highlight >}}

You can strictly enforce it by configuring MobX with `configure({ enforceActions: true });`. Now you can mutate your state by calling `userStore.addUser(user);` on a store instance.

You have seen how to update the state in both Redux and MobX. It is different. In Redux your **state is read-only**. You can alter the state only by using **explicit actions**. In contrast, in MobX the state enables read and write. You can mutate the state directly without using actions yet you can opt-in explicit actions by using the `enforceActions` configuration.

{{% chapter_header "The Learning Curve in React State Management" "learningCurve" %}}

Both Redux and MobX are mostly used in React applications. But they are standalone libraries for state management, which could be used everywhere without React. Their interoperability libraries make it easy to combine them with React components. It is {{% a_blank "react-redux" "https://github.com/reactjs/react-redux" %}} for **Redux + React** and {{% a_blank "mobx-react" "https://github.com/mobxjs/mobx-react" %}} for **MobX + React**. Later I will explain how to use both in a React component tree.

In recent discussions, it happened that people argued about the learning curve in Redux. It was often in the context of React: people began to learn React and already wanted to leverage state management with Redux. **Most people would argue that React and Redux themselves have a good learning curve, but both together can be overwhelming.** An alternative therefore would be MobX, because it is more suitable for beginners.

However, I would suggest a different approach for React newcomers to learn state management in the React ecosystem. Start to learn React with its own local state management functionality in components. In a React application you will first learn the React lifecycle methods and you will deal with local state management by using `setState()` and `this.state`. I highly recommend that learning path. Otherwise you will get overwhlemed quickly by the React ecosystem. Eventually, on this path, you will realize that the (internal) state management of components is getting difficult. After all, that's how the book [The Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/) approaches to teach state management in React.

Now we are at the point: What problem does MobX or Redux solve for us. Both libraries give a way of managing application state externally to the components. The state gets decoupled from the components. Components can access the state, manipulate it (explicit, implicit) and get updated with the new state. The state is a single source of truth.

Now you have to make the decision to choose a state management library. You know why you need to solve the problem in the first place. Moreover after having already a larger application in place, you should feel comfortable with React by now.

### Redux or MobX for Newcomers?

Once you are familiar with React components and the internal state management, you can choose a state management library to solve your problem. After I used both libraries, I would say MobX can be very suitable for beginners. We could already see that MobX needs less code, even though it uses some magic annotations we may not need to know about yet.

In MobX you don't need to be familiar with functional programming. Terms like immutability might be still foreign. Functional programming is a rising paradigm, but novel for most people in JavaScript. There is a clear trend towards it, but since not everyone has a functional programming background, it might be easier for people with an object-oriented background to adopt the principles of MobX.

> On a side note: MobX is suitable for {{% a_blank "internal component state in exchange for React setState" "https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e" %}} as well. I would recommend to keep `setState()` over MobX for internal component state management. But it clearly shows how easy you could weave MobX into React to accomplish internal component state management.

### A Growing Application

In MobX you are mutating annotated objects and your components will render an update. MobX comes with more internal implementation magic than Redux, which makes it easier to use in the beginning with less code. Coming from an Angular background it felt very much like using two-way data binding. You hold some state somewhere, watch the state by using annotations and let the component update do the rest once the state was mutated.

MobX allows it to mutate the state directly from the component tree.

{{< highlight javascript >}}
// component
<button onClick={() => store.users.push(user)} />
{{< /highlight >}}

A better way of doing it would be to have a MobX `@action` in the store.

{{< highlight javascript >}}
// component
<button onClick={() => store.addUser(user)} />

// store
@action addUser = (user) => {
  this.users.push(user);
}
{{< /highlight >}}

It would make the state mutating more explicit with actions. Moreover there exists a little functionality to enforce state mutations via explicit actions like you have seen above.

{{< highlight javascript >}}
// root file
import { configure } from 'mobx';

configure({ enforceActions: true });
{{< /highlight >}}

Mutating the state directly in the store like we did in the first example wouldn't work anymore. Coming from the first to the latter example shows how to embrace best practices in MobX. Moreover once you are doing explicit actions only, you are already using Redux constraints.

I would recommend to use MobX to kickstart projects. Once the application grows in size and contributors, it makes sense to apply best practices like using **explicit actions**. They are embracing the Redux constraints, which say you can never change the state directly and only by using actions.

### Transition to Redux

Once your application gets bigger and has multiple developers working on it, you should consider to use Redux. It enforces by nature to use explicit actions to change the state. The action has a type and payload, which a reducer can use to change the state. In a team of developers it is very easy to reason about state changes that way.

{{< highlight javascript >}}
// reducer
(state, action) => newState
{{< /highlight >}}

Redux gives you a whole architecture for state management with clear constraints. That is the {{% a_blank "success story behind Redux" "https://www.youtube.com/watch?v=uvAXVMwHJXU" %}}.

Another advantage of Redux is using it on the server side. Since we are dealing with plain JavaScript, you could send the state across the network. Serializing and deserializing a state object works out of the box. Yet it is possible in MobX too.

MobX is less opinionated, but by using `configure({ enforceActions: true })` you can enforce clearer constraints like in Redux. That's why I wouldn't say you cannot use MobX in scaling applications, but there is a clear way of doing things in Redux. The documentation in MobX even says: *"[MobX] does not tell you how to structure your code, where to store state or how to process events."* The development team would have to establish a state management architecture in the first place.

After all the state management learning curve isn't that steep. When we recap the recommendations, a newcomer in React would **first learn to use setState() and this.state** properly. After a while you would **realize the problems of using only setState()** to maintain state in a React application. When looking for a solution, you stumble upon state management libraries like MobX or Redux. But which one to choose? Since MobX is less opinionated, has less boilerplate and can be used similar to `setState()` I would recommend in smaller projects to give MobX a shot. Once the application grows in size and contributors, you should consider to enforce more restrictions in MobX or give Redux a shot. I enjoyed using both libraries. Even if you don't use one of them after all, it makes sense to have seen an alternative way of doing state management.

{{% chapter_header "Another state management solution?" "anotherSolution" %}}

You may already started to use one state management solution, but want to consider another one? You could compare both real world {{% a_blank "MobX" "https://github.com/rwieruch/favesound-mobx" %}} and {{% a_blank "Redux" "https://github.com/rwieruch/favesound-redux" %}} applications. I made one big {{% a_blank "Pull Request" "https://github.com/rwieruch/favesound-mobx/pull/1" %}} to show all changes at one place. In the case of the PR, it is a refactoring from Redux to MobX. But you could apply it vice versa. I don't think it is necessary coupled to Redux nor MobX, because most of the changes are very much decoupled from everything else.

Basically you have to exchange Redux Actions, Action Creator, Action Types, Reducer, Global Store with MobX Stores. Additionally the interface to connect React components changes from {{% a_blank "react-redux" "https://github.com/reactjs/react-redux" %}} to {{% a_blank "mobx-react" "https://github.com/mobxjs/mobx-react" %}}. The {{% a_blank "presenter + container pattern" "https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0" %}} can still be applied. You would have to refactor only the container components. In MobX one could use `inject` to get a store dependency. After that the store can pass a substate and actions to a component. MobX `observer` makes sure that the component updates (render) after an `observable` property in the store has changed.

{{< highlight javascript >}}
import { observer, inject } from 'mobx-react';

...

const UserProfileContainer = inject(
  'userStore'
)(observer(({
  id,
  userStore,
}) => {
  return (
    <UserProfile
      user={userStore.getUser(id)}
      onUpdateUser={userStore.updateUser}
    />
  );
}));
{{< /highlight >}}

In Redux you would use `mapStateToProps` and `mapDispatchToProps` to pass a substate and actions to a component.

{{< highlight javascript >}}
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

...

function mapStateToProps(state, props) {
  const { id } = props;
  const user = state.users[id];

  return {
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateUser: bindActionCreators(actions.updateUser, dispatch),
  };
}

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UserProfile);
{{< /highlight >}}

There exists a tutorial on [how to refactor from Redux to MobX](https://www.robinwieruch.de/mobx-react/). But as I said, one could also apply the refactoring vice versa. Once you have chosen a state management library, you can see that there is no vendor lock-in. They are pretty much decoupled from your application and therefore exchangeable.

{{% chapter_header "Final Thoughts" "finalThoughts" %}}

Whenever I read the comments in a Redux vs MobX discussion, there is always this one comment: *"Redux has too much boilerplate, you should use MobX instead. I was able to remove XXX lines of code."* The comment might be true, but no one considers the trade off. **Redux comes with more boilerplate as MobX, because it was added for specific design constraints.** It allows you to reason about your application state even though it is on a larger scale. All the ceremony around state handling is there for a reason.

Redux library is pretty small. Most of the time you are **dealing only with plain JavaScript objects and arrays**. It is closer to vanilla JavaScript than MobX. In MobX one wraps the objects and arrays into observable objects which hide most of the boilerplate. It builds up on hidden abstractions. There the magic happens, but it is harder to understand the underlying mechanisms. In Redux it is easier to reason about it with plain JavaScript. It makes it easier for testing and easier for debugging your application.

Additionally one has again to consider where we came from in single page applications. A bunch of single page application frameworks and libraries had the same problems of state management, which eventually got solved by the overarching flux pattern. Redux is the successor of the pattern.

In MobX it goes the opposite direction again. Again we start to mutate state directly without embracing the advantages of functional programming. For some people it feels again closer to two-way data binding. After a while people might run again into the same problems before a state management library like Redux was introduced. The state management gets scattered across components and ends up in a mess.

While in Redux you have an established ceremony how to set up things, MobX is less opinionated. But it would be wise to embrace best practices in MobX. People need to know how to organize state management to improve the reasoning about it. Otherwise people tend to mutate state directly in components.

Both libraries are great. While Redux is already well established, MobX becomes an valid alternative for state management.

{{% read_more "Learn plain React with setState and this.state" "http://www.robinwieruch.de/the-road-to-learn-react/" %}}

{{% read_more "Learn Redux and MobX in React in a full-blown course" "https://roadtoreact.com/course-details?courseId=TAMING_THE_STATE" %}}

{{% chapter_header "Fact Sheet" "factSheet" %}}

* Redux
  * single store
  * functional programming paradigm
  * immutable
  * pure
  * explicit update logic
  * plain JavaScript
  * more boilerplate
  * normalized state
  * flat state

* MobX
  * multiple stores
  * object-oriented programming and reactive programming paradigms
  * mutable
  * impure
  * implicit update logic
  * "magic" JavaScript
  * less boilerplate
  * denormalized state
  * nested state

{{% chapter_header "Key Takeaways" "keyTakeaways" %}}

* learn React with setState and this.state to manage local state
  * get comfortable with it
  * experience the issues you run into without a state managament library like Redux or MobX
* learning recommendations
  * setState -> MobX -> MobX more restricted (e.g. configure enforceActions) -> Redux
  * or stick to one solution after setState:
* use MobX over Redux:
  * short learning curve
  * simple to use (magic)
  * quick start
  * less opinionated
  * minimal boilerplate
  * used in lightweight applications
  * mutable data
  * object-oriented programming
  * in a smaller size &amp; few developers project
  * but can be used in bigger size projects too, when used with explicit constraints
* use Redux over MobX:
  * clear constraints
  * testable lightweight parts
  * opinionated state management architecture
  * mature best practices
  * used in complex applications
  * immutable data
  * functional programming
  * in a bigger size &amp; several developers / teams project
  * testability, scaleability, maintainability
* container + presenter components is a valid pattern for both
* react-redux and mobx-react are exchangeable interfaces to React container components
* configured enforced actions of MobX makes state changes more obvious in a scaling app and should be best practice

{{% chapter_header "More Resources" "resources" %}}

* {{% a_blank "comparison by Michel Weststrate" "https://www.youtube.com/watch?v=etnPDw5PKqg" %}} - the creator of MobX
* {{% a_blank "comparison by Preethi Kasireddy" "https://www.youtube.com/watch?v=76FRrbY18Bs" %}}
