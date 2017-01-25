+++
title = "Tips to learn React + Redux in 2017"
description = "In tips to learn React + Redux you will get a list of best practices and tips to learn React JS and Redux. The tutorial covers various topics in Redux, ES6 and React like testing, components and state..."
date = "2017-01-17T13:50:46+02:00"
tags = ["React", "Redux"]
categories = ["React", "Redux"]
keyword = "learn react redux"
news_keywords = ["react redux", "react", "redux"]
banner = "img/posts/tips-to-learn-react-redux/banner.jpg"
contribute = "tips-to-learn-react-redux.md"

summary = "I am doing React + Redux for quite some time now. My learnings are subjective, but I thought they may help people to learn or advance in React + Redux. Redux is not strictly coupled to React, but it happens to be that a lot of people are using both libraries in combination. The article is opinionated, maybe it doesn't match every time your thoughts, but I hope to get feedback on it to improve myself as well."
+++

{{% header "Tips to learn React + Redux in 2017" %}}

{{% pin_it_image "learn react redux" "img/posts/tips-to-learn-react-redux/banner.jpg" %}}

I am doing React + Redux for quite some time now. My learnings are subjective, but I thought they may help people to learn or advance in React + Redux. Redux is not strictly coupled to React, but it happens to be that a lot of people are using both libraries in combination. The article is opinionated, maybe it doesn't match every time your thoughts, but I hope to get feedback on it to improve myself as well. If you are not into React or Redux, you can still read only one part of the article. Feel free to give feedback, suggestions and improvements. Submit your own tips directly on [GitHub](https://github.com/rwieruch/blog_robinwieruch_content/blob/master/tips-to-learn-react-redux.md).

{{% chapter_header "Table of Contents" "toc" %}}

* [Tips for React](#react)
  * [Avoid Boilerplate Projects](#avoidBoilerplate)
  * [Learn X before you learn Y](#learnXBeforeY)
  * [React Component Declarations](#reactComponentDeclarations)
  * [Lightweight Functional Stateless Components](#lightweightFunctionalStatelessComponents)
  * [Concise Functional Stateless Components](#conciseFunctionStatelessComponents)
  * [Presenter and Container Pattern](#presenterContainerPattern)
  * [When to use Container Components](#whenContainerComponents)
  * [Write your first higher order component](#hoc)
  * [Conditional Style](#conditionalStyle)
  * [Animations in React](#animations)
  * [You might not need ...](#youMightNotNeed)
* [Tips for Redux](#redux)
  * [Global State Everything](#globalStateEverything)
  * [Folder Organization](#folderOrganization)
  * [Naming Conventions](#namingConventions)
  * [Tracing State Changes](#tracingStateChanges)
  * [Keep Your State Flat](#flatState)
  * [Single source of truth](#singleSourceOfTruth)
  * [Selectors](#selectors)
  * [Refactor, refactor, refactor](#refactor)
  * [Generators, Sagas, Observables, Epics, ...](#reduxMiddleware)
  * [Learn about implementation details of Redux](#reduxImplementation)
* [Tips for Testing](#testing)
  * [Unit test often, integration test rarely your components](#testOften)
  * [Keep your tests minimal and simple](#minimalTests)
  * [Embrace TDD](#embraceTdd)
  * [Export Multiple Components](#exportMultipleComponents)
* [General Recommendations](#generalRecommendations)
  * [On-boarding](#onBoarding)
  * [Stay Curious](#stayCurious)
  * [Dive into other environments](#diveInto)
  * [No Silver Bullet](#noSilverBullet)
  * [Airbnb Style Guide](#styleGuide)
  * [Contribute!](#contribute)
  * [Honor the Contributors!](#contributors)
* [Final Thoughts](#finalThoughts)

{{% header_with_anchor "Tips for React" "react" %}}

Let's start with React, before we dive into Redux, testing and more general recommendations.

{{% chapter_header "Avoid Boilerplate Projects" "avoidBoilerplate" %}}

You start to learn React? I can recommend to avoid boilerplate projects. It is already tough to learn React. You shouldn't bother with all the tooling around it. Especially when someone else has set up the tooling for you.

I can recommend to use {{% a_blank "create-react-app" "https://github.com/facebookincubator/create-react-app" %}}. It is the official zero-configuration setup by Facebook for React. Technically it is a boilerplate, but all the tooling is hidden. You get a foundation to start your React application in a comfortable environment.

After a while you may want to dig deeper and setup your own project without create-react-app. Then it is about time to get to know the tools around you. You will miss the tools you had in create-react-app and eventually use install and set up them on your own. When you setup your own project from scratch, you will get to know how the underlying things work. It will maybe lead to your very own boilerplate project.

You can use boilerplate projects as blueprint to experiment how things work. Experiment with the tools in the projects, get to know which problem they solve for you and use them yourself.

* avoid boilerplate projects
* use {{% a_blank "create-react-app" "https://github.com/facebookincubator/create-react-app" %}} to [learn React](https://www.robinwieruch.de/the-road-to-learn-react/)
* when you feel comfortable with React
  * explore the tools around it
  * create your own boilerplate project

{{% chapter_header "Learn X before you learn Y" "learnXBeforeY" %}}

The ecosystem around React is huge since React is only a view library. There are a lot of opinions out there how to approach to learn it. The general advice is to learn X before you learn Y. In the following list you will find valuable things to learn in React before you start to use another tool in the ecosystem:

* JSX syntax
* ReactDOM.render
* internal component state management with setState
* React component lifecycle methods
* events and forms
* different component declarations
* composeable components
* higher order components

The general advice is to learn React properly before you dive into the next topic.

### When to introduce Redux?

You can scale your React application a while before you run into state management issues. Maybe you never run into those issues, because your app is doing well with React `setState`. But maybe `setState` will not be sufficient eventually. You will notice that you are dealing with too much internal component state. Then it's about time to introduce a state management library like Redux. But be aware of three things:

* [learn React](https://www.robinwieruch.de/the-road-to-learn-react/) before you learn Redux
* read {{% a_blank "You might not need Redux" "https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367" %}} by Dan Abramov
* avoid to replace setState completely with Redux, not everything belongs in the Redux store

### What about ES6?

A lot of examples and introductions in React come in ES6 syntax. Hopefully they teach you ES6 along the way like I do in [The Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/). However you could already learn ES6 in other JavaScript projects before using React. It isn't coupled to React. My recommendations:

* when you come from another JavaScript ecosystem (e.g. Angular)
  * learn ES6 in your familiar ecosystem where you feel comfortable
* when you are a beginner in JavaScript
  * learn React in ES5
  * or learn ES6 before you learn React
* when you are advanced in JavaScript
  * learn React in ES5 but convert your learnings to ES6 along the way

I guess there are way more "Learn X before learn Y", but you should always keep in mind: Don't learn everything at once.

{{% chapter_header "React Component Declarations" "reactComponentDeclarations" %}}

Often people in React are overwhelmed by the three different ways to declare a component. It's worth to have a look into React's history of component evolution: There are React.createClass, React ES6 class components and functional stateless components. React components evolved from the former one to the latter one.

{{< highlight javascript >}}
// React.createClass
var TodoItem = React.createClass({ ... })

// React ES6 class
class TodoItem extends React.Component { ... }

// functional stateless component
function TodoItem() { ... }
{{< /highlight >}}

### But which component declaration should be used?

Functional stateless components have no lifecycle methods and thus no state at all. They are only functions that take state as input and have elements as output.

{{< highlight javascript >}}
(State) => View
{{< /highlight >}}

They are the most lightweight component and component declaration. They don't hold any internal component state and you cannot access the properties of the component by using `this`. A good rule of thumb is to use functional stateless components whenever you can.

If you need to access a lifecycle method, need to hold internal state (this.state) or need a component reference (this.ref), it would be the right time to use a React ES6 class component. There you have access to lifecycle methods and the internal state of a component. It will often happen that a functional stateless component of yours will mature to an ES6 class component, because it needs to handle state.

After all you should avoid to use React.createClass. It was used in JavaScript ES5, but {{% a_blank "Facebook declared it as deprecated" "https://facebook.github.io/react/blog/2015/03/10/react-v0.13.html" %}} in favour of ES6 class components.

I can recommend to read some very well written blog posts about React component declarations by {{% a_blank "James Nelson" "http://jamesknelson.com/should-i-use-react-createclass-es6-classes-or-stateless-functional-components/" %}} and by {{% a_blank "Todd Motto" "https://toddmotto.com/react-create-class-versus-component/" %}}.

{{% chapter_header "Lightweight Functional Stateless Components" "lightweightFunctionalStatelessComponents" %}}

It is absolutely fine to have multiple components side by side. Consider you want to implement a TodoList component.

{{< highlight javascript >}}
function TodoList({ list }) {
  return (
    <div>
      {map(list, (item) => <div>{item.name}</div>)}
    </div>
  );
}
{{< /highlight >}}

Rather than that you could split it up into multiple functional stateless components.

{{< highlight javascript >}}
function TodoList({ list }) {
  return (
    <div>
      {map(list, (item) => <TodoItem item={item} />)}
    </div>
  );
}

function TodoItem({ item }) {
  return <div>{item.name}</div>;
}
{{< /highlight >}}

The example is too small to see the immediate benefit. But when you split up your components you support readability, reusability and maintainability. Since functional stateless components have no boilerplate, it is effortless to declare multiple components. You should use lightweight functional stateless components whenever you can.

{{% chapter_header "Concise Functional Stateless Components" "conciseFunctionStatelessComponents" %}}

You can use ES6 arrow functions to make your functional stateless components more concise. Imagine you have the following Button component.

{{< highlight javascript >}}
function Button({ onClick, children }) {
  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  );
}
{{< /highlight >}}

Now you can use ES6 to make it concise.

{{< highlight javascript >}}
const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  );
}
{{< /highlight >}}

The arrow function without a block omits the return statement.

{{< highlight javascript >}}
const Button = ({ onClick, children }) =>
  <button onClick={onClick} type="button">
    {children}
  </button>
{{< /highlight >}}

The conversion enforces to only have props as input and an element as output. Nothing in between. Still you could do something in between by using a block body for your arrow function.

{{< highlight javascript >}}
const Button = ({ onClick, children }) => {

  // do something

  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  );
}
{{< /highlight >}}

ES6 arrow functions help you to have even more lightweight functional stateless components.

{{% chapter_header "Presenter and Container Pattern" "presenterContainerPattern" %}}

In React a component is a representation of your state. It is very easy to think of it as (State) => View. Additionally a component can have handler to change the state. Since the representation of the view derives from the state, the view changes when the state changes.

I can recommend the Presenter and Container pattern for a scalable component hierarchy. While one part of the components represents the state, the other part derives and changes the state.

In presenter components you avoid to have any logic. Keep your components dumb and only pass properties and callbacks to them. Most of your components don't need to know everything. These components should be most of the time functional stateless components. You can keep them pure and remove any side effects. A pure component means that the view will be always the same when using the same state as input.

In container components you prepare the data and callbacks for your presenter components. Even more you can pass dependencies or business logic to your presenter components to keep them pure. Container components are most of the time ES6 class components which handle events or manage internal state.

In Redux a better name for a Container Component is a Connected Component. These components are connected to the Redux store to derive and manipulate state via the Redux store.

Container components care about how things work. Presenter components care about how things look. You might want to have a more in depth read about the topic by {{% a_blank "Dan Abramov" "https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.23letl4w2" %}}.

{{% chapter_header "When to use Container Components" "whenContainerComponents" %}}

You are using the Presenter and Container Pattern, but you are not sure when to use which component? I can recommend to start with a Container Component at the top followed by a bunch of Presenter Components as children. While the parent component cares about how things work, all children care about how things look. After a while you will notice that you pass too much properties and callbacks from the parent component to its children. Moreover you pass most of the things several levels down. Then it's time to introduce Container Components in between your Presenter Components.

It's a good rule of thumb in general to stick to presenter components and add only a bunch of container components later on.

### But where to put the container components?

**Rule of thumb 1**: Your parent Container Component deals with state alone. Now you can evaluate your Presenter Component tree below. You might notice that a subtree of your presenters deals with a substate which is not used by other components. Find the parent of this subtree and give it a Container Component to deal with the state management of the subtree. Your parent Container Component will get lighter, because it doesn't have to deal with all of the state.

**Rule of thumb 2**: Some of your presenters might get a bunch of well prepared properties or callbacks for only themselves. Start to give them a Container Component to deal with the logic and make your parent Container Component more lightweight again.

{{% chapter_header "Write your first higher order component" "hoc" %}}

Imagine you want to display a list of items, but you have to fetch the items asynchronously first. Now you will need a loading indicator to show your pending request. After the request fulfills, you show the list of items. Dan Abramov explains in an {{% a_blank "egghead.io" "https://egghead.io/lessons/javascript-redux-displaying-loading-indicators?course=building-react-applications-with-idiomatic-redux" %}} lesson how this works.

But you could go one step further by introducing your first HOC. A higher order component (HOC) returns a component with enhanced functionality. Your HOC could have the name `withLoadingSpinner` and your component to enhance could be `ListItems`. The enhanced version of the component shows either a loading indicator or the list items.

{{< highlight javascript >}}
// HOC declaration

function withLoadingSpinner(Component) {
  return function EnhancedComponent({ isLoading, ...props }) {
    if (!isLoading) {
      return <Component { ...props } />;
    }

    return <LoadingSpinner />;
  };
}

// Usage

const ListItemsWithLoadingIndicator = withLoadingSpinner(ListItems);

<ListItemsWithLoadingIndicator
  isLoading={props.isLoading}
  list={props.list}
/>
{{< /highlight >}}

I use similar HOCs for instance in a {{% a_blank "real world SoundCloud application" "https://github.com/rwieruch/favesound-redux" %}}.

Higher order components are powerful. You should use them with purpose. Always remember that they might add another {{% a_blank "level of abstraction" "https://www.youtube.com/watch?v=mVVNJKv9esE" %}} which makes it hard for other developers to understand your component hierarchy.

{{% a_blank "Recompose" "https://github.com/acdlite/recompose" %}} offers a great range of helpful higher order components. Before you start to implement your own HOC, have a look at recompose. It may already solve your issue. There are a bunch of common HOC use cases out there.

{{% chapter_header "Conditional Style" "conditionalStyle" %}}

Maybe you came across the problem to have conditional classes in your elements. It would look similar to the following:

{{< highlight javascript >}}
var buttonClasses = ['button'];

if (isRemoveButton) {
  buttonClasses.push('warning');
}

<button className={buttonClasses.join(' ')} />
{{< /highlight >}}

For that case a neat little library named {{% a_blank "classnames" "https://github.com/JedWatson/classnames" %}} became relevant for a lot of people. It makes it easier to apply conditional style on elements.

{{< highlight javascript >}}
var buttonClasses = classNames(
  'button',
  {
    'warning': isRemoveButton
  },
);

<button className={buttonClasses} />
{{< /highlight >}}

{{% chapter_header "Animations in React" "animations" %}}

The {{% a_blank "first time when I saw a React animation" "http://chenglou.github.io/react-motion/demos/demo8-draggable-list/" %}} I was hooked. {{% a_blank "React Motion" "https://github.com/chenglou/react-motion" %}} gives you a toolkit to implement animations in React. I found the learning curve pretty steep. It can get frustrating in the beginning when you experiment with React Motion, but it pays off once you see your first smooth drag and drop animation.

Moreover for most of us only a small part of professional coding time is spend with animations. That's why I experienced something like a recurring learning curve, since the concept and functionality won't stick for long in your head when not using them.

{{% a_blank "velocity-react" "https://github.com/twitter-fabric/velocity-react" %}} is another React animation library that uses the Velocity DOM animation library. It is an alternative to React Motion.

{{% chapter_header "You might not need ..." "youMightNotNeed" %}}

Before we dive into Redux, I just wanted to add "You might not need a state management library". Everyone is speaking about state management libraries like Redux and MobX. Don't introduce them too fast. You should read {{% a_blank "You might not need Redux" "https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367" %}} by Dan Abramov.

You are still learning React? Use `setState` to manage internal component state. Once you feel comfortable in using React, you might come across problems like sharing state across multiple components. Even then you don't necessarily need an external state management library. You can {{% a_blank "lift state up or down" "https://facebook.github.io/react/docs/lifting-state-up.html" %}}.

In a growing application there will come the time to introduce a state management library eventually. A part of the article [Redux or MobX: An attempt to dissolve the Confusion](https://www.robinwieruch.de/redux-mobx-confusion/) covers how to approach to learn state management in React.

{{% package_box "The Road to learn React" "Build a Hacker News App along the way. No setup configuration. No tooling. No Redux. Plain React in 140+ pages of learning material. Pay as you want like <strong>3000+ readers</strong>." "Get the Book" "img/page/cover.png" "http://eepurl.com/caLPjr" %}}

{{% header_with_anchor "Tips for Redux" "redux" %}}

React and Redux are often used together. Redux is the successor of the flux pattern and is widely used in the React community. It is not strictly coupled to React.

{{% chapter_header "Global State Everything" "globalStateEverything" %}}

Not everything needs to be stored in your global state. Some components should hold only internal state with React `setState`. That's why it is important to learn React `setState` before using Redux. Otherwise you are going to store every state in your global state. Think about a large scaling application in a growing team of developers. You don't want to have each toggle state or opened modal in your global state.

{{% chapter_header "Folder Organization" "folderOrganization" %}}

I can recommend the article by {{% a_blank "Jack Hsu" "http://jaysoo.ca/2016/02/28/organizing-redux-application/" %}} which suggests a way to organize your code in a scaling application.

### First key takeaway: folder organization by feature.

React + Redux tutorials always show a technical separation of folders. It is a good approach to learn React + Redux, but putting all your reducers and actions into one dedicated folder doesn't scale for everybody.

{{< highlight javascript >}}
src/
--actions/
--reducers/
--components/
{{< /highlight >}}

The often heard recommendation is to have feature folders. Each folder can have reducers, actions and components itself. An example folder structure for one feature could be:

{{< highlight javascript >}}
message/
--components
--reducer.js
--actions.js
{{< /highlight >}}

A more elaborated example with container, presenter and test files is:

{{< highlight javascript >}}
message/
--components/
----messageItem/
------presenter.js
------spec.js
----messageList/
------container.js
------presenter.js
------spec.js
--reducer/
----index.js
----spec.js
--actions/
----index.js
----spec.js
{{< /highlight >}}

I know for sure that not everyone does agree with it. Especially hiding reducers in a feature folder is not following the Redux intention to have them globally accessible. The recommendation is to abstract reducers properly in the first place to share their functionalities. But in a realistic scenario with multiple teams working on one application under time pressure, there isn't always the opportunity to have the correct abstraction in the first place. In a scaling app you are often relieved to have an encapsulated feature module.

### Second key takeaway: clear boundaries of feature modules.

A module should always have an index.js file as entry point. The index.js only exposes an API which should be public to other modules. In React + Redux an index.js file could export container components, maybe presenter components, action creators to be called from somewhere else and last but not least the reducer. In our more elaborated example we would have to add an index.js file at the top. Maybe also in our component folders as well.

{{< highlight javascript "hl_lines=2 5 9" >}}
message/
--index.js
--components/
----messageItem/
------index.js
------presenter.js
------spec.js
----messageList/
------index.js
------container.js
------presenter.js
------spec.js
--reducer/
----index.js
----spec.js
--actions/
----index.js
----spec.js
{{< /highlight >}}

The feature module index.js could have the following content:

{{< highlight javascript >}}
import MessageList from './messageList';

export default MessageList;

export MessageItem from './messageItem';
export reducer from './reducer';
export actions from './actions';
{{< /highlight >}}

Now every foreign feature module should only access the message feature module by its entry point.

{{< highlight javascript >}}
// bad
import { reducer } from ./message/reducer;

// good
import { reducer } from ./message;
{{< /highlight >}}

Both key takeways, feature modules and clear boundaries, help you to organize your code.

{{% chapter_header "Naming Conventions" "namingConventions" %}}

Naming can be one of the most difficult things in software engineering. A proper naming convention is a best practice in order to have maintainable and comprehensive code. React + Redux offers a lot of constraints where to organize your code, but is not opinionated about naming. Whether your function resides in a reducer or component, is an action creator or selector - you should have a naming convention for it. You should have it before you scale your application, otherwise you end up with untraceable callbacks and refactorings. I am used to have for each type of function a prefix.

In a component a callback comes with the little word `on` as prefix (onCreateReply). The prefix in a reducer to change the state is `apply` (applyCreateReply), in a selector it is `get` (getReply) and in a action creator it is `do` (doCreateReply). You don't need to follow these recommendations, but I would suggest to follow your own naming conventions at least.

{{% chapter_header "Tracing State Changes" "tracingStateChanges" %}}

In a growing application with plenty of actions you want to have traceable state changes. One neat helper to see all of your state changes is {{% a_blank "redux-logger" "https://github.com/evgenyrodionov/redux-logger" %}}. Each logging shows the previous state, the action and the next state.

But you want to ensure that your actions are recognizable. Therefore I recommend to have prefixes for your action types.

{{< highlight javascript >}}
const MESSAGE_CREATE_REPLY = 'message/CREATE_REPLY';
{{< /highlight >}}

Now whenever you create a message reply, you will see the logging `message/CREATE_REPLY`. In case of a state bug you can quickly trace the faulty state change.

{{% chapter_header "Keep Your State Flat" "flatState" %}}

In Redux you want to have a flat state. It keeps your reducers simple, because you don't need to change properties deep down in your state object. It is easy when you are allowed to mutate your state directly. But you are not allowed to do so in Redux, because the state is immutable.

It happens often that you only implement the frontend application. You need to deal with backend data structures as they come. Sometimes entities are nested into each other. Imagine a list of blog post entities, which can have an author entity and a list of comment entities.

{{< highlight javascript >}}
{
  post: {
    author: {},
    comments: [],
  }
}
{{< /highlight >}}

Most of the entities will come with an id.

{{< highlight javascript >}}
{
  post: {
    id: '1',
    author: {
      id: 'a',
      ...
    },
    comments: [
      {
        id: 'z',
        ...
      },
      ...
    ],
  }
}
{{< /highlight >}}

It makes sense to normalize the data to make the state flat. The normalized data references each other by id. Afterwards you can save them by entity type to easily look them up by id and reference.

{{< highlight javascript >}}
{
  posts: {
    1: {
      authorId: 'a',
      commentIds: ['z', ...]
    }
  },
  authors: {
    a: {
      ...
    }
  },
  comments: {
    z: {
      ...
    }
  },
}
{{< /highlight >}}

The data structure is not deep nested anymore. It is easy to keep it immutable while you apply changes. {{% a_blank "Normalizr" "https://github.com/paularmstrong/normalizr" %}} is a powerful library, which helps you to normalize your data.

{{% chapter_header "Single source of truth" "singleSourceOfTruth" %}}

Normalized data helps you to keep your state in sync. Imagine again the backend request returns a deep nested data structure of blog posts. A blog post has an author, a list of comments, but this time each comment has an author as well. The comment author can be the same as the post author.

{{< highlight javascript >}}
{
  post: {
    author: { id: 'a' },
    comments: [
      {
        author: { id: 'b' },
        reply: {},
      },
      {
        author: { id: 'a' },
        reply: {},
      },
    ],
  }
}
{{< /highlight >}}

You can see that a blog post author has written a comment too. Thus we have the object two times in our nested data structure. There is no single source of truth. It makes it difficult when you want to modify the author.

When you treat your data as normalized data, the author is only one entity. It doesn't matter if it is a blog post author or comment author. The author is one single source of truth in your entities of authors.

{{< highlight javascript >}}
{
  authors: {
    a: {},
    b: {},
  }
}
{{< /highlight >}}

Since your blog posts and comments still have the author ids as reference, it is fairly easy to display the author in the lists of blog posts and comments.

Whenever you modify the author, all references will get updated. Imagine you could follow an author. You can easily update the one entity - the single source of truth.

{{< highlight javascript >}}
{
  authors: {
    a: { isFollowed: true },
    b: {},
  }
}
{{< /highlight >}}

All author representations in your lists of blog posts and comments are updated, because they are only references to one source of truth.

{{% chapter_header "Selectors" "selectors" %}}

You don't use selectors yet? It is totally fine to have prop computations in `mapStateToProps` of Redux.

{{< highlight javascript >}}
function mapStateToProps(state) {
  return {
    isShown: state.list.length > 0,
  };
};
{{< /highlight >}}

Once you introduce selectors, you can move the computations into your selectors and keep your `mapStateToProps` tidy.

{{< highlight javascript >}}
function mapStateToProps(state) {
  return {
    isShown: getIsShown(state),
  };
};
{{< /highlight >}}

Later you could have a look into {{% a_blank "reselect" "https://github.com/reactjs/reselect" %}}. It helps you to compute derived data from your state and gives your application a performance boost.

* Selectors can compute derived data, allowing Redux to store the minimal possible state.
* Selectors are composeable. They can be used as input to other selectors.
* Reselect Selectors are efficient. A selector is not recomputed unless one of its arguments change.

{{% chapter_header "Refactor, refactor, refactor" "refactor" %}}

There will come a time when you only want to refactor your code. It doesn't matter if you are only using React, React and Redux or some other library or framework. Everyday you will learn a more elegant way of writing your code or a novel pattern to apply.

Once you have a larger component tree in React, you may see patterns to distribute containers among presenters in a more elegant way. You will see abstractions in container and presenter relationships and vice versa. If you didn't apply proper naming conventions in your code base, you may want to introduce them.

There will be always something to refactor to keep your code more maintainable and readable. You should take the time to apply these refactoring, especially naming conventions, in an early stage of your project.

{{% chapter_header "Generators, Sagas, Observables, Epics, ..." "reduxMiddleware" %}}

Redux is a great library to experience different paradigms and technologies. People are building libraries for async Redux actions. They use different approaches to deal with those side effects:

* {{% a_blank "Redux Thunk" "https://github.com/gaearon/redux-thunk" %}} - (Delayed) Functions
* {{% a_blank "Redux Promise" "https://github.com/acdlite/redux-promise" %}} - Promises
* {{% a_blank "Redux Saga" "https://github.com/yelouafi/redux-saga" %}} - Generators
* {{% a_blank "Redux Observable" "https://github.com/redux-observable/redux-observable" %}} - Observables
* {{% a_blank "Redux Loop" "https://github.com/redux-loop/redux-loop" %}} - Elm Effects

As a beginner it makes sense to stick with Redux Thunk. As you advance in the ecosystem, you could have a look at other libraries. Redux Saga is one of the most adopted approaches. [But also Observables are used more often](https://www.robinwieruch.de/redux-observable-rxjs/). Overall the Redux ecosystem itself is a perfect place to explore the JavaScript ecosystem.

{{% chapter_header "Learn about implementation details of Redux" "reduxImplementation" %}}

The whole Redux source code isn't much to read. Once you are familiar with Redux, you should give it a shot to read the source code.

In the beginning it may be easier to get started by watching the {{% a_blank "Getting Started with Redux" "https://egghead.io/courses/getting-started-with-redux" %}} video series by Dan Abramov. For instance one video explains {{% a_blank "how to implement the createStore from scratch" "https://egghead.io/lessons/javascript-redux-implementing-store-from-scratch?course=getting-started-with-redux" %}}, while another one explains {{% a_blank "how to implement combineReducers from scratch" "https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch?course=getting-started-with-redux" %}}.

In the second video series {{% a_blank "Building React Applications with Idiomatic Redux" "https://egghead.io/courses/building-react-applications-with-idiomatic-redux" %}} by Dan Abramov you will learn {{% a_blank "how to implement an own middleware from scratch" "https://egghead.io/lessons/javascript-redux-wrapping-dispatch-to-log-actions" %}}. Once you have your own middleware implemented, you want to {{% a_blank "let your store know about it" "https://egghead.io/lessons/javascript-redux-the-middleware-chain" %}}. After that you get to know that there is already a Redux helper {{% a_blank "applyMiddleware" "https://egghead.io/lessons/javascript-redux-applying-redux-middleware" %}} to wire all your middleware to your store.

Both video series will not only help you to learn Redux, they will also help you to learn about the inner workings of Redux. After that you are prepared to dive into the {{% a_blank "source code" "https://github.com/reactjs/redux/tree/master/src" %}}.

{{% header_with_anchor "Tips for Testing" "testing" %}}

There exist some tool combinations to test your JavaScript code nowadays. It can be Mocha/Chai or Karma/Jasmine. The latter can be found a lot when testing Angular code, the former you will find when testing React apps. Airbnb introduced a popular library to test React components called {{% a_blank "enzyme" "https://github.com/airbnb/enzyme" %}}. Another way to test is {{% a_blank "Jest" "https://github.com/facebook/jest" %}} by Facebook.

A lot of people think you should use one or the other, but you can use enzyme and Jest together. Especially the snapshot testing in Jest complements enzyme. Both libraries are the de facto standard in testing React.

{{% a_blank "Sinon" "https://github.com/sinonjs/sinon" %}} is a great addition to spy, mock and stub functions in your tests.

I can recommend to read some articles about testing like the one by {{% a_blank "A. Sharif" "https://medium.com/javascript-inside/some-thoughts-on-testing-react-redux-applications-8571fbc1b78f#.xqqvl4os4" %}}.

{{% chapter_header "Unit test often, integration test rarely your components" "testOften" %}}

{{% a_blank "Enzyme" "https://github.com/airbnb/enzyme" %}} allows you to conduct unit and integration tests of your components. There are three options available to render a component.

While shallow() only renders the component without children, mount() renders all child components as well. The first is used for component tests in isolation (unit tests) and the latter is used for integration tests. Integration tests are more likely to break, because they include a bigger set of your component tree. The maintenance costs are higher for integration tests. You should have a lot of small maintanable unit tests, but a few vital integration tests.

The third option in enzyme is render(). Render similar to mount() renders all child components. But with mount() you have access to components lifecycle methods like componentDidUpdate.

I very much like the rules of thumb by {{% a_blank "Geoffroy Warin" "https://github.com/airbnb/enzyme/issues/465" %}}:

* Always begin with shallow
* If componentDidMount or componentDidUpdate should be tested, use mount
* If you want to test component lifecycle and children behavior, use mount
* If you want to test children rendering with less overhead than mount and you are not interested in lifecycle methods, use render

{{% chapter_header "Keep your tests minimal and simple" "minimalTests" %}}

Otherwise you will end up with high maintenance costs.

Check if a component renders in an unit test. Check if the correct props and callbacks reach a child component in an integration test.

In order to keep your component tests minimal and simple you have to be familiar with your selectors. Enzyme offers a {{% a_blank "range of selectors" "http://airbnb.io/enzyme/docs/api/selector.html" %}} to dive into your component tree.

Test callbacks with a library like {{% a_blank "sinon" "https://github.com/sinonjs/sinon" %}}. Avoid to test business logic in components, since this might be not the best place anyways. In a service the business logic would be decoupled from the component and should be tested.

After all Facebook introduced Jest to keep your tests lightweight in the first place. You can easily set up a Snapshot test. Then the test will fail when the component output changes. You can either accept the change or investigate in the error.

{{% chapter_header "Embrace TDD" "embraceTdd" %}}

Everyone is saying that you should do test-driven development (TDD), but nobody is doing it. I think that once you found out how to test each part in your React + Redux app, you can easily apply TDD. You will notice that a reducer test reads differently than a component test, but each type (reducer, component, ...) of test will always follow the same test pattern.

Take a reducer test for instance, where you always want to expect that `reducer(state, action) === newState`. The pattern is always the same: `(input) => output` without side effects. The test has an initial state, an action with action type and payload and an expected new state.

Additionally the test has to make sure that the state is immutable - I recommend to use a helper like {{% a_blank "deep-freeze" "https://github.com/substack/deep-freeze" %}}. In pseudo code the test would always read like the following:

{{< highlight javascript >}}
const initialState = { ... };
const action = { type: ..., payload: ... };
const expectedState = { ... };

deepFreeze(initialState);

expect(reducer(initialState, action)).to.equal(expectedState);
{{< /highlight >}}

Once you know the test patterns for each part in your app, you should apply TDD. People tend to use code snippets for that task, which I can totally recommend. Add a snippet for each test part, like the one blueprint from above for reducer tests, in your app.

{{% chapter_header "Test Multiple Components" "exportMultipleComponents" %}}

I believe it is fine to export multiple components from one file for the sake of testing. Each component could get unit tested with enzyme shallow, but one could also integration test them all together by using enzyme mount for the upper parent component. Additionally it should be mandatory to have a Snapshot test with Jest for each component.

{{% header_with_anchor "General Recommendations" "generalRecommendations" %}}

In the end I have some general recommendations for the React and Redux environment.

{{% chapter_header "On-boarding" "onBoarding" %}}

Your whole team is new to React?

Since React is a library, but the ecosystem around it could be seen as flexible framework, don't add extensions too fast. Every time you introduce a new module, raise awareness in your team. Especially when coming to the Redux ecosystem itself, there is an overwhelming amount of smaller modules. For instance:

* Don't add {{% a_blank "redux-actions" "https://github.com/acdlite/redux-actions" %}} before people wrote their own action creators and reducers
* Don't add {{% a_blank "redux-forms" "https://github.com/erikras/redux-form" %}} before people wrote at least one own form and validation
* Don't add {{% a_blank "reselect" "https://github.com/reactjs/reselect" %}} before people wrote their own selectors
* Don't add {{% a_blank "recompose" "https://github.com/acdlite/recompose" %}} before people wrote their first HOC
* ...

Follow best practices by thought leaders. Establish your own best practices. But make sure that everyone understands them. Define clear naming conventions and folder structures. Don't discuss those topics too late in the migration phase.

Moreover address certain topics more in depth. For instance:

* Which Redux side-effect library do you want to use?

You can explore observables or generators, but not everyone might be aware of these novel features in JavaScript. Make sure that everyone is fine to use it. Otherwise you will only end up to add another level of complexity by using generators or observables.

{{% chapter_header "Stay Curious" "stayCurious" %}}

In the React + Redux ecosystem there is a set of great contributors who embrace novel things. Don't be dogmatic about the way you implement something, embrace new ways of doing it! There are great articles which describe these novelties. Have you ever seen composed components with {{% a_blank "ramda.js" "http://ramdajs.com/" %}} in React and Redux? Have a look at {{% a_blank "The elegance of React" "https://medium.com/javascript-inside/the-elegance-of-react-ebc21a2dcd19" %}} by A. Sharif. Stay curious!

{{% chapter_header "Dive into other environments" "diveInto" %}}

The ecosystem offers so much more. You are already familiar in React? Start to build your first mobile application with {{% a_blank "React Native" "https://github.com/facebook/react-native" %}} or your first desktop application with {{% a_blank "Electron" "https://github.com/electron/electron" %}}. The possibilities are endless, but don't overwhelm yourself when you are a beginner.

{{% chapter_header "No Silver Bullet" "noSilverBullet" %}}

React or Redux are not the silver bullets for everything. There are other solutions to give a shot.

Don't see React + Redux as dogma. Both are exchangeable. MobX can be [an alternative to Redux for state management](https://www.robinwieruch.de/redux-mobx-confusion/). In a larger code base it is still possible to {{% a_blank "exchange the state management layer" "https://github.com/rwieruch/favesound-mobx/pull/1" %}}.

React is only the view layer. You can exchange it with a more other solution like {{% a_blank "Preact" "https://preactjs.com/" %}} or {{% a_blank "Inferno" "https://github.com/infernojs/inferno" %}}.

After all this shows the ultimate power of the whole ecosystem which contains building blocks as solutions for different problems.

{{% chapter_header "Airbnb Style Guide" "styleGuide" %}}

Code style is very important. In a team of developers you want to embrace one common code style to understand each others code. The source code might be revisited by multiple people over time and thus nobody wants to deal with code which only one developer understands. Additionally the on-boarding for new developers will go more smoothly.

The team should embrace to follow an common standard rather than developing an own code style. Therefore I can recommend the {{% a_blank "Airbnb JavaScript Style Guide" "https://github.com/airbnb/javascript" %}} for general JavaScript, but also the {{% a_blank "Airbnb React/JSX Style Guide" "https://github.com/airbnb/javascript/tree/master/react" %}}. Both are commonly used guidelines for JavaScript and React developers.

No style guide will help your team without enforcing it. You can use [ESLint](https://robinwieruch.de/react-eslint-webpack-babel/) to follow both mentioned style guides.

{{% chapter_header "Contribute!" "contribute" %}}

The ecosystem is huge and there is a lot potential to contribute in the open source community. You don't need to deep dive into a library, but can also contribute in documentation or open source applications as beginner. Start by applying the gathered best practices in an application like {{% a_blank "favesound-redux" "https://github.com/rwieruch/favesound-redux" %}}, which I wrote myself to demonstrate React + Redux. You feel more confident? Have a look into the endless selection of libraries in the React + Redux ecosystem.

{{% chapter_header "Honor the Contributors!" "contributors" %}}

Behind every library there is a person or team of contributors and maintainers. Most of them are doing the work on a library in their spare time. Honor their work and avoid to take it as granted! It is a gift from other developers who care about the community and open source their work. You can even help them to improve the library by giving constructive feedback, opening issues with well written instructions or by contributing with Pull Requests. After all it simply helps to write a kind message to remind these people that you are using their open source contribution for your own project. It encourages them in their work.

{{% header_with_anchor "Final Thoughts" "finalThoughts" %}}

What's missing in your opinion? Where do you agree or disagree? As I said, it's a list made up of learnings and personal opinions. But I am keen to hear your feedback. You can have {{% a_blank "a direct impact on the article and submit your tip" "https://github.com/rwieruch/blog_robinwieruch_content/blob/master/tips-to-learn-react-redux" %}}.