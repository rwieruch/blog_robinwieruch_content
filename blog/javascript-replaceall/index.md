---
title: "Replace all occurrences of a string in JavaScript"
description: "Learn how to replace all occurrences of a string in JavaScript with replaceAll and replace with a regular expression and a global flag ..."
date: "2020-06-02T12:50:46+02:00"
categories: ["JavaScript"]
keywords: ["javascript replaceAll"]
hashtags: ["#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Eventually everyone came across the case that JavaScript's replace function, which is available on a [JavaScript string primitive](/javascript-variable/), does only replace one occurrence of the matched term.

```javascript
const text = 'Hello World';

const newText = text.replace('o', 'ö');

console.log(newText);
// "Hellö World"
```

Here I want to show you briefly **how to replace all occurrences in JavaScript** with two different ways. The first way uses a regular expression to find all matches with a [global flag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_searching_with_flags_2):

```javascript
const text = 'Hello World';

const newText = text.replace(/o/g, 'ö');

console.log(newText);
// "Hellö Wörld"
```

Without the global flag, the regex would only match one occurrence. An alternative to this is JavaScript's replaceAll function, which is built-in for JavaScript string primitives, but [not available for all browsers](https://v8.dev/features/string-replaceall) yet:

```javascript
const text = 'Hello World';

const newText = text.replaceAll('o', 'ö');

console.log(newText);
// "Hellö Wörld"
```

While replaceAll isn't fully available yet, you can use the regex version of replaceAll and the global flag g with JavaScript's replace version to replace all occurrences of a string.


