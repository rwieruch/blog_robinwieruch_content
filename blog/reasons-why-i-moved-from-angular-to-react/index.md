---
title: "10 Reasons why I moved from Angular to React"
description: "The article should help people to understand the benefits of React and Angular for making an educated decision to choose between Angular or React. It tells my story why I moved from Angular to React after using both libraries for years. It's not just another click-bait article, but an article with lots of experiences ..."
date: "2017-01-31T13:50:46+02:00"
categories: ["React", "Angular"]
keywords: ["angular or react"]
hashtags: ["#ReactJs"]
contribute: ""
banner: "./images/banner.jpg"
author: ""
---

<Sponsorship />

I did a lot of Angular 1.x back in the days until I started to use React. I can say that I used both solutions extensively. But there were and are several reasons why I moved to React. These reasons were not clear from the beginning, but retrospectively I think I can summarize these very well.

In the following I want to give you 10 reasons why I moved from Angular to React. I liked Angular in all its facets back in the days, but it was about time to move on. Perhaps the article helps people to understand the benefits of React, but also the benefits of Angular, to make a decision between Angular or React - or even React or Angular 2.

The article is not intended to blame Angular. Angular, for myself, was a great single page app experience for a long time. I enjoyed the framework, because it gives you everything you need. I only used Angular 1.x extensively, so I cannot speak for Angular 2, but I think most of the philosophy behind the framework is still the same and adaptable for the article. In the end it is only my experience that I made with both solutions.

The article is no comparison between two solutions per se. It is a reflection about why you could consider to use React as your solution. It makes no sense to compare apples and oranges. But it makes sense to reflect why you can use or why you have chosen a specific tool at hand.

Nevertheless, let's dive into the 10 reasons why I enjoy to use React now.

# React is only a view library

Single page applications (SPA) follow the common sense of component based user interfaces. A component gets an input and returns an instance of the component as output. For instance, the output can be a simple button element. You have to define your components with its input and ouput and internal behaviour only once. Afterwards you can use it everywhere in your DOM hierarchy to create instances of the component. In a best case scenario the defined component is easy to reuse and to compose into other components.

React is an ideal fit for a component based user interface. It is only a view library and solves all the described component requirements. It is a library dedicated to solve one problem: It gives you all the tools to build effectively a component based user interface.

You can see React as one building block for your SPA. Once you need to solve other problems, you need other building blocks. Your application needs routing? Take a look at the routing solutions suited for React. Your application needs scaleable state management? Take a look at [different state management solutions](/redux-mobx/). You need to execute asynchronous requests? Take a look at one of the solutions like [fetch](https://developer.mozilla.org/en/docs/Web/API/Fetch_API), [axios](https://github.com/mzabriskie/axios) or [superagent](https://github.com/visionmedia/superagent).

Nevertheless it is possible to build your application solely with React. It might be no mature application with routing and sophisticated state management, but it can work out for small applications. In [The Road to learn React](/the-road-to-learn-react/) you can build one of these applications to learn plain React.

React itself is only a building block in your application. It offers you a solution to build component based user interfaces. Like every other building block it stays exchangeable. You can use another solution to build component based user interfaces but still can couple them with other building blocks.

In that perspective Angular is different. It isn't a library, but a framework. It offers you more than one building block. It is a more rigid solution. The ReactJs ecosystem, with all its building blocks, can be seen as a framework as well. But compared to AngularJs it offers exchangeable building blocks. In Angular you get everything out of the box. It is a paradox that on one hand it can be easier to learn it, because it is opinionated about its building blocks. But on the other hand you learn every building block at once which can be overwhelming. The latter applies for React too when you start to learn everything at once.

# React is an innovative place

React is only the core of the ecosystem and everything around it consists of building blocks. You are flexible to choose your building blocks to solve different problems. But it remains simple to exchange them. The simpleness to exchange them makes it possible for novel approaches to thrive. You can take [Redux](http://redux.js.org/) and [MobX](https://mobx.js.org/) for state management as an example. Redux got great momentum in the early days yet MobX has a small community of advocates, because it is [possible to exchange both solutions](/mobx-react/).

Even the core building block React is exchangeable. Recent libraries like [Inferno](https://infernojs.org/) and [Preact](https://preactjs.com/) compete with React and can be used to replace React. I cannot remember that someone used these libraries in another context. It makes no sense to use these approaches in Angular, because Angular comes with its own solutions.

The exchangeable building blocks in React make it possible to experiment with novel approaches. It gives these approaches room to get adopted by the community. It makes the React ecosystem such an innovative place.

# JSX - Mix up HTML and JavaScript

React comes with its own syntax to build components called JSX. In JSX you can mix up HTML and JavaScript. Additionally people often use inline styles in their elements. It is like adding CSS into the mix. It can be confusing in the beginning, but it feels natural eventually. You can use JavaScript to compose and manipulate your DOM, but it is inlined in your HTML. You can use built-in JavaScript functionalities like map and filter to display multiple (filtered) DOM nodes. But you can also use [ternaries to make conditional renderings](/conditional-rendering-react/) happen. You can use the full power of JavaScript in your HTML.

In the range of SPA solutions it was a novel approach to define your components with mixed up HTML and JavaScript. In older server side rendering solutions (e.g. [JSP](https://en.wikipedia.org/wiki/JavaServer_Pages)) that approach was already present.

In contrast, in Angular you have a clear separation of concerns between logic and view. There are built-in expressions like `ng-repeat` (Angular 1.x) or `ngFor` (Angular 2) in your HTML to accomplish the same thing like a native JavaScript `map()` in JSX.

# React has a simple API

React is only a view library. It solves one problem and it solves it well. Thus it comes only with a handful methods to learn and understand.

A React component comes with lifecycle methods. In React ES6 class components you can use these methods to hook into the lifecycle of a component. Usually you only need the mandatory `render()` lifecycle method to render your elements as a new instance of the component. The render block runs one time when your component is initialized and every time when your component updates. That's it. But you can opt-in more lifecycle methods to add advanced component behaviour. For instance, you can use the `constructor()` to initialize a stateful component and add class methods to manipulate the state. Every time the state changes the render lifecycle method runs again to update your view.

Overall there are only 9 lifecycle methods to control your component. But in most cases you need only half of them - even in mature React applications.

After that you only need to know two more React ES6 class component methods: `setState()` and `forceUpdate()`. You will barely touch the latter one which updates a component forcefully and programmatically. But `setState()` is used to update your internal component state that you have initialized in your `constructor()` lifecycle method. Imagine you have a list of items in your component. As next step you want to be able to add and remove items from the list. You can do so by storing the list in your internal component state `this.state` and by using `setState()` to update the list.

You can read more in depth about the React component API in the [official React documentation](https://facebook.github.io/react/docs/react-component.html). If you are not familiar with APIs in general, I can recommend to read [this article](/what-is-an-api-javascript/).

After that you know all the essential component methods. Still there are more concepts in React, like props and state, the children property or different component declarations. But you can learn all of them step by step.

In conclusion React itself has no steep learning curve. It is only the view layer with a handful of methods to understand. If you start to learn React as first building block, I would recommend to learn only React and no other building block. The book [The Road to learn React](/the-road-to-learn-react/) follows that learning concept. It covers all the mentioned topics which you would have to learn in order to understand React.

# Lightweight Components => Best Practices

Components in React can be defined in two ways: ES6 class components and functional stateless components. The latter are only functions that get an input and return elements as output. Still they are components. They are components without any boilerplate because you only have to define a regular JavaScript function. I cannot say that Angular made it that easy to define components.

```javascript
function Button({ onClick, children }) {
    return (
        <button onClick={onClick} type="button">
            {children}
        </button>
    );
}
```

It is a good practice to use functional stateless components whenever you can. That means whenever you don't need access to the component state or lifecycle methods. It embraces a best practices around components where you keep them lightweight and small yet reusable, composable and functional without any side effects. By having such a small boilerplate you are encouraged to follow these best practices.

# Unidirectional Data Flow

There is no two-way data binding in React like in Angular 1.x. In Angular state management in components got messy eventually. It was less predictable and there was no best practice how to deal with it. The digest loop that updated your components in Angular 1.x was not easy to tame.

In React you follow the rule of an unidirectional data flow. A component updates the internal component state explicitly with `setState()`. It has to be captured in the state object (`this.state`) of a component and the component renders again with an updated version of the state. The same applies for the input (props) of a component. When an updated input comes in, the component updates with its render lifecycle method. Never will you modify your input (props) or your internal component state (state) directly. It always has to follow the unidirectional data flow that makes state management in React so much more predictable.

Additionally you have full control over your native HTML elements. For instance, an input field in HTML has its own state. The text you type into an input field is captured in the value attribute. In React you want to have full control over the state of an input field. Thus, once you changed the value of the input field, you can use the element callback `onChange()` to update the value in the internal component state with `setState()`. After that you can use the updated value in your input field. Now the internal component state is the single source of truth. The input field does not manage its own state anymore.

```javascript
<input
    value={this.state.value}
    onChange={(event) => this.setState({ value: event.target.value })}
    type="text"
/>
```

The unidirectional data flow makes React state management predictable and maintainable.

# Redux

Redux is not strictly coupled to React. Still both are a perfect match, because Redux is only a building block and the React ecosystem embraces building blocks.

Redux brought predictable state management to the masses. The flux philosophy was already around when Dan Abramov introduced Redux in 2015. Redux is the successor of the flux libraries and used widely in different scenarios. In React it feels most natural to use Redux. React itself embraces the unidirectional data flow and therefore was the perfect match for Redux.

Back in the Angular days developers struggled in a mature scaling application with state management. At some point you had to implement your own flux alike solution even before flux was a thing. Eventually everyone envied the React folks for adopting the flux pattern and for integrating it seamless in their ecosystem.

Redux created a whole ecosystem around itself. It is a building block like React that embraces such innovation. Especially in the area of asynchronism it supports different ways. For instance, you can choose between JavaScript promises, generators or observables. It is a place to experiment, to find your way of doing things and to innovate.

# Close to JavaScript

I must say when I came from Angular to React I learned a lot of new concepts about the language JavaScript itself. Now when I return to Angular, it is always difficult to remember the syntax, expressions in HTML or declarations. I would be lost without my snippets that I came up back in the time of using Angular. I don't know in fact, but I think it would be different the other way around, when I would come from Angular back to React. React is much closer to JavaScript and only one building block. Once you learned it, there is not that much to forget.

React is close to JavaScript. But not only React, it is the ecosystem that embraces closeness to JavaScript. For instance, Redux itself, with its actions and reducers, is plain JavaScript. Additionally the whole Redux ecosystem embraces to use native and upcoming native JavaScript functionalities like generators and observables. There is nothing that covers it up in non native JavaScript helper functions from a library perspective.

Another aspect is JavaScript ES6. Perhaps it is only a coincidence that React embraces ES6, because ES6 came up during the same time. But still React moves forward and adopts all the benefits and best practices of ES6. People adopt ES6 very well. Remember the functional stateless button component we defined before? It looks different when you would use an ES6 arrow function:

```javascript
const Button = ({ onClick, children }) =>
    <button onClick={onClick} type="button">
        {children}
    </button>
```

In React and its ecosystem you can express things concise and elegant yet readable and simple with ES6. It feels natural to use it.

# Functional Programming

Functional programming weaves itself naturally into React and its ecosystem. Perhaps it is because of the closeness to JavaScript that makes it possible to adopt the paradigm. As a React developer you are encouraged to define functions without side-effects - pure functions. These functions are composeable in a predictable way. First because they are pure and always return the same output with the same input (predictable). Second because you can use higher order functions to compose them into each other (composeable).

The same advantages of predictability and composability apply for the functional components in React. That's why it is possible to embrace predictable and composeable (higher order) components in React.

Every now and then the programming paradigms shift. Functional programming is not new, but it is the first time it gets truthfully adopted in JavaScript. React is one of the thought leaders among other libraries in the JavaScript ecosystem regarding functional programming. It is a great personal accomplishment to learn new principles, to get to know their advantages and disadvantages and to use them hands on. React and its ecosystem gives you the possibility to learn and to apply functional programming.

# Community

I would lie if I would say that most of the following reasons don't apply to other communities around different libraries, frameworks or ecosystems. But still I feel that it is worth to mention that the community behind the React environment is great.

The people behind the ecosystem experiment each day from anew. It goes back to the constant innovation around React because of its building blocks. New solutions have a chance to thrive in the ecosystem. The building blocks are exchangeable and can get adopted by developers.

The people behind React encourage each other. It doesn't matter if people contribute with an innovation, an additional library or written articles. Everyone thumbs up each other and motivates you to continue. I experienced the same when I started to write articles about React. People encourage you.

The people are not stuck in the ecosystem. If there is a problem, there will be a solution. Someone will come up with a library to solve the problem or explain best practices for a specific problem in an article. People help each other and think forward. Since the place stays innovative, there will be always multiple and novel solutions to a problem.

As I said, these community thoughts of mine are more general thoughts. I think all communities around different solutions are doing great, are innovative and encourage each other. That's what makes it great to be involved in such an environment.

<Divider />

In conclusion I hope these reasons help you to have a better understanding of the React ecosystem. Maybe they help you to make a personal decision if you want to hop on the React train in 2017. Personally it helped me to reflect about my decision to start to learn React. Apart from that it was an upside that my company [Small Improvements](https://careers.small-improvements.com/?ref=robinwieruch.de) did this step as well in the mid of last year. But we have plenty of Angular leftovers and are keen to hire people who know both solutions.

<ReadMore label="Tips to learn React + Redux" link="/tips-to-learn-react-redux/" />

<ReadMore label="The SoundCloud Client in React + Redux" link="/the-soundcloud-client-in-react-redux/" />
