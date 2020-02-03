---
title: "How to use Babel Module Resolver"
description: "By Example: You will learn how to use Babel Module Resolver for your JavaScript application to convert absolute/relative paths to aliases. We will also cover ESLint ..."
date: "2019-09-01T13:56:46+02:00"
categories: ["Web Development", "Tooling", "ESLint", "Babel"]
keywords: ["babel module resolver", "babel module resolver eslint"]
hashtags: ["#Git"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<ByExample />

In this brief walkthrough, we will use [Babel Module Resolver](https://github.com/tleunen/babel-plugin-module-resolver) to convert relative paths to aliases for your entire JavaScript application. You can install it via the command line:

```javascript
npm install babel-plugin-module-resolver --save-dev
```

And use it in your *.babelrc* file to create your first module alias:

```javascript
{
  ...
  "plugins": [
    [
      "module-resolver",
      {
        "alias": {
          "@icons": "./src/components/icons"
        }
      }
    ]
  ],
  ...
}
```

In this case, we are giving all our Icons an alias path. Imagine you would have another *src/services/icon.js* file which deals with your icons. Now it has an easier time to import an icon from the *src/icons* folder:

```javascript
// old way to import
import { CheckIcon } from '../components/icons'
import CancelIcon from '../components/icons/CancelIcon'

// new way to import
import { CheckIcon } from '@icons'
import CancelIcon from '@icons/CancelIcon'
```

In your *.babelrc* file, you can introduce more of these aliases to tidy up your imports for your entire JavaScript application.

# Babel Module Resolver with ESLint

If you are using ESLint, you have to let ESLint know about the aliases defined in Babel's Module Resolver. First, install two more packages:

```javascript
npm install eslint-plugin-import eslint-import-resolver-babel-module --save-dev
```

And second, in your *.eslintrc* use these new plugins to match Babel's Module Resolver with ESLint:

```javascript
{
  ...
  "extends": [
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
  ...
}
```

That's it. ESLint should be happy about Babel's Module Resolver now.

<Divider />

Babel Module Resolver helps you to tidy up your relative imports for your entire JavaScript application. If you want to avoid moving up and down folders with relative paths, add aliases to crucial paths of your application to make it easier to import modules from these areas.

<LinkCollection label="This tutorial is part 1 of 2 in the series." links={[{ prefix: "Part 2:", label: "Babel Module Resolver with Jest", url: "https://www.robinwieruch.de/babel-module-resolver-jest" }]} />

<LinkCollection label="This tutorial is part 1 of 2 in the series." links={[{ prefix: "Part 2:", label: "Babel Module Resolver with TypeScript", url: "https://www.robinwieruch.de/babel-module-resolver-typescript" }]} />