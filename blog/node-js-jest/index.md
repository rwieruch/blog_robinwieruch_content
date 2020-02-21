---
title: "Node.js Testing with Jest"
description: "How to get started with testing in Node.js with Jest. This setup tutorial shows you how to use Jest as test runner and assertion library for Node.js projects ..."
date: "2020-02-20T03:56:46+02:00"
categories: ["Node"]
keywords: ["node jest", "node js jest", "node js testing", "node testing", "node js test", "node test"]
hashtags: ["#NodeJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in this series." links={[{ prefix: "Part 1:", label: "The minimal Node.js with Babel Setup", url: "/minimal-node-js-babel-setup/" }]} />

This tutorial demonstrates how to setup testing with Jest in Node.js. Whereas the previous tutorial has already shown you how to setup your Node.js application, this tutorial sets up a testing environment for your Node.js project. Let's dive into it by setting up Jest as testing framework.

# Node.js with Jest Setup

In order to get our tests up and running, set up [Jest](https://jestjs.io/) by installing it on the command line as development dependencies:

```javascript
npm install --save-dev jest
```

In your *package.json* file, create a new npm script which runs Jest:

```javascript{5}
{
  ...
  "scripts": {
    "start": "nodemon --exec babel-node src/index.js",
    "test": "jest"
  },
  ...
}
```

In addition, we want to have more configuration in our tests written with Jest. Hence, pass an additional Jest configuration file to your Jest script:

```javascript{5}
{
  ...
  "scripts": {
    "start": "nodemon --exec babel-node src/index.js",
    "test": "jest --config ./jest.config.json"
  },
  ...
}
```

Next, we can define this optional configuration for Jest in a configuration file. Create it on the command line:

```javascript
touch jest.config.json
```

In this Jest configuration file, add the following test pattern matching to run all the test files which shall be executed by Jest:

```javascript
{
  "testRegex": "((\\.|/*.)(spec))\\.js?$"
}
```

The `testRegex` configuration is a regular expression that can be used to specify the naming of the files where your Jest tests will be located. In this case, the files will have the name `*spec.js`. That's how you can separate them clearly from other files in your *src/* folder. Finally, add a test file next to your source code file in a new `src/spec.js` file. First, create the test file on the command line:

```javascript
touch src/spec.js
```

And second, implement your first test case in a test suite in this new file:

```javascript
describe('My Test Suite', () => {
  it('My Test Case', () => {
    expect(true).toEqual(true);
  });
});
```

Now you should be able to run `npm test` to execute your test suites with your test cases. The test should be green (valid, successful) for your previous test case, but if you change the test to something else, let's say `expect(true).toEqual(false);`, it should be red (invalid, failed). Congratulations, you have run your first test with Jest!

Last but not least, add another npm script for watching your Jest tests. By using this command, you can have your tests running continuously in one command line tab, while you start your application in another command line tab. Every time you change source code while developing your application, your tests will run again with this watch script.

```javascript{6}
{
  ...
  "scripts": {
    "start": "nodemon --exec babel-node src/index.js",
    "test": "jest --config ./jest.config.json",
    "test:watch": "npm run test -- --watch"
  },
  ...
}
```

Now you can run your Jest tests in watch mode. Doing it this way, you would have one open terminal tab for your Jest tests in watch mode with `npm run test:watch` and one open terminal tab to start your Node application with `npm start`. Every time you change a source file, your tests should run again because of the watch mode.

### Exercises:

* Read more about [getting started with Jest](https://jestjs.io/docs/en/getting-started)
* Read more about [Jest's Globals](https://jestjs.io/docs/en/api)
* Read more about [Jest's Assertions](https://jestjs.io/docs/en/expect)

# Node.js with Jest Testing

So far, we didn't test any implementation logic yet. Our previous test was standalone without any external dependencies of business logic from our application. However, in a real application you would want to test logic of your actual Node.js application. Let's say we have a function which sums up two integers in a *src/sum.js* file which needs to be tested:

```javascript
function sum(a, b) {
  return a + b;
}

export default sum;
```

The utility function gets exported, because it is used in other parts of our application. However, even though if it would be only used in this one file without an export statement, you can still export it for the sake of testing. Now, in our *src/spec.js* -- or maybe more specific *src/sum.spec.js* test file --, we could import the function and test it:

```javascript
import sum from './sum.js';

describe('sum function', () => {
  it('sums up two integers', () => {
    expect(sum(1, 2)).toEqual(3);
  });
});
```

Congratulations, you have set up your first unit test in Node.js. When you run your tests again with `npm test`, you should see a successful test on the command line. If the test turns red because it failed, you need to check whether your business logic (or test) is set up correctly.

# Node.js with asynchronous Jest Testing

Testing JavaScript primitives, complex objects and arrays with Jest is a great start. Eventually you will run also in the case of testing functions to be called. Therefore you need a utility to spy, stub, or mock functions. Jest has powerful utilities that help you with it. Let's first dive into the use case which we want to test and then how to test it with Jest. In a new *src/call-my-function.js* file implement the following function:

```javascript
function callMyFunction(callback) {
  callback();
}

export default callMyFunction;
```

The function only takes another function as argument -- it is a higher-order function -- and simply calls this function. Let's use it in our *src/index.js* file:

```javascript{2,6,7,8}
import sum from './sum.js';
import callMyFunction from './call-my-function.js';

console.log(sum(1, 2));

callMyFunction(function() {
  console.log('Hello world');
});
```

How would we test this function to be called within the other function? In a new *src/call-my-function.spec.js* file, let's write our test for this new higher-order function:

```javascript
import callMyFunction from './call-my-function.js';

describe('callMyFunction function', () => {
  it('calls the passed function', () => {
    callMyFunction(callback);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
```

Now we can test it with a Jest function which is used instead of the empty function:

```javascript{5}
import callMyFunction from './call-my-function.js';

describe('callMyFunction function', () => {
  it('calls the passed function', () => {
    const callback = jest.fn();

    callMyFunction(callback);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
```

That's it. The test should be successful, because the function within our function to be tested is called.

<Divider />

Jest is a powerful way for having access to test runner and assertion library for Node.js applications. You can find a ready to go setup Node.js application in this [GitHub repository](https://github.com/rwieruch/node-js-jest).
