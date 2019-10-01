---
title: "JavaScript Variable with Question Mark"
description: "The question mark after a JavaScript variable declaration is used as shorthand conditional operator to assign a variable conditionally. It's called ternary operator ..."
date: "2019-09-30T07:52:46+02:00"
categories: ["JavaScript"]
keywords: ["javascript question mark"]
hashtags: ["#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

If you are new to JavaScript, the question mark after a variable may be confusing to you. Let's shed some light into it. The question mark in JavaScript is commonly used as **conditional operator** -- called **[ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)** when used with a colon (:) and a question mark (?) -- to assign a variable name conditionally.

```javascript
const isBlack = false;

const text = isBlack ? 'Yes, black!' : 'No, something else.';

console.log(text);
// "No, something else."
```

Either the expression is true and returns the value after the question mark (?) or the expression is false and returns the value after the colon (:).

This kind of JavaScript variable declaration is used as a **shorthand** though. You can achieve the same with the **"if-else"-statement** in JavaScript as conditional operator in contrast to the ternary operator, but it turns out more verbose:

```javascript
const isBlack = false;

let text;
if (isBlack) {
  text = 'Yes, black!';
} else {
  text = 'No, something else.';
}

console.log(text);
// "No, something else."
```

If this is not what you are looking for, then maybe you are searching for JavaScript's **[optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)** feature. It is used to assign a variable conditionally:

```javascript
const person = {
  name: 'Robin Wieruch',
  pet: {
    name: 'Trixi',
  },
};

const petName = person.pet?.name;
console.log(petName);
// "Trixi"
```

If the person has no pet, the output would be `undefined` without throwing a JavaScript exception.

```javascript
const person = {
  name: 'Robin Wieruch',
};

const petName = person.pet?.name;
console.log(petName);
// undefined
```

When this feature was not available in JavaScript, it was common to use the OR (||) operator or the ternary operator (?:) from before to avoid any JavaScript exceptions:

```javascript
const person = {
  name: 'Robin Wieruch',
};

let petName = person.pet || person.pet.name;
console.log(petName);
// undefined

petName = person.pet ? person.pet.name : undefined;
console.log(petName);
// undefined
```

Most commonly you will find the question mark in JavaScript for these two use cases. Either it is used as shorthand conditional operator instead of the commonly used "if-else"-statement or as optional chaining operator to assign variables conditionally without hitting an exception.