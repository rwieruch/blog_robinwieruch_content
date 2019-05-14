+++
title = "Node Testing Setup with Mocha, Chai, Sinon"
description = "How to get started with testing in Node.js with Mocha, Chai, Sinon. This setup tutorial shows you how to use Mocha as test runner and Chai as assertion library for Node.js projects ..."
date = "2019-05-05T07:52:46+02:00"
tags = ["Node", "JavaScript"]
categories = ["Node", "JavaScript"]
keywords = ["node js testing", "node testing", "node js test", "node test", "node mocha", "node chai", "node mocha chai", "node sinon"]
news_keywords = ["node js testing", "node testing", "node js test", "node test", "node mocha", "node chai", "node mocha chai", "node sinon"]
hashtag = "#ReactJs"
card = "img/posts/node-js-testing-mocha-chai/banner_640.jpg"
banner = "img/posts/node-js-testing-mocha-chai/banner.jpg"
contribute = "node-js-testing-mocha-chai.md"
headline = "Node Testing Setup with Mocha, Chai, Sinon"

summary = "How to get started with testing in Node.js with Mocha, Chai, Sinon. This setup tutorial shows you how to use Mocha as test runner and Chai as assertion library for Node.js projects."
+++

{{% sponsorship %}}

{{% pin_it_image "node testing" "img/posts/node-js-testing-mocha-chai/banner.jpg" "is-src-set" %}}

{{% read_before "This tutorial is part 2 of 2 in this series." "Part 1:" "The minimal Node.js with Babel Setup" "https://www.robinwieruch.de/minimal-node-js-babel-setup/" %}}

This tutorial demonstrates how to setup testing with Mocha, Chai, and Sinon in Node.js. Whereas the previous tutorial has already shown you how to setup your Node.js application, this tutorial sets up a testing environment for your Node.js project. Let's dive into it by setting up Mocha with Chai and Sinon as testing framework.

{{% chapter_header "Node.js with Mocha" "node-js-mocha" %}}

{{% a_blank "Mocha" "https://mochajs.org/" %}} will be our test runner which is responsible for encapsulating our tests in test suites (describe-block) and test cases (it-block). Furthermore test runners like Mocha offer an [API](https://www.robinwieruch.de/what-is-an-api-javascript/) to run all tests from a command line interface. Let's dive into it: First, install an additional Babel package for your Node.js application which makes our tests understand Babel enabled JavaScript code:

{{< highlight javascript >}}
npm install @babel/register --save-dev
{{< /highlight >}}

Second, install our test runner Mocha as node package:

{{< highlight javascript >}}
npm install mocha --save-dev
{{< /highlight >}}

And third, in your *package.json* include a test script which uses Mocha to execute our tests and the new Babel package to run all executed test files through Babel enabled JavaScript code:

{{< highlight javascript "hl_lines=6" >}}
{
  ...
  "main": "index.js",
  "scripts": {
    "start": "nodemon --exec babel-node src/index.js",
    "test": "mocha --require @babel/register 'src/**/**spec.js'"
  },
  "keywords": [],
  ...
}
{{< /highlight >}}

The last configuration tells Mocha which files should be identified as test files via a file name pattern matching mechanism. Since we used `**` in between, Mocha will run recursively through the *src/* folder to find all files in your application. In this case, all files with the ending *spec.js* are identified as test files. It's up to you to choose a different name matching (e.g. *test.js*) for your test files.

{{% chapter_header "Node.js with Chai" "node-js-chai" %}}

{{% a_blank "Chai" "https://www.chaijs.com" %}} will be our assertion library to run equality checks or other test related scenarios. It enables you to compare expected results against actual results (e.g. expect X to be true). First, let's install it on the command line as dependency for our project:

{{< highlight javascript >}}
npm install chai --save-dev
{{< /highlight >}}

Next, let's define our first test suite and test case in a *src/spec.js* file:

{{< highlight javascript >}}
describe('test suite', () => {
  it('test case', () => {
    ...
  });
});
{{< /highlight >}}

So far, there is nothing related to Chai yet. The describe-blocks and it-blocks are provided from our test runner Mocha. You can have multiple test cases in a test suite and a test file can contain multiple test suites as well. Often one test suite tests one function's different outcomes with multiple test cases. When we run our test runner, all test cases will be checked for their assertion(s).

{{< highlight javascript >}}
import { expect } from 'chai';

describe('true or false', () => {
  it('true is true', () => {
    expect(true).to.eql(true);
  });

  it('false is false', () => {
    expect(false).to.eql(false);
  });
});
{{< /highlight >}}

These test cases don't test any specific logic from our application, but only demonstrate how an equality check is performed with booleans. You can run both tests from the command line with *npm test*, because we have defined this command as npm script in our *package.json* file.

{{% chapter_header "Node.js Testing" "node-js-testing" %}}

So far, we didn't test any implementation logic yet. Our previous test was standalone without any external dependencies of business logic from our application. However, in a real application you would want to test logic of your actual Node.js application. Let's say we have a function which sums up two integers in a *src/sum.js* file which needs to be tested:

{{< highlight javascript >}}
function sum(a, b) {
  return a + b;
}

export default sum;
{{< /highlight >}}

The utility function gets exported, because it is used in other parts of our application. However, even though if it would be only used in this one file without an export statement, you can still export it for the sake of testing. Now, in our *src/spec.js* -- or maybe more specific *src/sum.spec.js* test file --, we could import the function and test it:

{{< highlight javascript >}}
import { expect } from 'chai';

import sum from './sum.js';

describe('sum function', () => {
  it('sums up two integers', () => {
    expect(sum(1, 2)).to.eql(3);
  });
});
{{< /highlight >}}

Congratulations, you have set up your first unit test in Node.js. When you run your tests again with `npm test`, you should see a successful test on the command line. If the test turns red because it failed, you need to check whether your business logic (or test) is set up correctly.

{{% chapter_header "Node.js with Sinon" "node-js-sinon" %}}

Testing JavaScript primitives, complex objects and arrays with Chai in Mocha is a great start.  Eventually you will run also in the case of testing functions to be called. Therefore you need a utility to spy, stub, or mock functions. Sinon is a powerful library that helps you with it. Let's first dive into the use case which we want to test and then how to test it with Sinon in Mocha and Chai. In a new *src/callMyFunction.js* file implement the following function:

{{< highlight javascript >}}
function callMyFunction(callback) {
  callback();
}

export default callMyFunction;
{{< /highlight >}}

The function only takes another function as argument -- it is a higher-order function -- and simply calls this function. Let's use it in our *src/index.js* file:

{{< highlight javascript "hl_lines=2 6 7 8" >}}
import sum from './sum.js';
import callMyFunction from './callMyFunction.js';

console.log(sum(1, 2));

callMyFunction(function() {
  console.log('Hello world');
});
{{< /highlight >}}

How would we test this function to be called within the other function? Let's install Sinon on the command line as node package for our application and see how we can test it:

{{< highlight javascript >}}
npm install sinon --save-dev
{{< /highlight >}}

In a new *src/callMyFunction.spec.js* file, let's write our test for this new higher-order function:

{{< highlight javascript >}}
import { expect } from 'chai';

import callMyFunction from './callMyFunction.js';

describe('callMyFunction function', () => {
  it('calls the passed function', () => {
    callMyFunction(callback);

    expect(callback ???).to.eql(true);
  });
});
{{< /highlight >}}

Now we can test it with a Sinon spy which is used instead of the empty function:

{{< highlight javascript "hl_lines=2 8 12" >}}
import { expect } from 'chai';
import { spy } from 'sinon';

import callMyFunction from './callMyFunction.js';

describe('callMyFunction function', () => {
  it('calls the passed function', () => {
    const callback = spy();

    callMyFunction(callback);

    expect(callback.called).to.eql(true);
  });
});
{{< /highlight >}}

That's it. The test should be successful, because the function within our function to be tested is called. The Sinon spy switches the internal boolean flag for `called` from false to true after it has been called. You can find out more about Spies, Mocks, and Stubs from {{% a_blank "Sinon's documentation" "https://sinonjs.org/" %}}.

<hr class="section-divider">

Mocha and Chai are a popular combination of test runner and assertion library for Node.js applications. Sinon comes in as bonus if you need to make assertions on functions. You can find a ready to go setup Node.js application in this {{% a_blank "GitHub repository" "https://github.com/rwieruch/node-testing-mocha-chai" %}}. If you want to dive deeper into testing, you may want to check out this {{% a_blank "GitHub repository" "https://github.com/rwieruch/javascript-reducer" %}} with a few tests where we are testing [reducer functions](https://www.robinwieruch.de/javascript-reducer). The concept of reducers is a popular pattern in JavaScript which is a great candidate for unit testing.