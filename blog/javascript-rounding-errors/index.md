---
title: "JavaScript Rounding Errors (in Financial Applications)"
description: "Learn about rounding errors in JavaScript and how to avoid them in financial applications. Why is 0.1 + 0.2 not equal to 0.3 in JavaScript when working with floating-point numbers?"
date: "2024-06-24T07:50:46+02:00"
categories: ["JavaScript"]
keywords: ["javascript rounding errors", "javascript financial applications"]
hashtags: ["#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Rounding errors are a common issue in JavaScript and other programming languages when working with floating-point numbers. You might have encountered the problem when adding two decimal numbers like `0.1 + 0.2` and expecting the result to be `0.3`. However, the result is not `0.3` but `0.30000000000000004`.

```js
console.log(0.1 + 0.2); // 0.30000000000000004
```

In a financial application you do not want to deal with those issues and you do not want to put these numbers in your database. But why am I in the position to write about this issue?

Last year I have ventured into a new startup where the application had to have an integrated invoicing system. Since I built the whole application with Next.js, the system was built with TypeScript and I had to deal with a fair share of mathematical operations (and rounding errors). Here I want to share my experience with you and how I solved the problem.

# Rounding Numbers in JavaScript

In JavaScript there are different ways to round numbers. For example, you can use the JS native `Math.round()`, `Math.floor()`, or `Math.ceil()` functions to round numbers. The `Math.round()` [function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round) rounds a number to the nearest *integer* which you usually want when working with financial applications where you want to keep monetary values as integers (read: cents).

```js
console.log(Math.round(0.1 + 0.2)); // 0
```

If you want to keep decimal places, you can multiply the number by a factor, round it, and then divide it by the same factor. For example, to round a number to one decimal place, you can multiply the number by `10`, round it, and then divide it by `10`.

```js
console.log(Math.round((0.1 + 0.2) * 10) / 10); // 0.3
```

Everyone who works in finance and web/software development knows that monetary values should be stored as integers (cents) and not as floating-point numbers (dollar) in the database. This is because floating-point numbers can lead to rounding errors due to their binary nature. Hence you should always store monetary values as integers and only convert them to floating-point numbers when you need to display them. However, when dealing with features like taxes, discounts, etc. you will automatically run into decimal numbers.

Unfortunately rounding like I have shown above is not bullet proof. For example, when we want to round to two decimal places, we can run into issues like the following due to the binary nature of floating-point numbers in JavaScript:

```js
console.log(Math.round(1.255 * 100) / 100);
// result: 1.25
// expected: 1.26
```

This unexpected behavior is not consistent though, so it is easy to overlook. For example, the following code snippet just works as expected:

```js
console.log(Math.round(2.255 * 100) / 100);
// result: 2.26
// expected: 2.26
```

JavaScript, like many other languages, uses binary floating-point arithmetic (specifically, the [IEEE 754 standard](https://en.wikipedia.org/wiki/IEEE_754)) to represent numbers. This format can't precisely represent *some* decimal numbers due to their binary nature, leading to small precision errors.

```js
let intermediate = 1.255 * 100;
console.log(intermediate); // 125.49999999999999
console.log(Math.round(intermediate)); // 125
console.log(Math.round(intermediate) / 100); // 1.25
```

And again for other numbers it works as expected:

```js
let intermediate = 2.255 * 100;
console.log(intermediate); // 225.5
```

This issue is easy to overlook and can lead to bugs in your application if you are not aware of it. From here, there are again ways around this issue. For example, you can add a small value (e.g. `Number.EPSILON`) to the number before rounding to ensure that the rounding is done correctly. This is a common technique to avoid most rounding errors in JavaScript:

```js
console.log(Math.round((1.255 + Number.EPSILON) * 100) / 100);
// 1.26
```

Now you may think this is bullet proof, but it is (still) not. You can run into issues like this, where the result is not as expected, and again it is inconsistent behavior which makes it hard to debug:

```js
console.log(Math.round((10.075 + Number.EPSILON) * 100) / 100);
// result: 10.07
// expected: 10.08
```

I learned all of it the hard way when I had to deal with the invoicing system. And since all of this is not always predictable, you think you may have fixed all the issues, but then you run into another one. For my case where you create invoices, you want to be sure that the numbers are correct, because invoices are usually immutable and you do not want to change them after they are created. Especially when you already have customers.

# JavaScript Libraries to avoid Rounding Errors

If these rounding errors are critical for your application, you might want to use a library to take care of the rounding for you. Libraries like `big.js`, `decimal.js`, `dinero.js` and `currency.js` provide precise arithmetic operations. While the former are more general purpose libraries, the latter are specifically designed for working with currency values. So I went with `currency.js` for my invoicing system:

```js
console.log(currency(0.1).add(0.2).value)
// 0.3

console.log(currency(1.255).value);
// 1.26

console.log(currency(10.075).value);
// 10.08
```

All of these libraries are built to handle decimal numbers and provide a more predictable behavior when working with floating-point numbers. They are especially useful when working with financial applications where precision is crucial. So I started to use `currency.js` in my invoicing system and thought I had solved the issue. But the problem was not solved yet and I was about to release the feature to the customers.

# Types of Rounding

The invoicing system had to have the feature to cancel invoices. When you cancel an invoice, you have to reverse the invoice and create a cancelled invoice. The cancelled invoice has to have the same numbers as the invoice, but with negative values. This is where I ran into the next issue, because I just mirrored the numbers for the calculation of the cancelled invoice.

For example, take an invoice where the sum of all position is `10.075` which can happen if you support discounts, taxes, etc. When you cancel the invoice, the sum of all positions should be `-10.075`. But when you mirror the numbers, you get `-10.07` instead of `-10.08`.

```js
console.log(currency(10.075).value);
// 10.08
console.log(currency(-10.075).value);
// -10.07
```

A finicky developer may say that the issue is not with the rounding, but with the mirroring of the numbers. This was an architectural decision where we had to weigh the pros and cons in an already complex system. The decision was made to mirror the numbers, because we were able to reuse the code for the complex calculation (which gets complex with (partial) discounts (over a subset of positions), taxes, cancellations, deposit invoices ...). We were also able to use the database model for the cancelled invoice, which was a big plus.

It turns out that `currency.js` uses the round half up method for rounding. At the time of writing, this is [the only supported rounding type](https://github.com/scurker/currency.js/issues/378). This means that numbers are rounded to the nearest integer, and if the number is exactly halfway between two integers, it is rounded up. This is why the cancelled invoice has the amount `-10.07` and not `-10.08`.

Since cancellations do not happen as often as invoices, the issue does not become apparent immediately. So in a scenario where you are about to launch an invoicing system to your customers, this is a critical bug. As mentioned earlier, invoices should be immutable and once they are created and sent to the customer, they should not be changed. This at least is the case in Germany where I live and the customers I serve.

When working with financial applications, you have to be aware of the [different types of rounding](https://en.wikipedia.org/wiki/Rounding). The most common types of rounding are:

- **Round half up**: This is the most common type of rounding where numbers are rounded to the nearest integer. If the number is exactly halfway between two integers, it is rounded up.
- **Round half down**: This is similar to round half up, but if the number is exactly halfway between two integers, it is rounded down.
- **Round half towards zero**: This type of rounding rounds numbers towards zero. Positive numbers are rounded down, and negative numbers are rounded up.
- **Round half away from zero**: This type of rounding rounds numbers away from zero. Positive numbers are rounded up, and negative numbers are rounded down.
- **Round half to even**: This type of rounding rounds numbers to the nearest even integer. If the number is exactly halfway between two integers, it is rounded to the nearest even integer.

The latter is also known as bankers' rounding and is used in financial applications to minimize rounding errors. This is because it rounds to the nearest *even* integer, which means the rounding is unbiased. For example, `-0.5` is rounded to `-0`, and `0.5` is rounded to `0`. Since the whole application was already refactored and fixed to use `currency.js`, which only supported round half up, I had to find a solution to use bankers' rounding. I switched to `big.js` which supports many different types of rounding:

```js
import Big from "big.js";
Big.RM = Big.roundHalfEven;

console.log(Big(10.075).round(2));
// 10.08
console.log(Big(-10.075).round(2));
// -10.08
```

With `big.js` I was able to use bankers' rounding and the issue was solved. I guess the lesson learned here is that you should always be aware of the critical parts of your application and test them thoroughly. Also after launching a critical feature to your customers, you should monitor it closely and be prepared to fix issues as soon as they arise.

For example, we had to fix several invoices retroactively in the database, because they were wrong due to the rounding issue. This was a big deal to us, because we had to inform the customers of a two sided marketplace that their invoices were wrong and that they had to pay more or less than they thought. It was just about a few cents, but it was still lots of time invested in business development to get the customers on board and now we had to tell them that we made a mistake.

<Divider />

The feature was launched and the customers were happy. It took lots of sweat and tears to get this to production, but it was worth it. Since then we have created hundreds of invoices (and cancellations) and everything worked as expected. The first customer in the application just reached $100.000 in revenue and I am proud that I was able to build this system from scratch after all. I hope this article helps you to avoid the same mistakes I made and that you can build a financially critical infrastructure yourself.