+++
title = "React Testing Tutorial: Test Frameworks & Component Tests"
description = "A React tutorial on how to setup and use React component tests with testing frameworks such as Mocha, Chai, Sinon, Enzyme and Jest. It uses unit, integration and end-to-end tests for your React.js components ..."
date = "2018-03-19T13:50:46+02:00"
tags = ["React", "JavaScript", "Tooling"]
categories = ["React", "JavaScript", "Tooling"]
keywords = ["react testing tutorial", "react testing frameworks", "react testing library", "react testing best practices", "react testing components"]
news_keywords = ["react testing tutorial", "react testing frameworks", "react testing library", "react testing best practices", "react testing components"]
hashtag = "#ReactJs"
card = "img/posts/react-testing-tutorial/banner_640.jpg"
banner = "img/posts/react-testing-tutorial/banner.jpg"
contribute = "react-testing-tutorial.md"
headline = "React Testing Tutorial: Test Frameworks & Component Tests"

summary = "The article gives you guidance on how to setup and perform testing in a React application. It uses common testing tools such as Mocha, Chai, Enzyme, Jest and Sinon to make verify the robustness of your application."
+++

{{% pin_it_image "react testing tutorial" "img/posts/react-testing-tutorial/banner.jpg" "is-src-set" %}}

Writing tests is an essential part of software development to ensure a robust application. Tests enable us to automatically verify that our application is working on a certain level. The certain level depends on the quality, quantity (coverage) and type of your tests (unit tests, integration tests, end-to-end tests).

The following article should **guide you through the whole topic of testing React apps**. Primarily, you will test React components but also pure business logic. The article showcases different testing libraries for your application whereas you can decide which of these solutions make sense for you. It guides you through the whole testing setup for your React application and how to write the tests. It will use testing tools such as Mocha, Chai, Sinon, Enzyme and Jest.

If you are coming from a {{% a_blank "create-react-app" "https://github.com/facebook/create-react-app" %}} application, you can ignore most of the setup sections. The create-react-app application comes with Jest as test runner and assertion library. You can add Sinon and Enzyme manually to it.

Otherwise, I would recommend to use [this article to set up a minimal React with Webpack application](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/). After your application is up and running by following the referenced guide, you can use this testing tutorial to setup your test environment.

As mentioned, the article will show you **how to setup different testing libraries in your React application and how to use them**. We will follow mostly the constraints of the {{% a_blank "testing pyramid" "https://www.google.com/search?q=testing+pyramid" %}}. It says that you should write mostly unit tests, followed by several integration tests and only a few end-to-end-tests (E2E tests). However, there exists a second philosophy for React applications, because it uses components and not many functions. The second testing philosophy says that you should write "mostly integration tests and not so many unit tests". We will come back to this topic later in this testing tutorial.

**What are unit, integration, and end-to-end tests in a nutshell?** Whereas a unit test should be able to test a piece (e.g. component) in isolation, the integration test should make sure that the piece (component) works in its context with other pieces (components). For instance, an integration test could verify that all necessary props are passed through from the tested component to a specific child component. Last but not least, end-to-end tests are testing your application in a browser environment. For instance, there you could simulate a whole [sign up process](https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/) by filling in a email address and a password in a form and submitting these credentials to your backend.

Another goal of the article is to show you a couple of **common test patterns and testing best practices** which are not too complicated and can be applied throughout your application. It should help you to write your React component tests in an efficient way without having to decide every time on how to write the tests themselves. Therefore, most of your tests should follow a common pattern which you can apply throughout your components. These test pattern become even more interesting when using {{% a_blank "TDD" "https://en.wikipedia.org/wiki/Test-driven_development" %}}, because you can write your tests first and your components in the second step. After all, this guide should show you a couple of React testing best practices without being too opinionated. Hopefully it will help you to understand the React testing framework landscape, how to setup these testing tools up and how to use them.

You can find the whole project in {{% a_blank "this GitHub repository" "https://github.com/rwieruch/react-components-test-setup" %}}.

{{% chapter_header "Table of Contents" "toc" %}}

* [Pseudo React Application Setup for Testing](#react-test-setup)
* Mocha and Chai
  * [Mocha with Chai Test Setup in React](#react-mocha-chai-test-setup)
  * [Unit Tests for React State Changes](#react-component-tests-state-unit)
* Enzyme
  * [Enzyme Test Setup in React](#react-enzyme-test-setup)
  * [React Testing with Enzyme](#react-component-tests-integration)
* Sinon
  * [Sinon Test Setup in React](#react-sinon-test-setup)
  * [React Testing with Sinon](#react-sinon-testing)
* Jest
  * [Jest Test Setup in React](#react-jest-test-setup)
  * [React Testing with Jest](#react-jest-snapshot-tests)
* End-to-end (E2E) Tests
  * [React End-to-end (E2E) Tests with Cypress.io](#react-e2e-tests-cypress)
* CI and Tests
  * [React Component Tests and Continuous Integration](#react-component-tests-continuous-integration)
  * [React Component Test Coverage with Coveralls](#react-component-test-coverage-coveralls)

{{% chapter_header "Pseudo React Application Setup for Testing" "react-test-setup" %}}

Before setting up the test setup with different testing libraries and writing the React component tests, you will need a simple React application which can be tested in the first place. You will introduce a simple App component which can be tested in the following sections. If it's too difficult for you to follow the next parts of the React application, you should grab a copy of [The Road to learn React](https://www.robinwieruch.de/the-road-to-learn-react/) to learn about React itself before testing a React application.

Let's start in the *src/index.js* file. Here you can import the App component which is not implemented yet and render it.

{{< highlight javascript >}}
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
{{< /highlight >}}

The App component is an JavaScript ES6 class component that has its own state. It's a Counter component where it should be possible to increment and decrement a digit by clicking on either of two buttons. The file for the App component should be located in *src/App.js*.

{{< highlight javascript >}}
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
    };

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onIncrement() {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
    }));
  }

  onDecrement() {
    this.setState((prevState) => ({
      counter: prevState.counter - 1,
    }));
  }

  render() {
    const { counter } = this.state;

    return (
      <div>
        <h1>My Counter</h1>
        <p>{counter}</p>

        <button
          type="button"
          onClick={this.onIncrement}
        >
          Increment
        </button>

        <button
          type="button"
          onClick={this.onDecrement}
        >
          Decrement
        </button>
      </div>
    );
  }
}

export default App;
{{< /highlight >}}

So far, hopefully everything should be clear on how this component works. If it's not clear, make sure to grab the ebook/course "The Road to learn React" after reading this tutorial.

But that's not it for the use case application. Let's add a couple of more things for the sake of testing different parts of it in isolation later on. Since the `this.setState()` method is asynchronously executed, [it already uses a function instead of an object](https://www.robinwieruch.de/learn-react-before-using-redux/). That way, it can access the state when `this.setState()` is actually executed asynchronously. That's only one benefit of using the function over the object in `this.setState()`. In addition, it's also possible to extract it as standalone function which can be tested in isolation from the component later on.

{{< highlight javascript "hl_lines=3 4 5 7 8 9 17 21" >}}
import React, { Component } from 'react';

const doIncrement = (prevState) => ({
  counter: prevState.counter + 1,
});

const doDecrement = (prevState) => ({
  counter: prevState.counter - 1,
});

class App extends Component {
  constructor() {
    ...
  }

  onIncrement() {
    this.setState(doIncrement);
  }

  onDecrement() {
    this.setState(doDecrement);
  }

  render() {
    ...
  }
}

export default App;
{{< /highlight >}}

In order to import these functions in the tests later on , they need to be exported from the file.

{{< highlight javascript "hl_lines=3 7" >}}
import React, { Component } from 'react';

export const doIncrement = (prevState) => ({
  counter: prevState.counter + 1,
});

export const doDecrement = (prevState) => ({
  counter: prevState.counter - 1,
});

class App extends Component {
 ...
}

export default App;
{{< /highlight >}}

These functions which are used to update the local state of the React component can tested in isolation from the component now. That's what you would call a real unit test later on. The function is tested with an input and the test asserts an expected output. There are no side effects, because the function is pure.

In addition for our React application, let's introduce a second component to have a relationship between two components as parent and child components. That's another scenario which can be tested as integration test later on. If you would test each component in isolation, you would have unit tests. But by testing them together in their context, you have an integration test between both components.

{{< highlight javascript "hl_lines=12 32 33" >}}
...

class App extends Component {
  ...

  render() {
    const { counter } = this.state;

    return (
      <div>
        <h1>My Counter</h1>
        <Counter counter={counter} />

        <button
          type="button"
          onClick={this.onIncrement}
        >
          Increment
        </button>

        <button
          type="button"
          onClick={this.onDecrement}
        >
          Decrement
        </button>
      </div>
    );
  }
}

export const Counter = ({ counter }) =>
  <p>{counter}</p>

export default App;
{{< /highlight >}}

As you can see, the component gets exported as well. This way, it can be imported in the test in a later section of this tutorial. Even though the Counter component is not used anywhere else in the whole application, it is okay to export components (and functions) from a file for the sake of testing them. That's it for the use case application which shall be tested in the following sections.

{{% chapter_header "Mocha with Chai Test Setup in React" "react-mocha-chai-test-setup" %}}

This section will show you how to setup and perform React testing with Mocha and Chai. Let's implement a minimal React testing setup to make first assertions for the exported functions. First, there needs to be an entity which is responsible to run all of our tests in a certain framework. This entity will be {{% a_blank "Mocha" "https://github.com/mochajs/mocha" %}} which is a popular test runner in React applications. In contrast, another popular test runner is Karma which is popular for testing Angular applications.

Let's install Mocha on the command line as development dependency.

{{< highlight javascript >}}
npm install --save-dev mocha
{{< /highlight >}}

Second, there needs to be an entity which can be used to make assertions. Someone has to able to say: "Expect X to be equal to Y". This entity will be {{% a_blank "Chai" "https://github.com/chaijs/chai" %}} in our testing setup. So let's install it on the command line as well.

{{< highlight javascript >}}
npm install --save-dev chai
{{< /highlight >}}

Last but not least, React components need some kind of artificial browser environment, because they render HTML in the browser's DOM. Since the tests are not executed in a real browser, you need to setup the minimal environment for the component tests yourself. That's why you need to install {{% a_blank "jsdom" "https://github.com/jsdom/jsdom" %}} on the command line as dev dependency as well. Jsdom makes sure that you can create this artificial browser environment in the next steps.

{{< highlight javascript >}}
npm install --save-dev jsdom
{{< /highlight >}}

These three libraries are everything you need for a minimal test environment. You will use these to test a couple of things in the following. Later on, you will learn in the next sections about advanced libraries to enrich your React component testing tool set.

In the last step of this section, let's see how these three libraries are configured together in order to start testing your application. On the command line, create the necessary files as test configurations in a new test folder. In your project, create next to your *src/* folder a *test/* folder for all your test configuration.

{{< highlight javascript >}}
mkdir test
cd test
touch helpers.js dom.js
{{< /highlight >}}

Both files will be filled with content now. Later on, they will be used as configuration to run the tests via a script on the command line. Let's go first with the *test/helpers.js* file:

{{< highlight javascript >}}
import { expect } from 'chai';

global.expect = expect;
{{< /highlight >}}

The only thing we are doing in this file is importing the expect function from the chai assertion library. This function is used later on in your tests to assert: "Expect X to be equal to Y". Furthermore, the expect function is made globally accessible in all your test files by using this file. That's how you can make `expect()` the default function in your tests without importing the function in each file explicitly. It's always there in every of your test files, because you will need it anyway in every test. In the following sections, you will add more of these globally accessible test functions, because you most likely need them in every test anyways.

In the other file, the *test/dom.js* file, you will setup your pseudo browser environment for your React components which render HTML eventually. Open the *test/dom.js* file and add the following lines to it:

{{< highlight javascript >}}
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!doctype html><html><body></body></html>');

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

copyProps(window, global);
{{< /highlight >}}

This tutorial isn't going to explain the last code snippet in too much detail. Basically the code snippet helps us to mimic the browser for our React component tests. You can see that the jsdom library is used to create a `window` object which should be available in the browser, but also a couple of more objects (e.g. `document` object). Don't worry too much about this file, because most likely you will never have to touch it again.

Now you have both helper files for your tests in place. One to expose functions from your test libraries globally to all your test files, because they are needed anyway, and one to mimic the DOM for your React component tests. Last but not least, you need to define the `npm run test` script in your package.json. This script should execute all your test files, which have a specific suffix in their file name, and use the two previously defined files as configuration for the test environment. In your *package.json* add the following script:

{{< highlight javascript "hl_lines=3" >}}
"scripts": {
  "start": "webpack-dev-server --config ./webpack.config.js",
  "test:unit": "mocha --require babel-core/register --require ./test/helpers.js --require ./test/dom.js 'src/**/*.spec.js'"
},
{{< /highlight >}}

As you can see, the script takes both configuration files as required test configuration and executes all test files which end with the suffix "*.spec.js". Basically a test file could be named *App.spec.js* and it has to be somewhere in the */src* folder. Of course, you can come up with your own rules for the test file naming here. It's up to you.

The script can be executed by running `npm run test:unit` on the command line now, but it will not find any tests yet, because you will have to define these tests in the first place. You will do it in the next section, but before doing so, you can add a second npm script. This script will execute the previously defined script, but this time in watch mode.

{{< highlight javascript "hl_lines=4" >}}
"scripts": {
  "start": "webpack-dev-server --config ./webpack.config.js",
  "test:unit": "mocha --require babel-core/register --require ./test/helpers.js --require ./test/dom.js 'src/**/*.spec.js'",
  "test:unit:watch": "npm run test:unit -- --watch"
},
{{< /highlight >}}

The watch mode means that your tests will run once, but every time again when you change your source code or tests. That's how you will get immediate feedback on the command line while developing your application, doing test driven development, implementing additional tests, or while you are changing tests.

Note: If you want to run your tests in watch mode with `npm run test:unit:watch` along with your development server with `npm start`, you need to open two terminal tabs to be able to execute both scripts side by side.

Last but not least, before diving into testing with Mocha and Chai, there is one neat little library which you may need later on. It's called {{% a_blank "ignore-styles" "https://github.com/bkonkle/ignore-styles" %}}. At some point, you may introduce styling for your React components. However, the styling shouldn't necessarily affect the tests and thus you may wanna just ignore them. That's where this little library comes into play. You can install it on the command line with `npm install --save-dev ignore-styles` and add it to your npm script:

{{< highlight javascript "hl_lines=3" >}}
"scripts": {
  "start": "webpack-dev-server --config ./webpack.config.js",
  "test:unit": "mocha --require babel-core/register --require ./test/helpers.js --require ./test/dom.js --require ignore-styles 'src/**/*.spec.js'",
  "test:unit:watch": "npm run test:unit -- --watch"
},
{{< /highlight >}}

That's it for the Mocha and Chai setup for a React application. In the next section, you will introduce your first unit tests with it.

{{% chapter_header "Unit Tests for React State Changes" "react-component-tests-state-unit" %}}

Let's start with the smallest building blocks in the testing pyramid: unit tests. They only test small parts of your application in isolation. For instance, functions are a perfect candidates for unit tests. They only take an input and return an output. That's what makes pure functions so powerful for testing too, because you never have to worry about any side-effects. The output should be always the same when the input stays the same. Thus a unit test could be used to test this particular function as a part of your application in isolation.

In the App component, you have already extracted the functions which update the state in `this.setState()`. These functions got exported too, so you can import them in a test file in order to test them. Let's create a test file for the App component on the command line from the *src/* folder, Make sure to give the file the correct naming suffix.

{{< highlight javascript >}}
touch App.spec.js
{{< /highlight >}}

Now open up the file and add the following lines to it:

{{< highlight javascript >}}
describe('Local State', () => {
  it('should increment the counter in state', () => {

  });

  it('should decrement the counter in state', () => {

  });
});
{{< /highlight >}}

Basically the previous lines have defined one test suite and two tests for it. Whereas the "describe"-block defines the test suite, the "it"-blocks define the test cases. A test can either be successful (green) or erroneous (red). Of course, you want to make and keep them green.

Now it's up to you to test both functions which update the React component state from your *src/App.js* file. Whereas one function increments the counter property in the object (state), the other function decrements the counter property.

The simplest procedure to write a test in a "it"-block in three steps is the following: arrange, act, assert.

{{< highlight javascript "hl_lines=1 5 6 7 8 12 13 14 15" >}}
import { doIncrement, doDecrement } from './App';

describe('Local State', () => {
  it('should increment the counter in state', () => {
    const state = { counter: 0 };
    const newState = doIncrement(state);

    expect(newState.counter).to.equal(1);
  });

  it('should decrement the counter in state', () => {
    const state = { counter: 0 };
    const newState = doDecrement(state);

    expect(newState.counter).to.equal(-1);
  });
});
{{< /highlight >}}

In the first line of each test, you arrange the initial state object which will be the input of your function to be tested in the next step. In the second line of each test, you will pass the variable from the setup step to your function. The function returns a value. In the last line of the test, you want to assert that the returned value from the function is an expected value. In this case, the `doIncrement()` function should increment the counter property in the state object and the `doDecrement()` function should decrement it.

That's it. You can run both tests on the command line with `npm run test:unit` or `npm run test:unit:watch`. You can change the assertion and see how the tests behave in watch mode. They will either fail or succeed. Furthermore, note that there is no React dependency yet in the test file. It's only Mocha and Chai which are able to test your vanilla JavaScript functions. You wouldn't even need the *test/dom.js* configuration yet, because there is no DOM of the browser needed for these unit tests.

{{% chapter_header "Enzyme Test Setup in React" "react-enzyme-test-setup" %}}

The following section will show you how to setup and perform React testing with Enzyme which makes it effortless to test React components with unit and integration tests. It is a library by Airbnb which was introduced for component tests in React. Let's go through the setup of Enzyme in React. First, you have to install it on the command line as dev dependency:

{{< highlight javascript >}}
npm install --save-dev enzyme
{{< /highlight >}}

Enzyme introduced adapters to play well with React. That's why you have to install such an adapter for your test setup too. The version of it depends on your React version:

{{< highlight javascript >}}
npm install --save-dev enzyme-adapter-react-16
{{< /highlight >}}

In this React testing guide, we are using React 16. That's why the Enzyme adapter for React 16 gets installed here. So make sure to check your own React version in your application.

Last but not least, you can setup Enzyme in your *test/helpers.js* file. There you can configure the adapter and expose the enzyme functionalities globally next to the expect function:

{{< highlight javascript "hl_lines=2 3 5 9 10 11" >}}
import { expect } from 'chai';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.expect = expect;

global.mount = mount;
global.render = render;
global.shallow = shallow;
{{< /highlight >}}

Similar to the `expect` function from chai which is used to make assertions, you can make `shallow`, `render` and `mount` from Enzyme globally accessible. That way, you don't need to import it explicitly in your test files anymore. You will use these three functions for your unit and integration tests with Enzyme for your React components.

{{% chapter_header "React Testing with Enzyme: Unit and Integrations Tests for React Components" "react-component-tests-integration" %}}

The Enzyme setup is up and running. Now you can start to test your component(s). The following section should show you a couple of basic patterns which you can apply in your React component tests. If you follow these patterns, you don't have to make a costly mental decision every time on how to test your React components.

You have already exported the Counter component from the *src/App.js* file. So it should be possible to test for you that an instance of the Counter component is rendered when you render the App component. You can simply add your tests in the *src/App.spec.js* file.

{{< highlight javascript "hl_lines=1 2 8 9 10 11 12 13" >}}
import React from 'react';
import App, { doIncrement, doDecrement, Counter } from './App';

describe('Local State', () => {
 ...
});

describe('App Component', () => {
  it('renders the Counter wrapper', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Counter)).to.have.length(1);
  });
});
{{< /highlight >}}

The `shallow()` function is one of the three functions (shallow, mount, render) which you have made accessible globally in the *test/helpers.js* file. Shallow is the simplest form of rendering a component with Enzyme. It only renders the component but not the content of components which are children to this component. It makes it possible to test the component in isolation. Thus it can be used perfectly for unit tests of React components. In the previous test, you only checked whether the Counter component is rendered as component instance in the App component. Accordingly to the test, there should be only one Counter component.

That's one simple unit test you can do with Enzyme in React. For instance, you can also check whether specific HTML tags or HTMLS elements with CSS classes are rendered.

{{< highlight javascript >}}
it('renders the List wrapper with list elements', () => {
  const wrapper = shallow(<List items={['a', 'b']} />);
  expect(wrapper.find('li')).to.have.length(2);
  expect(wrapper.find('.list')).to.have.length(1);
});
{{< /highlight >}}

Depending on the passed props, you can check the rendered HTML elements by selecting them with {{% a_blank "Enzyme's selectors" "https://github.com/airbnb/enzyme/blob/master/docs/api/selector.md" %}}. This way, you can also check a [conditional rendering in React](https://www.robinwieruch.de/conditional-rendering-react/) by asserting the length of a selection to be either 0 or 1.

Shallow rendering tests with Enzyme can also be used for lightweight integration tests. For instance, whereas the last test checked only the rendered HTML tags, the next test asserts whether the correct props are passed to the next component.

{{< highlight javascript "hl_lines=9 10 11 12 13 14 15 16 17 18 19" >}}
...

describe('App Component', () => {
  it('renders the Counter wrapper', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Counter)).to.have.length(1);
  });

  it('passes all props to Counter wrapper', () => {
    const wrapper = shallow(<App />);
    let counterWrapper = wrapper.find(Counter);

    expect(counterWrapper.props().counter).to.equal(0);

    wrapper.setState({ counter: -1 });

    counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.props().counter).to.equal(-1);
  });
});
{{< /highlight >}}

The line between a unit test and a integration test can be blurry. But in this case, you could say it's a lightweight integration test because it tests whether two components play together as expected. The last test has shown you how to access and verify props which are passed from component to component and how to manipulate the local state of a component for the purpose of your test. That way, you can also test your React component state when the local state changes. For instance, imagine a toggle for a conditional rendering again which is stored as local state in your component. You can manipulate the state and verify whether the correct HTML elements are rendered or not rendered.

You have seen how to test the rendered output, how to access props and how to manipulate the local state of a component. Next, you can also simulate clicks with Enzyme. Your App component has two buttons which are perfectly suited to test the click behavior. Whereas one button should increment the counter in the local state of the React component, the other button should decrement the counter. Let's see how you can simulate these events in interactive HTML elements such as buttons with a `onClick` handler.

{{< highlight javascript "hl_lines=21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37" >}}
...

describe('App Component', () => {
  it('renders the Counter wrapper', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Counter)).to.have.length(1);
  });

  it('passes all props to Counter wrapper', () => {
    const wrapper = shallow(<App />);
    let counterWrapper = wrapper.find(Counter);

    expect(counterWrapper.props().counter).to.equal(0);

    wrapper.setState({ counter: -1 });

    counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.props().counter).to.equal(-1);
  });

  it('increments the counter', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({ counter: 0 });
    wrapper.find('button').at(0).simulate('click');

    expect(wrapper.state().counter).to.equal(1);
  });

  it('decrements the counter', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({ counter: 0 });
    wrapper.find('button').at(1).simulate('click');

    expect(wrapper.state().counter).to.equal(-1);
  });
});
{{< /highlight >}}

Since there are two buttons, you can use the `at()` helper function to access the desired element in the list of elements with an index. But be careful when the order of the elements changes. In a best case test scenario, I would recommend to use more specific Enzyme selectors to address each element individually. Otherwise your tests are likely to break when the order of your elements, in this case the order of the button elements, changes.

The last test cases were simple ways for testing your React state. They can be seen as test pattern, because you can easily repeat them for other components too. It shouldn't take you much time to verify that crucial HTML elements or React components are rendered, the correct props are passed and the local state is manipulated in an expected way.

You have only used the `shallow()` function from Enzyme for your unit tests and lightweight integration tests so far. You may wonder when you should use the `mount()` and `render()` functions from Enzyme.

While `shallow()` only renders the component without the content of child components, `mount()` renders all child components as well. It renders the whole component hierarchy. While the former is used for component tests in isolation (unit tests, lightweight integration), the latter is used for real integration tests. Integration tests are more likely to break, because they include all the children and logic of your component tree. Thus the maintenance costs are higher for integration tests. People are saying it's more expensive to write and maintain those tests than unit tests. Last but not least, the third function to render your React components with Enzyme is called `render()`. It is similar to `mount()`, because it renders all child components. But from a performance point of view, it is less expensive than `mount()`, because it doesn't run the lifecycle methods of your component. So if you need access to child components but are not interested in lifecycle methods, you can use `render()` instead of `mount()`.

**There are two major philosophies on how many unit and integration tests you should have for your components in your application.** The common testing pyramid says that you should have lots of unit tests and several integration tests (and only a few end-to-end tests). Basically, you should have a lot of small maintainable unit tests, but a few vital integration tests. It's the common approach for testing in software engineering. However, for component tests (like in React) there exists the philosophy to have many integration tests but only a few unit tests. Unit tests are not very likely to break because they isolate the component too much from the rest of the application. They mock the context perfectly away. That's why people argue against it, because the component is too isolated. In conclusion, you would be more likely to test a component for its robustness by using integration tests to test them in their context of other components.

What does it mean for the implementation of your tests? If you would want to use more integration tests than unit tests, you would go for `mount()` or `render()` instead of `shallow()` in your component tests. That way you render, test and verify the existence and behavior of the whole component tree. Moreover, you would be able to write more complex tests because you have access to all child components. The test cases won't differ too much from the previously implemented test cases. You would still verify passed props, rendered elements, simulated clicks and state changes of your local React state.

{{% chapter_header "Sinon Test Setup in React" "react-sinon-test-setup" %}}

What about async tests in a React application? So far everything you have tested was synchronous. If you check again your App component, there is no need to test something that is executed asynchronously. Let's introduce a artificial scenario in your App component where some made up data is fetched in the `componentDidMount()` lifecycle method.

Often it happens that a component requests data from a [third-party API](https://www.robinwieruch.de/what-is-an-api-javascript/) in the `componentDidMount()` lifecycle method. Because of it, it should be possible to test this asynchronous part in a React component as well. Let's pretend there is a pseudo API endpoint that returns an array of counters from an API. Of course, it will not work in your running application, because the API endpoint doesn't exist, but it should be there for the purpose of testing it. Afterward, you should be able to test your own third-party requests that happen in the `componentDidMount()` lifecycle method.

In the following scenario, you will use axios to make the request to the third-party API. Therefore, you have to install the axios package with npm on the command line.

{{< highlight javascript >}}
npm install --save axios
{{< /highlight >}}

Afterward, you can make the request to a pseudo API endpoint. It's up to you to use a real API endpoint for this scenario. If you are not familiar on how to make request to third-party APIs in React components, checkout [this guide on data fetching in React](https://www.robinwieruch.de/react-fetching-data/).

{{< highlight javascript "hl_lines=2 12 19 20 21 22 23" >}}
import React, { Component } from 'react';
import axios from 'axios';

...

class App extends Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
      asyncCounters: null,
    };

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  componentDidMount() {
    axios.get('http://mypseudodomain/counter')
      .then(counter => this.setState({ asyncCounters: counter }))
      .catch(error => console.log(error));
  }

  onIncrement() {
    this.setState(doIncrement);
  }

  onDecrement() {
    this.setState(doDecrement);
  }

  render() {
    ...
  }
}

...

export default App;
{{< /highlight >}}

For the purpose of testing this scenario, there is no need to display the `asyncCounters` from the local state in the `render()` method. Because the endpoint will only return fake data in the test later on. In addition, the scenario only covers the happy path when the request is successful.

Now, how would you test the asynchronous data fetching in your React component? You can install a neat library called {{% a_blank "Sinon" "https://github.com/sinonjs/sinon" %}} for it as dev dependency on the command line:

{{< highlight javascript >}}
npm install --save-dev sinon
{{< /highlight >}}

Afterward, you can add Sinon as another global function to your *test/helpers.js* file:

{{< highlight javascript "hl_lines=1 10" >}}
import sinon from 'sinon';
import { expect } from 'chai';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.expect = expect;

global.sinon = sinon;

global.mount = mount;
global.render = render;
global.shallow = shallow;
{{< /highlight >}}

Sinon can be used for spies, stubs, and mocks. In the following, you will use a spy and a stub for testing your asynchronous business logic in your React component. These are most of the time sufficient for testing async logic in your code.

{{% chapter_header "React Testing with Sinon: Testing Asynchronous Logic" "react-sinon-testing" %}}

Let's add a first {{% a_blank "spy" "http://sinonjs.org/releases/v4.4.6/spies/" %}} just for the sake of demonstrating it. A spy can be used on any function for assertions. After a spy is applied to it, you can assert for example how many times the function was called for the test.

{{< highlight javascript "hl_lines=4 5 6 7 8 9" >}}
...

describe('App Component', () => {
  it('calls componentDidMount', () => {
    sinon.spy(App.prototype, 'componentDidMount');

    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});
{{< /highlight >}}

In the test, you expected the `componentDidMount()` lifecycle method, which is available via the prototype chain on the App component, to be called only once. If you know the lifecycle methods of React components, it should be clear that this method is only called once when the component mounts. Afterward, it's not called again. Thus the test should succeed. That's essentially how you would test React lifecycle methods.

The test itself is not important and can be removed again. It should only demonstrate the spying capabilities of Sinon. After all, it wouldn't make any sense to test the lifecycle methods of a React component. That should be tested by React internally. Instead, let's see how the asynchronous data fetching in React can be tested with Sinon.

Since every test of the App component is affected by this newly executed data fetching in `componentDidMount()`, you can make sure to return valid data for it for every test by using the `before()` and `after()` setup functionalities of Mocha.

{{< highlight javascript "hl_lines=4 5 6 8 9 10" >}}
...

describe('App Component', () => {
  before(() => {

  });

  after(() => {

  });

  it('renders the Counter wrapper', () => {
    ...
  });

  ...
});
{{< /highlight >}}

Now you can import axios to your testing suite, because you will need to apply a {{% a_blank "stub" "http://sinonjs.org/releases/v4.4.6/stubs/" %}} to it for mocking the returned data from the third-party API request.

{{< highlight javascript "hl_lines=2 8 9 12 16" >}}
import React from 'react';
import axios from 'axios';
import App, { doIncrement, doDecrement, Counter } from './App';

...

describe('App Component', () => {
  const result = [3, 5, 9];
  const promise = Promise.resolve(result);

  before(() => {
    sinon.stub(axios, 'get').withArgs('http://mydomain/counter').returns(promise);
  });

  after(() => {
    axios.get.restore();
  });

  ...
});
{{< /highlight >}}

So what's a stub? The Sinon documentation says: "Test stubs are functions (spies) with pre-programmed behavior." That way, you have full control over your spies. For instance, you can say what a function (e.g. `get()`) should return. You can narrow it down by providing a specific set of arguments too. In our case, we return a promise which resolves in an array of integers (counters) eventually.

The `before()` and `after()` functions happen before and after the `describe()` test suites. Thus, every test should be aware of the returned promise in `componentDidMount()` now. By doing it this way, no test will complain about the data fetching. The request will just go through successfully when the component is mounted for the test.

After the tests ran through, the `restore()` method on the stub in the "after"-block makes sure to restore the native behavior of the `get()` method which was stubbed before. This way, you don't run into any surprises for your other tests because there is a stub somewhere hanging around in your test suites.

Now, let's test the asynchronous behavior in `componentDidMount()`. The test should assert that the returned array is stored in the local state of the React component as `asyncCounters`.

{{< highlight javascript "hl_lines=17 18 19 20 21 22 23 24 25" >}}
...

describe('App Component', () => {
  const result = [3, 5, 9];
  const promise = Promise.resolve(result);

  before(() => {
    sinon.stub(axios, 'get').withArgs('http://mydomain/counter').returns(promise);
  });

  after(() => {
    axios.get.restore();
  });

  ...

  it('fetches async counters', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.state().asyncCounters).to.equal(null);

    promise.then(() => {
      expect(wrapper.state().asyncCounters).to.equal(result);
    });
  });
});
{{< /highlight >}}

When you render the App component for the first time, the `asyncCounters` in your local state should be `null`. But when the promise resolves eventually, the state should be equal to the specified result of the promise. Now you can run your tests again and verify that it goes through successfully. Congratulations, you tested asynchronous behavior in your React component. Keep in mind that Sinon itself is not strictly bound to React (same as Mocha and Chai). You only use it to spy functions, to apply stubs on them or to create more sophisticated mocks.

{{% chapter_header "Jest Test Setup in React" "react-jest-test-setup" %}}

The following section will show you how to setup and perform React testing with Jest. {{% a_blank "Jest" "https://facebook.github.io/jest/" %}} can be used for your React component tests. It's the official testing library by Facebook. Jest introduced the so called snapshot tests which can be used perfectly as supplement to your React unit and integration tests with Enzyme.

Basically a snapshot test creates a snapshot of your rendered component's output when you run your test. This snapshot is used for diffing it to the next snapshot when you run your test again. If your rendered component's output has changed, the diff of both snapshots will show it and the snapshot test will fail. That's not bad at all, because the snapshot test should only inform you when the output of your rendered component has changed. In case a snapshot test fails, you can either accept the changes or deny them and fix your component's implementation for the rendered output.

By using Jest for snapshot tests, you can keep your tests lightweight. You can easily set them up and either accept or deny changes when the diffing fails. It's more about the rendered output and less about the business logic of the component. The latter can be well tested by using Enzyme instead. But if you want to use Jest for it, it's possible too.

Note: Jest comes with its own test runner and assertion functions. Whereas you have set up Mocha and Chai as test runner and assertion libraries before, Jest handles these things on its own. The API is a bit different though. When using Jest, you can define your testing blocks with a "test"-block instead of a "it"-block or, for instance, you can make an assertion with `toEqual()` (Jest assertion) instead of `to.equal()` (Chai assertion). After all, if you want to use Jest for everything, you can skip the Mocha and Chai setup. If you want to perform React testing with Jest and Enzyme, you can setup Enzyme (and Sinon) in the Jest environment without having to deal with Mocha and Chai.

Let's setup Jest in your React application. First, you have to install it as dev dependency on the command line. It uses a utility library called react-test-renderer to render your actual component:

{{< highlight javascript >}}
npm install --save-dev jest react-test-renderer
{{< /highlight >}}

Second, create a Jest configuration file in your *test/* folder:

{{< highlight javascript >}}
cd test
touch jest.config.json
{{< /highlight >}}

Third, add the following configuration for Jest to your newly created file:

{{< highlight javascript >}}
{
  "testRegex": "((\\.|/*.)(snapshot))\\.js?$",
  "rootDir": ".."
}
{{< /highlight >}}

The `testRegex` configuration is a regular expression that can be used to specify the naming of the files where your snapshot tests will be located. In this case, the files will have the name `*.snapshot.js`. That's how you can separate them clearly from the `*.spec.js` files for unit and integration tests. Identical to the Mocha test runner, Jest will run recursively through your *src/* folder and run all the snapshot tests identified with the regular expression.

The `rootDir` configuration is used to specify the root folder where Jest should start to run through all the folders recursively. Since the Jest configuration is located in the *test/* folder, you have to go one folder up the directory chain to be able to access the *src/* folder where your snapshot tests can be found.

Last but not least, you need to specify a new script in your *package.json* to run your snapshot tests on the command line:

{{< highlight javascript "hl_lines=5 6" >}}
"scripts": {
  "start": "webpack-dev-server --config ./webpack.config.js",
  "test:unit": "mocha --require babel-core/register --require ./test/helpers.js --require ./test/dom.js --require ignore-styles 'src/**/*.spec.js'",
  "test:unit:watch": "npm run test:unit -- --watch",
  "test:snapshot": "jest --config ./test/jest.config.json",
  "test:snapshot:watch": "npm run test:snapshot -- --watch"
},
{{< /highlight >}}

Now, you can run your snapshot tests by using `npm run test:snapshot`. It will tell Jest to run all your snapshot tests with the help of the Jest configuration file. The second script, `npm run test:snapshot:watch` can be used to run the snapshot tests in watch mode. It's identical to your Mocha test runner.

After all, you would have one open terminal tab for your Mocha test runner (unit & integration tests) in watch mode, one open terminal tab for your Jest snapshot tests in watch mode, and one open terminal tab to start your application with `npm start`. Every time you change a source file, your tests in both terminals should run again because of the watch mode. If you decide to not use Mocha and Chai, you can only have one testing script for your Jest tests which would include Sinon and Enzyme.

{{% chapter_header "React Testing with Jest: Snapshot Tests for Components" "react-jest-snapshot-tests" %}}

In this section, you will setup two snapshot tests for your two React components. First, create a file in the *src/* folder for your tests:

{{< highlight javascript >}}
cd src
touch App.snapshot.js
{{< /highlight >}}

Second, you can write the snapshot tests for the App and Counter components. Minimal snapshot tests always follow the same pattern.

{{< highlight javascript >}}
import React from 'react';
import renderer from 'react-test-renderer';

import App, { Counter } from './App';

describe('App Snapshot', () => {
  test('renders', () => {
    const component = renderer.create(
      <App />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Counter Snapshot', () => {
  test('renders', () => {
    const component = renderer.create(
      <Counter counter={1} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
{{< /highlight >}}

That's it. You can run your snapshot tests on the command line now. Hopefully they should be successful for you. Afterward, try to change the output in the `render()` method of the App component. For instance, add a `<h1>` tag with some string to it. Once you run your snapshot tests on the command line again, the test for the App component should fail. You can either accept or fix the snapshot now.

Even though that's the most minimal way to snapshot test your React components, Jest is way more powerful. As you can see, it comes with its own assertion functions (e.g. `toEqual()`). You should check its documentation to find out more about them. The library itself is very powerful. However, keep in mind that Jest was invented to keep your component tests lightweight after all. Snapshot tests shouldn't add too much development cost to your test suites.

{{% chapter_header "React End-to-end (E2E) Tests with Cypress.io" "react-e2e-tests-cypress" %}}

End-to-end testing (E2E) was always a tedious task with testing frameworks from the past. However, nowadays many people are using {{% a_blank "Cypress.io" "https://cypress.io" %}} for it. Their documentation has a high quality and their API is concise and clean. Let's use Cypress for this React testing tutorial. First, you have to install it on the command line to your dev dependencies:

{{< highlight javascript >}}
npm install --save-dev cypress
{{< /highlight >}}

Second, you can create a dedicated folder for Cypress and its E2E tests in your project folder. It comes with its given {{% a_blank "folder structure" "https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html" %}}.

{{< highlight javascript >}}
mkdir cypress
cd cypress
mkdir integration
cd integration
{{< /highlight >}}

Third, you can add a script for npm to your *package.json* file. That way, you are able to run Cypress easily from the command line.

{{< highlight javascript "hl_lines=7" >}}
"scripts": {
  "start": "webpack-dev-server --config ./webpack.config.js --mode development",
  "test:unit": "mocha --require babel-core/register --require ./test/helpers.js --require ./test/dom.js --require ignore-styles 'src/**/*.spec.js'",
  "test:unit:watch": "npm run test:unit -- --watch",
  "test:snapshot": "jest --config ./test/jest.config.json",
  "test:snapshot:watch": "npm run test:snapshot -- --watch",
  "test:cypress": "cypress open"
},
{{< /highlight >}}

When you run Cypress for the first time, you should get a similar output.

{{< highlight javascript >}}
npm run test:cypress
{{< /highlight >}}

It opens up a window which indicates that you don't have any tests yet: "No files found in".

{{% pin_it_image "react cypress e2e testing" "img/posts/react-testing-tutorial/react-cypress-no-tests-found.jpg" "is-src-set" %}}

Now, in your new Cypress **cypress/integration/** folder, create a end-to-end testing file for your App component.

{{< highlight javascript >}}
touch App.e2e.js
{{< /highlight >}}

Next, you can add your first test to it. It's not really an end-to-end test, but only the simplest assertion you can make to verify that Cypress is working for you.

{{< highlight javascript >}}
describe('App E2E', () => {
  it('should assert that true is equal to true', () => {
    expect(true).to.equal(true);
  });
});
{{< /highlight >}}

You might already know the “describe”- and “it”-blocks which enable you to encapsulate your tests in blocks. These blocks are coming from Mocha, which is used by Cypress, under the hood. The assertions such as `expect()` are used from Chai. “Cypress builds on these popular tools and frameworks that you hopefully already have some familiarity and knowledge of.”

Now you can run Cypress again on the command line:

{{< highlight javascript >}}
npm run test:cypress
{{< /highlight >}}

You should see the following output now. Cypress finds your test and you can either run the single test by clicking it or run all of your tests by using their dashboard.

{{% pin_it_image "react cypress end-to-end testing" "img/posts/react-testing-tutorial/react-cypress-testing.jpg" "is-src-set" %}}

Run your test and verify that true is equal to true. Hopefully it turns out to be green for you. Otherwise there is something wrong. In contrast, you can checkout a failing end-to-end test too.

{{< highlight javascript >}}
describe('App E2E', () => {
  it('should assert that true is equal to true', () => {
    expect(true).to.equal(false);
  });
});
{{< /highlight >}}

If you want, you can add the script slightly for Cypress to run every test by default without opening the additional window.

{{< highlight javascript "hl_lines=7" >}}
"scripts": {
  "start": "webpack-dev-server --config ./webpack.config.js --mode development",
  "test:unit": "mocha --require babel-core/register --require ./test/helpers.js --require ./test/dom.js --require ignore-styles 'src/**/*.spec.js'",
  "test:unit:watch": "npm run test:unit -- --watch",
  "test:snapshot": "jest --config ./test/jest.config.json",
  "test:snapshot:watch": "npm run test:snapshot -- --watch",
  "test:cypress": "cypress run"
},
{{< /highlight >}}

As you can see, when you run Cypress again on the command line, all your tests should run automatically. In addition, you can experience that there is some kind of video recording happening. The videos are stored in a folder for you to experience your tests first hand. You can also add screenshot testing to your Cypress end-to-end tests. Find out more about {{% a_blank "the video and screenshot capabilities of Cypress.io" "https://docs.cypress.io/guides/guides/screenshots-and-videos.html" %}}.

You can suppress the video recording in your Cypress configuration file in your project folder. It might be already generated by Cypress for you, otherwise create it on the command line from your root folder:

{{< highlight javascript >}}
touch cypress.json
{{< /highlight >}}

Now, in the Cypress configuration file, add the `videoRecording` flag and set it to false.

{{< highlight javascript >}}
{
  "videoRecording": false
}
{{< /highlight >}}

In case you want to find out more about the configuration capabilities of Cypress, {{% a_blank "checkout their documentation" "https://docs.cypress.io/guides/references/configuration.html" %}}.

Eventually you want to start to test your implemented React application with Cypress. Since Cypress is offering end-to-end testing, you have to start your application first before visiting the website with Cypress. You can use your local development server for this case.

But how to run your development server, in this case webpack-dev-server, before your Cypress script? There exists a {{% a_blank "neat library" "https://github.com/bahmutov/start-server-and-test" %}} which you can use to start your development server before Cypress. First, install it on the command line for your dev dependencies:

{{< highlight javascript >}}
npm install --save-dev start-server-and-test
{{< /highlight >}}

Second, add it to your *package.json* scripts. The library expects the following script pattern: <start script name> <url> <test script name>.

{{< highlight javascript "hl_lines=7 8" >}}
"scripts": {
  "start": "webpack-dev-server --config ./webpack.config.js --mode development",
  "test:unit": "mocha --require babel-core/register --require ./test/helpers.js --require ./test/dom.js --require ignore-styles 'src/**/*.spec.js'",
  "test:unit:watch": "npm run test:unit -- --watch",
  "test:snapshot": "jest --config ./test/jest.config.json",
  "test:snapshot:watch": "npm run test:snapshot -- --watch",
  "test:cypress": "start-server-and-test start http://localhost:8080 cypress",
  "cypress": "cypress run"
},
{{< /highlight >}}

Finally, you can visit your running application with Cypress in your end-to-end test. Therefore you will use the global `cy` cypress object. In addition, you can also add your first E2E test which verifies your header tag (h1) from your application.

{{< highlight javascript "hl_lines=2 3 4 5 6 7" >}}
describe('App E2E', () => {
  it('should have a header', () => {
    cy.visit('http://localhost:8080');

    cy.get('h1')
      .should('have.text', 'My Counter');
  });
});
{{< /highlight >}}

Basically, that's how a selector and assertion in Cypress work. Now you your test again on the command line. It should turn out to be successful.

A best practice in Cypress testing is adding the base URL to your **cypress.json** configuration file. It's not only to keep your code DRY, but has also performance impacts.

{{< highlight javascript >}}
{
  "videoRecording": false,
  "baseUrl": "http://localhost:8080"
}
{{< /highlight >}}

Afterward, you can remove the URL from your single E2E test. It always takes the given base URL now.

{{< highlight javascript "hl_lines=3" >}}
describe('App E2E', () => {
  it('should have a header', () => {
    cy.visit(‘/‘);

    cy.get('h1')
      .should('have.text', 'My Counter');
  });
});
{{< /highlight >}}

The second E2E test you are going to implement will test the two interactive buttons in your React application. After clicking each button, the counter integer which is shown in the paragraph tag should change. Let's begin by verifying that the counter is 0 when the application just started.

{{< highlight javascript "hl_lines=9 10 11 12 13 14" >}}
describe('App E2E', () => {
  it('should have a header', () => {
    cy.visit('/');

    cy.get('h1')
      .should('have.text', 'My Counter');
  });

  it('should increment and decrement the counter', () => {
    cy.visit('/');

    cy.get('p')
      .should('have.text', '0');
  });
});
{{< /highlight >}}

Now, by {{% a_blank "interacting with the buttons" "https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html" %}}, you can increment and decrement the counter.

{{< highlight javascript "hl_lines=15 16 17 18 19 20 21 22 23 24 25" >}}
describe('App E2E', () => {
  it('should have a header', () => {
    cy.visit('/');

    cy.get('h1')
      .should('have.text', 'My Counter');
  });

  it('should increment and decrement the counter', () => {
    cy.visit('/');

    cy.get('p')
      .should('have.text', '0');

    cy.contains('Increment').click();
    cy.get('p')
      .should('have.text', '1');

    cy.contains('Increment').click();
    cy.get('p')
      .should('have.text', '2');

    cy.contains('Decrement').click();
    cy.get('p')
      .should('have.text', '1');
  });
});
{{< /highlight >}}

That's it. You have written your first two E2E tests with Cypress. You can navigate from URL to URL, interact with HTML elements and verify rendered output. Two more things:

* If you need to provide sample data for your E2E tests, checkout the best practice of using fixtures in Cypress.
* If you need to spy, stub or mock functions in Cypress, you can use Sinon for it. Cypress comes with built-in Sinon to test your asynchronous code.

{{% chapter_header "React Component Tests and Continuous Integration" "react-component-tests-continuous-integration" %}}

React component tests are not any different from other tests when it comes to continuous integration. In the following, the article will demonstrate how to setup continuous integration with Travis CI. But feel free to choose your own favorite CI for it.

The continuous integration should make sure that the (React) application is tested with every build process in their CI environment. For instance, the build would fail if the tests are not running through successfully. That's how you can always see if your application is tested successfully before deploying it.

If you have no GitHub account and no setup for git yet, you should make sure to follow this guide [to setup GitHub and git on your machine](https://www.robinwieruch.de/git-essential-commands/). Afterward, can create a repository for this project on GitHub and commit and push all your changes to it.

Next, you should be set up to create an account for {{% a_blank "Travis CI" "https://travis-ci.org/" %}} by using your GitHub account. Once you have created it and see your dashboard on their platform, you can synchronize your GitHub repositories with it. Make sure to synchronize this project on your Travis CI dashboard by toggling it to make it accessible for your continuous integration.

{{% pin_it_image "react testing travis CI" "img/posts/react-testing-tutorial/travis-ci-toggle.jpg" "is-src-set" %}}

Now you should have synchronized Travis CI with your GitHub repository. The only thing left is telling Travis CI on how to install and run your application in their environment. On the command line, create a Travis configuration file in your project's root folder:

{{< highlight javascript >}}
touch .travis.yml
{{< /highlight >}}

Now enter the following configuration to it. The most important part are the scripts which should be executed to run your tests.

{{< highlight javascript >}}
language: node_js

node_js:
  - stable

install:
  - npm install

script:
  - npm run test:unit && npm run test:snapshot
{{< /highlight >}}

Push these changes again to your GitHub repository. On every push to your repository, Travis CI should be notified automatically and try to build your project again. On their dashboard, you should see the build process and the tests which either succeed or fail. They should turn out to be green hopefully.

You can add your end-to-end tests from Cypress.io to your CI too.

{{< highlight javascript "hl_lines=10" >}}
language: node_js

node_js:
  - stable

install:
  - npm install

script:
  - npm run test:unit && npm run test:snapshot && npm run test:cypress
{{< /highlight >}}

Last but not least, you can add a fancy badge to your GitHub repository. Open up your README.md file in your project. If you have no such file, create it on the command line in your project's root folder:

{{< highlight javascript >}}
touch README.md
{{< /highlight >}}

Now you can add markdown to describe your project. It's visible in your GitHub repository once you push it. That's up to you. Now, you can add the fancy badge for your passing or failing build process too. At your Travis CI dashboard for your project, you should find the grey and green colored "build passing" badge.

{{% pin_it_image "react testing continuous integration" "img/posts/react-testing-tutorial/travis-ci.jpg" "is-src-set" %}}

By clicking it, you should get the all the things you need for displaying it in your repository. You can choose the Markdown version and copy & paste it to your README.md:

{{< highlight javascript >}}
# My React Component Test Setup

[![Build Status](https://travis-ci.org/rwieruch/react-components-test-setup.svg?branch=master)](https://travis-ci.org/rwieruch/react-components-test-setup)
{{< /highlight >}}

This badge references my project. So make sure to reference your own project by exchanging the account/organization and the repository name. That's it. You have set up continuous integration for your project which informs you when your build fails. Furthermore, it shows a fancy badge in your repository to inform other people that your project builds successfully. It adds credibility to your project.

{{% chapter_header "React Component Test Coverage with Coveralls" "react-component-test-coverage-coveralls" %}}

Identical to the CI environment, Coveralls is not necessarily bound to React component tests. It can be used for any tests in your application. Coveralls is used to show you the test coverage of your application. Let's see how it can be used in this scenario to get the test coverage for our React application. First, sign up at {{% a_blank "Coveralls.io" "https://coveralls.io/" %}} with your GitHub account. Second, synchronize your GitHub repositories and toggle this repository again.

{{% pin_it_image "react testing coverage" "img/posts/react-testing-tutorial/react-coveralls-testing-coverage.jpg" "is-src-set" %}}

Afterward, hit the "Details" button to copy your repo_token to your clipboard. Since you don't want to add this private token directly to your public project, you can add it on your Travis CI dashboard to your repository's environment variables. You will find it via the settings option of your Travis repository.

{{% pin_it_image "react testing coveralls environment variables" "img/posts/react-testing-tutorial/react-travis-settings.jpg" "is-src-set" %}}

Then, you can create a new environment variable for your project. You can name it coveralls_repo_token.

{{% pin_it_image "react testing travis continuous integration" "img/posts/react-testing-tutorial/react-travis-environment-variables.jpg" "is-src-set" %}}

Last but not least, modify your project the following way. First, install the coveralls library on the command line to your dev dependencies:

{{< highlight javascript >}}
npm install --save-dev coveralls
{{< /highlight >}}

Second, add a new script to your *package.json* file to introduce coveralls:

{{< highlight javascript "hl_lines=7" >}}
"scripts": {
  "start": "webpack-dev-server --config ./webpack.config.js",
  "test:unit": "mocha --require babel-core/register --require ./test/helpers.js --require ./test/dom.js --require ignore-styles 'src/**/*.spec.js'",
  "test:unit:watch": "npm run test:unit -- --watch",
  "test:snapshot": "jest --config ./test/jest.config.json",
  "test:snapshot:watch": "npm run test:snapshot -- --watch",
  "coveralls": "cat ./coverage/lcov.info | node node_modules/.bin/coveralls"
},
{{< /highlight >}}

And third, extend your Travis CI configuration for reporting the coveralls information to your coveralls.io dashboard.

{{< highlight javascript "hl_lines=10 12 13" >}}
language: node_js

node_js:
  - stable

install:
  - npm install

script:
  - npm run test:unit -- --coverage && npm run test:snapshot -- --coverage && npm run test:cypress

after_script:
  - COVERALLS_REPO_TOKEN=$coveralls_repo_token npm run coveralls
{{< /highlight >}}

That's it. By adding, committing and pushing your changes to GitHub now, you can see how a report shows up on your coveralls.io dashboard.

{{% pin_it_image "react testing travis continuous integration" "img/posts/react-testing-tutorial/react-testing-coveralls-reporting.jpg" "is-src-set" %}}

You can see that the coverage isn't too high. It's up to you the add tests to increase the percentage for your project.

Last but not least, you can add the fancy Coveralls badge again to your README.md file. You find the badge on the coveralls.io dashboard for embedding it as markdown in your README.md.

{{< highlight javascript >}}
# My React Component Test Setup

[![Coverage Status](https://coveralls.io/repos/github/rwieruch/react-components-test-setup/badge.svg?branch=master)](https://coveralls.io/github/rwieruch/react-components-test-setup?branch=master)
{{< /highlight >}}

Make sure to change again the URL to the repository. That's it. I hope these last steps have helped you to setup Coveralls.io for your React testing environment. You should aim to get a higher test coverage in percentage than our project though :)

<hr class="section-divider">

That's it for this extensive React testing tutorial. I hope you learned lots from it by setting up your own React testing environment, writing your first React tests and by using continuous integration to verify your build before deploying your application to production. You can find the whole project in {{% a_blank "this GitHub repository" "https://github.com/rwieruch/react-components-test-setup" %}}. In addition, these simple test patterns should help you to make testing in React a habit rather than an annoyance. It shouldn't be too difficult to setup a couple of tests for your application now. If you have any other tips for testing React applications, feel free to add them to the comments below. Thanks for reading :)