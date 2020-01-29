---
title: "React Libraries in 2020"
description: "A comprehensive list of all the relevant React libraries used in 2020. If you are new to React, its ecosystem may be overwhelming at first. However, all these React libraries offer everything you need to build large scale applications with React ..."
date: "2020-01-28T13:50:46+02:00"
categories: ["React"]
keywords: ["react libraries 2020"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

React has been around for a while. Since then a well-rounded yet overwhelming  ecosystem evolved around the component driven library. Developers coming from other programming languages or frameworks often have a hard time figuring out all the building blocks for building web applications with React. Coming from a framework like Angular, you are used to have all the necessary features at your disposal. However, React at its core isn't opinionated about its complementary libraries. The decision whether this is an advantage or disadvantage is up to you. When [I switched from Angular to React](/reasons-why-i-moved-from-angular-to-react/), I definitely experienced it as one of React's advantages.

React only enables you to build component driven user interfaces with [function components](/react-function-component) and [props](/react-pass-props-to-component). It comes with a couple of built-in solutions though, for instance, [React Hooks](/react-hooks) for local state and side-effects. But after all you are only dealing with components here.

The following article will give you an opinionated approach to select from complementary libraries to build a well-rounded React application. It's up to you to exchange them with your choices.

# Table of Contents

<TableOfContents {...props} />

# How to start off with React?

There is this unknown for every React beginner on how to setup a React project when joining the React world. There are many starter kit projects to choose from and every project attempts to fulfil different needs. The status quo in the React community is [create-react-app (CRA)](https://github.com/facebookincubator/create-react-app) by Facebook. It comes with a zero-configuration setup and gives you a minimalistic up and running React application out of the box. All the tooling is hidden from you, but it's up to you to alter the tools eventually.

If you are already familiar with React, you can choose one of its popular starter kit alternatives: [Next.js](https://github.com/zeit/next.js/) and [Gatsby.js](https://www.gatsbyjs.org/). Both frameworks build up on top of React, hence you should already be familiar with React's fundamentals. While Next.js is used for server-side rendering (e.g. dynamic web applications), Gatsby.js is used for static site generation (e.g. blogs, landing pages).

If you just want to understand how these starter kits work under the hood, try to [set up a React project from scratch](/minimal-react-webpack-babel-setup/). You will start with a bare bones HTML with JavaScript project and add the React with its supportive tools yourself.

If you are tempted to choose a custom boilerplate project, try to narrow down your requirements. The boilerplate should be minimal and not trying to solve everything. It should be specific for your problem. For instance, the [gatsby-firebase-authentication](https://github.com/rwieruch/gatsby-firebase-authentication) boilerplate "only" gives you a full authentication mechanism with Firebase in a Gatsby.js application, but everything else is left out.

**Recommendations:**

* create-react-app for React beginners/advanced
* Gatsby.js for static websites in React
* Next.js for server-side rendered React
* custom React project to understand the underlying tools

# React State Management

React comes with built-in hooks to manage local state: [useState](/react-usestate-hook), [useReducer](/react-usereducer-hook), [useContext](/react-usecontext-hook). All of them can be used for [sophisticated local state management](/react-state-usereducer-usestate-usecontext) in React. It goes even so far that you can [mimic Redux](/redux-with-react-hooks), a popular state management library for React, with it.

All of React's built-in hooks are great for local state management. When it comes to state management of remote data, I would recommend to use [Apollo Client](/graphql-apollo-client-tutorial), which is only possible if the remote data comes with a GraphQL endpoint. Alternatives for Apollo Client are [urql](https://github.com/FormidableLabs/urql) and [Relay](https://relay.dev/).

If the remote data doesn't come from a GraphQL endpoint, try to manage it with React's Hooks. If it doesn't work out, a solution like [Redux](/react-redux-tutorial) or [MobX](https://mobx.js.org) may help.

If you want to go into more detail, head over to my [comprehensive state management in React tutorial](/react-state).

**Recommendations:**

* Local State: React's useState, useReducer, useContext Hooks
* Remote State via GraphQL: Apollo Client
* Remote State via REST: React Hooks or Redux/MobX

# Routing with React Router

Routing plays an important role in React applications. After all, React helps you implementing single page applications where routing is taken care of on the client-side. When introducing a sophisticated router, there are only a few routing solutions out there for React. The most anticipated solution is [React Router](https://github.com/ReactTraining/react-router).

Before you introduce a heavy router in your application, when you are just about to learn React, you can give [React's conditional rendering](/conditional-rendering-react/) a shot first. It is not a reasonable replacement for routing, but in small applications, it is often sufficient to exchange components that way.

**Recommendations:**

* React Router

# Styling Libraries in React

There are many opinions about styling in React out there. As a React beginner, it is just fine to start with inline style and bare bones CSS:

```javascript
import './Headline.css';

const Headline = ({ title }) =>
  <h1 className="headline" style={{ color: 'blue' }}>
    {title}
  </h1>
```

Whereas inline style can be used to add style dynamically and programmatically with JavaScript in React, an external CSS file can have all the remaining style for your React application. Once your application grows, there are many other styling options though.

First, I would recommend you to have a look into CSS Modules as one of many CSS-in-CSS solutions. CSS Modules are [supported by create-react-app](/create-react-app-css-modules) and give you a way to encapsulate your CSS into modules. This way, it doesn't leak accidentally into the styling of others React components. Whereas some parts of your application can still share style, other parts don't have to get access to it. In React, CSS Modules are most often co-located CSS files to your React component files.

```javascript
import styles from './style.css';

const Headline = ({ title }) =>
  <h1 className={styles.headline}>
    {title}
  </h1>
```

Second, I want to recommend you so called styled components as one of many CSS-in-JS solutions for React. This approach is brought to you by a library called [styled-components](/react-styled-components) which co-locates styling with JavaScript next to your React components:

```javascript
import styled from 'styled-components';

const BlueHeadline = styled.h1`
  color: blue;
`;

const Headline = ({ title }) =>
  <BlueHeadline>
    {title}
  </BlueHeadline>
```

And third, I want to recommend [Tailwind CSS](https://tailwindcss.com/) as a functional CSS solution:

```javascript
const Headline = ({ title }) =>
  <h1 className="text-blue-700">
    {title}
  </h1>
```

Whether you choose CSS-in-CSS, CSS-in-JS, or functional CSS is up to you. All strategies scale well for larger React applications.

**Recommendations:**

* CSS-in-CSS with CSS Modules
* CSS-in-JS with Styled Components
* Functional CSS with Tailwind CSS

# React UI Libraries

If you don't want to build all necessary React UI components from scratch, you can choose a React UI Library to do the job for you. All of them come with essential components like Buttons, Dropdowns, Dialogs and Lists. There are many UI libraries for React to choose from:

* [Ant Design](https://ant.design/)
* [Chakra UI](https://chakra-ui.com/)
* [Tailwind UI](https://www.tailwindui.com/)
* [Semantic UI](/react-semantic-ui-tutorial)
* [Material UI](https://material-ui.com/)
* [React Bootstrap](https://react-bootstrap.github.io/)

# Animations in React

Any animation in a web application starts with CSS. Eventually you will notice that CSS animations aren't enough for your needs. Usually developers check out [React Transition Group](https://reactcommunity.org/react-transition-group/) then, which gives them the possibility to perform animations with React components. Other well known animation libraries for React are:

* [react-motion](https://github.com/chenglou/react-motion)
* [react-spring](https://github.com/react-spring/react-spring)
* [Framer Motion](https://www.framer.com/motion/)
* [Animated](https://facebook.github.io/react-native/docs/animated) (React Native)

**Recommendations:**

* React Transition Group

# Visualization and Chart Libraries in React

If you really want to build charts from the ground up yourself, there is no way around [D3](https://d3js.org/). It's a low level visualization library that gives you everything you need to create amazing charts. However, learning D3 is a whole other adventure, thus many developers just pick a React charting library which does everything for them in exchange for flexibility. These are some popular solutions:

* [nivo](https://nivo.rocks/)
* [Victory](https://formidable.com/open-source/victory/)
* [react-vis](https://uber.github.io/react-vis/)
* [Recharts](http://recharts.org)
* [Chart Parts](https://microsoft.github.io/chart-parts/)

# Form Libraries in React

The most popular library for forms in React is [Formik](https://github.com/jaredpalmer/). It comes with everything needed from validation over submission to form state management. An alternative with lots of traction is [React Hook Form](https://react-hook-form.com/) though. Both are valid solutions for your React application if you start having more complex forms.

**Recommendations:**

* Formik
* React Hook Form

# Data Fetching Library in React

Pretty soon you will have to make a request to a remote [API](/what-is-an-api-javascript/) for [fetching data in React](/react-hooks-fetch-data). Modern browsers come with the [native fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) to perform asynchronous data requests:

```javascript
function App() {
  React.useEffect(() => {
    const result = fetch(my/api/domain)
      .then(response => response.json())
      .then(result => {
        // do success handling
        // e.g. store in local state
      });

    setData(result.data);
  });

  return (
    ...
  );
}
```

Basically you wouldn't have to add any other library to do the job. However, there exist libraries which only purpose it is to provide sophisticated asynchronous requests. They come with more powerful functionalities yet are only a lightweight libraries. One of these libraries that I would recommend is called [axios](https://github.com/mzabriskie/axios). It can be used instead of the native fetch API when your application grows in size.

If you have the luxury to deal with a GraphQL API, I recommend using Apollo Client. Alternative GraphQL clients would be urql or Relay.

**Recommendations:**

* the browser's native fetch API
* axios
* Apollo Client, if GraphQL API

# React Type Checking

Fortunately React comes with its own type checking abilities. With [PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) you are able to define the incoming props for your React components. Whenever a wrong type is passed to the component, you will get an error message when running the application. But this form of type checking should only be used for smaller applications.

```javascript
import PropTypes from 'prop-types';

const List = ({ list }) =>
  <div>
    {list.map(item => <div key={item.id}>{item.title}</div>)}
  </div>

List.propTypes = {
  list: PropTypes.array.isRequired,
};
```

In a larger React application, instead of using React PropTypes, [TypeScript](https://www.typescriptlang.org/) adds type safety for your whole application. instead of React PropTypes. When using such a type checker, you can get errors already during development time. You wouldn't have to start your application in order to find about a bug that could have prevented with such type checking. That way a type checker might be able to improve your developer experience and avoids to introduce bugs in the first place.

**Recommendations:**

* TypeScript

# React Code Style

Basically there are three options to follow a common sense for your code style.

The first approach is to follow a style guide that is embraced by the community. One popular [React style guide](https://github.com/airbnb/javascript/tree/master/react) was open sourced by Airbnb. Even though you don't deliberately follow such style guides, it makes sense to read them once to get the gist of common code style in React.

The second approach is to use a linter such as ESLint. Whereas a style guide gives you only a recommendation, a linter enforces this recommendation in your application. For instance, you can make it a requirement to follow the popular Airbnb styleguide and your IDE/editor will point you to every mistake.

The third and most popular approach is using [Prettier](https://github.com/prettier/prettier). It is an opinionated code formatter. You can [integrate it in your editor or IDE](/how-to-use-prettier-vscode) that it formats your code every time you save a file. Perhaps it doesn't match always your taste, but at least you never need to worry again about code formatting in your own or a team code base. Prettier doesn't replace ESLint though, but it [integrates nicely](/prettier-eslint) with it.

**Recommendations:**

* ESLint
* Prettier

# React Authentication

In a larger React application, you may want to introduce authentication with sign up, sign in, and sign out features. In addition, password reset and password change features are often needed. These features go far beyond React, because a backend application manages these things for you.

The common way would be implementing your own [custom backend application with a custom authentication](/graphql-apollo-server-tutorial/). If you don't want to roll your own authentication, consider something like [Passport.js](http://www.passportjs.org/).

If you don't want to care about the backend at all, the following three solutions may be something for you:

* [Firebase](/complete-firebase-authentication-react-tutorial/)
* [Auth0](https://auth0.com/)
* [AWS Cognito](https://aws.amazon.com/cognito/)

If you are looking for an all-in-one solution for authentication + database, stick to Firebase or AWS.

**Recommendations:**

* DIY: Custom Backend
* Get it off the shelf: Firebase

# React Hosting

You can deploy and host a React application like any other web application. If you want to have full control, choose something like [Digital Ocean](https://m.do.co/c/fb27c90322f3). If you want to have someone taking care of everything, [Netlify](https://www.netlify.com/) is a popular solution If you are already using a third-party for authentication/database like Firebase, you can check whether they offer hosting (e.g. [Firebase Hosting](https://firebase.google.com/docs/hosting)) as well.

# Testing in React

If you want to get a deep dive about testing in React, read this: [How to test components in React](/react-testing-tutorial). Here comes the gist: The backbone of testing a React application is [Jest](https://github.com/facebook/jest). It gives you test runner, assertion library and spying/mocking/stubbing functionalities. Everything that's needed from a comprehensive test framework.

At the minimum, you can render React components in your Jest tests with [react-test-renderer](https://reactjs.org/docs/test-renderer.html). This is already sufficient to perform so called [Snapshot Tests with Jest](/react-testing-jest). A snapshot test works the following way: Once you run your tests, a snapshot of your rendered DOM elements of the React component is created. When you run your tests again at some point in time, another snapshot is created which is used as diff for the previous snapshot. If the diff is not identical, Jest will complain and you either have to accept the snapshot or change the implementation of your component.

Eventually you will find yourself using [Enzyme](https://github.com/airbnb/enzyme) or [React Testing Library](https://github.com/testing-library/react-testing-library) -- both used within the Jest testing environment too -- for a more elaborate testing feature set. Both libraries make it possible to render your components and to simulate events on HTML elements. Afterward, Jest is used for the assertions on the DOM nodes.

If you are looking for a testing tool for React end-to-end (E2E) tests, [Cypress](https://www.cypress.io/) is the most popular choice.

**Recommendations:**

* Unit/Integration/Snapshot Tests: Jest + React Testing Library
* E2E Tests: Cypress

# Utility Libraries for React

JavaScript gives you plenty of built-in functionalities to deal with arrays, objects, numbers, objects and strings. One of the most used JavaScript built-in functionalities in React is the [built-in map() Array](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map). Why? Because you always have to render a list of items in a component. Since JSX is a mixture of HTML and JavaScript, you can use JavaScript to map over an array and return JSX. It makes it simple to create [list components](/react-list-component) with React:

```javascript
const List = ({ list }) =>
  <div>
    {list.map(item => <div key={item.id}>{item.title}</div>)}
  </div>
```

However, you might come to a point where you have to choose a utility library that gives you more elaborate functionalities. You might even want to be more flexible when chaining these utility functions or even compose them dynamically into each other. That's the point in time where you would introduce a utility library: [Lodash](https://lodash.com/) or [Ramda](https://ramdajs.com/). Whereas Lodash is the more down to earth library for every JavaScript developer, Ramda comes with a powerful core when functional programming comes into play. eep in mind though that modern JavaScript gives you plenty of features out of the box and it becomes less necessary these days to use a utility library.

**Recommendations:**

* JavaScript
* Lodash

# React and Immutable Data Structures

Vanilla JavaScript gives you plenty of built-in tools to handle with data structures as if they are immutable. However, if you and your team feel the need to enforce immutable data structures, one of the most popular choices is [Immer](https://github.com/immerjs/immer). Personally I don't use it, but any time someone asks about immutability in JS, people will point it out.

# React Internationalizing

When it comes to i18n for your React application, you need to think not only about translations, but also about pluralizations, date formattings and a handful of other things. These are the most popular libraries for dealing with it:

* [react-i18next](https://github.com/i18next/react-i18next)
* [react-intl](https://github.com/formatjs/react-intl)
* [LinguiJS](https://lingui.js.org/index.html)
* [FBT](https://github.com/facebookincubator/fbt)

**Recommendations:**

* react-i18next

# Rich Text Editor in React

When it comes to Rich Text Editors in React, I can only think of the following, because I haven't used any others in React:

* [Draft.js](https://draftjs.org/)
* [Slate](https://github.com/ianstormtaylor/slate)

# Payments in React

Like in any other web application, the most common payment providers are Stripe and PayPal. Both can be neatly integrated into React. This is a [working Stripe Checkout with React integration](https://github.com/rwieruch/react-express-stripe).

* [PayPal](https://developer.paypal.com/docs/checkout/)
* [Stripe Elements](https://github.com/stripe/react-stripe-elements) or [Stripe Checkout](https://stripe.com/docs/payments/checkout)

# Time in React

If your React application is dealing with lots of dates and timezones, you should introduce a library which manages these things for you. The most popular library is [moment.js](https://momentjs.com/). More lightweight alternatives are [date-fns](https://github.com/date-fns/date-fns) and [Day.js](https://github.com/iamkun/dayjs).

**Recommendations:**

* date-fns or Day.js

# React Desktop Applications

[Electron](https://www.electronjs.org/) is the go to framework for cross-platform desktop applications. However, there exist alternatives such as:

* [NW.js](https://nwjs.io/)
* [Neutralino.js](https://github.com/neutralinojs/neutralinojs)

**Recommendations:**

* Electron

# Mobile Development with React

I guess the go-to solution for bringing React from the web to mobile is still [React Native](https://facebook.github.io/react-native/). If you are a React Native developer who wants to create a web application, you should check out [React Native Web](https://github.com/necolas/react-native-web).

# React VR/AR

It's possible to dive into virtual reality or augmented reality with React To be honest, I haven't used any of these libraries, but they are the ones I know from the top of my head when it comes to AR/VR in React:

* [React 360](https://facebook.github.io/react-360/)
* [react-viro](https://www.npmjs.com/package/react-viro)
* [react-native-arkit](https://github.com/react-native-ar/react-native-arkit)

# Design Prototyping for React

If you are coming from a UI/UX background, you may want to use a tool for fast prototyping for new React components, layouts, or UI/UX concepts. I used [Sketch](https://www.sketch.com) in the past, but switched to [Figma](https://www.figma.com/) recently. Even though I like both, I don't regret using Figma now. Another popular tool is [Framer](https://www.framer.com).

# Writing Documentation with React

If you are in charge of writing the documentation for your software, UI library or something else, there are some neat React documentation tools out there. I have used [Storybook](https://storybook.js.org/) extensively and I only can speak good about it, but I have heard good things about these other solutions too:

* [Styleguidist](https://react-styleguidist.js.org/)
* [docz](https://www.docz.site/)
* [Docusaurus](https://docusaurus.io/)

<Divider />

So in the end, the React ecosystem can be seen as a framework for React, but it stays flexible. It is a flexible framework where you can make own decisions on which libraries you want to opt-in. You can start small and add only libraries to solve specific problems for you. You can scale your building blocks along the way when your application grows. Otherwise you can stay lightweight by using plain React. Therefore here again a list of libraries that could complement React as the core of the application regarding different project sizes. Keep in mind that the list is opinionated, but I am keen to get your feedback too.

* Small Application
 * **Boilerplate:** create-react-app
 * **Styling Libraries:** basic CSS and inline style
 * **Asynchronous Requests:** fetch or axios
 * **Code Style:** none
 * **Type Checking:** none
 * **State Management:** React Hooks
 * **Routing:** none or React Router
 * **Authentication:** Firebase
 * **Database:** Firebase
 * **UI Libraries:** none
 * **Form Libraries**: none
 * **Testing Libraries:** Jest
 * **Utility Libraries:** JavaScript
 * **Internationalizing:** react-i18next
 * **React Desktop:** Electron
* Medium Application
 * **Boilerplate:** Next.js or Gatsby.js
 * **Styling Libraries:** CSS Modules or Styled Components
 * **Asynchronous Requests:** fetch or axios
 * **Code Style:** Prettier, ESLint
 * **Type Checking:** none or TypeScript
 * **State Management:** React Hooks and/or Apollo
 * **Routing:** React Router
 * **Authentication:** Firebase
 * **Database:** Firebase
 * **UI Libraries:** none or UI component library
 * **Form Libraries**: none or Formik or React Hook Form
 * **Testing Libraries:** Jest with React Testing Library
 * **Utility Libraries:** JavaScript
 * **Internationalizing:** react-i18next
 * **React Desktop:** Electron
* Large Application
 * **Boilerplate:** Next.js, Gatsby.js, custom setup
 * **Styling Libraries:** CSS Modules or Styled Components
 * **Asynchronous Requests:** axios or Apollo Client, if GraphQL API
 * **Code Style:** Prettier, ESLint
 * **Type Checking:** TypeScript
 * **State Management:** React Hooks and/or Apollo/Redux/MobX
 * **Routing:** React Router
 * **Authentication:** Solution with own Node.js Server + Passport.js
 * **Database:** Solution with own Node.js Server with a SQL/NoSQL DB
 * **UI Libraries:** UI component library or roll your own UI components
 * **Form Libraries**: none or Formik or React Hook Form
 * **Testing Libraries:** Jest with React Testing Library and Cypress
 * **Utility Libraries:** JavaScript, Lodash
 * **Internationalizing:** react-i18next
 * **React Desktop:** Electron

The previous recommendations are opinionated. You can choose your own flexible framework for your ideal React application. Every "ideal" React setup is subjective to its needs of the developers and project. After all, there is no ideal React application setup.

