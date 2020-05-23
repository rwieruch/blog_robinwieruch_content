---
title: "Async/Await without Try/Catch Block in JavaScript"
description: "Learn how to use async await without a try catch block in JavaScript ..."
date: "2020-05-22T07:50:46+02:00"
categories: ["JavaScript"]
keywords: ["async await without try catch"]
hashtags: ["#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

When you have learned about JavaScript promises for the first time, you learned about the promise's method then and catch. While the former's callback function is called whenver a JavaScript promise resolves successfully, the latter is used for error handling:

```javascript
function findUserById(id) {
  return database.getUserById(id)
    .then(user => { /* do something with user */ })
    .catch(error => { /* do something with error */ });
}
```

Eventually you have learned about async/await in JavaScript as alternative to a JavaScript promise's then and catch methods:

```javascript{1-2}
async function findUserById(id) {
  const user = await database.getUserById(id);

  // do something with user

  return user;
}
```

The shift from then/catch to async/await was a pretty powerful one, because suddenly you would be able to read your code in a synchronous way again. Every line happening after the await statement has to wait until the promise resolves. In addition, writing code like this felt way more concise. But then there was the error handling for async/await with a try/catch block:

```javascript{2,4,7-9}
async function findUserById(id) {
  let user;

  try {
    user = await database.getUserById(id);
    // do something with user
  } catch (error) {
    // do something with error
  }

  return user;
}
```

This broke all the concisness from async/await again, because instead of having asynchronous callbacks in then/catch blocks, we ended up with a try/catch block surrounding everything. So what if you could get the best out of both worlds?

```javascript{3-5}
async function findUserById(id) {
  const user = await database.getUserById(id)
    .catch(error => {
      // do something with error
    });

  return user;
}
```

This works, the only flaw here is that in a case of an error all the code after the await statement will still execute. We would have to guard it with a condition, but only if you would need to avoid this behavior:

```javascript{5,8-12}
async function findUserById(id) {
  const user = await database.getUserById(id)
    .catch(error => {
      // do something with error
      return;
    });

  if (!user) {
    // do something if there is no user
    // and return in this if block
    // or use if/else instead for returning the user in else
  }

  return user;
}
```

We could also return the error and do the error handling in the if block:

```javascript{2-3,5-9}
async function findUserById(id) {
  const maybeUser = await database.getUserById(id)
    .catch(error => error);

  if (maybeUser instanceof Error) {
    // do something with error
  } else {
    return maybeUser;
  }
}
```

Now you ended up without a bulky try/catch block but a guarding if clause in case an error (or nothing) is returned from your JavaScript promise. Whether this makes things cleaner than using a try/catch block is up to you. Maybe it is for certain scenarios, however, I have learned that going with the standard implementation of try/catch is preferred when working with other developers on one code base to establish a common sense.