---
title: "How to countBy in JavaScript"
description: "Learn how to countBy in JavaScript without Lodash but just using vanilla JavaScript to count objects by property ..."
date: "2020-06-02T14:50:46+02:00"
categories: ["JavaScript"]
keywords: ["javascript countBy"]
hashtags: ["#100DaysOfCode", "#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

The countBy function is one of the functions why people use [Lodash](https://lodash.com/) in their JavaScript code base. Here I want to give you a brief example on how to implement countBy in vanilla JavaScript without Lodash by just using JavaScript's reduce method.

Let's say we have the following [array of objects](/javascript-variable) and we want to count them by property (here color) to get the following output:

```javascript
const users = [
  { name: 'Jim', color: 'blue' },
  { name: 'Sam', color: 'blue' },
  { name: 'Eddie', color: 'green' },
];

const countByColor = // TODO: implement countBy

console.log(countByColor);

// { blue: 2, green: 1 }
```

We can use JavaScript's reduce method on an array to iterate over every item:

```javascript
const countByColor = users.reduce((acc, value) => {
  // TODO: implement countBy

  return acc;
}, {});
```

We start with an empty object as our accumulator (here `acc`) for this reduce's [callback function](/javascript-callback-function). For every iteration of the function, we return the changed (here still unchanged) accumulator. Let's implement countBy:

```javascript{2-6}
const usersByColor = users.reduce((acc, value) => {
  if (!acc[value.color]) {
    acc[value.color] = 1;
  } else {
    acc[value.color]++;
  }

  return acc;
}, {});
```

If the accumulator has no count initialized for currently iterated value's color, we initialize it with the count of 1 allocated in the object whereas the color is the key. If there is a count, we can just increment it by one with the ++ operator.

Essentially we start with an empty object and for every iterated value, we negotiate whether we need to allocate a new count with 1 based on the property (here color) in this object. If not, we increment the count by one, because we already started counting it.
