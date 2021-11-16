---
title: "Babel Module Resolver with TypeScript"
description: "How to use TypeScript with Babel Module Resolver for aliases that are defined in your .babelrc file ..."
date: "2020-02-01T13:56:46+02:00"
categories: ["Tooling"]
keywords: ["babel module resolver typescript"]
hashtags: ["#JavaScript"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<LinkCollection label="This tutorial is part 2 of 2 in the series." links={[{ prefix: "Part 1:", label: "How to set up Babel Module Resolver", url: "/babel-module-resolver/" }]} />

Here you will learn how to use TypeScript with Babel Module Resolver for aliases that are defined in your .babelrc file:

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

In order to get the same alias mappings to TypeScript, the *tsconfig.json* file needs to look like this:

```javascript
{
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "paths": {
      "@components/*": ["./src/components/*"],
      "@constants/*": ["./src/constants/*"]
    }
  },
  ...
}
```

Now you can use import statemes with aliases in your TypeScript files too.