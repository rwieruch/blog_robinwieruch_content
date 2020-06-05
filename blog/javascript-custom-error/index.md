---
title: "Custom Errors in JavaScript"
description: "Learn about custom errors in JavaScript, how to create a new custom error and how to extend errors from third party libraries and APIs ..."
date: "2020-05-22T07:50:46+02:00"
categories: ["JavaScript"]
keywords: ["javascript custom error"]
hashtags: ["#100DaysOfCode", "#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

There are two error handling scenarios in JavaScript. Either an error is thrown from a third-party (e.g. library, database, API) or you want to throw an error yourself. While you have the error at your hands for the former, for the latter you need to new it yourself:

```javascript
function throwAnError() {
  throw new Error('Something went wrong.');
}

try {
  throwAnError();
} catch (error) {
  console.log(error.message); // 'Something went wrong.'
  console.log(error.name); // Error
}
```

Sometimes you want to throw custom errors though. I learned that you can create custom errors the following way: If you have to new the error yourself, create a new custom error class for it which extends from the native JavaScript error. There you can set the error message which comes in as parameter, which simulates the native error class API, and you set a custom error name:

```javascript{1-7,10,17}
class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.name = 'BadRequestError';
  }
}

function throwAnError() {
  throw new BadRequestError('Something went wrong.');
}

try {
  throwAnError();
} catch (error) {
  console.log(error.message); // 'Something went wrong.'
  console.log(error.name); // BadRequestError
}
```

You can overload this new custom error with more properties. For instance, if the custom error must happen at a [REST API](https://www.robinwieruch.de/node-express-server-rest-api) level, I may want to give it a HTTP status code which I can return to my users:

```javascript{6,19}
class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

function throwAnError() {
  throw new BadRequestError('Something went wrong.');
}

try {
  throwAnError();
} catch (error) {
  console.log(error.message); // 'Something went wrong.'
  console.log(error.name); // BadRequestError
  console.log(error.statusCode); // 400
}
```

Now what happens if you don't want to create a new error but inherit from an error object which originates from a third party like a database or library? For example, the following database request throws an error:

```javascript
async function findUserById(id) {
  try {
    return await database.getUserById(id);
  } catch (error) {
    return error;
  }
};
```

This may be alright for most cases, but in certain scenarios, [like having this happen for a REST API](/node-express-error-handling), I may want to customize the error with an HTTP status code for my server middleware. Then again, I create a custom error class for it, extend from the native error, and pass in all the properties from the third party error plus my other information:

```javascript{1-8,14}
export class BadRequestError extends Error {
  constructor(error) {
    super(error.message);

    this.data = { error };
    this.statusCode = 400;
  }
}

async function findUserById(id) {
  try {
    return await database.getUserById(id);
  } catch (error) {
    return new BadRequestError(error);
  }
};
```

This is how I can extend from an error which is already coming from somewhere else. After all, the last examples have covered both cases: throwing a new custom error from scratch and customizing an error which comes from somewhere else.


