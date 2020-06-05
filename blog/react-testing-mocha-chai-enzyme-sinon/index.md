---
title: "How to test React with Mocha, Chai & Enzyme"
description: "Learn how to test your React application with Mocha, Chai & Enzyme. Mocha will be used as a test runner, Chai as testing library, and Enzyme for your actual React component tests ..."
date: "2019-07-21T13:56:46+02:00"
categories: ["React", "Tooling", "Webpack", "Babel", "Enzyme"]
keywords: ["react testing enzyme", "react mocha", "react chai", "react sinon", "react enzyme"]
hashtags: ["#100DaysOfCode", "#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

**Recommended alternative: Instead of Mocha/Chai, [using Jest as test runner and assertion library for unit, integration and snapshot tests](/react-testing-jest).**

Before setting up the test setup with different testing libraries and writing the React component tests, you will need a simple React application which can be tested in the first place. You will introduce a simple App component which can be tested in the following sections. If it's too difficult for you to follow the next parts of the React application, you should grab a copy of [The Road to learn React](/the-road-to-learn-react/) to learn about React itself before testing a React application.

Let's start in the *src/index.js* file. Here you can import the App component which is not implemented yet and render it.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

The App component is an JavaScript ES6 class component that has its own state. It's a Counter component where it should be possible to increment and decrement a digit by clicking on either of two buttons. The file for the App component should be located in *src/App.js*.

```javascript
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
```

So far, hopefully everything should be clear on how this component works. If it's not clear, make sure to grab the ebook/course "The Road to learn React" after reading this tutorial.

But that's not it for the use case application. Let's add a couple of more things for the sake of testing different parts of it in isolation later on. Since the `this.setState()` method is asynchronously executed, [it already uses a function instead of an object](/learn-react-before-using-redux/). That way, it can access the state when `this.setState()` is actually executed asynchronously. That's only one benefit of using the function over the object in `this.setState()`. In addition, it's also possible to extract it as standalone function which can be tested in isolation from the component later on.

```javascript{3,4,5,7,8,9,17,21}
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
```

In order to import these functions in the tests later on , they need to be exported from the file.

```javascript{3,7}
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
```

These functions which are used to update the local state of the React component can tested in isolation from the component now. That's what you would call a real unit test later on. The function is tested with an input and the test asserts an expected output. There are no side effects, because the function is pure.

In addition for our React application, let's introduce a second component to have a relationship between two components as parent and child components. That's another scenario which can be tested as integration test later on. If you would test each component in isolation, you would have unit tests. But by testing them together in their context, you have an integration test between both components.

```javascript{12,32,33}
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
```

As you can see, the component gets exported as well. This way, it can be imported in the test in a later section of this tutorial. Even though the Counter component is not used anywhere else in the whole application, it is okay to export components (and functions) from a file for the sake of testing them. That's it for the use case application which shall be tested in the following sections.

# Mocha with Chai Test Setup in React

This section will show you how to setup and perform React testing with Mocha, Chai and Enzyme. Let's implement a minimal React testing setup to make first assertions for the exported functions. First, there needs to be an entity which is responsible to run all of our tests in a certain framework. This entity will be [Mocha](https://github.com/mochajs/mocha) which is a popular test runner in React applications. In contrast, another popular test runner is Karma which is popular for testing Angular applications.

Let's install Mocha on the command line as development dependency.

```javascript
npm install --save-dev mocha
```

Second, there needs to be an entity which can be used to make assertions. Someone has to able to say: "Expect X to be equal to Y". This entity will be [Chai](https://github.com/chaijs/chai) in our testing setup. So let's install it on the command line as well.

```javascript
npm install --save-dev chai
```

Last but not least, React components need some kind of artificial browser environment, because they render HTML in the browser's DOM. Since the tests are not executed in a real browser, you need to setup the minimal environment for the component tests yourself. That's why you need to install [jsdom](https://github.com/jsdom/jsdom) on the command line as dev dependency as well. Jsdom makes sure that you can create this artificial browser environment in the next steps.

```javascript
npm install --save-dev jsdom
```

These three libraries are everything you need for a minimal test environment. You will use these to test a couple of things in the following. Later on, you will learn in the next sections about advanced libraries to enrich your React component testing tool set.

In the last step of this section, let's see how these three libraries are configured together in order to start testing your application. On the command line, create the necessary files as test configurations in a new test folder. In your project, create next to your *src/* folder a *test/* folder for all your test configuration.

```javascript
mkdir test
cd test
touch helpers.js dom.js
```

Both files will be filled with content now. Later on, they will be used as configuration to run the tests via a script on the command line. Let's go first with the *test/helpers.js* file:

```javascript
import { expect } from 'chai';

global.expect = expect;
```

The only thing we are doing in this file is importing the expect function from the chai assertion library. This function is used later on in your tests to assert: "Expect X to be equal to Y". Furthermore, the expect function is made globally accessible in all your test files by using this file. That's how you can make `expect()` the default function in your tests without importing the function in each file explicitly. It's always there in every of your test files, because you will need it anyway in every test. In the following sections, you will add more of these globally accessible test functions, because you most likely need them in every test anyways.

In the other file, the *test/dom.js* file, you will setup your pseudo browser environment for your React components which render HTML eventually. Open the *test/dom.js* file and add the following lines to it:

```javascript
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
```

This tutorial isn't going to explain the last code snippet in too much detail. Basically the code snippet helps us to mimic the browser for our React component tests. You can see that the jsdom library is used to create a `window` object which should be available in the browser, but also a couple of more objects (e.g. `document` object). Don't worry too much about this file, because most likely you will never have to touch it again.

Now you have both helper files for your tests in place. One to expose functions from your test libraries globally to all your test files, because they are needed anyway, and one to mimic the DOM for your React component tests. Last but not least, you need to define the `npm run test` script in your package.json. This script should execute all your test files, which have a specific suffix in their file name, and use the two previously defined files as configuration for the test environment. In your *package.json* add the following script:

```javascript{3}
"scripts": {
  "start": "webpack-dev-server --config ./webpack.config.js",
  "test:unit": "mocha --require @babel/register --require ./test/helpers.js --require ./test/dom.js 'src/**/*.spec.js'"
},
```

If you haven't installed @babel/register which is used in the npm script yet, you can do it with `npm install -save-dev @babel/register`.

As you can see, the script takes both configuration files as required test configuration and executes all test files which end with the suffix "*.spec.js". Basically a test file could be named *App.spec.js* and it has to be somewhere in the */src* folder. Of course, you can come up with your own rules for the test file naming here. It's up to you.

The script can be executed by running `npm run test:unit` on the command line now, but it will not find any tests yet, because you will have to define these tests in the first place. You will do it in the next section, but before doing so, you can add a second npm script. This script will execute the previously defined script, but this time in watch mode.

```javascript{4}
"scripts": {
  "start": "webpack-dev-server --config ./webpack.config.js",
  "test:unit": "mocha --require @babel/register --require ./test/helpers.js --require ./test/dom.js 'src/**/*.spec.js'",
  "test:unit:watch": "npm run test:unit -- --watch"
},
```

The watch mode means that your tests will run once, but every time again when you change your source code or tests. That's how you will get immediate feedback on the command line while developing your application, doing test driven development, implementing additional tests, or while you are changing tests.

Note: If you want to run your tests in watch mode with `npm run test:unit:watch` along with your development server with `npm start`, you need to open two terminal tabs to be able to execute both scripts side by side.

Last but not least, before diving into testing with Mocha and Chai, there is one neat little library which you may need later on. It's called [ignore-styles](https://github.com/bkonkle/ignore-styles). At some point, you may introduce styling for your React components. However, the styling shouldn't necessarily affect the tests and thus you may wanna just ignore them. That's where this little library comes into play. You can install it on the command line with `npm install --save-dev ignore-styles` and add it to your npm script:

```javascript{3}
"scripts": {
  "start": "webpack-dev-server --config ./webpack.config.js",
  "test:unit": "mocha --require @babel/register --require ./test/helpers.js --require ./test/dom.js --require ignore-styles 'src/**/*.spec.js'",
  "test:unit:watch": "npm run test:unit -- --watch"
},
```

That's it for the Mocha and Chai setup for a React application. In the next section, you will introduce your first unit tests with it.

# React Unit Tests

Let's start with the smallest building blocks in the testing pyramid: unit tests. They only test small parts of your application in isolation. For instance, functions are a perfect candidates for unit tests. They only take an input and return an output. That's what makes pure functions so powerful for testing too, because you never have to worry about any side-effects. The output should be always the same when the input stays the same. Thus a unit test could be used to test this particular function as a part of your application in isolation.

In the App component, you have already extracted the functions which update the state in `this.setState()`. These functions got exported too, so you can import them in a test file in order to test them. Let's create a test file for the App component on the command line from the *src/* folder, Make sure to give the file the correct naming suffix.

```javascript
touch App.spec.js
```

Now open up the file and add the following lines to it:

```javascript
describe('Local State', () => {
  it('should increment the counter in state', () => {

  });

  it('should decrement the counter in state', () => {

  });
});
```

Basically the previous lines have defined one test suite and two tests for it. Whereas the "describe"-block defines the test suite, the "it"-blocks define the test cases. A test can either be successful (green) or erroneous (red). Of course, you want to make and keep them green.

Now it's up to you to test both functions which update the React component state from your *src/App.js* file. Whereas one function increments the counter property in the object (state), the other function decrements the counter property.

The simplest procedure to write a test in a "it"-block in three steps is the following: arrange, act, assert.

```javascript{1,5,6,7,8,12,13,14,15}
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
```

In the first line of each test, you arrange the initial state object which will be the input of your function to be tested in the next step. In the second line of each test, you will pass the variable from the setup step to your function. The function returns a value. In the last line of the test, you want to assert that the returned value from the function is an expected value. In this case, the `doIncrement()` function should increment the counter property in the state object and the `doDecrement()` function should decrement it.

That's it. You can run both tests on the command line with `npm run test:unit` or `npm run test:unit:watch`. You can change the assertion and see how the tests behave in watch mode. They will either fail or succeed. Furthermore, note that there is no React dependency yet in the test file. It's only Mocha and Chai which are able to test your vanilla JavaScript functions. You wouldn't even need the *test/dom.js* configuration yet, because there is no DOM of the browser needed for these unit tests.

# Enzyme Test Setup in React

The following section will show you how to setup and perform React testing with Enzyme which makes it effortless to test React components with unit and integration tests. It is a library by Airbnb which was introduced for component tests in React. Let's go through the setup of Enzyme in React. First, you have to install it on the command line as dev dependency:

```javascript
npm install --save-dev enzyme
```

Enzyme introduced adapters to play well with React. That's why you have to install such an adapter for your test setup too. The version of it depends on your React version:

```javascript
npm install --save-dev enzyme-adapter-react-16
```

In this React testing guide, we are using React 16. That's why the Enzyme adapter for React 16 gets installed here. So make sure to check your own React version in your application.

Last but not least, you can setup Enzyme in your *test/helpers.js* file. There you can configure the adapter and expose the enzyme functionalities globally next to the expect function:

```javascript{2,3,5,9,10,11}
import { expect } from 'chai';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.expect = expect;

global.mount = mount;
global.render = render;
global.shallow = shallow;
```

Similar to the `expect` function from chai which is used to make assertions, you can make `shallow`, `render` and `mount` from Enzyme globally accessible. That way, you don't need to import it explicitly in your test files anymore. You will use these three functions for your unit and integration tests with Enzyme for your React components.

# React Testing with Enzyme: Unit and Integrations Tests for React Components

The Enzyme setup is up and running. Now you can start to test your component(s). The following section should show you a couple of basic patterns which you can apply in your React component tests. If you follow these patterns, you don't have to make a costly mental decision every time on how to test your React components.

You have already exported the Counter component from the *src/App.js* file. So it should be possible to test for you that an instance of the Counter component is rendered when you render the App component. You can simply add your tests in the *src/App.spec.js* file.

```javascript{1,2,8,9,10,11,12,13}
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
```

The `shallow()` function is one of the three functions (shallow, mount, render) which you have made accessible globally in the *test/helpers.js* file. Shallow is the simplest form of rendering a component with Enzyme. It only renders the component but not the content of components which are children to this component. It makes it possible to test the component in isolation. Thus it can be used perfectly for unit tests of React components. In the previous test, you only checked whether the Counter component is rendered as component instance in the App component. Accordingly to the test, there should be only one Counter component.

That's one simple unit test you can do with Enzyme in React. For instance, you can also check whether specific HTML tags or HTMLS elements with CSS classes are rendered.

```javascript
it('renders the List wrapper with list elements', () => {
  const wrapper = shallow(<List items={['a', 'b']} />);
  expect(wrapper.find('li')).to.have.length(2);
  expect(wrapper.find('.list')).to.have.length(1);
});
```

Depending on the passed props, you can check the rendered HTML elements by selecting them with [Enzyme's selectors](https://github.com/airbnb/enzyme/blob/master/docs/api/selector.md). This way, you can also check a [conditional rendering in React](/conditional-rendering-react/) by asserting the length of a selection to be either 0 or 1.

Shallow rendering tests with Enzyme can also be used for lightweight integration tests. For instance, whereas the last test checked only the rendered HTML tags, the next test asserts whether the correct props are passed to the next component.

```javascript{9,10,11,12,13,14,15,16,17,18,19}
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
```

The line between a unit test and a integration test can be blurry. But in this case, you could say it's a lightweight integration test because it tests whether two components play together as expected. The last test has shown you how to access and verify props which are passed from component to component and how to manipulate the local state of a component for the purpose of your test. That way, you can also test your React component state when the local state changes. For instance, imagine a toggle for a conditional rendering again which is stored as local state in your component. You can manipulate the state and verify whether the correct HTML elements are rendered or not rendered.

You have seen how to test the rendered output, how to access props and how to manipulate the local state of a component. Next, you can also simulate clicks with Enzyme. Your App component has two buttons which are perfectly suited to test the click behavior. Whereas one button should increment the counter in the local state of the React component, the other button should decrement the counter. Let's see how you can simulate these events in interactive HTML elements such as buttons with a `onClick` handler.

```javascript{21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37}
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
```

Since there are two buttons, you can use the `at()` helper function to access the desired element in the list of elements with an index. But be careful when the order of the elements changes. In a best case test scenario, I would recommend to use more specific Enzyme selectors to address each element individually. Otherwise your tests are likely to break when the order of your elements, in this case the order of the button elements, changes.

The last test cases were simple ways for testing your React state. They can be seen as test pattern, because you can easily repeat them for other components too. It shouldn't take you much time to verify that crucial HTML elements or React components are rendered, the correct props are passed and the local state is manipulated in an expected way.

You have only used the `shallow()` function from Enzyme for your unit tests and lightweight integration tests so far. You may wonder when you should use the `mount()` and `render()` functions from Enzyme.

While `shallow()` only renders the component without the content of child components, `mount()` renders all child components as well. It renders the whole component hierarchy. While the former is used for component tests in isolation (unit tests, lightweight integration), the latter is used for real integration tests. Integration tests are more likely to break, because they include all the children and logic of your component tree. Thus the maintenance costs are higher for integration tests. People are saying it's more expensive to write and maintain those tests than unit tests. Last but not least, the third function to render your React components with Enzyme is called `render()`. It is similar to `mount()`, because it renders all child components. But from a performance point of view, it is less expensive than `mount()`, because it doesn't run the lifecycle methods of your component. So if you need access to child components but are not interested in lifecycle methods, you can use `render()` instead of `mount()`.

**There are two major philosophies on how many unit and integration tests you should have for your components in your application.** The common testing pyramid says that you should have lots of unit tests and several integration tests (and only a few end-to-end tests). Basically, you should have a lot of small maintainable unit tests, but a few vital integration tests. It's the common approach for testing in software engineering. However, for component tests (like in React) there exists the philosophy to have many integration tests but only a few unit tests. Unit tests are not very likely to break because they isolate the component too much from the rest of the application. They mock the context perfectly away. That's why people argue against it, because the component is too isolated. In conclusion, you would be more likely to test a component for its robustness by using integration tests to test them in their context of other components.

What does it mean for the implementation of your tests? If you would want to use more integration tests than unit tests, you would go for `mount()` or `render()` instead of `shallow()` in your component tests. That way you render, test and verify the existence and behavior of the whole component tree. Moreover, you would be able to write more complex tests because you have access to all child components. The test cases won't differ too much from the previously implemented test cases. You would still verify passed props, rendered elements, simulated clicks and state changes of your local React state.

# Sinon Test Setup in React

What about async tests in a React application? So far everything you have tested was synchronous. If you check again your App component, there is no need to test something that is executed asynchronously. Let's introduce a artificial scenario in your App component where some made up data is fetched in the `componentDidMount()` lifecycle method.

Often it happens that a component requests data from a [third-party API](/what-is-an-api-javascript/) in the `componentDidMount()` lifecycle method. Because of it, it should be possible to test this asynchronous part in a React component as well. Let's pretend there is a pseudo API endpoint that returns an array of counters from an API. Of course, it will not work in your running application, because the API endpoint doesn't exist, but it should be there for the purpose of testing it. Afterward, you should be able to test your own third-party requests that happen in the `componentDidMount()` lifecycle method.

In the following scenario, you will use axios to make the request to the third-party API. Therefore, you have to install the axios package with npm on the command line.

```javascript
npm install --save axios
```

Afterward, you can make the request to a pseudo API endpoint. It's up to you to use a real API endpoint for this scenario. If you are not familiar on how to make request to third-party APIs in React components, checkout [this guide on data fetching in React](/react-fetching-data/).

```javascript{2,12,19,20,21,22,23}
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
```

For the purpose of testing this scenario, there is no need to display the `asyncCounters` from the local state in the `render()` method. Because the endpoint will only return fake data in the test later on. In addition, the scenario only covers the happy path when the request is successful.

Now, how would you test the asynchronous data fetching in your React component? You can install a neat library called [Sinon](https://github.com/sinonjs/sinon) for it as dev dependency on the command line:

```javascript
npm install --save-dev sinon
```

Afterward, you can add Sinon as another global function to your *test/helpers.js* file:

```javascript{1,10}
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
```

Sinon can be used for spies, stubs, and mocks. In the following, you will use a spy and a stub for testing your asynchronous business logic in your React component. These are most of the time sufficient for testing async logic in your code.

# React Testing with Sinon: Testing Asynchronous Logic

Let's add a first [spy](http://sinonjs.org/releases/v4.4.6/spies/) just for the sake of demonstrating it. A spy can be used on any function for assertions. After a spy is applied to it, you can assert for example how many times the function was called for the test.

```javascript{4,5,6,7,8,9}
...

describe('App Component', () => {
  it('calls componentDidMount', () => {
    sinon.spy(App.prototype, 'componentDidMount');

    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});
```

In the test, you expected the `componentDidMount()` lifecycle method, which is available via the prototype chain on the App component, to be called only once. If you know the lifecycle methods of React components, it should be clear that this method is only called once when the component mounts. Afterward, it's not called again. Thus the test should succeed. That's essentially how you would test React lifecycle methods.

The test itself is not important and can be removed again. It should only demonstrate the spying capabilities of Sinon. After all, it wouldn't make any sense to test the lifecycle methods of a React component. That should be tested by React internally. Instead, let's see how the asynchronous data fetching in React can be tested with Sinon.

Since every test of the App component is affected by this newly executed data fetching in `componentDidMount()`, you can make sure to return valid data for it for every test by using the `before()` and `after()` setup functionalities of Mocha.

```javascript{4,5,6,8,9,10}
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
```

Now you can import axios to your testing suite, because you will need to apply a [stub](http://sinonjs.org/releases/v4.4.6/stubs/) to it for mocking the returned data from the third-party API request.

```javascript{2,8,9,12,16}
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
```

So what's a stub? The Sinon documentation says: "Test stubs are functions (spies) with pre-programmed behavior." That way, you have full control over your spies. For instance, you can say what a function (e.g. `get()`) should return. You can narrow it down by providing a specific set of arguments too. In our case, we return a promise which resolves in an array of integers (counters) eventually.

The `before()` and `after()` functions happen before and after the `describe()` test suites. Thus, every test should be aware of the returned promise in `componentDidMount()` now. By doing it this way, no test will complain about the data fetching. The request will just go through successfully when the component is mounted for the test.

After the tests ran through, the `restore()` method on the stub in the "after"-block makes sure to restore the native behavior of the `get()` method which was stubbed before. This way, you don't run into any surprises for your other tests because there is a stub somewhere hanging around in your test suites.

Now, let's test the asynchronous behavior in `componentDidMount()`. The test should assert that the returned array is stored in the local state of the React component as `asyncCounters`.

```javascript{17,18,19,20,21,22,23,24,25}
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
```

When you render the App component for the first time, the `asyncCounters` in your local state should be `null`. But when the promise resolves eventually, the state should be equal to the specified result of the promise. Now you can run your tests again and verify that it goes through successfully. Congratulations, you tested asynchronous behavior in your React component. Keep in mind that Sinon itself is not strictly bound to React (same as Mocha and Chai). You only use it to spy functions, to apply stubs on them or to create more sophisticated mocks.

<ReadMore label="How to test React components with Jest" link="/react-testing-jest" />

<ReadMore label="How to end-to-end test React components with Cypress" link="/react-testing-cypress" />
