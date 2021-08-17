---
title: "Callback Functions in JavaScript"
description: "Learn about callback functions in JavaScript, how to use callback functions and how to create a callback functions yourself ..."
date: "2020-05-22T12:50:46+02:00"
categories: ["JavaScript"]
keywords: ["javascript custom error"]
hashtags: ["#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Functions are first-class citizens in JavaScript. That's why you will early on hear about callback functions in JavaScript, which are a super powerful asset when writing JavaScript code. Here I want to give you a brief introduction to them.

Callback functions are usually passed as argument to functions:

```javascript
function printText(text, fn) {
  ...
}

printText('do something', function printSomethingElse() {
  console.log('do something afterward');
});
```

In this case, our `printText` function takes two arguments: a text and a callback function. The callback function is passed as an inlined function to `printText`. You could extract it as a function declaration before passing it to `printText` as well:

```javascript{5-7,9}
function printText(text, fn) {
  ...
}

function printSomethingElse() {
  console.log('do something afterward');
}

printText('do something', printSomethingElse);
```

Both ways work. Now, regardless of the text we are passing to the `printText` function, we want to execute the callback function eventually somewhere within our `printText` function, because otherwise we wouldn't pass it in there:

```javascript{2,4}
function printText(text, fn) {
  console.log(text);

  fn();
}

function printSomethingElse() {
  console.log('do something afterward');
}

printText('do something', printSomethingElse);
```

This could be one way of implementing the `printText` function which receives our callback function. In this scenario, it will print first *"do something"* and then *"do something afterward"*. How you implement all these functions is totally up to you. It's more about the function being passed as argument to the `printText` function and which is used within this function to be called at some point.

**Essentially a callback function is used in another function to be executed eventually. This other function decides when to execute the function and which arguments it passes to the function.**

For example, let's create a generic filter function which filters a JavaScript array based on a callback function:

```javascript
function filter(list, filterFn) {
  let newList = [];

  for (let i = 0; i < list.length; i++) {
    const item = list[i];

    if (filterFn(item)) {
      newList.push(item);
    }
  }

  return newList;
}
```

The function receives an array as first argument and a callback function as second argument. While the function itself iterates over the array, it pulls out every item of the array and passed it to the callback function. If the callback function returns true, the item is added to the filtered list. If the callback function returns false, it isn't added to the filtered list.

The crucial point here is that the filter function doesn't know anything about the condition that is used to add items to the list. It just knows that it filters an array based on some condition that comes from the outside (callback function). Now, we could use this generic filter function the following way:

```javascript
const result = filter([3, 6, 1], function greaterThanFive(item) {
  return item > 5;
});

console.log(result);
// [6]
```

As mentioned before, you can either inline the callback function as argument or declare it outside:

```javascript
function greaterThanFive(item) {
  return item > 5;
}

const result = filter([3, 6, 1], greaterThanFive);

console.log(result);
// [6]
```

The important fact is that we as a developer who uses the filter function decide which filter condition should apply here. From here, it's not far away to use JavaScript's built-in filter that's available on JavaScript arrays:

```javascript
const result = [3, 6, 1].filter(function greaterThanFive(item) {
  return item > 5;
});

console.log(result);
// [6]
```

This function behaves the same as our own implementation before, because it takes a callback function which evaluates the filter condition as well. The only difference is that it's already built-in for JavaScript arrays as a method.

For all these cases, you can also use anonymous JavaScript callback functions, if they are inlined:

```javascript{1}
const result = [3, 6, 1].filter(function (item) {
  return item > 5;
});
```

In addition, you can also use JavaScript arrow functions for keeping your callback functions more concise:

```javascript{1}
const result = [3, 6, 1].filter((item) => item > 5);

console.log(result);
// [6]
```

In conclusion, callback functions are powerful: Functions that take a callback function as argument can stay pretty generic, because developers who use this function have to define the crucial behavior in the callback function.


