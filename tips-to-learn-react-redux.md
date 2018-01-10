+++
title = "Tips to learn React + Redux in 2018"
description = "An extensive guide of tips, tricks and resources to learn React.js and Redux in 2018. The tutorial covers various topics in React, JavaScript ES6 and Redux to give you a great start in those topics. In addition, you will find courses for React and Redux to learn more about those topics in depth ..."
date = "2018-01-09T13:50:46+02:00"
tags = ["React", "Redux", "JavaScript"]
categories = ["React", "Redux", "JavaScript"]
keywords = ["learn react redux 2018", "learn react 2018", "learn redux 2018", "react book", "reactjs book"]
news_keywords = ["react redux", "react", "redux"]
hashtag = "#ReactJs"
card = "img/posts/tips-to-learn-react-redux/banner_640.jpg"
banner = "img/posts/tips-to-learn-react-redux/banner.jpg"
contribute = "tips-to-learn-react-redux.md"
headline = "Tips to learn React + Redux in 2018"

summary = "I am doing React + Redux for quite some time now. My learnings are subjective, but I thought they may help people to learn or advance in React + Redux. Redux is not strictly coupled to React, but it happens to be that a lot of people are using both libraries in combination. The article is opinionated, maybe it doesn't match every time your thoughts, but I hope to get feedback on it to improve myself as well."
+++

{{% pin_it_image "learn react redux 2018" "img/posts/tips-to-learn-react-redux/banner.jpg" "is-src-set" %}}

For quite some time now, I am implementing applications in React and Redux. Over the last years, I have written two ebooks about it and released a {{% a_blank "course platform" "https://roadtoreact.com/" %}} for learning React and its ecosystem. The course platform is even [built in React and Redux](https://www.robinwieruch.de/how-to-build-your-own-course-platform/). My personal learnings are subjective, but I thought they may help people to learn or advance in React and Redux as well. Redux is not strictly coupled to React, but it happens to be that a lot of people are using both libraries in combination.

The article gives you recommendations to get started in React (and Redux) in 2018. I have written the article last year and a lot of people saw it as a helpful resource to get started with React and Redux. Now, I have updated it for you to dive into React this year.

The article is opinionated, maybe it doesn't match every time your thoughts, but I hope to get feedback on it to improve myself as well. If you are not into React or Redux, you can still read the other part of the article. Feel free to give feedback, suggestions and improvements.

{{% chapter_header "Table of Contents" "toc" %}}

* [Tips to learn React](#learn-react)
  * [Choosing a React Boilerplate Project](#react-boilerplate-project)
  * [Learn X before you learn Y](#learn-react-before)
  * [When and how to learn Redux?](#learn-redux-faq)
  * [What about JavaScript ES6 and beyond?](#react-javascript-es)
  * [What else to learn before starting with React?](#react-requirements)
  * [Excerpt: React Components](#react-components)
    * [React Component Declarations](#react-component-declarations)
    * [Lightweight Functional Stateless Components](#lightweight-functional-stateless-components)
    * [Concise Functional Stateless Components](#concise-functional-stateless-components)
    * [Presenter and Container Components](#react-presenter-container-pattern)
    * [When to use Container Components](#react-container-components)
    * [Write your first higher order component](#react-higher-order-components)
    * [Conditional Style in React](#react-conditional-style)
    * [Animations in React](#react-animations)
  * [Resources to learn React](#learn-react-resources)
* [Tips to learn Redux](#learn-redux)
  * [Global State Everything](#redux-global-state)
  * [Folder Organization](#redux-folder-organization)
  * [Naming Conventions](#redux-naming-conventions)
  * [Tracing State Changes](#tracing-redux-state-changes)
  * [Keep Your State Flat](#redux-flat-state)
  * [Single Source of Truth](#redux-single-source-of-truth)
  * [Redux Selectors](#redux-selectors)
  * [Refactor, refactor, refactor](#react-refactor)
  * [Generators, Sagas, Observables, Epics, ...](#redux-middleware)
  * [Learn about implementation details of Redux](#redux-implementation)
* [Tips for Testing](#react-redux-testing)
  * [Unit test often, integration test rarely your components](#react-test-often)
  * [Minimal and simple React Tests](#react-minimal-tests)
  * [Embrace TDD in React and Redux](#react-redux-tdd)
  * [Test Multiple React Components](#export-multiple-react-components)
* [General Recommendations](#general-recommendations)
  * [Team On-boarding](#react-team-on-boarding)
  * [Stay Curious](#react-stay-curious)
  * [Dive into other Environments](#react-ecosystem)
  * [No Silver Bullet](#react-redux-silver-bullet)
  * [React Style Guide](#react-redux-style-guide)
  * [Join Communities](#react-redux-slack-groups)
  * [Contribute!](#react-redux-contribute)
  * [Honor the Contributors!](#react-redux-contributors)

{{% header_with_anchor "Tips to learn React" "learn-react" %}}

The section gives helpful advice to get you started in React. It should give a couple of answers to common questions such as: What are the requirements to learn React? What's the best starter project in React? And do I need to know about JavaScript ES6? You will find all the answers about those questions in the following section.

{{% chapter_header "Choosing a React Boilerplate Project" "react-boilerplate-project" %}}

You are about to learn React? There are plenty of boilerplate projects out there to get you started with your first React application. A boilerplate project comes with its own opinionated tooling (Webpack, Babel, ...) and initial scaffold of the application with folders and files. You clone the repository from GitHub and run `npm install && npm start` on the command line to install and start the project. However, a custom boilerplate project adds a barrier to learn React itself. It is opinionated and thus every boilerplate project out there is different. So it became difficult to synchronize the learning experience of all React newcomers by just focusing on learning React instead of focusing on the different and opinionated tooling around it.

So as a newcomer to React, you will not only have to deal with React but also with the tooling. Therefore my general advice for React newcomers is to avoid all the previously mentioned "custom" React boilerplate projects out there. It is already tough to learn React itself. So why should you bother with the tooling in the beginning? Especially when someone else has set up the tooling for you, it gets tough to make your own adjustments to it. Instead, it can kill your momentum when it comes to learn React in the first place. But which boilerplate project should you use to learn React then?

The {{% a_blank "create-react-app" "https://github.com/facebookincubator/create-react-app" %}} boilerplate project is the preferred way to bootstrap a new project in the React community. It is the official setup recommended by Facebook for React and it is a zero-configuration setup where all the tooling is hidden for you. You get a foundation to start your React application in a comfortable environment with the ability to just focus on learning React. A lot of people are using it nowadays to learn React. It gives this synchronization, where the tooling is shielded away for React learners, and they can focus together on just learning React.

After a while, once you have learned the basic and advanced subjects in React (which takes a while, believe me), you may want to dig deeper and setup your own project without create-react-app. Then it is about time to get to know the tools around it. Eventually you will miss and install the tools in your own project that you have used in create-react-app. When you [setup your own project from scratch](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/), you get to know how the underlying things work together. It will maybe lead to your very own boilerplate project that you can reuse or others might reuse as well. That's how most of the custom boilerplate projects for React where created in the first place (e.g. {{% a_blank "React Boilerplate" "https://github.com/react-boilerplate/react-boilerplate" %}} by Max Stoiber). You can use boilerplate projects from other developers as blueprint to experiment for yourself. You can experiment with the tools in those projects, get to know which problem they might solve for you and use them yourself for your own (boilerplate) project.

Here again those tips in a nutshell:

* avoid custom boilerplate projects
* instead use {{% a_blank "create-react-app" "https://github.com/facebookincubator/create-react-app" %}} to focus on learning React
* when you feel comfortable with React
  * get to know the tools in React applications by exploring other boilerplate projects
  * create your own boilerplate project and improve it with every other project you will implement in React

There are a couple of other "officially supported" boilerplate projects for React out there. Once you have learned React and create-react-app, you could have a look into {{% a_blank "Gatsby.js" "https://github.com/gatsbyjs/gatsby" %}} (for a static site generator for React) and {{% a_blank "Next.js" "https://github.com/zeit/next.js/" %}} (for server-rendered React applications). In addition, there exists a {{% a_blank "list of recommended React boilerplate projects" "https://reactjs.org/community/starter-kits.html" %}} from the official React documentation.

{{% chapter_header "Learn X before you learn Y" "learn-react-before" %}}

There are not only things to learn in React, but also for the ecosystem around it. React is only a view layer library and thus you come across [the one or other library to complement your React application](https://www.robinwieruch.de/essential-react-libraries-framework/) eventually. It can be quite overwhelming, especially [when you come from a all-in-one framework solution such as Angular](https://www.robinwieruch.de/reasons-why-i-moved-from-angular-to-react/). But you shouldn't see it as barrier to get started in React. You should embrace it as playground full of opportunities to complement your React application.

In general, you should learn plain React first and then learn more about the ecosystem around it. That's where React is X and its ecosystem is Y in the "Learn X before you learn Y"-equation. But it goes far deeper into the sole building blocks of each solution. You should experience how React and its ecosystem can help you to solve problems for you that would be difficult to address in vanilla JavaScript.

The ecosystem around React is huge since React is only a view library. There are a lot of opinions out there how to approach learning it. The general advice is to learn X before you learn Y. In the following list, you will find a couple of things to learn in React before you start to use another tool in the ecosystem:

* JSX syntax
* [conditional rendering](https://www.robinwieruch.de/conditional-rendering-react/)
* ReactDOM.render
* props and state
* lists and keys (e.g. using the JavaScript built-in map function in JSX)
* React's local state management with this.setState() and this.state
* unidirectional data flow
* lifecycle methods
* events and forms
* component declarations (ES6 class components, functional stateless components)
* children
* composeable and reusable components
* [fetching data](https://www.robinwieruch.de/react-fetching-data/)
* higher order components

That's how you will learn about React in [the Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/). The general advice is to learn React properly before you dive into the next topic. I guess there are way more "Learn X before learn Y", but you should always keep in mind: Don't learn everything at once.

{{% chapter_header "When and how to learn Redux?" "learn-redux-faq" %}}

Learning is about keeping a [state of flow](https://www.robinwieruch.de/lessons-learned-deep-work-flow/). You need to adjust the challenges - the problems you are going to solve - to your level of skill. Only then you can grow your abilities with a stable momentum and enjoy learning. Otherwise, when setting the bar too high by learning too many things at once, you will get frustrated and quit.

Too often React and Redux are learned together. That's not the best way to approach it. There is a high likelihood that it turns out to be too overwhelming because both of them come with their own individual principles. It is challenging to learn both at once and thus a lot of people quit learning React. Hence the common sense is to learn React first. You should feel comfortable in implementing applications in plain React. Embrace React's local state management and experience the problems that might be solved by a state management library.

There are many things to [learn in React before using Redux for the first time](https://www.robinwieruch.de/learn-react-before-using-redux/). For instance, did you know about [React's Provider Pattern](https://www.robinwieruch.de/react-provider-pattern-context/)? There are many ways in React to solve state management issues before using a library such as Redux. In general, before you introduce a state management library, using React's local state should become uncomfortable. You need to experience the problems in a scaling application when using only React's local state. Only by knowing about those problems, you will experience what a state management library such as Redux can do for you.

You can scale your React application a while before you run into state management issues. Maybe you never run into those issues, because your application is doing well with React's local state. However, eventually there comes the point where it doesn't suffice anymore. Then it's about time to introduce a state management library such as Redux.

{{% chapter_header "What about JavaScript ES6 and beyond?" "react-javascript-es" %}}

React fully embraces JavaScript ES6. The latter comes with its own things you have to learn on your journey when learning about React. Again, it can be difficult to learn both subjects at once. However, since it feels natural to use JavaScript ES6 in React, I recommend to learn about JavaScript ES6 along the way when learning React. In "the Road to learn React", you will transition smoothly from JavaScript ES5 to JavaScript ES6 while implementing your first React application.

However, you could already learn ES6 in other JavaScript projects before using React. It isn't coupled to React at all. My recommendations:

* when you come from another JavaScript ecosystem (e.g. Angular)
  * learn ES6 in your familiar ecosystem where you feel comfortable
* when you are a beginner in JavaScript
  * learn JavaScript ES5 properly
  * learn JavaScript ES6 along with React
* when you are advanced in JavaScript
  * learn JavaScript ES6 along with React

When learning React, you should know or learn about those JavaScript ES6 and beyond features along the way:

* const and let
* arrow functions
* object and array spread operators
* destructuring
* template strings
* modules (import and export statements)

After all, you should be comfortable in JavaScript ES5 when learning React. You will use JavaScript along with HTML in React's JSX syntax. For instance, there is no HTML attribute to iterate over a list of items. You would simply use JavaScript's built-in map function to accomplish the rendering of multiple items.

{{< highlight javascript >}}
const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends Component {
  render() {
    return (
      <div>
        {list.map(function(item) {
          return <div>{item.title}</div>;
        })}
      </div>
    );
  }
}
{{< /highlight >}}

That's why it makes so much sense to learn vanilla JavaScript before starting with React.

{{% chapter_header "What else to learn before starting with React?" "react-requirements" %}}

Apart from having a basic understanding about HTML, CSS and JavaScript ES5, you should have a decent web development setup on your machine to support your workflow. At least, you will need a [terminal and editor (or IDE)](https://www.robinwieruch.de/developer-setup/). In addition, you can setup [Git and GitHub](https://www.robinwieruch.de/git-essential-commands/). It would help you to keep track of your own projects and to clone projects from other developers from GitHub to explore their applications.

When I learned JavaScript, there weren't much resources out there to learn about it. Nowadays, it is quite the opposite where it becomes difficult to choose a proper learning resource for JavaScript before learning React. There are a lot of high quality yet free resources out there to learn and advance in JavaScript. A couple of my favorites are {{% a_blank "Eloquent JavaScript" "https://eloquentjavascript.net/" %}}, {{% a_blank "You don't know JavaScript" "https://github.com/getify/You-Dont-Know-JS" %}} and {{% a_blank "MDN JavaScript documentation" "https://developer.mozilla.org/bm/docs/Web/JavaScript" %}}. But there are so many more.

{{% chapter_header "Excerpt: React Components" "react-components" %}}

The following section is only one excerpt about a subject that you will learn in React: components. It is not exhaustive, but it should only demonstrate you how powerful yet fine nuanced working with React can be. Even though React is only a view layer library, it should make you aware about how fine-grained the library is in its usage. That's why it's recommended to learn plain React first. The following chapter gives you only an idea about React components.

{{% sub_chapter_header "React Component Declarations" "react-component-declarations" %}}

Often newcomers in React have a hard time with the different ways to declare a component. That's because there are tons of (outdated) articles out there using different component declarations. React evolved naturally over the time and thus it changed with recent JavaScript versions (e.g. JavaScript ES6). It's worth to have a look into React's history of component declarations.

{{< highlight javascript >}}
// React.createClass
var TodoItem = React.createClass({ ... })

// React ES6 class component
class TodoItem extends React.Component { ... }

// functional stateless component
function TodoItem() { ... }
{{< /highlight >}}

There are React.createClass, React ES6 class components and functional stateless components. React components evolved from the former one to the latter one. Nowadays, only React ES6 class components and functional stateless components are used. So when to use which component declaration?

Functional stateless components have no lifecycle methods and thus no state at all. They are only functions that take state as input and have elements as output.

{{< highlight javascript >}}
(State) => View
{{< /highlight >}}

They are the most lightweight component. They are only a function in JavaScript and don't add any boilerplate to the component. In addition, they don't hold any local state and you cannot access the properties of the component by using `this`. A good rule of thumb is to use functional stateless components whenever you can over ES6 class components.

If you need to access a lifecycle method, need to hold local state (this.state) or need a [component reference](https://www.robinwieruch.de/react-ref-attribute-dom-node/) (this.ref), it would be the right time to use a React ES6 class component instead of a functional stateless component. There you have access to lifecycle methods and the local state of a component. It will often happen that a functional stateless component of yours will mature to an ES6 class component, because it needs to handle local state or needs to have access to lifecycle methods. But it can also evolve the other way around, from a ES6 class component to a functional stateless component, because you {{% a_blank "lift your state" "https://reactjs.org/docs/lifting-state-up.html" %}}.

After all you should avoid to use React.createClass. It was used in JavaScript ES5, but {{% a_blank "Facebook declared it as deprecated" "https://facebook.github.io/react/blog/2015/03/10/react-v0.13.html" %}} in favour of ES6 class components.

I can recommend to read some very well written blog posts about React component declarations by {{% a_blank "James Nelson" "http://jamesknelson.com/should-i-use-react-createclass-es6-classes-or-stateless-functional-components/" %}} and by {{% a_blank "Todd Motto" "https://toddmotto.com/react-create-class-versus-component/" %}}.

{{% sub_chapter_header "Lightweight Functional Stateless Components" "lightweight-functional-stateless-components" %}}

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

The example is too small to see the immediate benefit. But when you split up your components you support readability, reusability and maintainability. Since functional stateless components have no boilerplate, it becomes effortless to declare multiple components. You should use lightweight functional stateless components whenever you can.

{{% sub_chapter_header "Concise Functional Stateless Components" "concise-functional-stateless-components" %}}

You can use JavaScript ES6 arrow functions to make your functional stateless components more concise. Imagine you have the following Button component.

{{< highlight javascript >}}
function Button({ onClick, children }) {
  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  );
}
{{< /highlight >}}

Now you can use a JavaScript ES6 arrow function to make it concise.

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

The conversion enforces to only have props as input and an element as output. Nothing in between. That makes the component even more lightweight. Still, you could do something in between by using a block body for your arrow function.

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

After all, JavaScript ES6 arrow functions help you to have even more lightweight functional stateless components. That's one example where you can see how JavaScript ES6 fits naturally into React.

{{% sub_chapter_header "Presenter and Container Components" "react-presenter-container-pattern" %}}

In React a component is a representation of your state. It is a good approach to think of it as (State) => View. Additionally, a component can have event handler to change the state and trigger a re-rendering. Since the representation of the view derives from the state, the view changes when the state changes. I can recommend the Presenter and Container pattern for a scalable component hierarchy. While one part of the components represents the state, the other part derives and changes the state.

In presenter components, you avoid to have any logic. Keep your components dumb and only pass properties and callbacks to them. Most of your components don't need to know everything. These components should be most of the time functional stateless components. You can keep them pure and remove any side effects. A pure component means that the view will be always the same when using the same props as input.

In container components, you prepare the data and callbacks for your presenter components. Even more you can pass dependencies or business logic to your presenter components. Container components are most of the time ES6 class components which handle lifecycle methods or manage local state.

In Redux, a more specific name for a container component is a connected component. These components are connected to the Redux store to derive and manipulate state via the Redux store.

Container components care about how things work. Presenter components care about how things look. You might want to have a more in depth read about the topic by {{% a_blank "Dan Abramov" "https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.23letl4w2" %}}.

{{% sub_chapter_header "When to use Container Components" "react-container-components" %}}

You are using the Presenter and Container Components, but you are not sure when to use which component? I can recommend to start with a Container Component at the top of your application as parent component followed by a bunch of Presenter Components as child components. While the parent component cares about how things work, all children care about how things look. After a while, you will notice that you pass too much properties and callbacks from the parent component to its children. Moreover, you pass most of the things several component layers down. Then it's time to introduce Container Components in between your Presenter Components.

It's a good rule of thumb in general to stick to presenter components and add only a bunch of container components later on. But where to put the container components?

**Rule of thumb 1**: If your parent Container Component deals with state alone, you can evaluate your Presenter Component hierarchy below. You might notice that a subtree of your presenter components deals with a substate which is not used by other components. Find the parent component of this subtree and give it a Container Component to deal with the state management of the subtree. Your parent Container Component will get lighter, because it doesn't have to deal with all of the state.

**Rule of thumb 2**: Some of your presenter components might get a bunch of well prepared properties or callbacks for only themselves. Start to give them a Container Component to deal with the logic and make your parent Container Component more lightweight again.

{{% sub_chapter_header "Write your first higher order component" "react-higher-order-components" %}}

Imagine you want to display a list of items, but you have to fetch the items asynchronously first. Now you will need a loading indicator to show your pending request. After the request resolves, you show the list of items. Dan Abramov explains in an {{% a_blank "egghead.io" "https://egghead.io/lessons/javascript-redux-displaying-loading-indicators?course=building-react-applications-with-idiomatic-redux" %}} lesson how this works.

But you could go one step further by introducing your first higher order component. A [higher order components](https://www.robinwieruch.de/gentle-introduction-higher-order-components/) (HOC) returns a component with enhanced functionality. Your HOC could have the name `withLoadingSpinner` and your component to enhance could be `ListItems`. The enhanced version of the component shows either a loading indicator or the list items.

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

For instance, similar higher order components are used in a {{% a_blank "real world SoundCloud application" "https://github.com/rwieruch/favesound-redux" %}}.

Higher order components are powerful. You should use them with purpose. Always remember that they might add another {{% a_blank "level of abstraction" "https://www.youtube.com/watch?v=mVVNJKv9esE" %}} which makes it hard for other developers to understand your component hierarchy.

{{% a_blank "Recompose" "https://github.com/acdlite/recompose" %}} offers a great range of helpful higher order components. Before you start to implement your own higher order components in React, have a look at the recompose library. It may already solve your issue. But invest a couple of minutes to explore how these higher order components are implemented.

{{% sub_chapter_header "Conditional Style in React" "react-conditional-style" %}}

Maybe you came across the problem to have conditional class attributes in your React components. It would look similar to the following:

{{< highlight javascript >}}
var buttonClasses = ['button'];

if (isRemoveButton) {
  buttonClasses.push('warning');
}

<button className={buttonClasses.join(' ')} />
{{< /highlight >}}

The className attribute would resolve into 'button warning' if the isRemoveButton predicate is true. For the case of conditional class attributes in React, there exists a neat little library called {{% a_blank "classnames" "https://github.com/JedWatson/classnames" %}}.

{{< highlight javascript >}}
var buttonClasses = classNames(
  'button',
  {
    'warning': isRemoveButton
  },
);

<button className={buttonClasses} />
{{< /highlight >}}

It becomes effortless to apply conditional style on elements.

{{% sub_chapter_header "Animations in React" "react-animations" %}}

I was hooked when I saw {{% a_blank "an animation in React" "http://chenglou.github.io/react-motion/demos/demo8-draggable-list/" %}} for the first time. There are a couple of libraries out there helping you with animations in React. For instance, {{% a_blank "React Motion" "https://github.com/chenglou/react-motion" %}} gives you a toolkit to implement animations in React. Personally I found the learning curve pretty steep and I struggle every time again when I use it, but it pays off once you see your first smooth drag and drop animation.

{{% chapter_header "Resources to learn React" "learn-react-resources" %}}

After all, how to start learning React? What are the best courses, tutorials and books out there? Personally, I recommend everyone to go through the {{% a_blank "official React documentation and tutorial" "https://reactjs.org/docs/hello-world.html" %}}. The maintainers and contributors of React improve it every day and put a lot of effort into it. So it should be a great way to get a first impression about React before choosing it as your next thing to learn.

After that, to get an broader impression about React, checkout the free ebook {{% a_blank "The Road to learn React" "https://roadtoreact.com/" %}}. It teaches plain React by building one larger React application from scratch; basically from idea to deployment. Along the way, you transition smoothly from JavaScript ES5 to JavaScript ES6. I am biased here, because I have written the ebook, but I am proud to see a lot of people learning React with it. So far, more than 14.500 people downloaded it and at this time it gets translated into 6 languages (Portuguese, Spanish, Korean, Italian, Russian, Simplified Chinese). It evolved over the last year from 90 to 190 pages and gets improved by me and the community as often as possible. Thus after only 12 months, it is in its 4th edition.

{{% package_box "The Road to learn React" "Build a Hacker News App along the way. No setup configuration. No tooling. No Redux. Plain React in 190+ pages of learning material. Pay what you want like <strong>14.500+ readers</strong>." "Get the Book" "img/page/cover.png" "https://www.getrevue.co/profile/rwieruch" %}}

It shouldn't take you too long to get through the ebook. After that, you can expose yourself to more React by taking other courses or by building a couple of applications in plain React yourself. Once you finished "The Road to learn React", I give a couple of recommendations how to continue learning React. The most important tip: Build things yourself before you dive into the next topic. Programming is about getting your hands dirty and not only reading and watching tutorials :-)

{{% header_with_anchor "Tips to learn Redux" "learn-redux" %}}

React and Redux are often used together. Redux is the successor of the flux pattern and is widely used in the React community. But it is not strictly coupled to React.

Before we dive into Redux, I just wanted to add the phrase: "You might not need a state management library". Everyone is speaking about state management libraries like Redux and MobX. Don't introduce them too early. You should read {{% a_blank "You might not need Redux" "https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367" %}} by Dan Abramov.

You are still learning React? Then you are surely using `this.setState()` and `this.state` to manage your local state. Once you feel comfortable in using React's local state management, you might come across problems like sharing state across multiple components when your application becomes larger. Even then you don't necessarily need an external state management library to deal with the problem. For instance, you can {{% a_blank "lift state up or down" "https://facebook.github.io/react/docs/lifting-state-up.html" %}} to share state across components.

In a growing application, there will come the time to introduce a state management library eventually. A part of the article [Redux or MobX: An attempt to dissolve the Confusion](https://www.robinwieruch.de/redux-mobx-confusion/) covers how to approach to learn state management in React. The following sections will give you a couple of hints on how to use Redux in React.

{{% chapter_header "Global State Everything" "redux-global-state" %}}

Not everything belongs in your global Redux state. Components should hold local state in React too. That's why it is important to learn React's local state before using Redux. Otherwise, {{% a_blank "you are going to store everything in your global state with Redux" "https://www.quora.com/What-was-the-most-shocking-thing-to-learn-about-React-when-you-already-were-advanced/answer/Robin-Wieruch?srid=uwBe6" %}}. Just think about a large scaling application in a growing team of developers. You don't want to have all of your view states, such as a toggled checkbox or opened dialog, in your global state. The respective React components should deal with it. Scaling state management in your application is a balancing act between using React's local state and Redux.

{{% chapter_header "Folder Organization" "redux-folder-organization" %}}

There are many different approaches for organizing your folder in a React and Redux application. However, there is no silver bullet. You should read a couple of articles about the topic but then go with the solution that fits best to your and your teams needs. If you are looking for an article about the topic, I can highly recommend the one by {{% a_blank "Jack Hsu" "http://jaysoo.ca/2016/02/28/organizing-redux-application/" %}} which suggests a way to organize your code in a scaling application. It can be boiled down to two key takeaways.

### First key takeaway: folder organization by feature.

React + Redux tutorials always show a technical separation of folders. It is a good approach to learn React + Redux, but putting all your reducers and actions into one dedicated folder doesn't scale for every application. The following folder organization demonstrates this technical separation. Eventually your folders for components, actions and reducers will just become too crowded.

{{< highlight javascript >}}
src/
--actions/
--reducers/
--components/
{{< /highlight >}}

An often heard recommendation is to have feature folders. Each folder can have reducers, actions and components itself. The following folder organization shows such an example folder structure for a message feature.

{{< highlight javascript >}}
message/
--components
--reducer.js
--actions.js
{{< /highlight >}}

If you are looking for a more elaborated example with container, presenter and test files, checkout the following feature folder organization.

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

I know for sure that not everyone agrees with the feature folder approach. Especially hiding reducers in a feature folder is not following the Redux intention to have them globally accessible. The recommendation is to abstract reducers properly in the first place to share their functionalities across the application. But in a realistic scenario with multiple teams working on one application under time pressure, there isn't always the opportunity to have the correct abstraction in the first place. In a scaling application you are often relieved to have an encapsulated feature module where you can deal with your actions, reducers and components as a team.

### Second key takeaway: clear boundaries of feature modules.

A module should always have an index.js file as entry point. The index.js only exposes an [API](https://www.robinwieruch.de/what-is-an-api-javascript/) which should be public to other modules. In React + Redux an index.js file could export container components, maybe presenter components, action creators to be called from somewhere else and last but not least the reducer. In the more elaborated example, you would have to add an index.js file at the top. Maybe also in our component folders as well.

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

The index.js for the feature module could have the following content:

{{< highlight javascript >}}
import MessageList from './messageList';

export default MessageList;

export MessageItem from './messageItem';
export reducer from './reducer';
export actions from './actions';
{{< /highlight >}}

Now every foreign feature module should only access the message feature module by its entry point index.js file.

{{< highlight javascript >}}
// bad
import { reducer } from ./message/reducer;

// good
import { reducer } from ./message;
{{< /highlight >}}

Both key takeaways, feature modules and clear boundaries, help you to organize your code for scaling applications.

{{% chapter_header "Naming Conventions" "redux-naming-conventions" %}}

Naming can be one of the most difficult things in software engineering. A proper naming convention is said to be a best practice to have maintainable and comprehensive code. React + Redux are not opinionated about the naming of components and functions. Whether your function is a reducer or component, is an action creator or selector - you should have a naming convention for it. You should have it before your application gets larger, otherwise you end up with untraceable callbacks and messy refactorings.

I am used to have a prefix for each type of function. For instance, take the scenario where you can write a reply to a message in an application. In a component, a callback comes with the little word `on` as prefix (onCreateReply). The prefix in a reducer to change the state is `apply` (applyCreateReply), in a selector it is `get` (getReply) and in a action creator it is `do` (doCreateReply). You don't need to follow these recommendations, but I would suggest to follow your own naming conventions at least for these different types of functions in your React and Redux application. This way, you will know on first sight if a function is a reducer or selector.

{{% chapter_header "Tracing State Changes" "tracing-redux-state-changes" %}}

In a growing application with plenty of actions you want to have traceable state changes. One neat helper to see all of your state changes is {{% a_blank "redux-logger" "https://github.com/evgenyrodionov/redux-logger" %}}. Each logging shows the previous state, the action and the next state in your developer console. But you want to ensure that your actions are recognizable. Therefore I recommend to have prefixes for your action types to group them in domains.

{{< highlight javascript >}}
const MESSAGE_CREATE_REPLY = 'message/CREATE_REPLY';
{{< /highlight >}}

Now whenever you create a message reply, you will see the logging `message/CREATE_REPLY`. In case of a bug your state management, you can quickly trace the erroneous state change.

{{% chapter_header "Keep Your State Flat" "redux-flat-state" %}}

In Redux you want to have a flat state. It keeps your reducers simple, because you don't need to change properties deep down in your state object. It would be easy when you you be allowed to mutate your state directly. But you are not allowed to do so in Redux, because the state is immutable.

It happens often that you only implement the frontend application and you need to deal with backend data structures as they come. Sometimes entities are nested into each other. Imagine a list of blog post entities, which can have an author entity and a list of comment entities.

{{< highlight javascript >}}
{
  post: {
    author: {},
    comments: [],
  }
}
{{< /highlight >}}

In an elaborated structure, most of the entities will come with an id.

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

It makes sense to normalize the data to flatten the state structure. The normalized data references each other by id. Afterwards you can save them by entity type in order to look them up by id and reference.

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

The data structure is not deeply nested anymore. It is easy to keep it immutable while you apply changes. {{% a_blank "Normalizr" "https://github.com/paularmstrong/normalizr" %}} is a powerful library, which helps you to normalize your data.

{{% chapter_header "Single Source of Truth" "redux-single-source-of-truth" %}}

Normalized data helps you to keep your state in sync. Imagine again the backend request returns a deeply nested data structure of blog posts. A blog post has an author, a list of comments, but this time each comment has an author as well. The comment author can be the same as the post author.

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

All author representations in your lists of blog posts and comments are updated, because they are only references to one source of truth by its id.

{{% chapter_header "Redux Selectors" "redux-selectors" %}}

You don't use selectors yet? It is totally fine to have little business logic in `mapStateToProps` when using Redux.

{{< highlight javascript >}}
function mapStateToProps(state) {
  return {
    isShown: state.list.length > 0,
  };
};
{{< /highlight >}}

Once you introduce selectors, you can move the computations into your selectors and keep your `mapStateToProps` tidy. That's basically how a simple selector works and why you want to introduce them at some point.

{{< highlight javascript >}}
function getIsShown(state) {
  return state.list.length > 0;
}

function mapStateToProps(state) {
  return {
    isShown: getIsShown(state),
  };
};
{{< /highlight >}}

Later you could have a look into {{% a_blank "reselect" "https://github.com/reactjs/reselect" %}}. It helps you to compute derived data from your state and gives your application a performance boost. Selectors come with the following benefits:

* Selectors can compute derived data, allowing Redux to store the minimal possible state.
* Selectors are composeable. They can be used as input to other selectors.
* Reselect Selectors are efficient. A selector is not recomputed unless one of its arguments change.

{{% chapter_header "Refactor, refactor, refactor" "react-refactor" %}}

There will come a time when you only want to refactor your code. It doesn't matter if you are only using React, React and Redux or some other library or framework. Everyday you will learn a more elegant way of writing your code or a novel pattern to apply.

Once you have a larger component tree in React, you may see patterns to distribute containers among presenters in a more elegant way. You will see abstractions in container and presenter relationships and vice versa. If you didn't apply proper naming conventions in your code base, you may want to introduce them now.

There will be always something to refactor to keep your code more maintainable and readable. You should take the time to apply these refactorings, especially naming conventions, in an early stage of your project.

{{% chapter_header "Generators, Sagas, Observables, Epics, ..." "redux-middleware" %}}

Redux is a great library to experience different paradigms and technologies. In Redux there is this concept of asynchronous actions, because often an asynchronous request to a third party is used. There are various libraries for asynchronous Redux actions, but they use different approaches to deal with the side effects:

* {{% a_blank "Redux Thunk" "https://github.com/gaearon/redux-thunk" %}} - (Delayed) Functions
* {{% a_blank "Redux Promise" "https://github.com/acdlite/redux-promise" %}} - Promises
* {{% a_blank "Redux Saga" "https://github.com/yelouafi/redux-saga" %}} - Generators
* {{% a_blank "Redux Observable" "https://github.com/redux-observable/redux-observable" %}} - Observables
* {{% a_blank "Redux Loop" "https://github.com/redux-loop/redux-loop" %}} - Elm Effects

As a beginner, it makes sense to stick with Redux Thunk. As you advance in the ecosystem, you could have a look at other libraries. Redux Saga is one of the most adopted approaches. But also Observables are used more often. Overall the Redux ecosystem itself is a perfect place to explore the JavaScript ecosystem with all its different flavors.

{{% chapter_header "Learn about implementation details of Redux" "redux-implementation" %}}

The whole Redux source code isn't much to read. Once you are familiar with Redux, you should give it a shot to read the source code.

In the beginning it may be easier to get started by watching the {{% a_blank "Getting Started with Redux" "https://egghead.io/courses/getting-started-with-redux" %}} video series by Dan Abramov. For instance, in one video he explains {{% a_blank "how to implement the createStore from scratch" "https://egghead.io/lessons/javascript-redux-implementing-store-from-scratch?course=getting-started-with-redux" %}}, while another one explains {{% a_blank "how to implement combineReducers from scratch" "https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch?course=getting-started-with-redux" %}}.

In the second video series {{% a_blank "Building React Applications with Idiomatic Redux" "https://egghead.io/courses/building-react-applications-with-idiomatic-redux" %}} by Dan Abramov you will learn {{% a_blank "how to implement an own middleware from scratch" "https://egghead.io/lessons/javascript-redux-wrapping-dispatch-to-log-actions" %}}. Once you have your own middleware implemented, you want to {{% a_blank "let your store know about it" "https://egghead.io/lessons/javascript-redux-the-middleware-chain" %}}. After that you get to know that there is already a Redux helper {{% a_blank "applyMiddleware" "https://egghead.io/lessons/javascript-redux-applying-redux-middleware" %}} to wire all your middleware to your store.

Both video series will not only help you to learn Redux, they will also help you to learn about the inner workings of Redux. After that you are prepared to dive into the {{% a_blank "source code" "https://github.com/reactjs/redux/tree/master/src" %}} of Redux to learn about its implementation details.

{{% header_with_anchor "Tips for Testing" "react-redux-testing" %}}

There exist some tool combinations to test your JavaScript code nowadays. It can be Mocha/Chai or Karma/Jasmine. The latter can be found a lot when testing Angular code, the former you will find when testing React apps. Airbnb introduced a popular library to test React components called {{% a_blank "enzyme" "https://github.com/airbnb/enzyme" %}}. Another way to test is {{% a_blank "Jest" "https://github.com/facebook/jest" %}} by Facebook.

A lot of people think you should use one or the other, but you can use enzyme and Jest together. Especially the snapshot testing in Jest complements enzyme. Both libraries are the de facto standard in testing React applications. {{% a_blank "Sinon" "https://github.com/sinonjs/sinon" %}} is another great addition to spy, mock and stub functions in your tests.

I can only recommend to read some articles about testing like the one by {{% a_blank "A. Sharif" "https://medium.com/javascript-inside/some-thoughts-on-testing-react-redux-applications-8571fbc1b78f#.xqqvl4os4" %}}.

{{% chapter_header "Unit test often, integration test rarely your components" "react-test-often" %}}

{{% a_blank "Enzyme" "https://github.com/airbnb/enzyme" %}} allows you to conduct unit and integration tests of your components. There are three options available to render a component.

While shallow() only renders the component without children, mount() renders all child components as well. The first is used for component tests in isolation (unit tests) and the latter is used for integration tests. Integration tests are more likely to break, because they include a bigger set of your component tree. The maintenance costs are higher for integration tests. You should have a lot of small maintainable unit tests, but a few vital integration tests.

The third option in enzyme is render(). Render similar to mount() renders all child components. But with mount() you have access to components lifecycle methods like componentDidUpdate.

I very much like the rules of thumb by {{% a_blank "Geoffroy Warin" "https://github.com/airbnb/enzyme/issues/465" %}}:

* Always begin with shallow
* If componentDidMount or componentDidUpdate should be tested, use mount
* If you want to test component lifecycle and children behavior, use mount
* If you want to test children rendering with less overhead than mount and you are not interested in lifecycle methods, use render

{{% chapter_header "Minimal and simple React Tests" "react-minimal-tests" %}}

Keep your tests minimal and simple. Otherwise you will end up with high maintenance costs. Check if a component renders in a unit test. Check if the correct props and callbacks reach a child component in an integration test. In order to keep your component tests minimal and simple, you have to be familiar with your component selectors. For instance, enzyme offers a {{% a_blank "range of selectors" "http://airbnb.io/enzyme/docs/api/selector.html" %}} to dive into your component tree.

Test callbacks with a library such as Sinon. Avoid to test business logic in components, since this might be not the best place for the logic anyways. This logic should be placed in service and thus would be decoupled from the component. It can be tested standalone.

After all Facebook introduced Jest to keep your tests lightweight in the first place. You can easily set up a Snapshot test. Then the test will fail when the component output changes. You can either accept the change or investigate in the error.

{{% chapter_header "Embrace TDD in React and Redux" "react-redux-tdd" %}}

Everyone is saying that you should do test-driven development (TDD), but nobody is doing it. I think that once you found out how to test each part in your React + Redux application, you can easily apply TDD. You will notice that a reducer test reads differently than a component test, but each type (reducer, component, ...) of test will always follow the same test pattern.

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

{{% chapter_header "Test Multiple React Components" "export-multiple-react-components" %}}

I believe it is fine to export multiple components from one file for the sake of testing. Each component could get unit tested with enzyme shallow, but one could also integration test them all together by using enzyme mount for the upper parent component. Additionally it should be mandatory to have a Snapshot test with Jest for each component.

{{% header_with_anchor "General Recommendations" "general-recommendations" %}}

In the end, I have some general recommendations for the React and Redux environment.

{{% chapter_header "Team On-boarding" "react-team-on-boarding" %}}

Your whole team is new to React?

Since React is a library, but the ecosystem around it could be seen as flexible framework, don't add extensions too fast. Every time you introduce a new module, raise awareness in your team. Especially when coming to the Redux ecosystem itself, there is an overwhelming amount of smaller modules. For instance:

* Don't add {{% a_blank "redux-actions" "https://github.com/acdlite/redux-actions" %}} before people wrote their own action creators and reducers
* Don't add {{% a_blank "redux-forms" "https://github.com/erikras/redux-form" %}} before people wrote at least one own form and validation
* Don't add {{% a_blank "reselect" "https://github.com/reactjs/reselect" %}} before people wrote their own selectors
* Don't add {{% a_blank "recompose" "https://github.com/acdlite/recompose" %}} before people wrote their first HOC
* ...

Follow best practices by thought leaders. Establish your own best practices. But make sure that everyone understands them. Define clear naming conventions and folder structures. Don't discuss those topics too late in the migration phase. Moreover address certain topics more in depth. For instance: *Which Redux side-effect library do you want to use?*

You can explore observables or generators, but not everyone might be aware of these novel features in JavaScript. Make sure that everyone is fine to use it. Otherwise you will only end up to add another level of complexity by using generators or observables.

{{% chapter_header "Stay Curious" "react-stay-curious" %}}

In the React + Redux ecosystem, there is a set of great contributors who embrace novel things. Don't be dogmatic about the way you implement something, embrace new ways of doing it! There are great articles which describe these novelties. Have you ever seen composed components with {{% a_blank "ramda.js" "http://ramdajs.com/" %}} in React and Redux? Have a look at {{% a_blank "The elegance of React" "https://medium.com/javascript-inside/the-elegance-of-react-ebc21a2dcd19" %}} by A. Sharif. Stay curious!

{{% chapter_header "Dive into other Environments" "react-ecosystem" %}}

The ecosystem offers so much more. You are already familiar in React? Start to build your first mobile application with {{% a_blank "React Native" "https://github.com/facebook/react-native" %}} or your first desktop application with {{% a_blank "Electron" "https://github.com/electron/electron" %}}. The possibilities are endless, but don't overwhelm yourself when you are a beginner.

{{% chapter_header "No Silver Bullet" "react-redux-silver-bullet" %}}

React or Redux are not the silver bullets for everything. There are other solutions to give a shot. Don't see React + Redux as dogma. Both are exchangeable. MobX can be [an alternative to Redux for state management](https://www.robinwieruch.de/redux-mobx-confusion/). In a larger code base it is still possible to {{% a_blank "exchange the state management layer, e.g. from Redux to MobX" "https://github.com/rwieruch/favesound-mobx/pull/1" %}}.

React is only the view layer. You can exchange it with other solutions such as {{% a_blank "Preact" "https://preactjs.com/" %}} or {{% a_blank "Inferno" "https://github.com/infernojs/inferno" %}}.

After all this shows the ultimate power of the whole ecosystem which contains building blocks as solutions for different problems.

{{% chapter_header "React Style Guides" "react-redux-style-guide" %}}

Code style is very important. In a team of developers you want to embrace one common code style to understand each others code. The source code might be revisited by multiple people over time and thus nobody wants to deal with code which only one developer understands. Additionally the on-boarding for new developers will go more smoothly.

The team should embrace to follow an common standard rather than developing an own code style. Therefore I can recommend the {{% a_blank "Airbnb JavaScript Style Guide" "https://github.com/airbnb/javascript" %}} for general JavaScript, but also the {{% a_blank "Airbnb React/JSX Style Guide" "https://github.com/airbnb/javascript/tree/master/react" %}}. Both are commonly used guidelines for JavaScript and React developers.

No style guide will help your team without enforcing it. You can use [ESLint](https://robinwieruch.de/react-eslint-webpack-babel/) to follow both mentioned style guides.

Otherwise, nowadays a lot of teams are simply using {{% a_blank "Prettier" "https://github.com/prettier/prettier" %}} as opinionated code formatter. Once installed and explained to every member in your team, you will never have to worry about any code style.

{{% chapter_header "Join Communities" "react-redux-slack-groups" %}}

There are various forums and chats where you can speak with others about React and Redux. Most of the time you will find people like you learning React and Redux. You can either ask for advice or help others if they are in trouble. By helping others, you will get better at those things yourself. That's why I highly recommend to join those communities. It helps you to grow as individual but you also contribute something to the community. Check out the following groups:

* {{% a_blank "Reactiflux" "https://www.reactiflux.com/" %}}
* {{% a_blank "The Road to learn React" "https://slack-the-road-to-learn-react.wieruch.com/" %}}
* {{% a_blank "Frontend Developers" "http://frontenddevelopers.org/" %}}

Otherwise, you will find many useful articles on a daily basis on {{% a_blank "Reddit" "https://www.reddit.com/r/reactjs/" %}}.

{{% chapter_header "Contribute!" "react-redux-contribute" %}}

The ecosystem is huge and there is a lot potential to contribute in the open source community. You don't need to deep dive into a library, but can also contribute in documentation or open source applications as beginner. Start by applying the gathered best practices in an application like {{% a_blank "favesound-redux" "https://github.com/rwieruch/favesound-redux" %}}, which I wrote myself to demonstrate React + Redux. You feel more confident? Have a look into the endless selection of libraries in the {{% a_blank "React + Redux ecosystem" "https://github.com/markerikson/react-redux-links" %}}.

{{% chapter_header "Honor the Contributors!" "react-redux-contributors" %}}

Behind every library there is a person or team of contributors and maintainers. Most of them are doing the work on a library in their spare time. Honor their work and avoid to take it as granted! It is a gift from other developers who care about the community and open source their work. You can even help them to improve the library by giving constructive feedback, opening issues with well written instructions or by contributing with Pull Requests. After all it simply helps to write a kind message to remind these people that you are using their open source contribution for your own project. It encourages them in their work.

<hr class="section-divider">

What's missing in your opinion? Where do you agree or disagree? As I said, it's a list made up of learnings and personal opinions. But I am keen to hear your feedback. Otherwise I hope that the list gives you a couple of useful recommendations.
