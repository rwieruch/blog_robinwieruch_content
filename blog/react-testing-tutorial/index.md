---
title: "How to test React Components"
description: "Learn how to test React components by setting up unit, integration and end-to-end tests for React with Jest, Enzyme and other testing libraries ..."
date: "2019-07-27T13:50:46+02:00"
categories: ["React", "Tooling"]
keywords: ["react testing tutorial", "react testing frameworks", "react testing library", "react testing best practices", "react testing components"]
hashtags: ["#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Writing tests is an essential part of software development to ensure a robust application. Tests enable us to automatically verify that our application is working on a certain level. The certain level depends on the quality, quantity (coverage) and type of your tests (unit tests, integration tests, snapshot tests, end-to-end tests (also called E2E tests)). The following tutorial series should **guide you through the whole topic of testing React applications**. Primarily, you will test React components but also pure JavaScript logic. The tutorials showcase different testing libraries for your React application whereas you can decide which of these solutions make sense for you. It guides you through the whole testing setup for your React application and how to write the tests for the React components.

*Note: If you are coming from a [create-react-app](https://github.com/facebook/create-react-app) application, you can ignore most of the setup sections. The create-react-app application comes with Jest as test runner and assertion library. You could add various other testing libraries such as Enzyme and React Testing Library to it. Otherwise, I would recommend to use [this article to set up a minimal React with Webpack application](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/).*

As mentioned, the tutorial series will show you **how to setup different testing libraries in your React application and how to use them**. We will follow mostly the constraints of the [testing pyramid](https://www.google.com/search?q=testing+pyramid). It says that you should write mostly unit tests, followed by several integration tests and only a few end-to-end-tests (E2E tests). However, there exists a second philosophy for React applications, because it uses components and not many functions: The second testing philosophy says that you should write "mostly integration tests and not so many unit tests". We will come back to this topic later for the tutorial series.

# React Component Tests

**What are unit, integration, and end-to-end tests in a nutshell?** Whereas a unit test should be able to test a piece (e.g. component) in isolation, the integration test should make sure that the piece (component) works in its context with other pieces (components). For instance, an integration test could verify that all necessary props are passed through from the tested component to a specific child component. Last but not least, end-to-end tests are testing your application in a browser environment. For instance, there you could simulate a whole [sign up process](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/) by filling in a email address and a password in a form and submitting these credentials to your backend application.

Another goal of this testing tutorial series is to show you a couple of **common test patterns and testing best practices** which are not too complicated and can be applied throughout your application. It should help you to write your React component tests in an efficient way without having to decide every time on how to write the tests themselves. Therefore, most of your tests should follow a common pattern which you can apply throughout your components. These test pattern become even more interesting when using [TDD](https://en.wikipedia.org/wiki/Test-driven_development), because you can write your tests first and your components in the second step. After all, this guide should show you a couple of React testing best practices without being too opinionated. Hopefully it will help you to understand the React testing framework landscape, how to setup these testing tools up and how to use them.

# React Testing Libraries

There exist various testing libraries for your React components. If you entering the React ecosystem with a Node.js background, you may be familiar with Mocha, Chai and Sinon to test JavaScript applications. Whereas Mocha is your test runner, Chai will be your assertion library. Sinon can be used optionally to test your JavaScript logic with spies, stubs, and mocks. Actually all three testing libraries can be used to test React applications as well: [How to test React components with Mocha, Chai and Enzyme](https://www.robinwieruch.de/react-testing-mocha-chai-enzyme-sinon/). As you can see, another library called Enzyme is added to the mix to render your React components. Still everything would run within Mocha and Chai is used as assertion library.

However, if you really want to test React components the idiomatic way, you will not get around Jest. Jest was released by Facebook to test React components and brings the combined power of Mocha, Chai, Sinon and more. It is a test runner, assertion library, and offers spies, stubs and mocks as well. Jest can be combined with Enzyme or React Testing Library to test your React components in an even more powerful way. The following tutorial series gives you a great introduction to testing React components:

* [How to test React components with Jest](https://www.robinwieruch.de/react-testing-jest)
* [How to test React components with Jest & Enzyme](https://www.robinwieruch.de/react-testing-jest-enzyme)

As you can see, there are various ways to test React components:

* Mocha, Chai, Sinon + Enzyme: If you are coming from a Node.js environment.
* Jest + Enzyme/React Testing Library: If you want to test the more idiomatic way.

In addition, you may want to end-to-end test your React applications as well. I have found Cypress the best option to conduct these kinds of tests: [How to test React components E2E with Cypress](https://www.robinwieruch.de/react-testing-cypress). If you want to dive into visual regression testing, you can use React Storybook: [Visual Regression Tests and React Storybook](https://www.robinwieruch.de/visual-regression-testing-react-storybook).

Last but not least, to get the most out of your tests in an automated environment, you may want to use continuous integration (CI) to run your tests before deploying your JavaScript application. A CI offers you additional powerful features, knowing every time whether your build or tests fails, but also report the test coverage of your entire application:

* [How to set up Continuous Integration for JavaScript](https://www.robinwieruch.de/javascript-continuous-integration)
* [How to set up JavaScript Test Coverage](https://www.robinwieruch.de/javascript-test-coverage)

If you went through all the mentioned tutorials, you should have a good grasp of testing React components. I would say that testing React components with Mocha/Chai is rather optional, because Jest is the better alternative for it. Also visual regression testing may not be relevant for everyone. My recommended test stack would be Jest + Enzyme/React Testing Library for unit/integration tests and Cypress for end-to-end tests. Then add testing coverage to the mix and connect your application to your favorite CI to run your tests in the cloud as well.
