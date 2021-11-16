---
title: "Babel Module Resolver with Jest"
description: "How to use Jest with Babel Module Resolver for aliases that are defined in your .babelrc file ..."
date: "2020-02-01T13:56:46+02:00"
categories: ["Tooling"]
keywords: ["babel module resolver jest"]
hashtags: ["#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in the series." links={[{ prefix: "Part 1:", label: "How to set up Babel Module Resolver", url: "/babel-module-resolver/" }]} />

Here you will learn how to use Jest with Babel Module Resolver for aliases that are defined in your .babelrc file:

```javascript{}
{
  ...
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./"],
        "alias": {
          "@components": "./src/components",
          "@constants": "./src/constants",
        }
      }
    ],
  ]
}
```

In order to get the same alias mappings to Jest, the *jest.config.js* file needs to look like this:

```javascript
module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: ['./node_modules/'],
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@constants(.*)$': '<rootDir>/src/constants$1',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
```

Now you can use import statemes with aliases in your Jest testing environment too.