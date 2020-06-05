---
title: "JavaScript Closure by Example"
description: "A brief JavaScript Closure Example to get you to know closures in JavaScript, why we need them, how to implement them, how to use them, and what JavaScript patterns they can be used for ..."
date: "2019-07-16T13:52:46+02:00"
categories: ["JavaScript"]
keywords: ["javascript closure"]
hashtags: ["#100DaysOfCode", "#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Eventually you will come across the concept of a JavaScript Closure. I want to give you a step by step walkthrough on how to implement a JavaScript Closure. Along the way, you will find out yourself why it makes sense to implement certain things with JavaScript Closures. The whole source code can be found on [GitHub](https://github.com/rwieruch/javascript-closure). If you want to code along the way, make sure to [set up a JavaScript project](/javascript-project-setup-tutorial/) before.

# Why a JavaScript Closure?

Let's say we have the following JavaScript function which just returns an object for us. The object's properties are based on the incoming function's arguments.

```javascript
function getEmployee(name, country) {
  return { name, country };
}

const employeeOne = getEmployee('Robin', 'Germany');
const employeeTwo = getEmployee('Markus', 'Canada');

const employees = [employeeOne, employeeTwo];
```

In our case, the function creates an object for an employee object. The function can be used to create multiple objects one by one. It's up to you what you are doing with these objects afterwards. For instance, put them in an array to get a list of your company's employees.

In order to distinguish our employees, we should give them an employee number (identifier). The identifier should be assigned **internally** -- because from the outside when calling the function, we don't want to care about the number.

```javascript{2,3,13,14,15,16}
function getEmployee(name, country) {
  let employeeNumber = 1;
  return { employeeNumber, name, country };
}

const employeeOne = getEmployee('Robin', 'Germany');
const employeeTwo = getEmployee('Markus', 'Canada');

const employees = [employeeOne, employeeTwo];

console.log(employees);

// [
//   { employeeNumber: 1, name: 'Robin', country: 'Germany' },
//   { employeeNumber: 1, name: 'Markus', country: 'Canada' },
// ]
```

At the moment, every employee has an employee number of 1 which isn't right. It should be a unique identifier. Usually an employee number just increments by one for every joining employee in a company. However, without being able to do something from the outside, the function doesn't know how many employees it has created already. **It doesn't keep track of the state.**

Since **a function doesn't keep any internal state**, we need to move the variable outside of the function, to increment it within the function with every created employee. We keep track of the state by incrementing the number every time the function gets called.

```javascript{1,4,15,16}
let employeeNumber = 1;

function getEmployee(name, country) {
  return { employeeNumber: employeeNumber++, name, country };
}

const employeeOne = getEmployee('Robin', 'Germany');
const employeeTwo = getEmployee('Markus', 'Canada');

const employees = [employeeOne, employeeTwo];

console.log(employees);

// [
//   { employeeNumber: 1, name: 'Robin', country: 'Germany' },
//   { employeeNumber: 2, name: 'Markus', country: 'Canada' },
// ]
```

*Note: The ++ operator (called [Increment Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Increment_())) increments an integer by one. If it is used postfix (e.g. `myInteger++`), it increments the integer but returns the value from before incrementing it. If it is used prefix (e.g. `++myInteger`), it increments the integer and returns the value after incrementing it. In contrast, there exists an [Decrement Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Decrement_(--)) in JavaScript too.*

There is one crucial step we did to implement this feature: We moved the variable outside of the **function's scope** in order to keep track of its state. Before it was internally managed by the function and thus only the function knew about this variable. Now we moved it outside and made it available in the **global scope**.

Now it's possible to mess up things with the new **global scope of the variable**:

```javascript{8,17}
let employeeNumber = 1;

function getEmployee(name, country) {
  return { employeeNumber: employeeNumber++, name, country };
}

const employeeOne = getEmployee('Robin', 'Germany');
employeeNumber = 50;
const employeeTwo = getEmployee('Markus', 'Canada');

const employees = [employeeOne, employeeTwo];

console.log(employees);

// [
//   { employeeNumber: 1, name: 'Robin', country: 'Germany' },
//   { employeeNumber: 50, name: 'Markus', country: 'Canada' },
// ]
```

Before this wasn't possible, because the employee number was **hidden in the function's scope** -- inaccessible for the outside context of the function due to the **scoping of the variable**. Even though our feature works, the previous code snippet clearly shows that we have a potential pitfall here.

Everything we have done in our previous code snippets was changing the scope of our variable from a function's scope to a global scope. A JavaScript Closure will fix the problem of our variable's scope, making it inaccessible from the outside of the function, but making it possible for the function to track its internal state. Fundamentally, the existence of scopes in programming give closures the air to breathe.

# JavaScript Closure by Example

A JavaScript Closure fixes the problem of our variable's scope. A closure makes it possible to track internal state with a variable in a function, without giving up the local scope of this variable.

```javascript{1,2,3,4,5,6,8}
function getEmployeeFactory() {
  let employeeNumber = 1;
  return function(name, country) {
    return { employeeNumber: employeeNumber++, name, country };
  };
}

const getEmployee = getEmployeeFactory();

const employeeOne = getEmployee('Robin', 'Germany');
const employeeTwo = getEmployee('Markus', 'Canada');

const employees = [employeeOne, employeeTwo];

console.log(employees);

// [
//   { employeeNumber: 1, name: 'Robin', country: 'Germany' },
//   { employeeNumber: 2, name: 'Markus', country: 'Canada' },
// ]
```

The new function became a higher-order function, because the first time calling it returns a function. This returned function can be used to create our employee as we did before. However, since **the surrounding function creates a stateful environment around the returned function** -- in this case the stateful employee number -- it is called a closure.

*"Closures are functions that refer to independent (free) variables. In other words, the function defined in the closure 'remembers' the environment in which it was created."* (Source: [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures))

From the outside, it's not possible to mess with the employee number anymore. It's not in the global scope, but in the closure of our function. Once you create your `getEmployee` function, which you can give any name, the employee number is kept internally as state.

*Note: It's worth to mention that the previous implementation of a JavaScript Closure for our example is also called "factory pattern" in software development. Basically the outer function is our factory function and the internal function our function to create an "item" (here employee) out of this factory's specification.*

<Divider />

I hope this brief walkthrough has helped you to understand a JavaScript Closure by example. We started with our problem -- the scoping of variables and the keeping track of internal state of a function -- and got rid of the problem by implementing a closure for it.
