---
title: "Webpack Code Splitting for your Library"
description: "A walkthrough on how to use code splitting for your library to reduce your bundle size by giving multiple entry points to your JavaScript library ..."
date: "2019-11-24T07:52:46+02:00"
categories: ["Node", "Tooling", "JavaScript"]
keywords: ["webpack code splitting library"]
hashtags: ["#100DaysOfCode", "#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in the series." links={[{ prefix: "Part 1:", label: "How to publish a npm package?", url: "/publish-npm-package-node/" }]} />

Just recently I had to apply Webpack's Code Splitting, because the bundle size of a single file for my JavaScript library got too big when installing and importing it in another JavaScript project. After going through the process of Code Splitting my library, I was able to reduce my bundle size significantly by not importing the whole library at once, but by importing only parts of it from relative paths of the library's entry points.

In this brief step by step tutorial, I want to explain how to use Webpack Code Splitting to reduce your JavaScript library's bundle size, how to export JavaScript code from relative paths from your library, and how to import these fragments in your actual JavaScript project using your library.

In your current application, you may have the following or a similar Webpack configuration with just a single entry point:

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/lib`,
    filename: 'index.js',
    library: 'my-library-name',
    libraryTarget: 'umd',
  },
  ...
};
```

Furthermore, in your *package.json* file you may have the following or a similar key/value pair for the main entry point of your library:

```javascript
{
  "name": "my-library-name",
  "version": "1.0.0",
  "description": "",
  "main": "lib/index.js",
  ...
}
```

Having one single entry point to your library is fine until your library's bundle size grows beyond a certain threshold. Eventually it will have negative side-effects importing your *whole* library into your JavaScript application, considering that you don't need all parts of your library at once, because it slows down the initial workload of your application.

Let's see how we can use Code Splitting to our advantage. First, we will use multiple entry points instead of a single entry point:

```javascript{2-6,9}
module.exports = {
  entry: {
    main: './src/index.js',
    add: './src/add.js',
    subtract: './src/subtract.js',
  },
  output: {
    path: `${__dirname}/lib`,
    filename: '[name].js',
    library: 'my-library-name',
    libraryTarget: 'umd',
  },
  ...
}
```

While */src/index.js* exports the functions from */src/add.js* and */src/subtract.js* to bundle it still as the whole library in the *main* entry point, both functions get bundled themselves for their *add* and *subtract* entry points respectively.

```javascript{5}
{
  "name": "my-library-name",
  "version": "1.0.0",
  "description": "",
  "main": "lib/main.js",
  ...
}
```

In the *package.json* file, we change the entry point to our whole library to the new entry point which bundles our whole library with one of our Webpack entry points. However, since we have new entry points for our single JavaScript functions, we can import them as standalone functionalities to our JavaScript application -- which installs and uses our library -- now.

```javascript
// imports whole library
import { add, subtract } from 'my-library-name';

// imports whole library too
// because the *src/index.js* from the library imports/exports subtract function
import { add } from 'my-library-name';

// imports add as standalone function
// without import whole library
import add from 'my-library-name/lib/add';

// imports subtract as standalone function
// without import whole library
import subtract from 'my-library-name/lib/subtract';
```

That's it for Code Splitting a JavaScript library with Webpack. If you don't need all parts of your library, then Code Splitting helps you to avoid importing the whole library but using only parts of it instead.
