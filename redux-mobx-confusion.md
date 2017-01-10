+++
title = "Redux or MobX: An attempt to dissolve the Confusion"
description = "Redux or MobX? The article shows you the differences between both state management libraries used in React. It gives you guidance to learn MobX vs Redux in React JS applications, when to use them and..."
date = "2016-12-27T13:50:46+02:00"
tags = ["React", "Redux", "MobX"]
categories = ["React", "Redux", "MobX"]
keyword = "redux mobx"
news_keywords = ["redux mobx", "redux", "mobx"]
banner = "img/posts/redux-mobx-confusion/banner.jpg"
contribute = "redux-mobx-confusion.md"

summary = "Everyone wants to have state management in an application. But what problem does it solve for us? Most people start with a small application and already introduce a state management library. Everyone is speaking about it, aren't they? But most applications don't need ambitious state management from the beginning. It is even more dangerous, because most people are never going to experience which problems libraries like Redux or MobX solve."
+++

{{% header "Redux or MobX: An attempt to dissolve the Confusion" %}}

{{% pin_it_image "redux mobx" "img/posts/redux-mobx-confusion/banner.jpg" %}}

I used {{% a_blank "Redux" "https://github.com/reactjs/redux" %}} excessively the last year, but spent the recent time with {{% a_blank "MobX" "https://github.com/mobxjs/mobx" %}} as state management alternative. It seems that an upcoming alternative to Redux evolves naturally into confusion in the community. People are {{% a_blank "uncertain" "https://www.reddit.com/r/reactjs/comments/4npzq5/confused_redux_or_mobx/" %}} which solution to pick. **The issue isn't necessarily Redux or MobX**. Whenever there exists an alternative, people are curious what's the best way to solve their problem. I am writing these lines now to clear the confusion around both state management solutions Redux and MobX.

In the beginning of 2016 I wrote a {{% a_blank "fairly big application in React + Redux" "https://github.com/rwieruch/favesound-redux" %}}. After I discovered MobX as alternative some time ago, I took the time to refactor the {{% a_blank "application from Redux to MobX" "https://github.com/rwieruch/favesound-mobx/pull/1" %}}. Now I am pretty comfortable in using both and hopefully in explaining both approaches.

First I want to revisit shortly the problem a state management library is solving for us. I will continue to dive into an overview of both solutions by showing the differences. Afterwards I will give newcomers to the React ecosystem a roadmap to learn state management in React. Last but not least I give some more insights in refactoring from one to another state management library.

{{% chapter_header "Table of Contents" "toc" %}}

* [What problem do we solve?](#motivation)
* [What's the difference between Redux and MobX?](#difference)
* [The Learning Curve in React State Management](#learningCurve)
* [Another state management solution?](#anotherSolution)
* [Final Thoughts](#finalThoughts)
* [Resources](#resources)
* [Key Takeaways](#keyTakeaways)

{{% chapter_header "What problem do we solve?" "motivation" %}}

Everyone wants to have state management in an application. But what problem does it solve for us? Most people start with a small application and already introduce a state management library. Everyone is speaking about it, aren't they? But most applications {{% a_blank "don't need ambitious state management" "https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367" %}} from the beginning. It is even more dangerous, because most **people are never going to experience which problems libraries like Redux or MobX solve**.

Nowadays the status quo is to build a frontend application with components. Components have internal state yet you may have external state somewhere else as well. In a growing application the state management can get chaotic quickly.

* components share state
* state should be accessible from everywhere
* components need to mutate the state
* components need to mutate the state of another component

It gets more difficult to reason about the application state, because it becomes a messy web of state containers and mutations.

The solution therefore is to introduce a state management library like MobX or Redux. It gives you tools to save your state somewhere, to change your state and to receive state updates. You have one place to find your state, one place to change it and one place to get updates from.

{{% chapter_header "What's the difference between Redux and MobX?" "difference" %}}

Redux is influenced by **functional programming principles**. It can be done in JavaScript, but a lot of people come from an object-oriented background and have difficulties to adopt functional programming principles in the first place.

Redux **embraces the usage of pure functions**. A function gets an input, returns an output and does not have other dependencies but pure functions. A pure function produces always the same output with the same input and doesn't have any side-effects.

{{< highlight javascript >}}
(state, action) => newState
{{< /highlight >}}

Your **state is immutable**. Instead of mutating your state you always return a new state. You don't do state mutations or depend on object references.

{{< highlight javascript >}}
function addAuthor(state, action) {
  return [ ...state.authors, action.author ];
}
{{< /highlight >}}

Last but not least in idiomatic Redux your state is normalized like in a database. The entities only **reference each other by id**. That's a best practice, even though not everyone is doing it like that.

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

MobX is influenced by **object-oriented programming**, but also by **reactive programming**. You can declare data as observable. The data can have plain setters and getters, but the observable makes it possible to retrieve updates once the data changed.

In Mobx the data is **mutated**.

{{< highlight javascript >}}
function addAuthor(author) {
  this.authors.push(author);
}
{{< /highlight >}}

Additionally the entities stay in a **nested data structure in relation to each other**.

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

### How does the implementation look like?

In Redux it would need the following lines of code to add a new user to the **global state**. You can see how we make use of the {{% a_blank "object spread operator" "https://github.com/sebmarkbage/ecmascript-rest-spread" %}} to return a new state object. You could also use `Object.assign()` to have immutable objects in JavaScript ES5.

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

In MobX a store would only **manage a substate**, but you are able to **mutate the state directly**. The `@observable` annotation makes it possible to observe state changes.

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

  @action addUser = (user) => {
    this.users.push(user);
  }
}
{{< /highlight >}}

Now it would be possible to call `userStore.addUser(user);` on a store instance.

{{% chapter_header "The Learning Curve in React State Management" "learningCurve" %}}

Both Redux and MobX are mostly used in React applications. But they are standalone libraries for state management, which could be used everywhere without React. Their interoperability libraries make it easy to combine them with React components. It's {{% a_blank "react-redux" "https://github.com/reactjs/react-redux" %}} for **Redux + React** and {{% a_blank "mobx-react" "https://github.com/mobxjs/mobx-react" %}} for **MobX + React**. Later I will explain how to use both in a component tree.

In recent discussions it happened that people argued about the learning curve in Redux. It was often in the context of React: people began to learn React and already wanted to leverage state management with Redux. Most people would say that React and Redux itself have a good learning curve, but both together can be overwhelming. An alternative therefore would be MobX, because it is more suitable for beginners.

I would suggest a different approach for newcomers to learn state management in React ecosystem. Start to learn React with its own component state management functionality: setState. In a React application you will first learn the lifecycle methods and you will deal with component state management by using setState. Eventually you will realize that the (internal) state management of components is getting difficult once you want to share state across components.

Now we are at the point: What problem does MobX or Redux solve for us. Both libraries give a way of managing application state external to the components. Components can access the state, manipulate it (explicit, implicit) and update with the new state.

{{% read_more "Implement your own SoundCloud Client with React + Redux" "http://www.robinwieruch.de/the-soundcloud-client-in-react-redux/" %}}

Now you have to make the decision to choose a state management library. You know why you need to solve the problem in the first place. Moreover after having already a larger application in place, you should feel comfortable with React by now.

### Redux or MobX for Newcomers?

Once you are familiar with React components and the internal state management, you can choose a state management library to solve your problem. After I used both libraries, I would say MobX can be very suitable for beginners. We could already see that MobX needs less code, even though it uses some magic annotations we may not need to know about yet.

In MobX you don't need to be familiar with functional programming. Terms like immutability might be still foreign. Functional programming is a rising paradigm, but novel for most people in JavaScript. There is a clear trend towards it, but since not everyone has a functional programming background, it might be easier for people with an object-oriented background to adopt the principles of MobX.

> MobX is suitable for {{% a_blank "internal component state in exchange for React setState" "https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e" %}} as well. I would recommend to keep setState over MobX for internal component state management. But it clearly shows how easy you could weave MobX into React to accomplish internal component state management.

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
import { useStrict } from 'mobx';

useStrict(true);
{{< /highlight >}}

Mutating the state directly in the store like we did in the first example wouldn't work anymore. Coming from the first to the latter example shows how to embrace best practices in MobX. Moreover once you are doing explicit actions only, you are already using some Redux constraints.

I would recommend to use MobX to kickstart projects. Once the application grows in size and contributors, it makes sense to apply best practices like using explicit actions. They are embracing the Redux constraints, which say you can never change the state directly and only by using actions.

### Transition to Redux

Once your application gets bigger and has multiple developers working on it, you should consider to use Redux. It enforces by nature to use explicit actions to change the state. The action has a type and payload, which a reducer can use to change the state. In a team of developers it is very easy to reason about state changes that way.

{{< highlight javascript >}}
// reducer
(state, action) => newState
{{< /highlight >}}

Redux gives you a whole architecture for state management with clear constraints. That's the assumed {{% a_blank "success story behind Redux" "https://www.youtube.com/watch?v=uvAXVMwHJXU" %}}.

Another advantage of Redux is using it on the server side. Since we are dealing with plain JavaScript, you could send the state across the network. Serializing and deserializing a state object works out of the box. It's possible in MobX though.

MobX is less opinionated, but by using `useStrict` you can enforce clearer constraints like in Redux. That's why I wouldn't say you cannot use MobX in scaling applications, but there is a clear way of doing things in Redux. The documentation in MobX even says: *"[MobX] does not tell you how to structure your code, where to store state or how to process events."* The development team would have to establish a state management architecture in the first place.

{{% read_more "Refactor an application from Redux to MobX" "www.robinwieruch.de/mobx-react/" %}}

After all the state management learning curve isn't that steep. When we recap the recommendations, a newcomer in React would **first learn to use setState** properly. After a while you would **realize the problems of using only setState** to maintain state in a React application. When looking for a solution, you stumble upon state management libraries like MobX or Redux. But which one to choose? Since MobX is less opinionated, has less boilerplate and can be used similar to setState I would recommend in smaller projects to give MobX a shot. Once the application grows in size and contributors, you should consider to enforce more restrictions in MobX or give Redux a shot. I enjoyed to use both libraries. Even if you don't use one of them after all, it makes sense to have seen an alternative way of doing state management.

{{% chapter_header "Another state management solution?" "anotherSolution" %}}

You may already started to use one state management solution, but want to consider anohter one? You could compare both real world {{% a_blank "MobX" "https://github.com/rwieruch/favesound-mobx" %}} and {{% a_blank "Redux" "https://github.com/rwieruch/favesound-redux" %}} applications. I made one big {{% a_blank "Pull Request" "https://github.com/rwieruch/favesound-mobx/pull/1" %}} to show all changes at one place. In the case of the PR, it is a refactoring from Redux to MobX. But you could apply it vice versa. I don't think it is necessary coupled to Redux nor MobX, because most of the changes are very much decoupled from everything else.

Basically you have to exchange Redux Actions, Action Creator, Action Types, Reducer, Global Store with MobX Stores. Additionally the interface to connect React components changes from {{% a_blank "react-redux" "https://github.com/reactjs/react-redux" %}} to {{% a_blank "mobx-react" "https://github.com/mobxjs/mobx-react" %}}. The {{% a_blank "presenter + container pattern" "https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0" %}} can still be applied. You would have to refactor only the container components. In MobX one could use inject to get a store dependency. After that the store can pass a substate and actions to a component. MobX observer makes sure that the component updates (render) after an observable property in the store changed.

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

In Redux you would use mapStateToProps and mapDispatchToProps to pass a substate and actions to a component.

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

There exists a tutorial on [how to refactor from Redux to MobX](http://www.robinwieruch.de/mobx-react/). But one could also apply the refactoring vice versa. Once you have chosen a state management library, you can see that there is no vendor lock in. They are pretty much decoupled from your application and therefore exchangeable.

{{% chapter_header "Final Thoughts" "finalThoughts" %}}

Whenever I read the comments in a Redux vs MobX discussion, there is always this one comment: *"Redux has too much boilerplate, you should use MobX instead. I was able to remove XXX lines of code."* The comment might be true, but no one considers the trade off. Redux comes with more boilerplate as MobX, because it was added for specific design constraints.

Redux library is pretty small. Most of the time you are dealing only with plain JavaScript objects and arrays. It is closer to vanilla JavaScript than MobX. In MobX one wraps the objects and arrays into observable objects which hide most of the boilerplate. There the magic happens, but it is harder to understand the underlying mechanisms. In Redux it is easier to reason about it with plain JavaScript.

Additionally one has again to consider where we came from in single page applications. A bunch of frameworks/libraries had the same problems of state management, which eventually got solved by the overarching Flux pattern. Redux is the successor of the pattern.

In MobX it goes the opposite direction again. Again we start to mutate objects directly without embracing the advantages of functional programming. For some people it feels again closer to two-way data binding. After a while people might run again into the same problems before a state management library like Redux was introduced.

While in Redux you have an established ceremony how to set up things, MobX is less opinionated. But it would be wise to embrace best practices in MobX. People need to know how to organize state management to improve the reasoning about it. Otherwise people tend to mutate state directly in components.

Both libraries are great. While Redux is already well established, MobX becomes an valid alternative for state management.

{{% chapter_header "Resources" "resources" %}}

Another comparison between Redux and MobX can be found in {{% a_blank "MobX and Large Scale React Applications" "https://www.youtube.com/watch?v=etnPDw5PKqg" %}} by Michel Weststrate - the creator of MobX. Additionally he shows how MobX is used in large and complex applications.

{{% chapter_header "Key Takeaways" "keyTakeaways" %}}

* learn React and setState first
* learning recommendation: setState -> MobX -> MobX more restricted (e.g. useStrict) -> Redux
* alternative learning recommendation: setState -> Redux
* use MobX in a smaller size &amp; few developers project
* use Redux in a bigger size &amp; several developers / teams project
* use MobX over Redux:
  * short learning curve
  * simple to use (magic)
  * quick start
  * less opinionated
  * minimal boilerplate
  * used in lightweight applications
  * mutable data
  * object-oriented programming
* use Redux over MobX:
  * clear constraints
  * testable lightweight parts
  * opinionated state management architecture
  * mature best practices
  * used in complex applications
  * immutable data
  * functional programming
* container + presenter components is a valid pattern for both
* react-redux and mobx-react are exchangeable interfaces to React container components
* useStrict of MobX makes state changes more obvious in a scaling app and should be best practice